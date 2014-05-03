//库的基础模块
define([
	
], function(  ) {

var

	version = "@VERSION",

	// 定义一个工厂方法获取Painter对象
	Painter = function( element ) {
		
		// 
		return new Painter.fn.init( element );
	};

// 原型扩展	实例化才有	
Painter.fn = Painter.prototype = {
	// 标识版本
	version: version,
	// 标识构造函数
	constructor: Painter,
	// 记录操作节点
	el: null
};

// 初始化函数
var init = Painter.fn.init = function( element ){
	
	// 如果有且是canvas标签进行初始化，否则不做任何事
	if (element != null && element.nodeName.toLocaleLowerCase() == "canvas") {

		//检测是否支持canvas
		if (!element.getContext) {
			Painter.error("HTML5 Canvas Not Supported By Your Browser");
		}

	}else {
		Painter.error("Error HTML Tag! Please use canvas");
	}
	
	this.el = element;
	return this;
};

init.prototype = Painter.fn;

// 抛异常
Painter.error = function( msg ) {
	throw new Error( msg );
};

return Painter;
});
