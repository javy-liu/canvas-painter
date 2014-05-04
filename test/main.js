
var a = Painter(document.getElementById('painter')
	, {
		resize:{
			width: 0,
			height: -180
		}
	});

function b(){
	console.log("b");
}

console.log(a.el);
console.log(a.version);
console.log(a.resize);


Painter.addEventListener( document.getElementById('line') ,"click", function(){
	console.log("点击了 line 按钮");
	var context = a.el.getContext("2d");
	// 移动到0,0
	context.moveTo(0, 0);
	context.lineTo(200,200);
	context.strokeStyle = "#cd2828";
	context.lineWidth = 2;
	context.lineCap = "round";
	context.stroke();
});


Painter.addEventListener( document.getElementById('brush') ,"click", function(){
	console.log("点击了 brush 按钮");
});


Painter.addEventListener( document.getElementById('color') ,"click", function(){
	console.log("点击了 color 按钮");
});


Painter.addEventListener( document.getElementById('triangle') ,"click", function(){
	console.log("点击了 triangle 按钮");
});

Painter.addEventListener( document.getElementById('rectangle') ,"click", function(){
	console.log("点击了 rectangle 按钮");
});

Painter.addEventListener( document.getElementById('round') ,"click", function(){
	console.log("点击了 round 按钮");
});

