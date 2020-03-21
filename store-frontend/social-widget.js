"use strict";
const SOCIAL_WIDGET_API = "https://publishdev-api.socialhead.io/api";
const SOCIAL_WIDGET_ID = "#social-widget-wrapper";
const SOCIAL_WIDGET_DOMAIN = "#social-widget-shop-domain";
const SOCIAL_WIDGET_STYLE =
	"https://mrvan2851.github.io/store-frontend/style.min.css";
class SocialWidgetPopup {
	constructor(options, $) {
		let { images = [], widget_id = "" } = options;
		this.$ = $
		this.options = options;
		this.root = "root";
		this.data = images;
		this.scrollY = 0;
		this.current_item = null;
		this.container = $(
			'<div id="social-widget-preview"><div class="sw-instagram-preview-box"><div class="sw-instagram-preview-close"></div><div class="sw-instagram-preview-container"><div class="sw-instagram-preview-nav sw-instagram-preview-nav-prev"></div><div class="sw-instagram-preview-nav sw-instagram-preview-nav-next"></div><div class="sw-instagram-preview-image"><img class="sw-instagram-image" src=""/></div><div class="sw-instagram-preview-content"><div class="sw-instagram-header"><div class="sw-instagram-row"><a href="#" class="sw-instagram-author"></a><a href="#" class="sw-instagram-follow">follow us</a></div><div class="sw-instagram-row"><span class="sw-instagram-date"></span></div></div><div class="sw-instagram-body"><div class="sw-instagram-row"><div class="sw-instagram-caption"></div></div></div></div></div></div></div>'
		);

		this.body = $("body");
		this.fields = {
			image: ".sw-instagram-image",
			author: ".sw-instagram-author",
			follow: ".sw-instagram-follow",
			date: ".sw-instagram-date",
			caption: ".sw-instagram-caption"
		};
		this.container.appendTo(this.body);
		this.modal = this.container.find(".sw-instagram-preview-box");
		this.handleAddEventListener($);
	}

	handleAddEventListener() {
		var vm = this;
		this.$("#" + this.options.widget_id).on("click", ".sw-instagram-item", function (
			event
		) {
			event.preventDefault();
			var id = $(this).data("id");
			var item = vm.findItem(id);
			if (item) {
				vm.showModal(item);
			}
		});
		this.modal.on("click", ".sw-instagram-preview-close", () => {
			this.hideModal();
		});
		this.modal.on("click", ".sw-instagram-preview-backdrop", () => {
			this.hideModal();
		});
		this.modal.on("click", ".sw-instagram-preview-nav-next", () => {
			this.nextImage();
		});
		this.modal.on("click", ".sw-instagram-preview-nav-prev", () => {
			this.prevImage();
		});
		window.addEventListener("load", () => {
			this.scrollY = window.scrollY + "px";
		});
		window.addEventListener("scroll", () => {
			this.scrollY = window.scrollY + "px";
		});
	}

	showModal(item) {
		this.setContent(item);
		this.modal.fadeIn(200);
		this.disableScroll();
	}

	hideModal() {
		this.modal.fadeOut(200);
		this.enableScroll();
	}

	setContent(item) {
		this.modal.find(this.fields.image).attr("src", item.media_url);
		this.modal
			.find(this.fields.author)
			.attr("href", item.permalink)
			.text(item.username);
		this.modal.find(this.fields.follow).attr("href", item.permalink);
		this.modal.find(this.fields.date).text(item.timestamp);
		this.current_item = item;
	}

	nextImage(item) {
		var index = this.findItemIndex(this.current_item.id);
		if (index >= 0 && index < this.data.length - 1) {
			var item = this.data[index + 1];
			this.setContent(item);
		} else {
			this.hideModal();
		}
	}

	prevImage(item) {
		var index = this.findItemIndex(this.current_item.id);
		if (index > 0 && index < this.data.length) {
			var item = this.data[index - 1];
			this.setContent(item);
		} else {
			this.hideModal();
		}
	}

	findItem(value) {
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i][["id"]] === value) {
				return this.data[i];
			}
		}
		return undefined;
	}

	findItemIndex(value) {
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i][["id"]] === value) {
				return i;
			}
		}
		return -1;
	}

	disableScroll() {
		var bodyWidth = this.body.innerWidth();
		this.body.css("overflow", "hidden");
		this.body.css(
			"marginRight",
			(this.body.css("marginRight") ? "+=" : "") +
			(this.body.innerWidth() - bodyWidth)
		);
	}

	enableScroll() {
		var bodyWidth = this.body.innerWidth();
		this.body.css("overflow", "");
		this.body.css("marginRight", "-=" + (bodyWidth - this.body.innerWidth()));
	}
}

class SocialWidgetSlider {
	constructor(options) {
		this.config = Object.assign(
			{
				duration: 500,
				easing: "ease-out",
				perPage: 1,
				startIndex: 0,
				draggable: true,
				multipleDrag: true,
				threshold: 20,
				loop: true,
				rtl: false,
				auto_play_slider: false,
				auto_play_duration: 1000,
				onInit: () => { },
				onChange: () => { }
			},
			options
		);

		this.selector =
			typeof this.config.selector === "string"
				? document.querySelector(this.config.selector)
				: this.config.selector;

		if (this.selector === null) {
			throw new Error("Something wrong with your selector 😭");
		}
		this.timeout = null;

		this.resolveSlidesNumber();

		this.selectorWidth = this.selector.offsetWidth;
		this.innerElements = [].slice.call(this.selector.children);
		this.currentSlide = this.config.loop
			? this.config.startIndex % this.innerElements.length
			: Math.max(
				0,
				Math.min(
					this.config.startIndex,
					this.innerElements.length - this.perPage
				)
			);
		this.transformProperty = this.webkitOrNot();

		[
			"resizeHandler",
			"touchstartHandler",
			"touchendHandler",
			"touchmoveHandler",
			"mousedownHandler",
			"mouseupHandler",
			"mouseenterHandler",
			"mouseleaveHandler",
			"mousemoveHandler",
			"clickHandler"
		].forEach(method => {
			this[method] = this[method].bind(this);
		});

		this.init();
	}

	startAutoplay(e) {
		if (this.config.auto_play_slider) {
			this.pauseAutoplay();
			this.timeout = setInterval(() => {
				this.next();
			}, this.config.auto_play_duration);
		}
	}
	pauseAutoplay(e) {
		if (this.config.auto_play_slider) {
			clearInterval(this.timeout);
			this.timeout = null;
		}
	}

	restartAutoplay(e) {
		this.pauseAutoplay();
		this.startAutoplay();
	}

	webkitOrNot() {
		const style = document.documentElement.style;
		if (typeof style.transform === "string") {
			return "transform";
		}
		return "WebkitTransform";
	}

	attachEvents() {
		// Resize element on window resize
		window.addEventListener("resize", this.resizeHandler);
		this.selector.addEventListener("mouseenter", this.mouseenterHandler);
		this.selector.addEventListener("mouseleave", this.mouseleaveHandler);
		// If element is draggable / swipable, add event handlers
		if (this.config.draggable) {
			// Keep track pointer hold and dragging distance
			this.pointerDown = false;
			this.drag = {
				startX: 0,
				endX: 0,
				startY: 0,
				letItGo: null,
				preventClick: false
			};

			// Touch events
			this.selector.addEventListener("touchstart", this.touchstartHandler);
			this.selector.addEventListener("touchend", this.touchendHandler);
			this.selector.addEventListener("touchmove", this.touchmoveHandler);

			// Mouse events
			this.selector.addEventListener("mousedown", this.mousedownHandler);
			this.selector.addEventListener("mouseup", this.mouseupHandler);
			this.selector.addEventListener("mousemove", this.mousemoveHandler);

			// Click
			this.selector.addEventListener("click", this.clickHandler);
		}
	}

	detachEvents() {
		window.removeEventListener("resize", this.resizeHandler);
		this.selector.removeEventListener("touchstart", this.touchstartHandler);
		this.selector.removeEventListener("touchend", this.touchendHandler);
		this.selector.removeEventListener("touchmove", this.touchmoveHandler);
		this.selector.removeEventListener("mousedown", this.mousedownHandler);
		this.selector.removeEventListener("mouseup", this.mouseupHandler);
		this.selector.removeEventListener("mousemove", this.mousemoveHandler);
		this.selector.removeEventListener("mouseenter", this.mouseenterHandler);
		this.selector.removeEventListener("mouseleave", this.mouseleaveHandler);
		this.selector.removeEventListener("click", this.clickHandler);
	}

	init() {
		this.attachEvents();

		// hide everything out of selector's boundaries
		this.selector.style.overflow = "hidden";

		// rtl or ltr
		this.selector.style.direction = this.config.rtl ? "rtl" : "ltr";

		// build a frame and slide to a currentSlide
		this.buildSliderFrame();

		this.config.onInit.call(this);
		if (this.config.auto_play_slider) {
			this.restartAutoplay();
		}
	}

	buildSliderFrame() {
		const widthItem = this.selectorWidth / this.perPage;
		const itemsToBuild = this.config.loop
			? this.innerElements.length + 2 * this.perPage
			: this.innerElements.length;

		// Create frame and apply styling
		this.sliderFrame = document.createElement("div");
		this.sliderFrame.style.width = `${widthItem * itemsToBuild}px`;
		this.enableTransition();

		if (this.config.draggable) {
			this.selector.style.cursor = "-webkit-grab";
		}

		// Create a document fragment to put slides into it
		const docFragment = document.createDocumentFragment();

		// Loop through the slides, add styling and add them to document fragment
		if (this.config.loop) {
			for (
				let i = this.innerElements.length - this.perPage;
				i < this.innerElements.length;
				i++
			) {
				const element = this.buildSliderFrameItem(
					this.innerElements[i].cloneNode(true)
				);
				docFragment.appendChild(element);
			}
		}
		for (let i = 0; i < this.innerElements.length; i++) {
			const element = this.buildSliderFrameItem(this.innerElements[i]);
			docFragment.appendChild(element);
		}
		if (this.config.loop) {
			for (let i = 0; i < this.perPage; i++) {
				const element = this.buildSliderFrameItem(
					this.innerElements[i].cloneNode(true)
				);
				docFragment.appendChild(element);
			}
		}

		// Add fragment to the frame
		this.sliderFrame.appendChild(docFragment);

		// Clear selector (just in case something is there) and insert a frame
		this.selector.innerHTML = "";
		this.selector.appendChild(this.sliderFrame);

		// Go to currently active slide after initial build
		this.slideToCurrent();
	}

	buildSliderFrameItem(elm) {
		const elementContainer = document.createElement("div");
		elementContainer.style.cssFloat = this.config.rtl ? "right" : "left";
		elementContainer.style.float = this.config.rtl ? "right" : "left";
		elementContainer.style.width = `${
			this.config.loop
				? 100 / (this.innerElements.length + this.perPage * 2)
				: 100 / this.innerElements.length
			}%`;
		elementContainer.appendChild(elm);
		return elementContainer;
	}

	resolveSlidesNumber() {
		if (typeof this.config.perPage === "number") {
			this.perPage = this.config.perPage;
		} else if (typeof this.config.perPage === "object") {
			this.perPage = 1;
			for (const viewport in this.config.perPage) {
				if (window.innerWidth >= viewport) {
					this.perPage = this.config.perPage[viewport];
				}
			}
		}
	}

	prev(howManySlides = 1, callback) {
		// early return when there is nothing to slide
		if (this.innerElements.length <= this.perPage) {
			return;
		}

		const beforeChange = this.currentSlide;

		if (this.config.loop) {
			const isNewIndexClone = this.currentSlide - howManySlides < 0;
			if (isNewIndexClone) {
				this.disableTransition();

				const mirrorSlideIndex = this.currentSlide + this.innerElements.length;
				const mirrorSlideIndexOffset = this.perPage;
				const moveTo = mirrorSlideIndex + mirrorSlideIndexOffset;
				const offset =
					(this.config.rtl ? 1 : -1) *
					moveTo *
					(this.selectorWidth / this.perPage);
				const dragDistance = this.config.draggable
					? this.drag.endX - this.drag.startX
					: 0;

				this.sliderFrame.style[this.transformProperty] = `translate3d(${offset +
					dragDistance}px, 0, 0)`;
				this.currentSlide = mirrorSlideIndex - howManySlides;
			} else {
				this.currentSlide = this.currentSlide - howManySlides;
			}
		} else {
			this.currentSlide = Math.max(this.currentSlide - howManySlides, 0);
		}

		if (beforeChange !== this.currentSlide) {
			this.slideToCurrent(this.config.loop);
			this.config.onChange.call(this);
			if (this.config.auto_play_slider) {
				this.restartAutoplay();
			}
			if (callback) {
				callback.call(this);
			}
		}
	}

	next(howManySlides = 1, callback) {
		// early return when there is nothing to slide
		if (this.innerElements.length <= this.perPage) {
			return;
		}

		const beforeChange = this.currentSlide;

		if (this.config.loop) {
			const isNewIndexClone =
				this.currentSlide + howManySlides >
				this.innerElements.length - this.perPage;
			if (isNewIndexClone) {
				this.disableTransition();

				const mirrorSlideIndex = this.currentSlide - this.innerElements.length;
				const mirrorSlideIndexOffset = this.perPage;
				const moveTo = mirrorSlideIndex + mirrorSlideIndexOffset;
				const offset =
					(this.config.rtl ? 1 : -1) *
					moveTo *
					(this.selectorWidth / this.perPage);
				const dragDistance = this.config.draggable
					? this.drag.endX - this.drag.startX
					: 0;

				this.sliderFrame.style[this.transformProperty] = `translate3d(${offset +
					dragDistance}px, 0, 0)`;
				this.currentSlide = mirrorSlideIndex + howManySlides;
			} else {
				this.currentSlide = this.currentSlide + howManySlides;
			}
		} else {
			this.currentSlide = Math.min(
				this.currentSlide + howManySlides,
				this.innerElements.length - this.perPage
			);
		}
		if (beforeChange !== this.currentSlide) {
			this.slideToCurrent(this.config.loop);
			this.config.onChange.call(this);
			if (this.config.auto_play_slider) {
				this.restartAutoplay();
			}
			if (callback) {
				callback.call(this);
			}
		}
	}

	disableTransition() {
		this.sliderFrame.style.webkitTransition = `all 0ms ${this.config.easing}`;
		this.sliderFrame.style.transition = `all 0ms ${this.config.easing}`;
	}

	enableTransition() {
		this.sliderFrame.style.webkitTransition = `all ${this.config.duration}ms ${this.config.easing}`;
		this.sliderFrame.style.transition = `all ${this.config.duration}ms ${this.config.easing}`;
	}

	goTo(index, callback) {
		if (this.innerElements.length <= this.perPage) {
			return;
		}
		const beforeChange = this.currentSlide;
		this.currentSlide = this.config.loop
			? index % this.innerElements.length
			: Math.min(Math.max(index, 0), this.innerElements.length - this.perPage);
		if (beforeChange !== this.currentSlide) {
			this.slideToCurrent();
			this.config.onChange.call(this);
			if (this.config.auto_play_slider) {
				this.restartAutoplay();
			}
			if (callback) {
				callback.call(this);
			}
		}
	}

	slideToCurrent(enableTransition) {
		const currentSlide = this.config.loop
			? this.currentSlide + this.perPage
			: this.currentSlide;
		const offset =
			(this.config.rtl ? 1 : -1) *
			currentSlide *
			(this.selectorWidth / this.perPage);

		if (enableTransition) {
			// This one is tricky, I know but this is a perfect explanation:
			// https://youtu.be/cCOL7MC4Pl0
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					this.enableTransition();
					this.sliderFrame.style[
						this.transformProperty
					] = `translate3d(${offset}px, 0, 0)`;
				});
			});
		} else {
			this.sliderFrame.style[
				this.transformProperty
			] = `translate3d(${offset}px, 0, 0)`;
		}
	}

	updateAfterDrag() {
		const movement =
			(this.config.rtl ? -1 : 1) * (this.drag.endX - this.drag.startX);
		const movementDistance = Math.abs(movement);
		const howManySliderToSlide = this.config.multipleDrag
			? Math.ceil(movementDistance / (this.selectorWidth / this.perPage))
			: 1;

		const slideToNegativeClone =
			movement > 0 && this.currentSlide - howManySliderToSlide < 0;
		const slideToPositiveClone =
			movement < 0 &&
			this.currentSlide + howManySliderToSlide >
			this.innerElements.length - this.perPage;

		if (
			movement > 0 &&
			movementDistance > this.config.threshold &&
			this.innerElements.length > this.perPage
		) {
			this.prev(howManySliderToSlide);
		} else if (
			movement < 0 &&
			movementDistance > this.config.threshold &&
			this.innerElements.length > this.perPage
		) {
			this.next(howManySliderToSlide);
		}
		this.slideToCurrent(slideToNegativeClone || slideToPositiveClone);
	}

	resizeHandler() {
		// update perPage number dependable of user value
		this.resolveSlidesNumber();

		// relcalculate currentSlide
		// prevent hiding items when browser width increases
		if (this.currentSlide + this.perPage > this.innerElements.length) {
			this.currentSlide =
				this.innerElements.length <= this.perPage
					? 0
					: this.innerElements.length - this.perPage;
		}

		this.selectorWidth = this.selector.offsetWidth;

		this.buildSliderFrame();
	}

	clearDrag() {
		this.drag = {
			startX: 0,
			endX: 0,
			startY: 0,
			letItGo: null,
			preventClick: this.drag.preventClick
		};
	}

	touchstartHandler(e) {
		// Prevent dragging / swiping on inputs, selects and textareas
		const ignoreSiema =
			["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(e.target.nodeName) !==
			-1;
		if (ignoreSiema) {
			return;
		}

		e.stopPropagation();
		this.pointerDown = true;
		this.drag.startX = e.touches[0].pageX;
		this.drag.startY = e.touches[0].pageY;
		this.pauseAutoplay();
	}

	touchendHandler(e) {
		e.stopPropagation();
		this.pointerDown = false;
		this.enableTransition();
		if (this.drag.endX) {
			this.updateAfterDrag();
		}
		this.clearDrag();
		this.startAutoplay();
	}

	touchmoveHandler(e) {
		e.stopPropagation();

		if (this.drag.letItGo === null) {
			this.drag.letItGo =
				Math.abs(this.drag.startY - e.touches[0].pageY) <
				Math.abs(this.drag.startX - e.touches[0].pageX);
		}

		if (this.pointerDown && this.drag.letItGo) {
			e.preventDefault();
			this.drag.endX = e.touches[0].pageX;
			this.sliderFrame.style.webkitTransition = `all 0ms ${this.config.easing}`;
			this.sliderFrame.style.transition = `all 0ms ${this.config.easing}`;

			const currentSlide = this.config.loop
				? this.currentSlide + this.perPage
				: this.currentSlide;
			const currentOffset = currentSlide * (this.selectorWidth / this.perPage);
			const dragOffset = this.drag.endX - this.drag.startX;
			const offset = this.config.rtl
				? currentOffset + dragOffset
				: currentOffset - dragOffset;
			this.sliderFrame.style[this.transformProperty] = `translate3d(${(this
				.config.rtl
				? 1
				: -1) * offset}px, 0, 0)`;
		}
	}

	mousedownHandler(e) {
		// Prevent dragging / swiping on inputs, selects and textareas
		const ignoreSiema =
			["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(e.target.nodeName) !==
			-1;
		if (ignoreSiema) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();
		this.pointerDown = true;
		this.drag.startX = e.pageX;
	}

	mouseupHandler(e) {
		e.stopPropagation();
		this.pointerDown = false;
		this.selector.style.cursor = "-webkit-grab";
		this.enableTransition();
		if (this.drag.endX) {
			this.updateAfterDrag();
		}
		this.clearDrag();
	}

	mousemoveHandler(e) {
		e.preventDefault();
		if (this.pointerDown) {
			// if dragged element is a link
			// mark preventClick prop as a true
			// to detemine about browser redirection later on
			if (e.target.nodeName === "A") {
				this.drag.preventClick = true;
			}

			this.drag.endX = e.pageX;
			this.selector.style.cursor = "-webkit-grabbing";
			this.sliderFrame.style.webkitTransition = `all 0ms ${this.config.easing}`;
			this.sliderFrame.style.transition = `all 0ms ${this.config.easing}`;

			const currentSlide = this.config.loop
				? this.currentSlide + this.perPage
				: this.currentSlide;
			const currentOffset = currentSlide * (this.selectorWidth / this.perPage);
			const dragOffset = this.drag.endX - this.drag.startX;
			const offset = this.config.rtl
				? currentOffset + dragOffset
				: currentOffset - dragOffset;
			this.sliderFrame.style[this.transformProperty] = `translate3d(${(this
				.config.rtl
				? 1
				: -1) * offset}px, 0, 0)`;
		}
	}

	mouseenterHandler(e) {
		this.pauseAutoplay();
	}

	mouseleaveHandler(e) {
		if (this.pointerDown) {
			this.pointerDown = false;
			this.selector.style.cursor = "-webkit-grab";
			this.drag.endX = e.pageX;
			this.drag.preventClick = false;
			this.enableTransition();
			this.updateAfterDrag();
			this.clearDrag();
		}
		this.startAutoplay();
	}

	clickHandler(e) {
		if (this.drag.preventClick) {
			e.preventDefault();
		}
		this.drag.preventClick = false;
	}

	remove(index, callback) {
		if (index < 0 || index >= this.innerElements.length) {
			throw new Error("Item to remove doesn't exist 😭");
		}

		const lowerIndex = index < this.currentSlide;
		const lastItem = this.currentSlide + this.perPage - 1 === index;

		if (lowerIndex || lastItem) {
			this.currentSlide--;
		}

		this.innerElements.splice(index, 1);

		// build a frame and slide to a currentSlide
		this.buildSliderFrame();

		if (callback) {
			callback.call(this);
		}
	}

	insert(item, index, callback) {
		if (index < 0 || index > this.innerElements.length + 1) {
			throw new Error("Unable to inset it at this index 😭");
		}
		if (this.innerElements.indexOf(item) !== -1) {
			throw new Error("The same item in a carousel? Really? Nope 😭");
		}

		// Avoid shifting content
		const shouldItShift =
			index <= this.currentSlide > 0 && this.innerElements.length;
		this.currentSlide = shouldItShift
			? this.currentSlide + 1
			: this.currentSlide;

		this.innerElements.splice(index, 0, item);

		// build a frame and slide to a currentSlide
		this.buildSliderFrame();

		if (callback) {
			callback.call(this);
		}
	}

	prepend(item, callback) {
		this.insert(item, 0);
		if (callback) {
			callback.call(this);
		}
	}

	append(item, callback) {
		this.insert(item, this.innerElements.length + 1);
		if (callback) {
			callback.call(this);
		}
	}

	destroy(restoreMarkup = false, callback) {
		this.detachEvents();

		this.selector.style.cursor = "auto";

		if (restoreMarkup) {
			const slides = document.createDocumentFragment();
			for (let i = 0; i < this.innerElements.length; i++) {
				slides.appendChild(this.innerElements[i]);
			}
			this.selector.innerHTML = "";
			this.selector.appendChild(slides);
			this.selector.removeAttribute("style");
		}

		if (callback) {
			callback.call(this);
		}
	}
}

class RenderSocialWidget {
	constructor(options, $) {
		console.log(options);
		this.$ = $
		this.options = options;
		this.slider = null;
		this.timeout = null;
		this.options["widget_id"] = this.createId();
		this.container = $(
			'<div class="sw-instagram sw-instagram-box"><div class="sw-instagram-header"><div class="sw-instagram-header-title"></div></div><div class="sw-instagram-body"><div class="sw-instagram-row"></div></div></div>'
		);
		this.item_html = $(
			'<div class="sw-instagram-col"><a  data-id="" class="sw-instagram-item"><div class="sw-instagram-item-img" ></div><div class="sw-instagram-item-overlay"></div></a></div>'
		);
		this.row = this.container.find(".sw-instagram-row");
		this.instagram_icon =
			'<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>';
		this.renderHTML();

	}
	renderHTML() {
		var vm = this;
		var config = this.loadConfigForDevice()
		this.container
			.attr("id", this.options.widget_id)
			.find(".sw-instagram-header-title")
			.text(this.options.heading_title);
		
		var css = Object.assign(this.options.var_css, {
			"--sw-item-no-of-columns": config.item_no_of_columns
		});
		config.images.forEach(item => {
			var element = this.item_html.clone();
			element.find(".sw-instagram-item").attr({
				"data-id": item.id,
				href: item.permalink,
				target: this.options.on_image_click_target_link
			});
			element
				.find(".sw-instagram-item-img")
				.css("background-image", "url(" + item.media_url + ")");
			if (this.options.image_hover_effect == "bw_layout") {
				element.find(".sw-instagram-item").addClass("sw-instagram-default");
			}
			switch (this.options.image_hover_effect) {
				case "bw_layout":
					element.find(".sw-instagram-item").addClass("sw-instagram-default");
					break;
				case "instagram_icon":
					element.find(".sw-instagram-item").addClass("sw-instagram-default");
					element
						.find(".sw-instagram-item-overlay")
						.append(
							'<div class="sw-instagram-item-overlay-center-content"><div class="sw-instagram-icon">' +
							this.instagram_icon +
							"</div></div>"
						);
					break;
				case "icon_caption":
					element.find(".sw-instagram-item").addClass("sw-instagram-default");
					element
						.find(".sw-instagram-item-overlay")
						.append(
							'<div class="sw-instagram-item-overlay-center-content"><div class="sw-instagram-icon">' +
							this.instagram_icon +
							'</div><div class="sw-instagram-caption"> Demo caption </div></div>'
						);
					break;
				case "caption":
					let caption =
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis saepe molestias nobis officia itaque. Molestias qui facere, officiis beatae illum dolores natus sed odit a repellat blanditiis eaque ipsum incidunt?";
					element.find(".sw-instagram-item").addClass("sw-instagram-default");
					element
						.find(".sw-instagram-item-overlay")
						.append(
							'<div class="sw-instagram-item-overlay-content"><div class="sw-instagram-caption">' +
							caption +
							'</div><div class="sw-instagram-bottom-icon">' +
							this.instagram_icon +
							"</div></div>"
						);
					break;
				default:
					break;
			}
			this.row.append(element);
		});
		var root = this.container[0];
		for (const key in css) {
			root.style.setProperty(key, css[key]);
		}
		this.$(this.options.root)
			.append(this.container)
			.fadeIn(200);
		
		if ( config.display_layout == "slider") {
			this.row.addClass("sw-instagram-slider");
			this.slider = new SocialWidgetSlider({
				selector: this.row[0],
				duration: 500,
				easing: "ease-out",
				perPage: config.item_no_of_slider,
				startIndex: 0,
				draggable: true,
				loop: true,
				multipleDrag: true,
				threshold: 20,
				auto_play_slider: config.auto_play_slider,
				auto_play_duration: config.auto_play_duration * 1000,
				onInit: () => { },
				onChange: () => { }
			});
			var prev = $(
				'<div class="sw-instagram-nav nav-prev"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></div>'
			);
			var next = $(
				'<div class="sw-instagram-nav nav-next"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></div>'
			);
			prev.on("click", event => {
				event.preventDefault();
				this.slider.prev();
			});
			next.on("click", event => {
				event.preventDefault();
				this.slider.next();
			});
			this.row.parent().append(prev);
			this.row.parent().append(next);
			this.row.addClass("sw-instagram-slider");
		}
		if (this.options.on_image_click == "popup") {
			new SocialWidgetPopup(this.options, this.$);
		}
	}
	loadConfigForDevice(){
		if( this.isDeviceMobile ){
			return {
				"display_layout": this.options.mobile_display_layout,
				"item_no_of_rows": this.options.mobile_item_no_of_rows,
				"item_no_of_columns": this.options.mobile_item_no_of_columns,
				"item_no_of_slider" : this.options.mobile_item_no_of_slider,
				"auto_play_slider" : this.options.mobile_auto_play_slider,
				"auto_play_duration" : this.options.mobile_auto_play_duration,
				"images" : this.options.mobile_display_layout == 'grid' ? this.options.images : this.getNumberImage(this.options.mobile_item_no_of_rows * this.options.mobile_item_no_of_columns)
			}
		}else{
			return {
				"display_layout": this.options.display_layout,
				"item_no_of_rows": this.options.item_no_of_rows,
				"item_no_of_columns": this.options.item_no_of_columns,
				"item_no_of_slider" : this.options.item_no_of_slider, 
				"auto_play_slider" : this.options.auto_play_slider,
				"auto_play_duration" : this.options.auto_play_duration,
				"images" : this.options.display_layout == 'grid' ? this.options.images : this.getNumberImage(this.options.item_no_of_rows * this.options.item_no_of_columns)
			}
		}
	}
	getNumberImage(num){
		var result = []
		for (let i = 0; i < num ; i++) {
			result.push(this.options.images[i])
		}
		return result
	}
	createId() {
		var text = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (
			text() +
			text() +
			"" +
			text() +
			"" +
			text() +
			"" +
			text() +
			"" +
			text() +
			text() +
			text()
		);
	}

}
class SocialWidgetApp {
	constructor($) {
		this.$ = $
		this.init()
		this.injectStyle()
	}
	init() {
		var shop_domain = this.$(SOCIAL_WIDGET_DOMAIN).val();
		var widget_id = this.$(SOCIAL_WIDGET_ID).data("widget-id");
		this.getData({
			shop_domain,
			widget_id
		});
	}
	isDeviceMobile = function () {
		return true;
	};
	getData(params) {
		console.log("getData");
		console.log(params);
		this.$.get(SOCIAL_WIDGET_API + "/store/widget", params).done(res => {
			let { status = false, data } = res;
			if (status) {
				new RenderSocialWidget(
					Object.assign(data, {
						root: SOCIAL_WIDGET_ID
					}),
					this.$
				);
			}
		});
	}
	injectStyle() {
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = SOCIAL_WIDGET_STYLE;
		document.getElementsByTagName("HEAD")[0].appendChild(link);
	}
}

const socialWidgetLoadScript = function (url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {
		script.onload = function () {
			callback();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
};

const loadSocialWidget = function (widget_jquery) {
	if (widget_jquery(SOCIAL_WIDGET_ID).length) {
		new SocialWidgetApp(widget_jquery);
	}
};

if (typeof jQuery === "undefined" || parseFloat(jQuery.fn.jquery) < 1.7) {
	socialWidgetLoadScript(
		"https://salesbox.fireapps.io/libs/jquery-3.1.1.min.js",
		function () {
			let jQuery191 = jQuery.noConflict(true);
			loadSocialWidget(jQuery191);
		}
	);
} else {
	loadSocialWidget(jQuery);
}
