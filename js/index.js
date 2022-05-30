let image = document.getElementById('importImg');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let lighterImg = document.getElementById("lighter");
let contrastImg = document.getElementById("contrast");
let grayScaleImg = document.getElementById("grayScale");
let hueImg = document.getElementById("hue");
let saturationImg = document.getElementById("saturation");
let sepiaImg = document.getElementById("sepia");
function uploadImage(event){

	// sursa fisierului
	image.src = URL.createObjectURL(event.target.files[0]);

	image.onload = function () {
		
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.crossOrigin = "anonymous";
		applyFilter();
	};

	document.querySelector('.description').style.display = "none";
	document.querySelector('.imgSave').style.display = "block";
	document.querySelector('.imgEffect').style.display = "block";
	document.querySelector('.imgFilters').style.display = "block";
};


function applyFilter(){
	let filterString =
		"brightness(" + lighterImg.value + "%" + ") contrast(" + contrastImg.value + "%" + ") grayscale(" + grayScaleImg.value + "%" + ") saturate(" + saturationImg.value + "%" +") sepia(" + sepiaImg.value + "%" + ") hue-rotate(" + hueImg.value + "deg" + ")";

	//aplicarea filtrului
	context.filter = filterString;
	context.drawImage(image, 0, 0);
}
function a1Filter(){
	resetImage();
	lighterImg.value = 130;
	contrastImg.value = 120;
	saturationImg.value = 120;
	applyFilter();
}

function a2Filter(){
	resetImage();
	grayScaleImg.value = 100;
	lighterImg.value = 120;
	contrastImg.value = 120;
	applyFilter();
}

function a3Filter(){
	resetImage();
	hueImg.value =
		Math.floor(Math.random() * 360) + 1;
        contrastImg.value = 120;
	applyFilter();
}

function a4Filter(){
	resetImage();
	lighterImg.value = 120;
	saturationImg.value = 120;
	sepiaImg.value = 150;
	applyFilter();
}

function resetImage(){
	lighterImg.value = 100;
	contrastImg.value = 100;
	grayScaleImg.value = 0;
	hueImg.value = 0;
	saturationImg.value = 100;
	sepiaImg.value = 0;
	applyFilter();
}

function saveImage(){
	let linkElement = document.getElementById('link');
	linkElement.setAttribute(
	'download', 'foto1Edited.png'
	);
	let canvasData = canvas.toDataURL("image/png")
	canvasData.replace(
	"image/png", "image/octet-stream"
	)
	linkElement.setAttribute('href', canvasData);
	linkElement.click();
}
