import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router-dom";

const Rewards = () => {
	return (
		<section className="pt-[70px] pb-[60px] xl:pb-[155px]">
			<ScrollAnimation animateIn="fadeInDown" animateOnce={true}>
				<div className="container xl:max-w-[1316px]">
					<div className=" text-center mb-[10]">
						<h5 className="text-4xl sm:text-6xl font-semibold text-center">
							<div>
								<span className="text-gradient-2">Reap the </span>{" "}
								Rewards
							</div>
						</h5>
					</div>
					<div className="w-[80%] max-w-[923px] mx-auto">
						<img src="/img/rewards-shape.png" className="w-full" alt="" />
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{data.map((item, index) => (
							<Link
								key={index}
								className="block rounded-[20px] overflow-hidden bg-gradient5 p-[1px]"
								to="#"
							>
								<div className="relative rounded-t-[20px] overflow-hidden">
									<img src={item.img} alt="" className="w-full" />
									<div className="md:text-lg leading-[24px] font-medium text-white sm:w-full max-w-[264px] bg-[#2C086E] absolute left-0 top-0 rounded-tl-[20px] rounded-br-[20px] shadow-chipShadow py-2 sm:py-[13px] px-[18px] sm:px-[29px]">
										{item.badge}
									</div>
								</div>
								<div className="bg-gradient6 py-[33px] px-[27px] text-md font-medium leading-[22px] rounded-br-[20px] rounded-bl-[20px]">
									<p className="m-0 text-center">{item.text}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</ScrollAnimation>
		</section>
	);
};

const data = [
	{
		img: "img/reward1.png",
		badge: "Enhacned Rewards",
		text: "Stake LP tokens in Capital Farms or the Heart Fund to access APRs set higher than PulseX, maximizing yield on your assets.",
	},
	{
		img: "img/reward2.png",
		badge: "Sustainable Growth",
		text: "Pulse Capital’s rehypothecation strategy reinvests rewards to curb inflation, maintaining long-term stability and value for the ecosystem.",
	},
	{
		img: "img/reward3.png",
		badge: "Balanced Staking",
		text: "Benefit from balanced contributions with both LP and STOCK tokens in Heart Fund pools, boosting returns and supporting liquidity stability.",
	},
	{
		img: "img/reward4.png",
		badge: "Inflation Control",
		text: "With a low PCAP emission rate, Pulse Capital sustains token scarcity, preserving PCAP’s value even with high APRs.",
	},
	{
		img: "img/reward5.png",
		badge: "Strategic Reinvestment",
		text: "Enjoy compounded benefits from reinvested earnings that increase your total returns.",
	},
	{
		img: "img/reward6.png",
		badge: "Tax Incentives",
		text: "Lock your tokens for 14 days to avoid the 5% sell tax, maximizing net returns on your Pulse Capital investments.",
	},
];

export default Rewards;
