import { Accordion } from "@material-tailwind/react";
import React from "react";
import { FaqIcon } from "./Icon";

const Faqs = () => {
	const [open, setOpen] = React.useState(null);
	return (
		<>
			<section className="py-[65px] md:pb-[117px] relative">
				<div className="w-full max-w-[1091px] h-[386px] blur-[200px] opacity-30 bg-gradient7 absolute top-[-100px] left-1/2 -translate-x-1/2" />
				<div className="container xl:max-w-[1070px] relative z-10">
					<div className="text-center mb-[26px]">
						<h2 className="text-3xl sm:text-[40px] sm:leading-[48px] font-black text-white mb-2">
							FAQ
						</h2>
						<div className="text-gradient font-medium">
							"Frequently Asked Questions 
						</div>
					</div>
					<div className="flex flex-wrap gap-4 xl:gap-x-10">
						<div className="flex flex-col gap-4 w-full md:w-[40%] flex-grow">
							{data.map(
								(item, index) =>
									index % 2 === 0 && (
										<FaqItem
											index={index}
											key={index}
											setOpen={setOpen}
											item={item}
											open={open}
										/>
									)
							)}
						</div>
						<div className="flex flex-col gap-4 w-full md:w-[40%] flex-grow">
							{data.map(
								(item, index) =>
									index % 2 === 1 && (
										<FaqItem
											index={index}
											key={index}
											setOpen={setOpen}
											item={item}
											open={open}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
const FaqItem = ({ item, index, setOpen, open }) => {
	return (
		<Accordion
			key={item.id}
			open={open === index}
			onClick={() => (open === index ? setOpen(null) : setOpen(index))}
			className="bg-gradient9 rounded-[5px] p-[1px]"
		>
			<div className="bg-[#10032F] rounded-[5px]">
				<Accordion.Header className="px-[13px] py-[8px] border-0 text-white accordion-btn">
					<FaqIcon />
					<h3 className="text-normal font-medium text-white flex-grow text-left mx-2 w-0 font-urbanist">
						{item.title}
					</h3>
					<span className="text-white">{open === index ? "-" : "+"}</span>
				</Accordion.Header>
				<Accordion.Body className="px-4 border-t border-opacity-10 border-white">
					<p className="text-white font-urbanist text-sm">
						{item.content}
					</p>
				</Accordion.Body>
			</div>
		</Accordion>
	);
};

const data = [
	{
		id: 1,
		title: "What is Pulse Capital?",
		content:
			"Pulse Capital is a DeFi protocol built on the PulseChain ecosystem, offering high-yield staking opportunities through features like Capital Farms, the Heart Fund, and the STOCK Vault. It’s designed to maximize user rewards while maintaining long-term sustainability through innovative mechanisms like rehypothecation and controlled token emissions.",
	},
	{
		id: 2,
		title: "How does Pulse Capital differ from other DeFi platforms?",
		content:
			"Pulse Capital stands out with its unique approach to sustainability and reward optimization. By leveraging rehypothecation on PulseX, it offers enhanced APRs without increasing token emissions, preserving the value of native tokens like PCAP and STOCK. This model enables high yields while protecting the platform from inflation.",
	},
	{
		id: 3,
		title: "What is rehypothecation, and how does it benefit investors?",
		content:
			"Rehypothecation is the process of reinvesting staked assets to generate additional returns. Pulse Capital uses rehypothecation on PulseX to subsidize rewards in the Capital Farms and Heart Fund, allowing users to earn higher APRs without relying on high token emissions. This strategy provides investors with competitive yields while ensuring sustainable growth.",
	},
	{
		id: 4,
		title: "What are Capital Farms, and how can I benefit from them?",
		content:
			"Capital Farms are staking pools in Pulse Capital where users can stake their PulseX LP tokens to earn rewards. With a 25% APR boost over PulseX, Capital Farms offer APRs set at 125% of those on PulseX, giving users a lucrative option for maximizing their returns on staked LP tokens.",
	},
	{
		id: 5,
		title: "How does the Heart Fund work, and what makes it unique?",
		content:
			"The Heart Fund is a specialized staking pool that allows users to stake a combination of LP tokens and STOCK tokens in a 75% LP to 25% STOCK ratio. It offers a 50% APR boost over PulseX, setting its APR at 150% of PulseX pools. This exclusive pool is designed for users seeking higher returns through balanced liquidity contributions.",
	},
	{
		id: 6,
		title: "What is the STOCK Vault, and how does it enhance returns?",
		content:
			"The STOCK Vault is a staking pool that offers high APRs for STOCK token holders. By allowing users to lock their STOCK tokens for extended periods, they can earn additional shares per token, with bonuses up to 300% for longer lock durations. The STOCK Vault’s rewards are amplified by rehypothecation, making it ideal for long-term investors.",
	},
	{
		id: 7,
		title: "How does Pulse Capital control token emissions to prevent inflation?",
		content:
			"Pulse Capital limits PCAP token emissions to protect against inflation, despite offering high APRs. By subsidizing rewards through rehypothecation rather than relying on high emissions, the platform maintains the long-term value of its native tokens. This low-emission approach ensures sustainable growth and value retention.",
	},
	{
		id: 8,
		title: "What is the purpose of the STOCK Lock feature?",
		content:
			"The STOCK Lock feature allows users to lock their STOCK tokens for 14 days to avoid a 5% sell tax. This short-term lock option offers a tax-free exit for users who wish to hold their tokens without incurring penalties, encouraging long-term participation and supporting platform stability.",
	},
	{
		id: 9,
		title: "How does Pulse Capital’s 25% and 50% APR boost benefit investors?",
		content:
			"Pulse Capital provides a 25% APR boost in Capital Farms and a 50% APR boost in the Heart Fund, meaning that APRs are set at 125% and 150% of PulseX APRs, respectively. These boosts allow investors to earn significantly higher returns, making Pulse Capital an attractive option for yield optimization within the PulseChain ecosystem.",
	},
	{
		id: 10,
		title: " Is Pulse Capital suitable for long-term investors?",
		content:
			"Yes, Pulse Capital is designed to benefit long-term investors through various mechanisms like the STOCK Vault’s extended lock bonuses and the STOCK Lock’s tax-free exit option. The platform’s sustainable growth model, low token emissions, and enhanced APRs provide a stable environment for users looking to maximize returns over time.",
	},
];

export default Faqs;
