//库的基础模块
define([
	"./var/class2type",
	"./var/toString",
	"./var/hasOwn"
], function( class2type, toString, hasOwn ) {

var

	version = "@VERSION",

	// 定义一个工厂方法获取Painter对象
	Painter = function( element, options ) {
		
		// 
		return new Painter.fn.init( element, options );
	};

// 原型扩展	实例化才有	
Painter.fn = Painter.prototype = {
	// 标识版本
	version: version,
	// 标识构造函数
	constructor: Painter,
	// 记录操作节点
	el: null,
	// 是否自适应
	resize: true	
};

// 初始化函数
var init = Painter.fn.init = function( element, options ){
	var el,resize;
	// 如果有且是canvas标签进行初始化，否则不做任何事
	if (element != null && Painter.nodeName(element) == "canvas") {

		//检测是否支持canvas
		if (!element.getContext) {
			Painter.error("HTML5 Canvas Not Supported By Your Browser");
		}

	}else {
		Painter.error("Error HTML Tag! Please use canvas");
	}
	
	el = element;
	// 处理用户自定义覆盖默认
	// 防止覆盖默认的不可变值
	options.version = this.version;
	options.el = Painter.fn.el;
	options.constructor = this.constructor;
	Painter.extend( this, options );
	this.el = el;

	resize = this.resize;
	// 自适应
	if (this.resize) {
		Painter.resizePainter(el, resize);
		Painter.addEventListener(window, "resize", function(ev){
			Painter.resizePainter(el, resize, ev);
		});
	}
	
	return this;
};

init.prototype = Painter.fn;





// 拷贝方式继承
Painter.extend = function(){
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// 处理深度拷贝标识
	if ( typeof target === "boolean" ) {
		deep = target;

		// 剔除第一个布尔值（深度拷贝的标识）
		target = arguments[ i ] || {};
		i++;
	}

	// 处理简单值
	if ( typeof target !== "object" && !Painter.isFunction(target) ) {
		target = {};
	}

	// 如果是1个值证明是Painter的继承
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// 只处理不为空、undefined的值
		if ( (options = arguments[ i ]) != null ) {
			// 基本对象拷贝
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// 已经完成  跳出循环
				if ( target === copy ) {
					continue;
				}

				// 处理字面量或者数组
				if ( deep && copy && ( Painter.isPlainObject(copy) || (copyIsArray = Painter.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Painter.isArray(src) ? src : [];

					} else {
						clone = src && Painter.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = Painter.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


Painter.extend({
	
	// 抛异常
	error: function( msg ) {
		throw new Error( msg );
	},
	// 是否是window对象
	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},
	// 判断是否时是字面量
	isPlainObject: function( obj ) {
		if ( Painter.type( obj ) !== "object" || obj.nodeType || Painter.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		return true;
	},
	// 节点名称
	nodeName: function( elem) {
		return elem.nodeName && elem.nodeName.toLowerCase();
	},
	// 对象的类型
	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},
	// 迭代数组
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// 通用的快速循环方式
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},
	// 去掉前后空格 Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "" );
	},
	// 判断是否dom节点
	isDom: function( el ){
		try{
			// DOM2 规范 (FF, Opera, Chrom, IE>7)
			return el instanceof window.HTMLElement;
		}catch(e){
			Painter.error(e);
		}
	}

});

Painter.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = Painter.type( obj );

	if ( type === "function" || Painter.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


return Painter;
});
