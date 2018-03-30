/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sendToServer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/createStore.js":
/*!****************************!*\
  !*** ./src/createStore.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((_reducer, _state) => {\n\tif(!_reducer || !typeof _reducer === 'function') throw new Error('reducer должен быть и должен быть функцией!');\n\tif(!typeof _state === 'object') throw new Error('state должен быть объектом!');\n\n\tconst reducer = _reducer;\n\t\n\tlet state = _state || {};\n\tlet eventListeners = [];\n\t\n\tconst getState = () => state;\n\n\tconst addEventListener = eL => { eventListeners.push(eL); }\n\n\tconst dispatch = action => {\n\t\tif(!action || !(typeof action === 'object')) return;\n\t\tstate = reducer(state, action);\n\t\teventListeners.forEach(eL => { eL(); })\n\t};\n\n\treturn {\n\t\tgetState,\n\t\taddEventListener,\n\t\tdispatch\n\t};\n});\n\n\n\n//# sourceURL=webpack:///./src/createStore.js?");

/***/ }),

/***/ "./src/reducer.js":
/*!************************!*\
  !*** ./src/reducer.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((state, action) => {\n\tlet newState = state;\n\tswitch(action.type){\n\t\tcase 'SEND_DATA':\n\t\tnewState.sentData = newState.sentData ? [...newState.sentData, action.payload] : [action.payload];\n\t\tnewState.response = `Данные \"${action.payload}\" успешно отправлены`;\n\t\treturn newState;\n\t}\n});\n\n//# sourceURL=webpack:///./src/reducer.js?");

/***/ }),

/***/ "./src/sendToServer.js":
/*!*****************************!*\
  !*** ./src/sendToServer.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createStore */ \"./src/createStore.js\");\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducer */ \"./src/reducer.js\");\n\n\n\nconst store = Object(_createStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_reducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\nwindow.onload = function() {\n\tdocument.querySelector('.view-stub__apply').addEventListener('click', function() { sendToServer(); });\n\tstore.addEventListener(render);\n}\n\nfunction sendToServer() {\n\tconst input = document.querySelector('.view-stub__input').value;\n\tstore.dispatch({ type: 'SEND_DATA', payload: input });\n}\n\nconst render = () => {\n\tconst state = store.getState();\n\tconst logList = document.querySelector('.log');\n\n\tdocument.querySelector('.view-stub__input').value = '';\n\tdocument.querySelector('.view-stub__label').innerText = state.response;\n\n\t// Да, дорого, но по условию мы обходимся без ShadowDOM\n\twhile(logList.firstChild) {\n    \tlogList.removeChild(logList.firstChild);\n\t}\n\n\tstate.sentData.forEach(data => {\n\t\tconst node = document.createElement(\"li\");\n\t\tconst text = document.createTextNode(data);\n\t\tnode.appendChild(text);\n\t\tlogList.appendChild(node);\n\t})\n}\n\n//# sourceURL=webpack:///./src/sendToServer.js?");

/***/ })

/******/ });