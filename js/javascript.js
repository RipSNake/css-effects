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

// fetch filter list items
var filter = document.getElementById('filter-selector').getElementsByClassName('dropdown-item');

var filterValues = [
	{filter: 'blur', value: 0},
	{filter: 'brightness', value: 100},
	{filter: 'contrast', value: 100},
	{filter: 'drop-shadow', h-shadow-value: 0, v-shadow-value: 0, spread: 0},
	{filter: 'grayscale', value: 0},
	{filter: 'hue-rotate', value: 0},
	{filter: 'invert', value: 0},
	{filter: 'opacity', value: 1},
	{filter: 'saturate', value: 100},
	{filter: 'sepia', value: 0}
];

// addEventListener('click') to the filter list buttons and push them in the filterValue[] array
for(let i = 0; i < filter.length; i++) {
	filter[i].addEventListener('click', filterShow);
};

// addEventListener to the input(range) element
let mainInput = document.getElementsByTagName('input');
mainInput[0].addEventListener('click', saveActualValues);



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

function saveActualValues(event) {
	let el = event.srcElement;
	let saved = false;
	for(let i = 0; i < filterValues.length && saved === false; i++) {
		if(el.name === filterValues[i].filter) {
			filterValues[i].value = el.value;
			console.log('value saved');
			saved = true;
		};
	};
	applyFilters('imgElement',el.name,el.value);
	console.log('value assigned');
};

function applyFilters(imgElement, filter, value) {
	if(filter === 'blur') {
		value = value + 'px';
	} else if(filter === 'hue-rotate') {
		value = value + 'deg';
	}
	// access the element's filter property (inside style)
	let i = document.getElementById('img-1');
	// parse the filter string
	let f = filter+'('+value+')';
	// apply the filter
	i.style.filter = f;

	console.log('Filter '+f+' applied');
};
