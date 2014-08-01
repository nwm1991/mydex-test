﻿// This function creates a standard table with column/rows
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateTableView(objArray, theme, enableHeader) {
    // set optional theme parameter
    if (theme === undefined) {
        theme = 'mediumTable'; //default theme
    }

    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }

    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    
    var str = '<table class="' + theme + '">';

    // table head
    if (enableHeader) {
        str += '<thead><tr>';
        for (var index in array[0]) {
            str += '<th scope="col">' + index + '</th>';
        }
        str += '</tr></thead>';
    }

    // table body
    str += '<tbody>';
    for (var i = 0; i < array.length; i++) {
        str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
        for (var index in array[i]) {
		// the script dident support nested data by defult so i had to modify it to work this is what i did
            if (array[i][index] !== null && typeof array[i][index] === 'object') {
		
		var loop = array[i][index] ;
		loop = JSON.stringify(loop);
		
		loop = '[' + loop + ']'
            str += '<td>' + CreateDetailView( loop, "lightPro", true)  + '</td>';
			}
			else {
			
			// this enables the last cell that contains the value to be edited i was going to use this for updating data in the pds
			str += "<td contenteditable='true'>" + array[i][index] + '</td>';
			
			}
        }
        str += '</tr>';
    }
    str += '</tbody>'
    str += '</table>';
    return str;
}

// This function creates a details view table with column 1 as the header and column 2 as the details
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateDetailView(objArray, theme, enableHeader) {
    // set optional theme parameter
    if (theme === undefined) {
        theme = 'mediumTable';  //default theme
    }

    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }
    var array = typeof objArray != 'object' ?  JSON.parse(objArray) : objArray;
	
    var str = '<table class="' + theme + '">';
	
    str += '<tbody>';
    
    for (var i = 0; i < array.length; i++) {
	
        var row = 0;
        for (var index in array[i]) {
            str += (row % 2 == 0) ? '<tr class="alt">' : '<tr>';

            if (enableHeader) {
                str += '<th scope="row">' + index + '</th>';
            }
			// the script dident support nested data by defult so i had to modify it to work this is what i did
			if (array[i][index] !== null && typeof array[i][index] === 'object') {
		
		var loop = array[i][index] ;
		loop = JSON.stringify(loop);
		
		loop = '[' + loop + ']'
            str += '<td>' + CreateDetailView( loop, "lightPro", true)  + '</td>';
			}
			else {
			
			// this enables the last cell that contains the value to be edited i was going to use this for updating data in the pds
			str += "<td contenteditable='true'>" + array[i][index] + '</td>';
			
			}
            str += '</tr>';
            row++;
        }
    }
    str += '</tbody>'
	
    str += '</table>';
    return str;
}





// i duplicated the detail table so that i could have the first cell detale the second defult and then the rest detail
function CreateFirstView(objArray, theme, enableHeader) {
    // set optional theme parameter
    if (theme === undefined) {
        theme = 'mediumTable';  //default theme
    }

    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }
    var array = typeof objArray != 'object' ?  JSON.parse(objArray) : objArray;

    var str = '<table class="' + theme + '">';
	
    str += '<tbody>';
  
    for (var i = 0; i < array.length; i++) {
	
        var row = 0;
        for (var index in array[i]) {
            str += (row % 2 == 0) ? '<tr class="alt">' : '<tr>';

            if (enableHeader) {
                str += '<th scope="row">' + index + '</th>';
            }
			// the script dident support nested data by defult so i had to modify it to work this is what i did
			if (array[i][index] !== null && typeof array[i][index] === 'object') {
		
		var loop = array[i][index] ;
		loop = JSON.stringify(loop);
		
		loop = '[' + loop + ']'
            str += '<td>' + CreateTableView( loop, "lightPro", false)  + '</td>';
			}
			else {
			
			// this enables the last cell that contains the value to be edited i was going to use this for updating data in the pds
			str += "<td contenteditable='true'>" + array[i][index] + '</td>';
			
			}
            str += '</tr>';
            row++;
        }
    }
    str += '</tbody>'
	
    str += '</table>';
    return str;
}