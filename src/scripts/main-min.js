//     Underscore.js 1.5.0
//     http://underscorejs.org
//     (c) 2009-2011 Jeremy Ashkenas, DocumentCloud Inc.
//     (c) 2011-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
!function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,w=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.0";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(j.has(n,a)&&t.call(e,n[a],a,n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=F(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(null==t?j.identity:t);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};j.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)})},j.countBy=function(n,t,r){return k(n,t,r,function(n,t){j.has(n,t)||(n[t]=0),n[t]++})},j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var R=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return R(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){return j.unzip.apply(j,o.call(arguments))},j.unzip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var M=function(){};j.bind=function(n,t){var r,e;if(w&&n.bind===w)return w.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));M.prototype=n.prototype;var u=new M;M.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u=null;return function(){var i=this,a=arguments,o=function(){u=null,r||(e=n.apply(i,a))},c=r&&!u;return clearTimeout(u),u=setTimeout(o,t),c&&(e=n.apply(i,a)),e}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){var t=[];for(var r in n)j.has(n,r)&&t.push(n[r]);return t},j.pairs=function(n){var t=[];for(var r in n)j.has(n,r)&&t.push([r,n[r]]);return t},j.invert=function(n){var t={};for(var r in n)j.has(n,r)&&(t[n[r]]=r);return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),D.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},z=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(z,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var D=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],D.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return D.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this);
//# sourceMappingURL=underscore-min.map;
define("underscore", (function (global) {
    return function () {
        var ret, fn;
        return ret || global._;
    };
}(this)));

/*
 * utilty functions
 */

define('common',[],function() {
	
	
	var defaults = {
		xBounds: 5, yBounds: 3, maxCoord: 50, maxInstruction: 100
	};
	
	/* 
	 * [1-9] check if value is a positive number 
	 * [0-9] check if value greater than 0
	 */
	var isNumber = function(value) {
		if(/^(\-|\+)?([1-9]+|Infinity)$/.test(value))
			return true;
		return false;
	};
	
	var cardinalPoints = { 
		points: { N:0, E:90, S:180, W:270 },

		getPointName: function(findDegree) {
			for (var p in this.points) {
				if (findDegree === this.points[p]) {
					return p;
				}
			}
		},

		getDegree: function(findPoint) {
			for (var p in this.points) {
				if (findPoint === p) {
					return this.points[p];
				}
			}  
		}
	};
	
	var isPosSafe = function(pos, posBounds) {
		if(pos < 0 || pos > parseInt(posBounds, 10)) {
			return false;
		}
		else {
			return true;
		}
	};
	
	var defaultsObj = function(xBounds, yBounds, maxCoord, maxInstruction) {
		this.xBounds = isNumber(xBounds) ? 5 : parseInt(xBounds, 10);
		this.yBounds = isNumber(yBounds) ? 3 : parseInt(yBounds, 10);
		this.maxCord = isNumber(maxCord) ? 50 : parseInt(maxCord, 10);
		this.maxInstruction = isNumber(maxInstruction) ? 100 : parseInt(maxInstruction, 10);
	};
	
	return {
		defaults: defaults,
		isNumber: isNumber,
		cardinalPoints: cardinalPoints,
		isPosSafe: isPosSafe
	};
});
/*
 * defines a robot and its current state
 */

define('robot',["common"], function(common) {
	

	// robot definition
	var robot = function(name, xPos, yPos, orientation, isAlive) {
		this.name = name;
		this.xPos = parseInt(xPos, 10);
		this.yPos = parseInt(yPos, 10);
		
		this.coords = function() {
			return this.xPos + ", " + this.yPos;
		};
		
		this.orientation = orientation.toUpperCase();
		this.isAlive = isAlive;
		
		this.isAliveStr = function() {
			return (!this.isAlive) ? " LOST" : "";
		};
		
		this.output = function() {
			var outputStr = this.xPos + " " + this.yPos + " " + this.orientation + this.isAliveStr();
			return outputStr;
		};
		
		this.id = function() {
			return { name: this.name, output: this.output };
		};
		
		this.isBotValid = function() {
			if(!common.isPosSafe(this.xPos , common.defaults.maxCoord) || !common.isPosSafe(this.yPos, common.defaults.maxCoord)) {
				console.log("Error creating '%s'. A single coordinate must be a positive number less than %s!", this.name, common.defaults.maxCoord);
				return false;
			}
			else if(common.cardinalPoints.points[this.orientation] === undefined) {
				console.log("Error creating '%s'. This orientation '%s' is not supported.", this.name, this.orientation);
				return false;
			}
			else {
				return true;
			}
		};
	};
	
	return {
		robot: robot
	};
	
});
/*
 * defines the movement of a robot across the grid
 */

define('robotActions',["underscore", "common", "robot"], function(_, common, robotObj) {
	

	var _lostList = []; //manages grid points of lost robots

	// parse and process bot instructions
	var instructBot = function (botName, positionStr, instructionsStr) {
		var posArr = positionStr.trim().split(" ");

		var bot = new robotObj.robot(botName, posArr[0], posArr[1], posArr[2], true); // create a new robot based on instructions
		
		// only process instructions if the bot is valid
		if (bot.isBotValid()) {
			
			instructionsStr = instructionsStr.trim().substring(0, common.defaults.maxInstruction);
			
			for (var i = 0; i < instructionsStr.length; i++) {
				if(_processCommands(instructionsStr.charAt(i).toUpperCase(), bot) === false) {
					break;
				}
			}
			return bot;
		}
		else {
			throw "Failed to create '" + botName + "', please view logs.";
		}
	};

	// determines which type of move to execute: L/R/F
	var _processCommands = function (char, bot) {
		switch (char) {
			case "L":
			case "R":
				bot.orientation = _robotCommands.turnBot(bot.orientation, char);
				break;
			case "F":
				_robotCommands.moveBot(bot);
				break;
			default: 
				console.log("Invalid command received while processing '" + bot.name + "', moving to next character.");
		}

		return bot.isAlive; // dealbreaking flag, halts looping on false
	};

	// store command types in this object; this should support "bolting" on future commands. 
	// _processCommands will need new keys to call new command types
	var _robotCommands = {
		turnBot: function(orientation, char) {
			return _turnBot(orientation, char);
		},
		moveBot: function(bot) {
			_moveBot(bot);
		}
	};

	// turn bot L/R and return new orientaion
	var _turnBot = function(orientation, direction) {
		var angle = common.cardinalPoints.getDegree(orientation);

		if(direction.toUpperCase() === "R") {
			angle = (angle === 270) ? 0 : angle + 90; // make sure angle never becomes 360 since that value is not mapped
		}
		else if (direction.toUpperCase() === "L") {
			angle = (angle === 0) ? 270 : angle - 90; // make sure angle never becomes 360 since that value is not mapped
		}

		return common.cardinalPoints.getPointName(angle); // orientation is defined in cardinal points so lets go back to that instead of angles
	};

	var _processMotion = function(bot, tempPos, axis) {
    axis = axis.toLowerCase();
    switch (_hasScent(bot.coords(), tempPos, common.defaults[axis + "Bounds"])) {
        case true:
          break;
        case false:
          bot.isAlive = false;
          _lostList.push(bot.xPos + ", " + bot.yPos);
          break;
        case null:
          bot[axis + "Pos"] = tempPos;
          break;
      }
  };
  
  var _moveBot = function(bot) {

		// orientation determines which axis to increment/decrement along
		switch (bot.orientation) {
				case "N":
          _processMotion(bot, (bot.yPos + 1), "y");
					break;
				case "S":
					_processMotion(bot, (bot.yPos - 1), "y");
					break;
				case "E":
					_processMotion(bot, (bot.xPos + 1), "x");
					break;
				case "W":
					_processMotion(bot, (bot.xPos - 1), "x");
					break;
		}

	};

	var _hasScent = function(posStr, tempPos, posBounds) {

		if (_.contains(_lostList, posStr) && !common.isPosSafe(tempPos,posBounds)) {
			return true; 
//      check if location has scent by looking in the lost list
//      then if the next move is fatal, don't move robot
		}
		else {
			if(!common.isPosSafe(tempPos,posBounds)) {
				return false; 
//         if location does NOT have a scent and the next move is fatal let it happen, 
//        but add the location to the lost list and update the bot status to LOST
			}
			else {
				return null; // if the next move is safe let it happen
			}
		}

	};

	return {
		defaults: common.defaults,
		instructBot: instructBot
	};
});
/** @license
 * RequireJS plugin for async dependency load like JSONP and Google Maps
 * Author: Miller Medeiros
 * Version: 0.1.2 (2014/02/24)
 * Released under the MIT license
 */
define('async',[],function(){

    var DEFAULT_PARAM_NAME = 'callback',
        _uid = 0;

    function injectScript(src){
        var s, t;
        s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = src;
        t = document.getElementsByTagName('script')[0]; t.parentNode.insertBefore(s,t);
    }

    function formatUrl(name, id){
        var paramRegex = /!(.+)/,
            url = name.replace(paramRegex, ''),
            param = (paramRegex.test(name))? name.replace(/.+!/, '') : DEFAULT_PARAM_NAME;
        url += (url.indexOf('?') < 0)? '?' : '&';
        return url + param +'='+ id;
    }

    function uid() {
        _uid += 1;
        return '__async_req_'+ _uid +'__';
    }

    return{
        load : function(name, req, onLoad, config){
            if(config.isBuild){
                onLoad(null); //avoid errors on the optimizer
            }else{
                var id = uid();
                //create a global variable that stores onLoad so callback
                //function can define new module after async load
                window[id] = onLoad;
                injectScript(formatUrl(req.toUrl(name), id));
            }
        }
    };
});

/**
 * Basic parser for URL properties
 * @author Miller Medeiros
 * @version 0.1.0 (2011/12/06)
 * MIT license
 */
define('propertyParser',[],function(){

    var rProps = /([\w-]+)\s*:\s*(?:(\[[^\]]+\])|([^,]+)),?/g, //match "foo:bar" and "lorem:[ipsum,dolor]" capturing name as $1 and val as $2 or $3
        rArr = /^\[([^\]]+)\]$/; //match "[foo,bar]" capturing "foo,bar"

    function parseProperties(str){
        var match, obj = {};
        while (match = rProps.exec(str)) {
            obj[ match[1] ] = typecastVal(match[2] || match[3]);
        }
        return obj;
    }

    function typecastVal(val){
        if (rArr.test(val)){
            val = val.replace(rArr, '$1').split(',');
        } else if (val === 'null'){
            val = null;
        } else if (val === 'false'){
            val = false;
        } else if (val === 'true'){
            val = true;
        } else if (val === '' || val === "''" || val === '""'){
            val = '';
        } else if (! isNaN(val)) {
            //isNaN('') == false
            val = +val;
        }
        return val;
    }

    //API
    return {
        parseProperties : parseProperties,
        typecastVal : typecastVal
    };
});

/** @license
 * RequireJS plugin for loading Google Ajax API modules thru `google.load`
 * Author: Miller Medeiros
 * Version: 0.2.0 (2011/12/06)
 * Released under the MIT license
 */
define('goog',['async', 'propertyParser'], function (async, propertyParser) {

    var rParts = /^([^,]+)(?:,([^,]+))?(?:,(.+))?/;

    function parseName(name){
        var match = rParts.exec(name),
            data = {
                moduleName : match[1],
                version : match[2] || '1'
            };
        data.settings = propertyParser.parseProperties(match[3]);
        return data;
    }

    return {
        load : function(name, req, onLoad, config){
            if (config.isBuild) {
                onLoad(null); //avoid errors on the optimizer
            } else {
                var data = parseName(name),
                    settings = data.settings;

                settings.callback = onLoad;

                req(['async!'+ (document.location.protocol === 'https:'? 'https' : 'http') +'://www.google.com/jsapi'], function(){
                    google.load(data.moduleName, data.version, settings);
                });
            }
        }
    };

});


/*
 * Using the google visualizations api to represent planet mars as a grid
 * dependencies:
 * 1. https://google-developers.appspot.com/chart/interactive/docs/gallery/bubblechart
 * 2. https://github.com/millermedeiros/requirejs-plugins
 */

define('marsGrid',['common', 'goog!visualization,1,packages:[corechart,geochart]'], function(common) {
	
	
	var chart, options, data;
	
	var drawChart = function() {
    
    var initializeBots = [
      ['ID', 'X', 'Y', 'Orientation'],
      ['Bot 1',    0,              0, 'N'],
      ['Bot 2',    0,              1, 'E'],
      ['Bot 3',    0,               2, 'S'],
      ['Bot 4',    0,               3, 'W']
    ];

    data = google.visualization.arrayToDataTable(initializeBots); 

    options = {
      title: 'The Planet Mars as a Grid',
      bubble: {textStyle: {fontSize: 11}},
      animation: {
        duration: 1000,
        easing: 'inAndOut',
        startup: true
      },
      series: {'N': {color: '#fb0a2a'},
               'E': {color: '#00aeef'},
               'S': {color: '#062f3c'},
               'W': {color: '#ffcc33'}
      },
      hAxis: {minValue: 0, maxValue: common.defaults.xBounds},
      vAxis: {minValue: 0, maxValue: common.defaults.yBounds}
    };
		
    chart.draw(data, options);
		
	};
  
	var updateBotState = function(newState) {
		data = google.visualization.arrayToDataTable(newState);
		options.hAxis.maxValue = common.defaults.xBounds; // update grid size just in case there's been a change to x bounds
		options.vAxis.maxValue = common.defaults.yBounds; // update grid size just in case there's been a change to y bounds
		chart.draw(data, options);
	};	
		
  var initializeChart = function(targetElement) {
		chart = new google.visualization.BubbleChart(targetElement);
    google.load("visualization", "1", {packages:["corechart"], callback: drawChart});
  };
	
	return {
		updateBotState: updateBotState,
		initializeChart: initializeChart
	};
});
/*
 * Controls the UI
 */

define('interface',["robotActions", "common", "marsGrid"], function(robotActions, common, marsGrid) {
	
	
	var errorStr = "Your instructions are incorrectly formatted. \n Please remember that the first line of input is used as the upper-right bounds.";
	var instructionsQueue = [];
	var initBotsBtn = document.getElementById("initialize-bots");
	var inputArea = document.getElementById("input"), outputArea = document.getElementById("output");
	var sampleInputBtn = document.getElementById("sample-input");
	var moveBotsBtn = document.getElementById("move-bots");
	
	/*
	 * this function validates the format of instructions.
	 * a readable instruction is one that has at least 3 lines. 
	 * 1. upper bounds
	 * 2. robot position
	 * 3. robot movement instructions 
	 * 
	 */
	
	var isInstructionReadable = function(inputStr) {
		if(inputStr.length === 0) {
			return false;
		}
		if(inputStr.length > 0) {
			if(inputStr.split("\n").length < 3) {
				//we need at least 3 lines to try and do anything valuable
				return false;
			}
			if(inputStr.split("\n").length >= 3) {
				return true;
			}
		}
	};
	
	var initializeBotPositions = function(inputStr) {
		var setBots = [['ID', 'X', 'Y', 'Orientation']];
		var inputArr = inputStr.split("\n\n");
		var output;

		for(var i = 0; i < inputArr.length; i++) {
			var currentInstructionSet = inputArr[i].split("\n");
			// the first line of the first instruction sets the bounds
			if (i === 0) {
				var defaultsArr = currentInstructionSet[0].split(" ");
				common.defaults.xBounds = common.isNumber(defaultsArr[0]) ? defaultsArr[0] : common.defaults.xBounds;
				common.defaults.yBounds = common.isNumber(defaultsArr[1]) ? defaultsArr[1] : common.defaults.yBounds;
				var posArr = currentInstructionSet[1].trim().split(" ");
				// args example ("1 1 E", 1, 1, "E")
				setBots.push([currentInstructionSet[1], parseInt(posArr[0], 10), parseInt(posArr[1], 10), posArr[2]]); 
				// args example (position string, instructions string)	
				instructionsQueue.push([currentInstructionSet[1], currentInstructionSet[2]]); 
			}
			else {
				var posArr = currentInstructionSet[0].trim().split(" ");
				// args example ("1 1 E", 1, 1, "E")
				setBots.push([currentInstructionSet[0], parseInt(posArr[0], 10), parseInt(posArr[1], 10), posArr[2]]);
				// args example (position string, instructions string)	
				instructionsQueue.push([currentInstructionSet[0], currentInstructionSet[1]]); 
			}
		}
		
		marsGrid.updateBotState(setBots); 
	};
	
	var sampleInputBtnHandler = function() {
    var sampleInputBtnStr = "5 3 \n\
1 1 E \n\
RFRFRFRF \n\n\
3 2 N \n\
FRRFLLFFRRFLL \n\n\
0 3 W \n\
LLFFFLFLFL";
		
    sampleInputBtn.addEventListener("click", function(event) {
			inputArea.value = sampleInputBtnStr;
			
    }, false);
			
	};
	
	var initBotsBtnHandler = function() {
		initBotsBtn.addEventListener("click", function(event) {
				
			outputArea.innerHTML = "";
      
      if(isInstructionReadable(inputArea.value)) {
				initializeBotPositions(inputArea.value);
				moveBotsBtn.removeAttribute("disabled"); // enable move button
			}
			else {
				outputArea.innerHTML = errorStr;
			}
			
			}, false);
	};
	
	var moveBotsBtnHandler = function() {
    var output = "", bot;
    var setBots = [['ID', 'X', 'Y', 'Orientation']]; 
		
    moveBotsBtn.addEventListener("click", function(event) {
		outputArea.innerHTML = "";
      
      if(isInstructionReadable(inputArea.value)) {
				for(var j = 0; j < instructionsQueue.length; j++) {
					instruction = instructionsQueue[j];
					// args: botName, initial position string, movement instructions
					bot = robotActions.instructBot("Bot #" + j, instruction[0], instruction[1]); 
					setBots.push([bot.output(), bot.xPos, bot.yPos, bot.orientation]);
				}
				inputArea.value = "";
				marsGrid.updateBotState(setBots);
				moveBotsBtn.setAttribute("disabled",""); // disable move button
			}
			else {
				outputArea.innerHTML = errorStr;
			}
//		outputArea.innerHTML = output;
    }, false);
    
	};
	
	var init = function() {
		marsGrid.initializeChart(document.getElementById('planet-mars'));
		initBotsBtnHandler();
		moveBotsBtnHandler();
		sampleInputBtnHandler();
	};
		
	return {
		testInstructions: isInstructionReadable,
		init: init
	};
	
});
/*
 * Third Party Dependency
 * requirejs-plugins: https://github.com/millermedeiros/requirejs-plugins
 */

require.config({
	waitSeconds : 15, //make sure it is enough to load all scripts
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	paths: {
		propertyParser: '../third-party/requirejs-plugins/propertyParser', // requirejs-plugins dependency
		async: '../third-party/requirejs-plugins/async',
		goog: '../third-party/requirejs-plugins/goog',
		underscore: "../third-party/underscore-min"
	}
});

require(["interface"], function(interface) {
	
	interface.init();
	
});
define("main", function(){});


//# sourceMappingURL=main-min.js.map