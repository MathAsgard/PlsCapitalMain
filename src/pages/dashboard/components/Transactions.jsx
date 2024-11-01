import "@material-tailwind/react";
import React, { useRef, useEffect } from "react";
import useInterval from "../../../hooks/useInterval";
import CustomSelect from "../../../components/CustomSelect";
const Transactions = ({address}) => {
	const [transactions, setTransactions] = React.useState([]);
	const [protocolFilter, setProtocolFilter] = React.useState("");
	const [transactionFilter, setTransactionFilter] = React.useState("");

	function getTransactions(filterType, filterValue){
		let txs = []
		if(localStorage["warren-"+address]){
			txs = JSON.parse(localStorage["warren-"+address]).reverse();
			if(filterType == "protocol" && filterValue !== "Select Protocol") txs = txs.filter(tx=>tx.protocol.toLowerCase().includes(filterValue.toLowerCase()))
			else if(protocolFilter !== "" && protocolFilter !== "Select Protocol") txs = txs.filter(tx=>tx.protocol.toLowerCase().includes(protocolFilter.toLowerCase()))
			if(filterType == "transaction" && filterValue !== "Filter By") txs = txs.filter(tx=>tx.action.toLowerCase().includes(filterValue.toLowerCase()))
			else if(transactionFilter !== "" && transactionFilter !== "Filter By") txs = txs.filter(tx=>tx.action.toLowerCase().includes(transactionFilter.toLowerCase()))
		}
    	setTransactions(txs)
	}

	function addTransaction(transaction){
		const txs = JSON.parse(localStorage["warren-"+address]);
		txs.push(transaction);
    	localStorage["warren-"+address] = JSON.stringify(txs);
	}

	useEffect(() => {
		getTransactions();
	},[]);

	useInterval(() => {
		getTransactions();
	}, 5000);

	return (
		<section className="relative z-[99] pt-[70px]">
			<div className="noisy-bg top-[-100px]" />
			<div className="container xl:max-w-[1300px] relative z-10">
				<div className="mb-4 sm:mb-[38px]">
					<div className="flex flex-wrap gap-y-5">
						<h5 className="text-2xl sm:text-[40px] font-medium flex items-center gap-5 flex-grow">
							<div>My Transactions</div>
							<span className="w-0 flex-grow bg-gradient8 h-[2px]"></span>
						</h5>
						<div className="flex flex-wrap gap-x-2 sm:gap-x-0 gap-y-2 items-center">
							<div className="select-custom1">
								<CustomSelect
									value={protocolFilter}
									setValue={setProtocolFilter}
									label="Select Protocol"
									dropDownFilter={getTransactions}
									filterType={"protocol"}
									options={[
										{
											value: "Select Protocol",
											label: "Select Protocol",
										},
										{
											value: "Capital Farms",
											label: "Capital Farms",
										},
										{
											value: "Heart Fund",
											label: "Heart Fund",
										},
										{
											value: "STOCK Vault",
											label: "STOCK Vault",
										},
										{
											value: "Convert",
											label: "Convert",
										},
										{
											value: "Zapper",
											label: "Zapper",
										},
									]}
								/>
							</div>
							<span className="w-0 flex-grow bg-gradient8 h-[1px] min-w-7 sm:block hidden"></span>
							<div className="select-custom2">
								<CustomSelect
									value={transactionFilter}
									setValue={setTransactionFilter}
									label="Filter By"
									dropDownFilter={getTransactions}
									filterType={"transaction"}
									options={[
										{
											value: "Filter By",
											label: "Filter By",
										},
										{
											value: "Stake",
											label: "Stake",
										},
										{
											value: "Unstake",
											label: "Unstake",
										},
										{
											value: "Claim",
											label: "Claim",
										},
										{
											value: "Lock",
											label: "Lock",
										},
									]}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="relative z-10 rounded-t-none rounded-b-[10px]">
					<div className="gradient-border bg-tableGradient inset-[1px] top-[75px] z-10 before:h-[2px] before:w-full before:absolute before:left-0 before:top-[-1px] before:bg-tableBg" />
					<div className="rounded-[10px] bg-tableBg px-4 pb-4 xl:px-[43px] xl:pb-[43px] overflow-hidden">
						<div
							className="absolute left-0 right-0 bottom-0 top-[75px]"
							style={{
								background: `url('/img/table-overlay.png') no-repeat center center / cover`,
							}}
						/>
						<div className="gradient-border h-[75px] bg-gradient9" />
						<div className="overflow-x-auto relative z-10">
							<table className="custom-table">
								<thead>
									<tr className="md:text-lg">
										<th className="p-4 font-semibold text-nowrap">
											Action
										</th>
										<th className="p-4 font-semibold text-nowrap">
											Token
										</th>
										<th className="p-4 font-semibold text-nowrap">
											Protocol
										</th>
										<th className="p-4 font-semibold text-nowrap">
											Transaction
										</th>
										<th className="p-4 font-semibold text-nowrap">
											Time
										</th>
									</tr>
									<tr>
										<th className="md:p-4"></th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((tx, index) => (
										<tr className="text-center" key={index}>
											<td className="custom-table-td">
												<div className="md:font-semibold text-nowrap">
													<span className="text-gradient-2 mr-1" style={{textTransform: "capitalize"}}>
														{tx.action}
													</span>
												</div>
											</td>
											<td className="custom-table-td">
												<div className="md:font-semibold text-nowrap">
													{tx.text.includes('to') &&
													<span style={{fontSize: "15px"}}>
														<span className="text-gradient-2 mr-1">{tx.text.split('to')[0].match(/\b\d[\d,.]*\b/)}</span>
														{tx.text.split('to')[0].match(/[a-zA-Z -]+/g)}
														{tx.text.split('to')[1] ? 'to': ''}
														<span className="text-gradient-2 mr-1">{tx.text.split('to')[1] ? tx.text.split('to')[1].match(/\b\d[\d,.]*\b/) : ""}</span>
														{" "}{tx.text.split('to')[1] ? tx.text.split('to')[1].match(/[a-zA-Z -]+/g) : ""}
													</span>
													}
													{tx.text.includes('&') &&
													<span style={{fontSize: "15px"}}>
														<span className="text-gradient-2 mr-1">{tx.text.split('&')[0].match(/\b\d[\d,.]*\b/)}</span>
														{tx.text.split('&')[0].match(/[a-zA-Z -]+/g)}
														{tx.text.split('&')[1] ? '& ': ''}
														<span className="text-gradient-2 mr-1">{tx.text.split('&')[1] ? tx.text.split('&')[1].match(/\b\d[\d,.]*\b/) : ""}</span>
														{" "}{tx.text.split('&')[1] ? tx.text.split('&')[1].match(/[a-zA-Z -]+/g) : ""}
													</span>
													}
													{!tx.text.includes('to') && !tx.text.includes('&') &&
													<span style={{fontSize: "15px"}}>
														<span className="text-gradient-2 mr-1">{tx.text.split('to')[0].match(/\b\d[\d,.]*\b/)}</span>
														{tx.text.split('to')[0].match(/[a-zA-Z -]+/g)}
														{tx.text.split('to')[1] ? 'to ': ''}
														<span className="text-gradient-2 mr-1">{tx.text.split('to')[1] ? tx.text.split('to')[1].match(/\b\d[\d,.]*\b/) : ""}</span>
														{" "}{tx.text.split('to')[1] ? tx.text.split('to')[1].match(/[a-zA-Z -]+/g) : ""}
													</span>
													}
												</div>
											</td>
											<td className="custom-table-td">
												<span className="md:font-semibold text-nowrap" style={{textTransform: "capitalize"}}>
													{tx.protocol.split(" (")[0]} {tx.protocol.split(" (")[1] ? <span style={{textTransform: "none"}}>({tx.protocol.split(" (")[1]}</span> : ""}
												</span>
											</td>
											<td className="custom-table-td">
												<span className="md:font-semibold text-nowrap">
													<a href={'https://scan.pulsechain.com/tx/'+tx.transaction} target="about:blank">{tx.transaction.slice(0, 6)}...{tx.transaction.slice(tx.transaction.length - 6, tx.transaction.length)} 🔗</a>
												</span>
											</td>
											<td className="custom-table-td">
												<span className="md:font-semibold text-nowrap">
													{new Date(tx.timestamp).toLocaleString('en-GB')}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Transactions;
