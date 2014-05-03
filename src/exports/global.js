define([
	"../core"
], function( Painter ) {

var
	// 防止库文件冲突
	_Painter = window.Painter;


Painter.noConflict = function( deep ) {

	if ( deep && window.Painter === Painter ) {
		window.Painter = _Painter;
	}

	return Painter;
};

if ( typeof noGlobal === typeof undefined ) {
	window.Painter = Painter;
}

});
