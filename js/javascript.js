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

window.onload = function() { 
	hideFiltersList();
	console.log('window loaded');
};

/*
*
* Variable declarations
*
*/

var filterValues = [
	{filter: 'blur', value: 0},
	{filter: 'brightness', value: 100},
	{filter: 'contrast', value: 100},
	{filter: 'drop-shadow', 'h-shadow-value': 0, 'v-shadow-value': 0, spread: 0},
	{filter: 'grayscale', value: 0},
	{filter: 'hue-rotate', value: 0},
	{filter: 'invert', value: 0},
	{filter: 'opacity', value: 100}, // we use 100 cause will treat it like a %
	{filter: 'saturate', value: 100},
	{filter: 'sepia', value: 0}
];

var displayedImg = 'img-1'; // to save the id of the img in display. Default value 'img-1'

// To track the toggle view from one to all filters
let filterListShowned = true;
// Save the actual filter value
let actualMultipleFilter = '';
/*
*
* Adding Event Listener
*
*/

// addEventListener to images button to show / hide un selected img
document.getElementById('img-list').addEventListener('click',showImg);

// listen to the toggle view button
document.getElementById('filter-view').addEventListener('click', toggleFiltersView);

// fetch filter list (dropdown-item buttons) and listen
var filters = document.getElementById('filter-selector').getElementsByClassName('dropdown-item');
for(let i = 0; i < filters.length; i++) {
	filters[i].addEventListener('click', filterShow);
};
// addEventListener to the single input(range) element
let mainInput = document.getElementById('singleFilterShow').getElementsByTagName('input');
for(let i = 0; i < mainInput.length; i++) {
	mainInput[i].addEventListener('click', saveActualValues);	
};
// addEventListener to the full list input(range)
let listInputs = document.getElementById('filter-full-list').getElementsByTagName('input');
for(let input of listInputs) {
	if(input.type.toLowerCase() == 'range') {
		input.addEventListener('click', saveActualValues);
	}
};
// addEventListener to the checkbox for enabling multiple filter action
for(let input of listInputs) {
	if(input.type.toLowerCase() == 'checkbox') {
		input.addEventListener('click', activateFilter);
	}
}





/*
*
* Functions
*
*/

function showImg(eventSrc) {
	// slice href.value (extracting only the id and not including the '#')
	let imgId = eventSrc.srcElement.attributes.href.value.slice(1);
	// fetch the images
	let imgs = document.getElementById('img-display-layer').getElementsByTagName('img');
	
	for(let i = 0; i < imgs.length; i++) {
		if(imgs[i].id === imgId) {
			imgs[i].classList.remove('hide');
		} else {
			imgs[i].classList.add('hide');
		}
	}
	displayedImg = imgId; // save the id to the shown var
};
// Show or Hide the complete filters list
function toggleFiltersView() {
	if(filterListShowned) {
		hideFiltersList();
	} else {
		showFiltersList();
	}
};
// show all filters list and disable single filter input
function showFiltersList() {
	// Make all the filter's range inputs visible
	document.getElementById('filter-full-list').classList.remove('hide'); 
	// Disable filters button
	document.getElementById('filtersDropdown').classList.add('unclickable');
	// Disable single input
	let range = document.getElementById('singleFilterShow').getElementsByTagName('input');
	for(let r of range) {
		r.disabled = true;
	}
	// change var used to indicate that all filters are been displayed 
	filterListShowned = true; 
};
// hide all filters list and enable single filter input
function hideFiltersList() {
	// Hide all the filter's range inputs
	document.getElementById('filter-full-list').classList.add('hide');
	// Enable filters button
	document.getElementById('filtersDropdown').classList.remove('unclickable');
	// Enable single filter's input
	let range = document.getElementById('singleFilterShow').getElementsByTagName('input');
	for(let r of range) {
		r.disabled = false;
	}
	// change var used to indicate that all filters are been displayed
	filterListShowned = false;
};
// change the single filter input displayed, acording to the selection of the dropdown-item's filter list
function filterShow(event) {
	// identify the element that trigered the function
	let filterSelected = event.srcElement;
	// fetch single filter's input label
	let filterLabel = document.getElementById('singleFilterShow').getElementsByTagName('label');
	// set attributes to reflect the selection
	filterLabel[0].setAttribute('for', filterSelected.id);
	filterLabel[0].innerHTML = filterSelected.innerHTML;
	// fetch single filter's input and set name attribute to respond to the filter selected
	let value = document.getElementsByTagName('input');
	value[0].name = filterSelected.id;
	// Iterate through the filter's list to retrieve the last known value
	for(let i = 0; i < filterValues.length; i++){
		if(value[0].name === filterValues[i].filter) {
			value[0].value = filterValues[i].value;
		}
	}
	// Once all the information is fetched we apply the filter to the displayed img
	applyFilters(displayedImg, filterSelected.id, value[0].value);
};
// save the values in input(range) to the filterValues array
function saveActualValues(event) {
	let value = event.srcElement.value;
	let filterName;
	if(event.srcElement.name.search('-') != -1) {
		filterName = event.srcElement.name.slice(0, event.srcElement.name.search('-'));	
	} else {
		filterName = event.srcElement.name;
	}
	
	let saved = false;

	for(let i = 0; i < filterValues.length && saved === false; i++) {
		if(filterName === filterValues[i].filter) {
			filterValues[i].value = value;
			saved = true;
		};
	};
	applyFilters(displayedImg,filterName,value);
};
// applies ONE filter to the shown image, overwriting any other filter already applied
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
	// test for dropshadow
	if(filter === 'drop-shadow'){
		f = filter+'('+value+'px '+value+'px)';
	}
	// apply the filter
	i.style.filter = f;
};

/*
*
*	function to work with multiple filters
*	Receives the filter name and value (ex: "contrast(80%)")and add it to existing "actualMultipleFilter" string that
* represents the filters applied
*/

function activateFilter(event) {
	console.log("activate filter function");
	console.log(event.srcElement.checked);
	if(event.srcElement.checked) {
		addFilter(event);
	} else {
		removeFilter(event);
	}
}


// Syntax example: "filter: contrast(200%) brightness(150%) sepia(50%);""
// we will use the filtersValue Object to reference the filter's names
function addFilter(event) {
	let actualMultipleFilter = document.getElementById(displayedImg).style.filter;
	let filterName = event.srcElement.name;
	let value = document.getElementsByName(filterName+'-value')[0].value;

	console.log(filterName);
	console.log(value);

	if(!actualMultipleFilter.contains(filterName)) {
		actualMultipleFilter += filterName;
	}
	console.log('addFilter(',filterName,')');
}

function removeFilter(event) {
	console.log('removeFilter(',event,')');
}

/*
*
*	Section for playing with js
*
*
*/


// Auto populate filter list with all the filters 
function populateFilterList() {
	for(filter of filterValues) {
		// Create the three elements in which the filter name and value will be displayed
		let div = document.createElement('div');
		let label = document.createElement('label');
		let input = document.createElement('input');
		// Add the classes for styling div
		div.classList.add('row')
		// Add class and attributes for label
		label.classList.add('col');
		label.setAttribute('for',filter.filter);
		label.innerHTML = filter.filter;
		// Add classes and attributes for input type range
		input.classList.add('col','form-range');
		input.setAttribute('type','range');
		input.name = filter.filter;
		input.value = filter.value; // Default for developing purposes
		// put the label and input inside the div
		div.appendChild(label);
		div.appendChild(input);
		// Append the div to the element where we want to display the label/input's list
		document.getElementById('the-list').appendChild(div);
		console.log(div);
	}
};

function getRock() {
	console.log('You got rocked!');
}