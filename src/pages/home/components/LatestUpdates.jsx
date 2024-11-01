import React, { useRef } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomModal from "../../../components/CustomModal";
import { AngleLeft, AngleRight, ClearIcon } from "../../../components/Icon";

const LatestUpdates = () => {
	const [open, setOpen] = React.useState(false);
	const [active, setActive] = React.useState(0);
	const ref = useRef(null);
	const prevSlide = () => {
		ref.current.swiper.slidePrev();
	};
	const nextSlide = () => {
		ref.current.swiper.slideNext();
	};
	return (
		<section className="py-[85px] overflow-hidden">
			<div className="container xl:max-w-[1302px] group">
				<div className="mb-4 sm:mb-[38px]">
					<ScrollAnimation animateIn="fadeInDown" animateOnce={true}>
						<h5 className="text-3xl sm:text-4xl font-semibold flex items-center gap-5">
							<div>
								<span className="text-gradient-2">Lastest</span> Updates
							</div>
							<span className="w-0 flex-grow opacity-50 bg-gradient4 h-[2px]"></span>
						</h5>
					</ScrollAnimation>
				</div>
				<div className="relative">
					{/* <button
						className="absolute top-1/2 translate-y-[-50%] left-[-70px] hidden lg:block translate-x-[100px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 transition-all"
						type="button"
						onClick={() => prevSlide()}
					>
						<AngleLeft />
					</button>
					<button
						className="absolute top-1/2 translate-y-[-50%] right-[-70px] hidden lg:block  translate-x-[-100px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 transition-all"
						type="button"
						onClick={() => nextSlide()}
					>
						<AngleRight />
					</button> */}
					<ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
						<Swiper
							loop={true}
							breakpoints={{
								0: {
									slidesPerView: 1.1,
									spaceBetween: 10,
								},
								640: {
									slidesPerView: 1.5,
									spaceBetween: 20,
								},
								768: {
									slidesPerView: 2.2,
									spaceBetween: 30,
								},
								1024: {
									slidesPerView: 3,
									spaceBetween: 36,
								},
							}}
							className="overflow-visible lg:overflow-hidden"
							ref={ref}
						>
							{data.map((item, index) => (
								<SwiperSlide key={index} className="h-auto">
									<div
										className="bg-gradient5 p-[1px] rounded-[20px] h-full flex flex-col cursor-pointer"
										onClick={() => {
											setOpen(true);
											setActive(index);
										}}
									>
										<img
											src={item.img}
											alt=""
											className="w-full aspect-[400/240] object-cover rounded-tr-[20px] rounded-tl-[20px]"
										/>
										<div className="px-[18px] pb-[14px] bg-gradient6 pt-[18px] rounded-bl-[20px] rounded-br-[20px] flex-grow">
											<h5 className="text-md sm:text-lg font-semibold mb-[18px]">
												<span className="text-gradient-3 mr-2">
													{item.title1}
												</span>
												<span>{item.title2}</span>
											</h5>
											<p className="line-clamp-4 text-white text-opacity-60 leading:[19px]">
												{item.description}
											</p>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</ScrollAnimation>
				</div>
			</div>
			<CustomModal open={open} setOpen={setOpen} onlyChildren>
				<div className="w-full mx-auto max-w-[528px] z-[999] relative fadeInUp">
					<button
						type="button"
						className="absolute right-4 top-4 z-10"
						onClick={() => setOpen(false)}
					>
						<ClearIcon />
					</button>
					<div className="bg-gradient5 p-[1px] rounded-[20px] h-full flex flex-col">
						<img
							src={data[active].img}
							alt=""
							className="w-full aspect-[400/240] object-cover rounded-tr-[20px] rounded-tl-[20px]"
						/>
						<div className="px-[18px] pb-[14px] bg-gradient6 pt-[18px] rounded-bl-[20px] rounded-br-[20px] flex-grow">
							<h5 className="text-md sm:text-lg md:text-xl font-semibold mb-[18px] text-center">
								<span className="text-gradient-3 mr-2">
									{data[active].title1}
								</span>
								<span>{data[active].title2}</span>
							</h5>
							<p className="text-white text-opacity-60 leading:[24px]">
								{data[active].text}
							</p>
						</div>
					</div>
				</div>
			</CustomModal>
		</section>
	);
};
const data = [
	{
		img: "/img/latest-updates/1.png",
		title1: "The Rebrand: ",
		title2: "Warren to Pulse Capital",
		description: "This rebranding signifies our dedication to providing users with cutting-edge DeFi solutions tailored to the unique features of PulseChain. Pulse Capital embodies our renewed focus on innovation...",
		text: "This rebranding signifies our dedication to providing users with cutting-edge DeFi solutions tailored to the unique features of PulseChain. Pulse Capital embodies our renewed focus on innovation, security, and community engagement, ensuring that users continue to benefit from a robust and user-friendly platform that empowers their financial journey in the decentralized world.",
	},
	{
		img: "/img/latest-updates/2.png",
		title1: "Capital Farms Yield: ",
		title2: "25% Reward Boost",
		description: "With our commitment to maximizing user rewards, Pulse Capital introduces a 25% APR boost in the Capital Farms. This enhancement allows users to earn substantially higher yields, with APRs set at...",
		text: "With our commitment to maximizing user rewards, Pulse Capital introduces a 25% APR boost in the Capital Farms. This enhancement allows users to earn substantially higher yields, with APRs set at 125% of those offered on PulseX. By staking LP tokens in our Capital Farms, users can capitalize on this boost, enjoying increased earnings without additional risk. This adjustment reflects our dedication to providing competitive and rewarding DeFi solutions, aligning with our mission to empower users with robust, high-yield opportunities in the PulseChain ecosystem.",
	},
	{
		img: "/img/latest-updates/3.png",
		title1: "Heart Fund: ",
		title2: "50% Yield Boost",
		description: "Heart Fund offers an exclusive 50% APR boost on staking rewards, providing users with APRs set at 150% of those on PulseX. By staking a balanced combination of LP and STOCK tokens, users gain...",
		text: "Heart Fund offers an exclusive 50% APR boost on staking rewards, providing users with APRs set at 150% of those on PulseX. By staking a balanced combination of LP and STOCK tokens, users gain access to this elevated reward structure, optimizing their earning potential ecosystem. This enhanced APR reflects our commitment to delivering premium DeFi opportunities that align with our vision of sustainable, high-yield returns. The Heart Fund is crafted to empower our community with robust, incentivized staking that supports platform stability.",
	},
];
export default LatestUpdates;
