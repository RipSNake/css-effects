

window.onload = function() { console.log('window loaded')} ;

var dropI = document.getElementById('filter-selector').getElementsByClassName('dropdown-item');

var filterValue = [];

for(let i = 0; i < dropI.length; i++) {
	dropI[i].addEventListener('click', filterShow);
	filterValue.push({filter: dropI[i].innerHTML, value: 30});
};

// addEventListener passes as first argument the element which trigered the event
function filterShow(filter) {
	let f = document.getElementById('filterShow').getElementsByTagName('label');
	f[0].innerHTML = filter.srcElement.innerHTML;
	let v = document.getElementsByTagName('input');
	for(let i = 0; i < v.legth; i++){
		if(v[i].name === f[0].innerHTML) {
			filterValue.forEach(function(el) { console.log(el) }); 
		}
	}
};