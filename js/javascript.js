

window.onload = function() { console.log('window loaded')} ;

// fetch filter list items
var filter = document.getElementById('filter-selector').getElementsByClassName('dropdown-item');

var filterValues = [];

// addEventListener('click') to the filter list buttons and push them in the filterValue[] array
for(let i = 0; i < filter.length; i++) {
	filter[i].addEventListener('click', filterShow);
	filterValues.push({filter: filter[i].innerHTML, value: 30});
};

let mainInput = document.getElementsByTagName('input');
mainInput[0].addEventListener('click', saveActualValues);

// addEventListener passes as first argument the element which trigered the event
function filterShow(filter) {
	let filterName = filter.srcElement.innerHTML;

	// fetch filter's label elements
	let filterLabel = document.getElementById('filterShow').getElementsByTagName('label');

	filterLabel[0].innerHTML = filterName;
	filterLabel[0].attributes[1].nodeValue = filterName;

	// fetch input and show name of selected filter
	let value = document.getElementsByTagName('input');
	value[0].name = filterName;

	for(let i = 0; i < filterValues.length; i++){
		if(value[0].name === filterValues[i].filter) {
			value[0].value = filterValues[i].value;
		}
	}
};

function saveActualValues(value) {
	console.log(value);
	for(let i = 0; i < filterValues.length; i++) {
		if(value.name === filterValues[i].filter) {
			filterValues[i].value = value.value;
			console.log('value read correctly');
		};
	};
	console.log('values saved');
};
