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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/jeffs_frontend_lib/dist/src/computed.js":
/*!**************************************************************!*\
  !*** ./node_modules/jeffs_frontend_lib/dist/src/computed.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar computedHelper = /** @class */ (function () {\n    function computedHelper(_a) {\n        var computedArgs = _a.computedArgs, nnDependencies = _a.nnDependencies, computedFns = _a.computedFns, nnInstance = _a.nnInstance;\n        this.computedArgs = computedArgs;\n        this.nnInstance = nnInstance;\n        this.computedFns = computedFns;\n        this.nnDependencies = nnDependencies;\n        this.initComputed();\n    }\n    computedHelper.prototype.initComputed = function () {\n        var _this = this;\n        Object.keys(this.computedArgs).forEach(function (computedPropName) {\n            _this.initDependency(computedPropName, _this.computedArgs[computedPropName].dependencies);\n            _this.computedFns[computedPropName] = _this.computedArgs[computedPropName].fn.bind(_this.nnInstance);\n        });\n        var toResolve = new Set(Object.keys(this.computedArgs));\n        var tries = 0;\n        var maxTries = toResolve.size;\n        while (tries < maxTries) {\n            var arr = Array.from(toResolve);\n            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {\n                var computedPropName = arr_1[_i];\n                if (this.resolveDependency(computedPropName)) {\n                    toResolve.delete(computedPropName);\n                }\n            }\n            if (!toResolve.size)\n                return;\n            tries++;\n        }\n        throw \"unable to resolve computed dependencies\";\n    };\n    computedHelper.prototype.initDependency = function (name, propDependencies) {\n        var _this = this;\n        this.computedFns[name] = this.computedArgs[name].fn.bind(this.nnInstance);\n        propDependencies.forEach(function (propDependency) {\n            if (propDependency in _this.nnDependencies) {\n                _this.nnDependencies[propDependency].add(name);\n            }\n            else {\n                _this.nnDependencies[propDependency] = new Set([name]);\n            }\n        });\n    };\n    computedHelper.prototype.allDependenciesResolved = function (name) {\n        var _this = this;\n        var currDependencies = this.computedArgs[name].dependencies;\n        return Array.from(currDependencies).every(function (dependency) { return _this.nnInstance.state[dependency] !== undefined; });\n    };\n    computedHelper.prototype.resolveDependency = function (name) {\n        if (this.allDependenciesResolved(name)) {\n            this.nnInstance.makeReactiveData(name, this.computedFns[name]());\n            return true;\n        }\n        else\n            return false;\n    };\n    computedHelper.prototype.getUpdateComputedCallback = function (key) {\n        var _this = this;\n        return function () {\n            if (key in _this.nnInstance.dependencies) {\n                Array.from(_this.nnInstance.dependencies[key]).forEach(function (computedDependent) {\n                    _this.nnInstance.state[computedDependent] = _this.computedFns[computedDependent]();\n                });\n            }\n        };\n    };\n    return computedHelper;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (computedHelper);\n\n\n//# sourceURL=webpack:///./node_modules/jeffs_frontend_lib/dist/src/computed.js?");

/***/ }),

/***/ "./node_modules/jeffs_frontend_lib/dist/src/construct.js":
/*!***************************************************************!*\
  !*** ./node_modules/jeffs_frontend_lib/dist/src/construct.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _computed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computed */ \"./node_modules/jeffs_frontend_lib/dist/src/computed.js\");\n/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/dom */ \"./node_modules/jeffs_frontend_lib/dist/src/dom/dom.js\");\n/* harmony import */ var _watch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./watch */ \"./node_modules/jeffs_frontend_lib/dist/src/watch.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data */ \"./node_modules/jeffs_frontend_lib/dist/src/data.js\");\n/* harmony import */ var _dom_template_for__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom/template_for */ \"./node_modules/jeffs_frontend_lib/dist/src/dom/template_for.js\");\n\n\n\n\n\nvar nn = /** @class */ (function () {\n    function nn(_a) {\n        var el = _a.el, data = _a.data, computed = _a.computed, watch = _a.watch;\n        this.data = {};\n        this.state = {};\n        this.dependencies = {};\n        this.computedFns = {};\n        this.dependentNodes = {};\n        this.modelBindings = {};\n        this.dynamicHTMLDependencies = {};\n        if (el) {\n            this.domHelper = new _dom_dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n                nnInstance: this,\n                el: el,\n            });\n            this.domHelper.attach();\n            this.domHelper.initReactiveNodes();\n        }\n        if (data)\n            this.initData(data);\n        if (computed) {\n            this.computedHelper = new _computed__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n                computedArgs: computed,\n                nnInstance: this,\n                nnDependencies: this.dependencies,\n                computedFns: this.computedFns,\n            });\n        }\n        if (watch) {\n            this.watchHelper = new _watch__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n                watchArgs: watch,\n                nnInstance: this,\n            });\n        }\n        if (el) {\n            this.domHelper.initModelNodes();\n            this.templateHelper = new _dom_template_for__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n                nnInstance: this,\n            });\n            this.templateHelper.resolveNNFors();\n        }\n    }\n    nn.prototype.initData = function (data) {\n        var _this = this;\n        Object.keys(data).forEach(function (key) {\n            _this.makeReactiveData(key, data[key]);\n        });\n    };\n    nn.prototype.getDataChangedCallback = function (key) {\n        var _this = this;\n        return function () {\n            if (_this.computedHelper)\n                _this.computedHelper.getUpdateComputedCallback(key)();\n            if (_this.domHelper)\n                _this.domHelper.getDomUpdateCallback(key)();\n            if (_this.watchHelper)\n                _this.watchHelper.getRunWatchCallback(key)();\n        };\n    };\n    nn.prototype.setState = function (propChain, value) {\n        var curr = this.state;\n        var stateKey = propChain[0];\n        for (var i = 0; i < propChain.length - 1; i++) {\n            curr = curr[propChain[i]];\n        }\n        curr[propChain[propChain.length - 1]] = value;\n        this.state[stateKey] = this.state[stateKey];\n    };\n    nn.prototype.makeReactiveData = function (key, value) {\n        var rData = new _data__WEBPACK_IMPORTED_MODULE_3__[\"reactiveData\"]({\n            initialData: value,\n            dataChangedCallback: this.getDataChangedCallback(key),\n        });\n        Object.defineProperty(this.state, key, {\n            enumerable: true,\n            get: function () { return rData.getData(); },\n            set: function (val) { return rData.setData(val); },\n        });\n        rData.setData(value);\n    };\n    return nn;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (nn);\n\n\n//# sourceURL=webpack:///./node_modules/jeffs_frontend_lib/dist/src/construct.js?");

/***/ }),

/***/ "./node_modules/jeffs_frontend_lib/dist/src/data.js":
/*!**********************************************************!*\
  !*** ./node_modules/jeffs_frontend_lib/dist/src/data.js ***!
  \**********************************************************/
/*! exports provided: isObject, reactiveData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isObject\", function() { return isObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reactiveData\", function() { return reactiveData; });\nvar __spreadArrays = (undefined && undefined.__spreadArrays) || function () {\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\n            r[k] = a[j];\n    return r;\n};\nfunction isObject(obj) {\n    return obj != null && obj.constructor.name === \"Object\";\n}\nvar reactiveData = /** @class */ (function () {\n    function reactiveData(_a) {\n        var initialData = _a.initialData, dataChangedCallback = _a.dataChangedCallback;\n        this.dataChangedCallback = dataChangedCallback;\n        this.data = initialData;\n        if (Array.isArray(initialData)) {\n            this.wrapArrayMethods();\n        }\n    }\n    reactiveData.prototype.wrapArrayMethods = function () {\n        var _this = this;\n        var dcCallbackClosure = this.dataChangedCallback;\n        Object.defineProperty(this.data, \"__nn__wrapped\", {\n            enumerable: false,\n            value: true,\n        });\n        [\"sort\", \"pop\", \"push\", \"shift\", \"unshift\"].forEach(function (pMethodName) {\n            //@ts-ignore\n            var originalMethod = Array.prototype[pMethodName];\n            Object.defineProperty(_this.data, pMethodName, {\n                enumerable: false,\n                configurable: false,\n                writable: false,\n                value: function () {\n                    var args = [];\n                    for (var _i = 0; _i < arguments.length; _i++) {\n                        args[_i] = arguments[_i];\n                    }\n                    var result = originalMethod.apply(this, args);\n                    dcCallbackClosure();\n                    return result;\n                },\n            });\n        });\n    };\n    reactiveData.prototype.wrapObjectProps = function () {\n        var _this = this;\n        Object.defineProperty(this.data, \"__nn__wrapped\", {\n            enumerable: false,\n            value: true,\n        });\n        Object.keys(this.data).forEach(function (key) {\n            var valClosure = _this.data[key];\n            Object.defineProperty(_this.data, key, {\n                get: function () { return valClosure; },\n                set: function (val) {\n                    valClosure = val;\n                    _this.dataChangedCallback();\n                },\n            });\n        });\n    };\n    reactiveData.prototype.getData = function () {\n        return this.data;\n    };\n    reactiveData.prototype.setData = function (value) {\n        var prev = this.data;\n        this.data = value;\n        if (Array.isArray(value) && value !== prev) {\n            //@ts-ignore\n            if (value.__nn__wrapped) {\n                this.data = __spreadArrays(this.data);\n            }\n            this.wrapArrayMethods();\n        }\n        else if (isObject(value))\n            this.wrapObjectProps();\n        if (this.dataChangedCallback)\n            this.dataChangedCallback();\n    };\n    return reactiveData;\n}());\n\n\n\n//# sourceURL=webpack:///./node_modules/jeffs_frontend_lib/dist/src/data.js?");

/***/ }),

/***/ "./node_modules/jeffs_frontend_lib/dist/src/dom/dom.js":
/*!*************************************************************!*\
  !*** ./node_modules/jeffs_frontend_lib/dist/src/dom/dom.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar domHelper = /** @class */ (function () {\n    function domHelper(_a) {\n        var nnInstance = _a.nnInstance, el = _a.el;\n        this.nnInstance = nnInstance;\n        this.el = el;\n    }\n    domHelper.prototype.attach = function () {\n        var nnInstance = this.nnInstance;\n        nnInstance.$el = document.querySelector(this.el);\n        if (!nnInstance.$el) {\n            throw \"cannot attach to nonexistent element\";\n        }\n        nnInstance.$el.__nn__ = nnInstance;\n    };\n    domHelper.prototype.getDomUpdateCallback = function (key) {\n        var _this = this;\n        return function () {\n            var nnInstance = _this.nnInstance;\n            if (key in nnInstance.dependentNodes) {\n                nnInstance.dependentNodes[key].forEach(function (node) { return (node.innerHTML = nnInstance.state[key]); });\n            }\n            if (key in nnInstance.modelBindings) {\n                nnInstance.modelBindings[key].forEach(function (node) { return (node.value = nnInstance.state[key]); });\n            }\n            if (key in nnInstance.dynamicHTMLDependencies) {\n                Array.from(nnInstance.dynamicHTMLDependencies[key]).forEach(function (cb) {\n                    return cb();\n                });\n            }\n        };\n    };\n    domHelper.prototype.initReactiveNodes = function () {\n        var nnInstance = this.nnInstance;\n        var reactiveNodes = nnInstance.$el.querySelectorAll(\"*[nn-txt]\");\n        reactiveNodes.forEach(function (node) {\n            var reactingTo = node.getAttribute(\"nn-txt\");\n            if (!nnInstance.dependentNodes[reactingTo])\n                nnInstance.dependentNodes[reactingTo] = [node];\n            else\n                nnInstance.dependentNodes[reactingTo].push(node);\n        });\n    };\n    domHelper.prototype.initModelNodes = function () {\n        var _this = this;\n        var modelNodes = this.nnInstance.$el.querySelectorAll(\"*[nn-model]\");\n        modelNodes.forEach(function (node) {\n            var bound2 = node.getAttribute(\"nn-model\");\n            if (!_this.nnInstance.modelBindings[bound2])\n                _this.nnInstance.modelBindings[bound2] = [node];\n            else\n                _this.nnInstance.modelBindings[bound2].push(node);\n            node.value = _this.nnInstance.state[bound2];\n            node.oninput = function () {\n                _this.nnInstance.state[bound2] = node.value;\n            };\n        });\n    };\n    return domHelper;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (domHelper);\n\n\n//# sourceURL=webpack:///./node_modules/jeffs_frontend_lib/dist/src/dom/dom.js?");

/***/ }),

/***/ "./node_modules/jeffs_frontend_lib/dist/src/dom/template_for.js":
/*!**********************************************************************!*\
  !*** ./node_modules/jeffs_frontend_lib/dist/src/dom/template_for.js ***!
  \**********************************************************************/
/*! exports provided: inRegex, getBaseStateReference, getStateData, resolveFor, default, replaceNodeWithNodeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"inRegex\", function() { return inRegex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBaseStateReference\", function() { return getBaseStateReference; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStateData\", function() { return getStateData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resolveFor\", function() { return resolveFor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"replaceNodeWithNodeList\", function() { return replaceNodeWithNodeList; });\n/* harmony import */ var _template_for_resolve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template_for_resolve */ \"./node_modules/jeffs_frontend_lib/dist/src/dom/template_for_resolve.js\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nvar inRegex = /^(.*) in (.*)/;\nfunction getBaseStateReference(expr) {\n    return /^.* in (\\w*)/.exec(expr)[1];\n}\nfunction getStateData(state, capGroupTwo) {\n    var propChain = capGroupTwo.split(\".\");\n    var curr = state;\n    propChain.forEach(function (prop) {\n        curr = curr[prop];\n    });\n    return curr;\n}\nfunction resolveFor(state, expr, referenceNode, scopeVars) {\n    if (scopeVars === void 0) { scopeVars = {}; }\n    var initialRenderDone = false;\n    var templateRoot = document.createElement(\"template\");\n    var currLevelNodes;\n    var nodeArrayValMap = new Map();\n    var valRenderCallbackMap = new Map();\n    var nodeToForChildren = new Map();\n    referenceNode.removeAttribute(\"nn-for\");\n    var render = function () {\n        var lookup = __assign(__assign({}, state), scopeVars);\n        if (!inRegex.test(expr)) {\n            referenceNode.innerHTML = getStateData(lookup, expr);\n            initialRenderDone = true;\n        }\n        else {\n            var _a = inRegex.exec(expr), _ = _a[0], iterName = _a[1], inArrayName = _a[2];\n            var referencedArray = lookup[inArrayName];\n            if (currLevelNodes) {\n                currLevelNodes.forEach(function (nodeInfo) { return nodeInfo.node.remove(); });\n            }\n            currLevelNodes = Object(_template_for_resolve__WEBPACK_IMPORTED_MODULE_0__[\"getCurrLevelNodes\"])({\n                nodeArrayValMap: nodeArrayValMap,\n                referencedArray: referencedArray,\n                scopeVars: scopeVars,\n                iterName: iterName,\n                referenceNode: referenceNode,\n            });\n            currLevelNodes.forEach(function (_a) {\n                var node = _a.node, scope = _a.scope;\n                Object(_template_for_resolve__WEBPACK_IMPORTED_MODULE_0__[\"resolveChildFor\"])({\n                    node: node,\n                    scope: scope,\n                    nodeToForChildren: nodeToForChildren,\n                    valRenderCallbackMap: valRenderCallbackMap,\n                    state: state,\n                });\n            });\n            var resolvedNodes = currLevelNodes.map(function (nodeData) { return nodeData.node; });\n            if (!initialRenderDone) {\n                referenceNode.replaceWith(templateRoot);\n            }\n            replaceNodeWithNodeList(templateRoot, resolvedNodes);\n            initialRenderDone = true;\n        }\n    };\n    render();\n    return render;\n}\nvar templateHelper = /** @class */ (function () {\n    function templateHelper(_a) {\n        var nnInstance = _a.nnInstance;\n        this.nnInstance = nnInstance;\n    }\n    templateHelper.prototype.resolveNNFors = function (currNode) {\n        var _this = this;\n        if (currNode === void 0) { currNode = this.nnInstance.$el; }\n        var forNodes = Object(_template_for_resolve__WEBPACK_IMPORTED_MODULE_0__[\"getNNForsOneLvl\"])(currNode);\n        forNodes.forEach(function (node) {\n            var expr = node.getAttribute(\"nn-for\");\n            var cb = resolveFor(_this.nnInstance.state, expr, node);\n            var baseStateReferenced = getBaseStateReference(expr);\n            var deps = _this.nnInstance.dynamicHTMLDependencies;\n            if (baseStateReferenced in deps)\n                deps[baseStateReferenced].add(cb);\n            else\n                deps[baseStateReferenced] = new Set([cb]);\n        });\n    };\n    return templateHelper;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (templateHelper);\nfunction replaceNodeWithNodeList(nodeToReplace, nodeList) {\n    var prev;\n    nodeList.forEach(function (newNode) {\n        nodeToReplace.parentNode.insertBefore(newNode, prev ? prev.nextSibling : nodeToReplace.nextSibling);\n        prev = newNode;\n    });\n}\n\n\n//# sourceURL=webpack:///./node_modules/jeffs_frontend_lib/dist/src/dom/template_for.js?");

/***/ }),

/***/ "./node_modules/jeffs_frontend_lib/dist/src/dom/template_for_resolve.js":
/*!******************************************************************************!*\
  !*** ./node_modules/jeffs_frontend_lib/dist/src/dom/template_for_resolve.js ***!
  \******************************************************************************/
/*! exports provided: getCurrLevelNodes, resolveChildFor, getNNForsOneLvl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCurrLevelNodes\", function() { return getCurrLevelNodes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resolveChildFor\", function() { return resolveChildFor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getNNForsOneLvl\", function() { return getNNForsOneLvl; });\n/* harmony import */ var _template_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template_for */ \"./node_modules/jeffs_frontend_lib/dist/src/dom/template_for.js\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nfunction getCurrLevelNodes(_a) {\n    var nodeArrayValMap = _a.nodeArrayValMap, referencedArray = _a.referencedArray, scopeVars = _a.scopeVars, iterName = _a.iterName, referenceNode = _a.referenceNode;\n    var used = new Set();\n    return referencedArray.map(function (el) {\n        var _a;\n        if (nodeArrayValMap.has(el) && !used.has(el)) {\n            used.add(el);\n            return nodeArrayValMap.get(el);\n        }\n        var currLevelNodeInfo = {\n            node: referenceNode.cloneNode(true),\n            scope: __assign(__assign({}, scopeVars), (_a = {}, _a[iterName] = el, _a)),\n        };\n        nodeArrayValMap.set(el, currLevelNodeInfo);\n        used.add(el);\n        return currLevelNodeInfo;\n    });\n}\nfunction resolveChildFor(_a) {\n    var node = _a.node, scope = _a.scope, nodeToForChildren = _a.nodeToForChildren, valRenderCallbackMap = _a.valRenderCallbackMap, state = _a.state;\n    var currNodeForChildren;\n    if (nodeToForChildren.get(node))\n        currNodeForChildren = nodeToForChildren.get(node);\n    else {\n        currNodeForChildren = getNNForsOneLvl(node);\n        nodeToForChildren.set(node, currNodeForChildren);\n    }\n    currNodeForChildren.forEach(function (childForNode) {\n        if (valRenderCallbackMap.has(childForNode)) {\n            valRenderCallbackMap.get(childForNode)();\n        }\n        else\n            valRenderCallbackMap.set(childForNode, Object(_template_for__WEBPACK_IMPORTED_MODULE_0__[\"resolveFor\"])(state, childForNode.getAttribute(\"nn-for\"), childForNode, scope));\n    });\n}\nfunction getNNForsOneLvl(parentNode) {\n    var allNNFors = parentNode.querySelectorAll(\"*[nn-for]\");\n    var invalidParents = [];\n    // qs should be depth first preorder\n    return Array.from(allNNFors).filter(function (el) {\n        var returnVal = !invalidParents.some(function (parent) {\n            return parent.contains(el);\n        });\n        invalidParents.push(el);\n        return returnVal;\n    });\n}\n\n\n//# sourceURL=webpack:///./node_modules/jeffs_frontend_lib/dist/src/dom/template_for_resolve.js?");

/***/ }),

/***/ "./node_modules/jeffs_frontend_lib/dist/src/watch.js":
/*!***********************************************************!*\
  !*** ./node_modules/jeffs_frontend_lib/dist/src/watch.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar watchHelper = /** @class */ (function () {\n    function watchHelper(_a) {\n        var nnInstance = _a.nnInstance, watchArgs = _a.watchArgs;\n        this.nnInstance = nnInstance;\n        this.watchArgs = watchArgs;\n    }\n    watchHelper.prototype.getRunWatchCallback = function (key) {\n        var _this = this;\n        return function () {\n            if (key in _this.watchArgs)\n                _this.watchArgs[key].bind(_this.nnInstance)();\n        };\n    };\n    return watchHelper;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (watchHelper);\n\n\n//# sourceURL=webpack:///./node_modules/jeffs_frontend_lib/dist/src/watch.js?");

/***/ }),

/***/ "./src/game/exWords.json":
/*!*******************************!*\
  !*** ./src/game/exWords.json ***!
  \*******************************/
/*! exports provided: words, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"words\\\":[\\\"voted\\\",\\\"myrica\\\",\\\"quadrennium\\\",\\\"metanalyses\\\",\\\"xeruses\\\",\\\"modularized\\\",\\\"flouncings\\\",\\\"nonnormative\\\",\\\"journal\\\",\\\"automating\\\",\\\"cumbrous\\\",\\\"hoteliers\\\",\\\"atavistically\\\",\\\"endurance\\\",\\\"belters\\\",\\\"multicolor\\\",\\\"preoccupations\\\",\\\"flicks\\\",\\\"phenobarbitone\\\",\\\"depict\\\",\\\"pinnas\\\",\\\"vallecular\\\",\\\"commonplaces\\\",\\\"octyls\\\",\\\"rouche\\\",\\\"bicarbonates\\\",\\\"presentability\\\",\\\"devitalize\\\",\\\"superdiplomats\\\",\\\"defrag\\\",\\\"galvanism\\\",\\\"mite\\\",\\\"columels\\\",\\\"advecting\\\",\\\"amenorrheic\\\",\\\"phonologist\\\",\\\"desk\\\",\\\"compendiously\\\",\\\"rubrications\\\",\\\"timorousness\\\",\\\"herbiest\\\",\\\"jakes\\\",\\\"imprecisely\\\",\\\"dentils\\\",\\\"rubbles\\\",\\\"lushing\\\",\\\"gunroom\\\",\\\"sonatine\\\",\\\"decantation\\\",\\\"nutwoods\\\",\\\"appreciator\\\",\\\"hardihoods\\\",\\\"linable\\\",\\\"marveling\\\",\\\"raki\\\",\\\"yucca\\\",\\\"brashier\\\",\\\"hazier\\\",\\\"primi\\\",\\\"monomials\\\",\\\"moorlands\\\",\\\"juleps\\\",\\\"xerophthalmias\\\",\\\"bilge\\\",\\\"showrings\\\",\\\"noninitiate\\\",\\\"active\\\",\\\"treacly\\\",\\\"appellant\\\",\\\"semiclassics\\\",\\\"propitiousness\\\",\\\"impetigos\\\",\\\"demonically\\\",\\\"pretences\\\",\\\"cubicula\\\",\\\"displeasures\\\",\\\"activistic\\\",\\\"biking\\\",\\\"shoplifts\\\",\\\"gallowglasses\\\",\\\"beneficiations\\\",\\\"flown\\\",\\\"sensibler\\\",\\\"farsightedly\\\",\\\"scholasticisms\\\",\\\"impeller\\\",\\\"threadfin\\\",\\\"enzymologists\\\",\\\"annihilators\\\",\\\"crossings\\\",\\\"hill\\\",\\\"admirablenesses\\\",\\\"trifluoperazine\\\",\\\"angary\\\",\\\"escalloping\\\",\\\"centaurs\\\",\\\"patroons\\\",\\\"ackees\\\",\\\"longnesses\\\",\\\"watery\\\"]}\");\n\n//# sourceURL=webpack:///./src/game/exWords.json?");

/***/ }),

/***/ "./src/game/helpers.ts":
/*!*****************************!*\
  !*** ./src/game/helpers.ts ***!
  \*****************************/
/*! exports provided: getDiff, shuffle, getWords, getBaseState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDiff\", function() { return getDiff; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shuffle\", function() { return shuffle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getWords\", function() { return getWords; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBaseState\", function() { return getBaseState; });\nvar exWords = __webpack_require__(/*! ./exWords.json */ \"./src/game/exWords.json\");\nvar words = exWords.words;\nfunction getDiff(correct, typed) {\n    var lastValid = 0;\n    for (var i = 0; i < typed.length; i++) {\n        if (typed[i] !== correct[i])\n            return {\n                wrong: typed.slice(lastValid),\n                typed: typed.slice(0, lastValid),\n            };\n        lastValid++;\n    }\n    return {\n        wrong: \"\",\n        typed: typed,\n    };\n}\nfunction shuffle(a) {\n    var j, x, i;\n    for (i = a.length - 1; i > 0; i--) {\n        j = Math.floor(Math.random() * (i + 1));\n        x = a[i];\n        a[i] = a[j];\n        a[j] = x;\n    }\n    return a;\n}\nfunction getWords(numWords) {\n    if (numWords === void 0) { numWords = 20; }\n    return shuffle(words)\n        .filter(function (_, idx) { return idx < numWords; })\n        .map(function (word) {\n        return {\n            word: word,\n            wrong: \"\",\n            typed: \"\",\n        };\n    });\n}\nfunction getBaseState() {\n    return {\n        currWord: 0,\n        currTyped: \"\",\n        hasStarted: false,\n        secondsSinceStart: 0,\n        correctCharsTotal: 0,\n        wordData: getWords(),\n    };\n}\n\n\n//# sourceURL=webpack:///./src/game/helpers.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jeffs_frontend_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jeffs_frontend_lib */ \"./node_modules/jeffs_frontend_lib/dist/src/construct.js\");\n/* harmony import */ var _game_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/helpers */ \"./src/game/helpers.ts\");\n\n\nconsole.log(\"yo\");\nconsole.time(\"start\");\nvar x = new jeffs_frontend_lib__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    el: \"#app\",\n    data: Object(_game_helpers__WEBPACK_IMPORTED_MODULE_1__[\"getBaseState\"])(),\n    watch: {\n        currTyped: function () {\n            this.state.hasStarted = true;\n            var currWordObj = this.state.wordData[this.state.currWord];\n            var word = currWordObj.word;\n            if (!this.state.canAdvance && this.state.currTyped.length > word.length) {\n                this.state.currTyped = this.state.currTyped.slice(0, -1);\n            }\n            var _a = Object(_game_helpers__WEBPACK_IMPORTED_MODULE_1__[\"getDiff\"])(word, this.state.currTyped), wrong = _a.wrong, typed = _a.typed;\n            currWordObj.wrong = wrong;\n            this.setState([\"wordData\", this.state.currWord, \"typed\"], typed);\n            if (this.state.canAdvance) {\n                this.state.correctCharsTotal += this.state.currTyped.length;\n                if (this.state.currWord === this.state.wordData.length - 1) {\n                    this.state.hasStarted = false;\n                }\n                else {\n                    this.state.currWord++;\n                    this.state.currTyped = \"\";\n                }\n            }\n        }\n    },\n    computed: {\n        currTimeDisplay: {\n            fn: function () {\n                var minutes = Math.floor(this.state.secondsSinceStart / 60);\n                var seconds = this.state.secondsSinceStart % 60;\n                var minString = minutes >= 10 ? \"\" + minutes : \"0\" + minutes;\n                var secString = seconds >= 10 ? \"\" + seconds : \"0\" + seconds;\n                return minString + \":\" + secString;\n            },\n            dependencies: [\"secondsSinceStart\"]\n        },\n        startTxt: {\n            fn: function () {\n                return this.state.hasStarted ? \"\" : \"Start typing to begin.\";\n            },\n            dependencies: [\"hasStarted\"]\n        },\n        canAdvance: {\n            fn: function () {\n                return (this.state.wordData[this.state.currWord].word ===\n                    this.state.currTyped.trim());\n            },\n            dependencies: [\"currWord\", \"currTyped\", \"wordData\"]\n        },\n        wpm: {\n            fn: function () {\n                var wpm = this.state.correctCharsTotal /\n                    5 /\n                    (this.state.secondsSinceStart / 60);\n                return isNaN(wpm) ? 0 : wpm.toFixed();\n            },\n            dependencies: [\"correctCharsTotal\", \"secondsSinceStart\"]\n        }\n    }\n});\nconsole.timeEnd(\"start\");\nsetInterval(function () {\n    if (x.state.hasStarted)\n        x.state.secondsSinceStart += 0.5;\n}, 500);\ndocument.getElementById(\"reset\").addEventListener(\"click\", function () {\n    var base = Object(_game_helpers__WEBPACK_IMPORTED_MODULE_1__[\"getBaseState\"])();\n    Object.keys(base).forEach(function (key) { return (x.state[key] = base[key]); });\n});\n//@ts-ignore\nwindow.x = x;\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });