import("./scss/main.scss");
import Slider from "./Slider";

const slider = new Slider({
	body: ".slider__body",
	wrapper: ".slider__body-wrapper",
	item: ".slider__item",
	spaceBetween: 40,
	itemWidth: 300,
	threshold: 100,
	prevButton: "#previous",
	nextButton: "#next",
	progress: "#progress-completed",
	autoPlayInterval: 4000,
	breakpoints: {
		576: {
			itemWidth: 260,
			threshold: 40,
		},
	},
});
