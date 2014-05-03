/*!
 * Canvas Painter JavaScript Library v@VERSION
 * https://github.com/excalibur/canvas-painter/
 *
 *
 * Copyright 2014, 2015 excalibur. and other contributors
 * Released under the MIT license
 *
 * Date: @DATE
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {


		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// 有window对象使用，否则使用this传入
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {


