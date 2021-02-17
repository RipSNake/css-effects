/*
	Filters:
	blur px >= 0 (default 0)
	brightness 0 - 100 % or + (default 100)
	contrast 0 - 100 % or + (default 100())
	drop-shadow(h-shadow v-shadow blur spread color) required: h-shadow, v-shadow 
	grayscale 0 - 100 % (default 0)
	hue-rotate 0 - 360 deg (default 0)
	invert 0 - 100 % (dafault 0)
	opacity 0 - 100 % (default 1)
	saturate 0 - 100 % or + (default 100)
	sepia 0 - 100 % (default 0)

	// array with all the posible filters and default values
	var filters = [
		{filter: 'blur', value: 0px},
		{filter: 'brightness', value: 100},
		{filter: 'contrast', value: 100},
		{filter: 'drop-shadow', h-shadow-value: 0px, v-shadow-value: 0px, spread: 0},
		{filter: 'grayscale', value: 0},
		{filter: 'hue-rotate', value: 0},
		{filter: 'invert', value: 0},
		{filter: 'opacity', value: 1},
		{filter: 'saturate', value: 100},
		{filter: 'sepia', value: 0}
	];
*/

window.onload = function() { console.log('window loaded')} ;

var shownImg = 'img-1'; // to save the id of the img in display. Default value 'img-1'

// addEventListener to images button to show / hide un selected img
document.getElementById('img-list').addEventListener('click',showImg);

function showImg(eventSrc) {
	let imgId = eventSrc.srcElement.attributes.href.value.slice(1);
	let imgs = document.getElementById('img-display-layer').getElementsByTagName('img');
	
	for(let i = 0; i < imgs.length; i++) {
		if(imgs[i].id === imgId) {
			imgs[i].classList.add('show');
			imgs[i].classList.remove('hide');
		} else {
			imgs[i].classList.remove('show');
			imgs[i].classList.add('hide');
		}
	}

	shownImg = imgId; // save the id to the shown var
};

// fetch filter list items
var filter = document.getElementById('filter-selector').getElementsByClassName('dropdown-item');

var filterValues = [
	{filter: 'blur', value: 0},
	{filter: 'brightness', value: 100},
	{filter: 'contrast', value: 100},
	{filter: 'drop-shadow', 'h-shadow-value': 0, 'v-shadow-value': 0, spread: 0},
	{filter: 'grayscale', value: 0},
	{filter: 'hue-rotate', value: 0},
	{filter: 'invert', value: 0},
	{filter: 'opacity', value: 1},
	{filter: 'saturate', value: 100},
	{filter: 'sepia', value: 0}
];

// addEventListener('click') to the filter list buttons
for(let i = 0; i < filter.length; i++) {
	filter[i].addEventListener('click', filterShow);
};

// addEventListener to the input(range) element
let mainInput = document.getElementById('filterShow').getElementsByTagName('input');
for(let i = 0; i < mainInput.length; i++) {
	mainInput[i].addEventListener('click', saveActualValues);	
};

document.getElementById('filter-view').addEventListener('click', toggleFiltersView);
// toggle view from one to all filters
let showned = true;
hideFiltersList();

function toggleFiltersView() {
	if(showned) {
		hideFiltersList();
	} else {
		showFiltersList();
	}
};

function showFiltersList() {
	document.getElementById('filter-full-list').classList.remove('hide');

	let filterInputs = document.getElementById('filterShow').children;
	
	let range = document.getElementById('filterShow').getElementsByTagName('input');

	for(let r of range) {
		r.disabled = true;
	}
	


	for(let filter of filterInputs) {
		filter.classList.remove('hide');
	}
	// Disable filters button
	document.getElementById('filtersDropdown').classList.add('unclickable');
	showned = true; 
};

function hideFiltersList() {
	document.getElementById('filter-full-list').classList.add('hide');
	let filterInputs = document.getElementById('filterShow').children;
	
	let range = document.getElementById('filterShow').getElementsByTagName('input');
	for(let r of range) {
		r.disabled = false;
	}

	for(let filter of filterInputs) {
		if(!filter.classList.contains('selected')){
			filter.classList.add('hide');
		}
	}
	document.getElementById('filtersDropdown').classList.remove('unclickable');
	showned = false;
};


// addEventListener passes as first argument the element which trigered the event
function filterShow(event) {
	let filter = event.srcElement;

	// fetch filter's label elements
	let filterLabel = document.getElementById('filterShow').getElementsByTagName('label');
	
	filterLabel[0].setAttribute('for', filter.id);
	filterLabel[0].innerHTML = filter.innerHTML;
	
	// fetch input and show name of selected filter
	let value = document.getElementsByTagName('input');
	value[0].name = filter.id;
	

	for(let i = 0; i < filterValues.length; i++){
		if(value[0].name === filterValues[i].filter) {
			value[0].value = filterValues[i].value;
		}
	}
};
// save the values in input(range) to the filterValues array
function saveActualValues(inputValue) {
	let el = inputValue.srcElement;
	let saved = false;
	for(let i = 0; i < filterValues.length && saved === false; i++) {
		if(el.name === filterValues[i].filter) {
			filterValues[i].value = el.value;
			saved = true;
		};
	};
	applyFilters(shownImg,el.name,el.value);
};
// apply filter to the shown image
function applyFilters(imgElementId, filter, value) {
	let unit = '%';
	if(filter === 'blur') {
		unit = 'px';
	} else if(filter === 'hue-rotate') {
		unit = 'deg';
	}
	// access the element's filter property (inside style)
	let i = document.getElementById(imgElementId);
	// parse the filter string
	let f = filter+'('+value+unit+')';

	if(filter === 'drop-shadow'){
		f = filter+'('+value+'px '+value+'px)';
	}
	// apply the filter
	i.style.filter = f;

	console.log('Filter '+f+' applied');
};

function populateFilterList() {
	for(filter of filterValues) {

	}
};