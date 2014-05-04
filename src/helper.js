// 事件基础
define([
	"./core",
	"./helper/event"
], function( Painter, Event ) {

	Painter.extend(Event);
	
	return Painter;
});