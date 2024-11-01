import React, { useState, useEffect } from "react";
import Faqs from "../../components/Faqs";
import Layout from "../../components/Layout";
import AmbassadorSection from "./components/AmbassadorSection";
import ClaimTokens from "./components/ClaimTokens";
import PageHeader from "./components/PageHeader";

import BigNumber from "bignumber.js/bignumber";
import useInterval from "../../hooks/useInterval";
import contracts from "../../config/constants/contracts.js";
import {
  multicall,
  readContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { useAccount } from "wagmi";
import lpABI from "../../config/abi/lpToken.json";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast.jsx";

function toLocaleString(num, min, max, cutout) {
  const _number = isNaN(Number(num)) ? 0 : Number(num);
  if (cutout && num > 0 && num < cutout)
    return _number.toLocaleString(undefined, {
      minimumFractionDigits: max,
      maximumFractionDigits: max,
    });
  else
    return _number.toLocaleString(undefined, {
      minimumFractionDigits: min,
      maximumFractionDigits: min,
    });
}

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 18,
});

const PresaleSection = () => {
  const [connected, setConnected] = React.useState(false);
  const [userPoints, setUserPoints] = React.useState(0);
  const [totalPoints, setTotalPoints] = React.useState(0);
  const [daiBalance, setDaiBalance] = React.useState(0);
  const [approved, setApproved] = React.useState(0);
  const [presaleEnded, setPresaleEnded] = React.useState(false);
  const [claimed, setClaimed] = React.useState(false);
  const [rewards, setRewards] = React.useState([0, 0]);
  const [stockPrice, setStockPrice] = React.useState(0);
  const [pcapPrice, setPcapPrice] = React.useState(0);
  const userAccount = useAccount({
    onConnect() {
      getStats();
      setConnected(true);
    },
    onDisconnect() {
      getStats();
      setConnected(false);
    },
  });

  async function approve() {
    try {
      const amount = daiBalance.mul(1e18).add(1);

      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"pending"}
          description={"Awaiting for approval..."}
        />
      ));
      const { hash } = await writeContract({
        address: "0xefD766cCb38EaF1dfd701853BFCe31359239F305",
        abi: contracts.pair.abi,
        functionName: "approve",
        account: userAccount.address,
        args: [contracts.presale.address, amount],
      });
      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"submit"}
          description={"Transaction Submitted!"}
          hash={hash}
        />
      ));
      await waitForTransaction({
        hash,
      });
      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"confirmed"}
          title={`Token Contract Approved`}
          description={<></>}
          hash={hash}
        />
      ));
      getStats();
    } catch (error) {
      toast.custom((t) => <CustomToast toast={toast} t={t} type={"failed"} />);
    }
  }

  async function deposit(_id, _amount) {
    try {
      if (_amount > 5000) {
        toast.custom((t) => 
          <CustomToast 
          toast={toast} 
          t={t} 
          type={"error"} 
          description={
            <div className="font-[500] leading-[17px] text-[16px] mt-2">
              Maximum ammount allowed is{" "}
              <span className="text-[#01BCFF]">
                5000.00 DAI
              </span>{" "}
            </div>
          }
        />);
        return;
      }
      const amount = _amount * 1e18;
      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"pending"}
          description={"Awaiting for approval..."}
        />
      ));
      const { hash } = await writeContract({
        ...contracts.presale,
        functionName: "deposit",
        account: userAccount.address,
        args: [_id, amount],
      });
      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"submit"}
          description={"Transaction Submitted!"}
          hash={hash}
        />
      ));
      await waitForTransaction({
        hash,
      });
      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"confirmed"}
          title={`JOINED!`}
          description={
            <div className="font-[500] leading-[17px] text-[16px] mt-2">
              You joined the team!
            </div>
          }
          hash={hash}
        />
      ));
      getStats();
    } catch (error) {
      console.log(error);
      toast.custom((t) => <CustomToast toast={toast} t={t} type={"failed"} />);
    }
  }

  async function claim() {
    try {
      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"pending"}
          description={"Awaiting for approval..."}
        />
      ));
      const { hash } = await writeContract({
        ...contracts.presale,
        functionName: "claimPoints",
        account: userAccount.address,
        args: [],
      });
      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"submit"}
          description={"Transaction Submitted!"}
          hash={hash}
        />
      ));
      await waitForTransaction({
        hash,
      });
      toast.custom((t) => (
        <CustomToast
          toast={toast}
          t={t}
          type={"confirmed"}
          title={`CLAIMED`}
          description={
            <>
              <div className="font-[500] leading-[17px] text-[16px] mt-2">
                Claimed{" "}
                <span className="text-[#01BCFF]">
                  {" "}
                  {toLocaleString(Number(rewards[0]) / 1e18, 2, 2)} PCAP
                </span>{" "}
                and{" "}
                <span className="text-[#01BCFF]">
                  {" "}
                  {toLocaleString(Number(rewards[1]) / 1e18, 2, 2)} STOCK
                </span>
              </div>
            </>
          }
          hash={hash}
        />
      ));
      getStats();
    } catch (error) {
      toast.custom((t) => <CustomToast toast={toast} t={t} type={"failed"} />);
    }
  }

  async function getStats() {
    const query =
      "0x0000000000000000000000000000000000000000, 0xf808Bb6265e9Ca27002c0A04562Bf50d4FE37EAA";
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/pairs/pulsechain/${query}`
    );
    const rsps = await response.json();

    const pinePrice = rsps.pairs.filter(
      (pair) =>
        pair.pairAddress === "0x0000000000000000000000000000000000000000"
    )[0]
      ? rsps.pairs.filter(
          (pair) =>
            pair.pairAddress === "0x0000000000000000000000000000000000000000"
        )[0].priceUsd
      : 0.001;

    setPcapPrice(pinePrice);
    const [
      _userPoints,
      _totalPoints,
      _ended,
      _daiBalance,
      _allowance,
      _daiPlsReserves,
      _daiPlsSupply,
      _claimed,
    ] = await multicall({
      contracts: [
        {
          ...contracts.presale,
          functionName: "userPoints",
          args: [userAccount.address],
        },
        {
          ...contracts.presale,
          functionName: "totalPoints",
          args: [],
        },
        {
          ...contracts.presale,
          functionName: "endState",
          args: [],
        },
        {
          address: "0xefD766cCb38EaF1dfd701853BFCe31359239F305",
          abi: contracts.pair.abi,
          functionName: "balanceOf",
          args: [userAccount.address],
        },
        {
          address: "0xefD766cCb38EaF1dfd701853BFCe31359239F305",
          abi: contracts.pair.abi,
          functionName: "allowance",
          args: [userAccount.address, contracts.presale.address],
        },
        {
          address: "0xe56043671df55de5cdf8459710433c10324de0ae",
          abi: lpABI,
          functionName: "getReserves",
          args: [],
        },
        {
          address: "0xe56043671df55de5cdf8459710433c10324de0ae",
          abi: lpABI,
          functionName: "totalSupply",
          args: [],
        },
        {
          ...contracts.presale,
          functionName: "userClaimed",
          args: [userAccount.address],
        },
      ],
    });

    try {
      const _rewards = await readContract({
        ...contracts.presale,
        functionName: "rewardsToClaim",
        account: userAccount.address,
      });

      setRewards(_rewards);
    } catch (error) {
      setRewards([1, 1]);
    }

    const _stockPrice =
      (Number(_daiPlsReserves.result[1]) * 2) / Number(_daiPlsSupply.result);
    setStockPrice(_stockPrice);
    setUserPoints(new BigNumber(_userPoints.result).div(1e18));
    setTotalPoints(new BigNumber(_totalPoints.result).div(1e18));
    setDaiBalance(new BigNumber(_daiBalance.result).div(1e18));
    setPresaleEnded(Boolean(_ended.result));
    setClaimed(Boolean(_claimed.result));
    const _approved = new BigNumber(_allowance.result).greaterThan(
      new BigNumber(daiBalance).mul(1e18)
    );

    setApproved(_approved);
  }
  useEffect(() => {
    getStats();
  }, []);

  useInterval(() => {
    getStats();
  }, 5000);

  return (
    <Layout shortFooter>
      <PageHeader
        miniFav="/img/mini-fav.png"
        userPoints={userPoints}
        totalPoints={totalPoints}
      />
      <AmbassadorSection
        daiBalance={daiBalance}
        approved={approved}
        approve={approve}
        deposit={deposit}
      />
      <ClaimTokens
        presaleEnded={presaleEnded}
        rewards={rewards}
        stockPrice={stockPrice}
        pcapPrice={pcapPrice}
        claim={claim}
        claimed={claimed}
      />
      <Faqs subHeading="Frequently Asked Questions" noGradient />
    </Layout>
  );
};

export default PresaleSection;
