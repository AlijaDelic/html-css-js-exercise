$(document).ready(function () {
	
	//array for saving data's
	var texts = new Array();
	
	//checking is local storage null
	tempText = JSON.parse(localStorage.getItem("text"));
	if (tempText != null) {
		texts = tempText;
	};
	
	//function for finding index of array
	function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
       }
    }
    return -1;
	}
	
	//showing the results from localstorage
	for (var i = 0; i < texts.length; i++) {
		
		var isChecked;
		
		if(texts[i]['checked']){
			isChecked = "checked";
		}else{
			isChecked = "";
		}
		
		$("table").append("<tr class='"+isChecked+"'><td class='first'>" + texts[i]['value']+ "</td>" +
		"<td class='second'><input type='checkbox'"+ isChecked+"></td>" +
		"<td class='third'><i class='material-icons'>delete</i></td>" +
		"</tr>" );
	}

	//adding items to to-do list
	$("#add_new").on("click", function () {
		text = $("#type_in").val();
		text = $.trim(text);
	
		if(text != ""){
			
			var element = new Object();
			element['value'] = text;
			element['checked'];
			texts.push(element);
			localStorage.setItem("text", JSON.stringify(texts));
			
			$("table").append("<tr><td class='first'>" + text + "</td>" +
			"<td class='second'><input type='checkbox'"+ isChecked +"></td>" +
			"<td class='third'><i class='material-icons'>delete</i></td>" +
			"</tr>");		
		}	
	});
	
	//deleting from list
	$("body").on("click", ".third", function () {
		
		var textToCompare = $(this).parent().find(".first").text();
		var index = findWithAttr(texts,'value',textToCompare);
		texts.splice(index,1);
		$(this).parent().hide();
		localStorage.setItem("text", JSON.stringify(texts));
	});
		
	//adding a class on checked items
	$("body").on("change", "input[type=checkbox]", function () {
		var textToCompare = $(this).parent().parent().find(".first").text();
		var index = findWithAttr(texts,'value',textToCompare);
	
		if ($(this).prop("checked")) {
			$(this).parent().parent().addClass('checked');
			texts[index]['checked'] = true;
			localStorage.setItem("text", JSON.stringify(texts));
		}else{
			$(this).parent().parent().removeClass('checked');
			texts[index]['checked'] = false;
			localStorage.setItem("text", JSON.stringify(texts));
		}
	});
	
	//clear input field after adding new item
	$("body").on("click", "#add_new", function () {
		$("#type_in").val("");
	});
	
});