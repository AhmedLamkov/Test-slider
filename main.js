/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Slider.js":
/*!***********************!*\
  !*** ./src/Slider.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Slider)\n/* harmony export */ });\nclass Slider {\r\n\tconfig;\r\n\twrapper;\r\n\titems;\r\n\titemWidth;\r\n\tposX1 = 0;\r\n\tposX2 = 0;\r\n\tposInitial;\r\n\tposFinal;\r\n\tindex = 0;\r\n\tallowShift = true;\r\n\tautoPlayInterval;\r\n\r\n\tconstructor(config) {\r\n\t\tthis.config = config;\r\n\t\tthis.init();\r\n\t}\r\n\r\n\tinit() {\r\n\t\tthis.initParams();\r\n\t\tthis.initListeners();\r\n\t\tthis.initInterval();\r\n\t}\r\n\r\n\tinitParams() {\r\n\t\tthis.body = document.querySelector(this.config.body);\r\n\t\tthis.wrapper = this.body.querySelector(this.config.wrapper);\r\n\t\tthis.items = this.body.querySelectorAll(this.config.item);\r\n\t\tthis.prevButton = document.querySelector(this.config.prevButton);\r\n\t\tthis.nextButton = document.querySelector(this.config.nextButton);\r\n\t\tthis.progress = document.querySelector(this.config.progress);\r\n\t\tthis.checkBreakpoints();\r\n\r\n\t\tthis.wrapper.append(\r\n\t\t\t...Array.from(this.items).map((item) => item.cloneNode(true))\r\n\t\t);\r\n\t\tthis.wrapper.prepend(\r\n\t\t\t...Array.from(this.items).map((item) => item.cloneNode(true))\r\n\t\t);\r\n\t}\r\n\r\n\tinitListeners() {\r\n\t\tthis.wrapper.onmousedown = (e) => this.dragStart(e);\r\n\r\n\t\tthis.wrapper.addEventListener(\"touchstart\", (e) => this.dragStart(e));\r\n\t\tthis.wrapper.addEventListener(\"touchend\", (e) => this.dragEnd(e));\r\n\t\tthis.wrapper.addEventListener(\"touchmove\", (e) => this.dragAction(e));\r\n\r\n\t\tthis.prevButton.addEventListener(\"click\", () => this.shiftSlide(-1));\r\n\t\tthis.nextButton.addEventListener(\"click\", () => this.shiftSlide(1));\r\n\r\n\t\tthis.wrapper.addEventListener(\"transitionend\", () => this.checkIndex());\r\n\r\n\t\twindow.addEventListener(\"resize\", () => this.checkBreakpoints());\r\n\t}\r\n\r\n\tinitInterval() {\r\n\t\tthis.progress.classList.add(\"active\");\r\n\r\n\t\tthis.autoPlayInterval = setInterval(() => {\r\n\t\t\tthis.shiftSlide(1);\r\n\t\t}, this.config.autoPlayInterval);\r\n\t}\r\n\r\n\tresetInterval() {\r\n\t\tclearInterval(this.autoPlayInterval);\r\n\t\tthis.progress.classList.remove(\"active\");\r\n\t\tthis.progress.animation = \"none\";\r\n\t\tthis.progress.offsetHeight;\r\n\t}\r\n\r\n\tdragStart(e) {\r\n\t\te = e || window.event;\r\n\t\te.preventDefault();\r\n\t\tthis.posInitial = this.wrapper.offsetLeft;\r\n\t\tthis.resetInterval();\r\n\r\n\t\tif (e.type == \"touchstart\") {\r\n\t\t\tthis.posX1 = e.touches[0].clientX;\r\n\t\t} else {\r\n\t\t\tthis.posX1 = e.clientX;\r\n\t\t\tdocument.onmouseup = (e) => this.dragEnd(e);\r\n\t\t\tdocument.onmousemove = (e) => this.dragAction(e);\r\n\t\t}\r\n\t}\r\n\r\n\tdragAction(e) {\r\n\t\te = e || window.event;\r\n\r\n\t\tif (e.type == \"touchmove\") {\r\n\t\t\tthis.posX2 = this.posX1 - e.touches[0].clientX;\r\n\t\t\tthis.posX1 = e.touches[0].clientX;\r\n\t\t} else {\r\n\t\t\tthis.posX2 = this.posX1 - e.clientX;\r\n\t\t\tthis.posX1 = e.clientX;\r\n\t\t}\r\n\t\tthis.wrapper.style.left = this.wrapper.offsetLeft - this.posX2 + \"px\";\r\n\t}\r\n\r\n\tdragEnd(e) {\r\n\t\tthis.posFinal = this.wrapper.offsetLeft;\r\n\t\tif (this.posFinal - this.posInitial < -this.config.threshold) {\r\n\t\t\tthis.shiftSlide(1, \"drag\");\r\n\t\t} else if (this.posFinal - this.posInitial > this.config.threshold) {\r\n\t\t\tthis.shiftSlide(-1, \"drag\");\r\n\t\t} else {\r\n\t\t\tthis.initInterval();\r\n\t\t\tthis.wrapper.style.left = this.posInitial + \"px\";\r\n\t\t}\r\n\r\n\t\tdocument.onmouseup = null;\r\n\t\tdocument.onmousemove = null;\r\n\t}\r\n\r\n\tshiftSlide(dir, action) {\r\n\t\tthis.wrapper.classList.add(\"shifting\");\r\n\t\tif (this.allowShift) {\r\n\t\t\tif (!action) {\r\n\t\t\t\tthis.posInitial = this.wrapper.offsetLeft;\r\n\t\t\t}\r\n\t\t\tif (dir == 1) {\r\n\t\t\t\tthis.wrapper.style.left = this.posInitial - this.itemWidth + \"px\";\r\n\t\t\t\tthis.index++;\r\n\t\t\t} else if (dir == -1) {\r\n\t\t\t\tthis.wrapper.style.left = this.posInitial + this.itemWidth + \"px\";\r\n\t\t\t\tthis.index--;\r\n\t\t\t}\r\n\t\t}\r\n\t\tthis.resetInterval();\r\n\t\tthis.initInterval();\r\n\r\n\t\tthis.allowShift = false;\r\n\t}\r\n\r\n\tcheckIndex() {\r\n\t\tthis.wrapper.classList.remove(\"shifting\");\r\n\t\tconst itemsLength = this.items.length;\r\n\t\tif (this.index == -1) {\r\n\t\t\tthis.wrapper.style.left = -(itemsLength * this.itemWidth) + \"px\";\r\n\t\t\tthis.index = itemsLength - 1;\r\n\t\t}\r\n\r\n\t\tif (this.index == itemsLength) {\r\n\t\t\tthis.wrapper.style.left = -(1 * this.itemWidth) + \"px\";\r\n\t\t\tthis.index = 0;\r\n\t\t}\r\n\r\n\t\tthis.allowShift = true;\r\n\t}\r\n\r\n\tcheckBreakpoints() {\r\n\t\tconst oldWidth = this.itemWidth;\r\n\t\tlet hasChanged;\r\n\t\tObject.keys(this.config.breakpoints).forEach((key) => {\r\n\t\t\tif (parseInt(key) >= window.innerWidth) {\r\n\t\t\t\tconst breakpoint = this.config.breakpoints[key];\r\n\t\t\t\tthis.itemWidth = breakpoint.itemWidth;\r\n\t\t\t\tthis.threshold = breakpoint.threshold;\r\n\t\t\t\thasChanged = true;\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\tif (!hasChanged) {\r\n\t\t\tthis.itemWidth = this.config.itemWidth;\r\n\t\t}\r\n\r\n\t\tthis.wrapper.style.left = -(this.itemWidth * this.index) + \"px\";\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://stat4market/./src/Slider.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider */ \"./src/Slider.js\");\n__webpack_require__.e(/*! import() */ \"src_scss_main_scss\").then(__webpack_require__.bind(__webpack_require__, /*! ./scss/main.scss */ \"./src/scss/main.scss\"));\r\n\r\n\r\nconst slider = new _Slider__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n\tbody: \".slider__body\",\r\n\twrapper: \".slider__body-wrapper\",\r\n\titem: \".slider__item\",\r\n\tspaceBetween: 40,\r\n\titemWidth: 300,\r\n\tthreshold: 100,\r\n\tprevButton: \"#previous\",\r\n\tnextButton: \"#next\",\r\n\tprogress: \"#progress-completed\",\r\n\tautoPlayInterval: 4000,\r\n\tbreakpoints: {\r\n\t\t576: {\r\n\t\t\titemWidth: 260,\r\n\t\t\tthreshold: 40,\r\n\t\t},\r\n\t},\r\n});\r\n\n\n//# sourceURL=webpack://stat4market/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "stat4market:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkstat4market"] = self["webpackChunkstat4market"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;