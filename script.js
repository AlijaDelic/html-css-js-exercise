$(document).ready(function () {	
	
	//function for export
	function saveContentAsFile(t){
			var contentToSave = JSON.parse(localStorage.getItem("text"));
			var textToSaveAsBlob =  new Blob([JSON.stringify(contentToSave, null, 2)], {type : 'application/json'});
			var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
			var fileNameToSaveAs = "to_do_list";

			var downloadLink = document.createElement("a");
			downloadLink.download = fileNameToSaveAs;
			downloadLink.innerHTML = "Download File";
			downloadLink.href = textToSaveAsURL;
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);

			downloadLink.click();	
	}
	
	function destroyClickedElement(event){
		document.body.removeChild(event.target);
	}
	
	//calling the function
	$("body").on("click","#export",function(){
		saveContentAsFile("text");
	});
	
	//function for import
	function loadFileAsText(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];
 
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
		localStorage.setItem("text", textFromFileLoaded);
    };
		
    fileReader.readAsText(fileToLoad, "UTF-8");
	}
	
	//caling the function
	$("body").on("click","#import",function(){
		loadFileAsText();
		location.reload();
	});
	
	//array for saving data's
	var texts = new Array();
	
	//checking is local storage null
	tempText = JSON.parse(localStorage.getItem("text"));
	if (tempText != null) {
		texts = tempText;
	};

	//function for finding index of array
	function findWithAttr(array, attr, value) {
		for (var i = 0; i < array.length; i += 1) {
			if (array[i][attr] === value) {
				return i;
			}
		}
		return -1;
	}

	//showing the results from localstorage
	for (var i = 0; i < texts.length; i++) {

		var isChecked;

		if (texts[i]['checked']) {
			isChecked = "checked";
		} else {
			isChecked = "";
		}

		$("table").append("<tr class='" + isChecked + "'><td class='first'>" + texts[i]['value'] + "</td>" +
			"<td class='second'><input type='checkbox'" + isChecked + "></td>" +
			"<td class='third'><i class='material-icons'>delete</i></td>" +
			"</tr>");
	}

	//adding items to to-do list
	$("#add_new").on("click", function () {
		text = $("#type_in").val();
		text = $.trim(text);

		if (text != "") {
			var element = new Object();
			element['value'] = text;
			element['checked'];
			texts.push(element);
			localStorage.setItem("text", JSON.stringify(texts));

			$("table").append("<tr><td class='first'>" + text + "</td>" +
				"<td class='second'><input type='checkbox'" + isChecked + "></td>" +
				"<td class='third'><i class='material-icons'>delete</i></td>" +
				"</tr>");
		}
	});

	//deleting from list
	$("body").on("click", ".third", function () {

		var textToCompare = $(this).parent().find(".first").text();
		var index = findWithAttr(texts, 'value', textToCompare);
		texts.splice(index, 1);
		$(this).parent().hide();
		localStorage.setItem("text", JSON.stringify(texts));
	});

	//adding a class on checked items
	$("body").on("change", "input[type=checkbox]", function () {
		var textToCompare = $(this).parent().parent().find(".first").text();
		var index = findWithAttr(texts, 'value', textToCompare);

		if ($(this).prop("checked")) {
			$(this).parent().parent().addClass('checked');
			texts[index]['checked'] = true;
			localStorage.setItem("text", JSON.stringify(texts));
		} else {
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