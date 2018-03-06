$(document).ready(function () {
	
	var texts = new Array();
	
	tempText = JSON.parse(localStorage.getItem("text"));
	
	if (tempText != null) {
		
		texts = tempText;
	}
	
	for (var i = 0; i < texts.length; i++) {
		
		$("table").append("<tr><td class='first'>" + texts[i] + "</td>" +
		"<td class='second'><input type='checkbox'></td>" +
		"<td class='third'><i class='material-icons'>delete</i></td>" +
		"</tr>" );
	}


	$("#add_new").on("click", function () {
		
		var text = $("#type_in").val();
		texts.push(text);
		localStorage.setItem("text", JSON.stringify(texts));
		$("table").append("<tr><td class='first'>" + text + "</td>" +
		"<td class='second'><input type='checkbox'></td>" +
		"<td class='third'><i class='material-icons'>delete</i></td>" +
		"</tr>");
	});
	

	$("body").on("click", ".third", function () {
		
		var t=$(this).parent().find(".first").text();
		var d= texts.indexOf(t);
		texts.splice(d,1);
		console.log(texts);
		$(this).parent().hide();
		localStorage.setItem("text", JSON.stringify(texts));
	});
		
	
	$("body").on("change", "input[type=checkbox]", function () {
		
		 if ($(this).prop("checked")) {
			 $(this).parent().parent().addClass('checked');
		}else{
			 $(this).parent().parent().removeClass('checked');
		}
	});
	
	
	$("body").on("click", "#add_new", function () {
		$("#type_in").val("");
	});
});