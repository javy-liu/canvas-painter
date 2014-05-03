// 事件基础 处理浏览器兼容
define([
	"../core"
], function( Painter ) {

	/**
	* 添加事件
	* @param {string} 事件类型
	* @param {function} 处理函数
	* @param {boolean} 是否使用捕捉 默认false IE不支持事件捕捉
	*/
	Painter.fn.addEventListener = function( event, listener, useCapture){

		// 根据支持方法来调用
		if ( window.addEventListener ) {
			window.addEventListener( event, listener, useCapture );
		}else if ( window.attachEvent ){
			window.attachEvent( "on" + event, listener );
		}else {
			Painter.error("Event Not Supported By Your Browser!");
		}
	};


	/**
	* 删除事件
	* @param {string} 事件类型
	* @param {function} 处理函数
	* @param {boolean} 是否使用捕捉 默认false IE不支持事件捕捉
	*/
	Painter.fn.removeEventListener = function( event, listener, useCapture){

		// 根据支持方法来调用
		if ( window.removeEventListener ) {
			window.addEventListener( event, listener, useCapture );
		}else if ( window.detachEvent ){
			window.detachEvent( "on" + event, listener );
		}else {
			Painter.error("Event Not Supported By Your Browser!");
		}
	};

});