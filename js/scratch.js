'use strict';

var scratchContainer	= document.getElementById('scratchInner'),
		canvas						= document.getElementById('canvasEl'),
		isDrawing,
		lastPoint,
		scratchResult;

function setCanvasSize(target) {
	// 이미지 사이즈 & 비율 640 336 & 40:21
	// 이미지 세로 사이즈 계산식 = 가로 × (세로/가로)
	
	let targetWidth = target.clientWidth;
	let targetHeight = Math.floor(targetWidth * (336 / 640));

	console.log(targetWidth, targetHeight);

	target.style.height = targetHeight + 'px';

	// 캔버스 값을 설정하지 않으면 스크래치 영역 오류 발생
	canvas.setAttribute("width", targetWidth);
	canvas.setAttribute("height", targetHeight);
}
setCanvasSize(scratchContainer);

var canvasWidth		= canvas.width,
		canvasHeight	= canvas.height,
		ctx						= canvas.getContext('2d'),
		image					= new Image(),
		brush					= new Image();

image.src = '../../img/event/scratch/img_cover.png';
image.onload = function () {
	ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
	// 페이지 로드 전에 결과가 보여지지 않도록
	document.querySelector('.inner_content').classList.add('visible');
};
brush.src = '../../img/event/scratch/img_brush.png';

canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('touchstart', handleMouseDown, false);
canvas.addEventListener('mousemove', handleMouseMove, false);
canvas.addEventListener('touchmove', handleMouseMove, false);
canvas.addEventListener('mouseup', handleMouseUp, false);
canvas.addEventListener('touchend', handleMouseUp, false);

function distanceBetween(point1, point2) {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

// Only test every `stride` pixel. `stride`x faster,
// but might lead to inaccuracy
function getFilledInPixels(stride) {
	if (!stride || stride < 1) { stride = 1; }

	var pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
			pdata = pixels.data,
			l = pdata.length,
			total = (l / stride),
			count = 0;

	// Iterate over all pixels
	for (var i = count = 0; i < l; i += stride) {
		if (parseInt(pdata[i]) === 0) {
			count++;
		}
	}

	return Math.round((count / total) * 100);
}

function getMouse(e, canvas) {
	var offsetX = 0, offsetY = 0, mx, my;

	if (canvas.offsetParent !== undefined) {
		do {
			offsetX += canvas.offsetLeft;
			offsetY += canvas.offsetTop;
		} while ((canvas = canvas.offsetParent));
	}

	mx = (e.pageX || e.touches[0].clientX) - offsetX;
	my = (e.pageY || e.touches[0].clientY) - offsetY;

	return { x: mx, y: my };
}

// 스크래치 비율
function handlePercentage(filledInPixels) {
	filledInPixels = filledInPixels || 0;
	console.log(filledInPixels + '%');
	if (filledInPixels > 5) {
		//canvas.classList.add('hidden');
		//scratchResult = true;
		//isDrawing = false;
		console.log('hidden');
	}
}

function handleMouseDown(e) {
	if(scratchResult){return}
	isDrawing = true;
	lastPoint = getMouse(e, canvas);
}

function handleMouseMove(e) {
	if(!isDrawing) {return}
	e.preventDefault();

	var currentPoint = getMouse(e, canvas),
			dist = distanceBetween(lastPoint, currentPoint),
			angle = angleBetween(lastPoint, currentPoint),
			x, y;

	for (var i = 0; i < dist; i++) {
		x = lastPoint.x + (Math.sin(angle) * i) - 25 + window.scrollX;	// 스크롤 값 만큼 캔버스에서 그려지는 영역의 차이가 있음을 보완
		y = lastPoint.y + (Math.cos(angle) * i) - 25 + window.scrollY;	// 스크롤 값 만큼 캔버스에서 그려지는 영역의 차이가 있음을 보완
		ctx.globalCompositeOperation = 'destination-out';
		ctx.drawImage(brush, x, y);
	}

	lastPoint = currentPoint;
	handlePercentage(getFilledInPixels(32));
}

function handleMouseUp(e) {
	isDrawing = false;
}

window.addEventListener('resize', function(){
	setCanvasSize(scratchContainer);
	ctx.drawImage(image, 0, 0, canvas.clientWidth, canvas.clientHeight);
});