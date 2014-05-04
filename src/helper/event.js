// 事件基础 处理浏览器兼容
define(function( Painter ) {

	var Event = {
		/**
		* 添加事件
		* @param {string} 事件类型
		* @param {function} 处理函数
		* @param {boolean} 是否使用捕捉 默认false IE不支持事件捕捉
		*/
		addEventListener: function( el, event, listener, useCapture){
			if (!Painter.isWindow(el) && !Painter.isDom(el)) {
				Painter.error("first paramer must html dom!");
			}
			// 根据支持方法来调用
			if ( window.addEventListener ) {
				el.addEventListener( event, listener, useCapture );
			}else if ( window.attachEvent ){
				el.attachEvent( "on" + event, listener );
			}else {
				Painter.error("Event Not Supported By Your Browser!");
			}
		},
		/**
		* 删除事件
		* @param {string} 事件类型
		* @param {function} 处理函数
		* @param {boolean} 是否使用捕捉 默认false IE不支持事件捕捉
		*/
		removeEventListener: function( el, event, listener, useCapture){
			if (!Painter.isWindow(el) && !Painter.isDom(el)) {
				Painter.error("first paramer must html dom!");
			}
			// 根据支持方法来调用
			if ( window.removeEventListener ) {
				el.addEventListener( event, listener, useCapture );
			}else if ( window.detachEvent ){
				el.detachEvent( "on" + event, listener );
			}else {
				Painter.error("Event Not Supported By Your Browser!");
			}
		}

	};
	


	

	return Event;
});