export default class Slider {
  config;
  wrapper;
  items;
  itemWidth;
  posX1 = 0;
  posX2 = 0;
  posInitial;
  posFinal;
  index = 0;
  allowShift = true;
  autoPlayInterval;

  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    this.initParams();
    this.initListeners();
    this.initInterval();
  }

  initParams() {
    this.body = document.querySelector(this.config.body);
    this.wrapper = this.body.querySelector(this.config.wrapper);
    this.items = this.body.querySelectorAll(this.config.item);
    this.prevButton = document.querySelector(this.config.prevButton);
    this.nextButton = document.querySelector(this.config.nextButton);
    this.progress = document.querySelector(this.config.progress);
    this.itemWidth = 300;

    this.wrapper.append(...Array.from(this.items).map(item => item.cloneNode(true)));
    this.wrapper.prepend(...Array.from(this.items).map(item => item.cloneNode(true)));
  }

  initListeners() {
    this.wrapper.onmousedown = (e) => this.dragStart(e);
    
    this.wrapper.addEventListener('touchstart', (e) => this.dragStart(e));
    this.wrapper.addEventListener('touchend', (e) => this.dragEnd(e));
    this.wrapper.addEventListener('touchmove', (e) => this.dragAction(e));
    
    this.prevButton.addEventListener('click', () => this.shiftSlide(-1));
    this.nextButton.addEventListener('click', () => this.shiftSlide(1));
    
    this.wrapper.addEventListener('transitionend', () => this.checkIndex());
  }

  initInterval() {
    this.progress.classList.add('active');

    this.autoPlayInterval = setInterval(() => {
      this.shiftSlide(1);
    }, this.config.autoPlayInterval)
  }

  resetInterval() {
    clearInterval(this.autoPlayInterval);
    this.progress.classList.remove('active');
    this.progress.animation = 'none';
    this.progress.offsetHeight;
  }

  dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    this.posInitial = this.wrapper.offsetLeft;
    this.resetInterval();
    
    if (e.type == 'touchstart') {
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX1 = e.clientX;
      document.onmouseup = (e) => this.dragEnd(e);
      document.onmousemove = (e) => this.dragAction(e);
    }
  }

  dragAction(e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      this.posX2 = this.posX1 - e.touches[0].clientX;
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX2 = this.posX1 - e.clientX;
      this.posX1 = e.clientX;
    }
    this.wrapper.style.left = (this.wrapper.offsetLeft - this.posX2) + "px";
  }
  
  dragEnd(e) {
    this.posFinal = this.wrapper.offsetLeft;
    if (this.posFinal - this.posInitial < -this.config.threshold) {
      this.shiftSlide(1, 'drag');
    } else if (this.posFinal - this.posInitial > this.config.threshold) {
      this.shiftSlide(-1, 'drag');
    } else {
      this.initInterval();
      this.wrapper.style.left = (this.posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  shiftSlide(dir, action) {
    this.wrapper.classList.add('shifting');
    if (this.allowShift) {
      if (!action) { this.posInitial = this.wrapper.offsetLeft; }

      if (dir == 1) {
        this.wrapper.style.left = (this.posInitial - this.itemWidth) + "px";
        this.index++;      
      } else if (dir == -1) {
        this.wrapper.style.left = (this.posInitial + this.itemWidth) + "px";
        this.index--;      
      }
    };
    this.resetInterval();
    this.initInterval();
    
    this.allowShift = false;
  }
    
  checkIndex() {
    this.wrapper.classList.remove('shifting');
    const itemsLength = this.items.length;
    if (this.index == -1) {
      this.wrapper.style.left = -(itemsLength * this.itemWidth) + "px";
      this.index = itemsLength - 1;
    }

    if (this.index == itemsLength) {
      this.wrapper.style.left = -(1 * this.itemWidth) + "px";
      this.index = 0;
    }
    
    this.allowShift = true;
  }
}