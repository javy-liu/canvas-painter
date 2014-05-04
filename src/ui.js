// UI基础
define([
	"./core",
	"./helper/event",
	"./ui/tool"
], function( Painter, Event, Tool ) {

	// 画板自适应方法
	Painter.resizePainter = function(el, resize){

		if (resize == null || Painter.type(resize) === "boolean") {
			// 初始化
			resize = {
				width: 0,
				height: 0
			};
		}
		el.width = window.innerWidth + resize.width;
        el.height = window.innerHeight + resize.height;
	};
	

	Painter.extend(Tool);

	return Painter;
});