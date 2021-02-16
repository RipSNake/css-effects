

window.onload = function() { console.log('window loaded')} ;

// fetch filter list items
var filter = document.getElementById('filter-selector').getElementsByClassName('dropdown-item');

var filterValues = [];

// addEventListener('click') to the filter list buttons and push them in the filterValue[] array
for(let i = 0; i < filter.length; i++) {
	filter[i].addEventListener('click', filterShow);
	filterValues.push({filter: filter[i].id, value: 30});
};

let mainInput = document.getElementsByTagName('input');
mainInput[0].addEventListener('click', saveActualValues);

// addEventListener passes as first argument the element which trigered the event
function filterShow(event) {
	let filter = event.srcElement;

	// fetch filter's label elements
	let filterLabel = document.getElementById('filterShow').getElementsByTagName('label');

	filterLabel[0].for = filter.id;
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
	console.log('value assigned');
};
