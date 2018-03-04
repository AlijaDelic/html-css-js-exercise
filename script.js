$( document ).ready(function() {
	
	var texts = new Array();
	
	tempText = JSON.parse(localStorage.getItem("text"));
	if(tempText != null){
		texts = tempText;
	}
	
	for(var i=0; i<texts.length;i++){
		$("table").append("<tr><td class='first'>"+texts[i]+"</td>"+
		"<td class='second'><input type='checkbox'></td>"+
		"<td class='third'><i class='material-icons'>delete</i></td>"+
		"</tr>");
	}
	
	
    $("#add_new").on("click", function() {
        var text = $("#type_in").val();
		texts.push(text);
  		localStorage.setItem("text",JSON.stringify(texts));
		
		$("table").append("<tr><td class='first'>"+text+"</td>"+
		"<td class='second'><input type='checkbox'></td>"+
		"<td class='third'><i class='material-icons'>delete</i></td>"+
		"</tr>");
		
    });
	
	
	$("body").on("click",".third", function(){
		var text = $(this).parent().find(".first").val();
		$(this).parent().hide();
		var index=texts.indexOf(text);
		texts.splice(index, 1);
	});
		
	
	$("body").on("change","input[type=checkbox]",function(){
		 if ($(this).prop("checked")) {
			 $(this).parent().parent().addClass('checked')
		}else{
			 $(this).parent().parent().removeClass('checked')
		} 
	});
	$("body").on("click","#add_new", function(){
		$("#type_in").val("");
	});
	});

