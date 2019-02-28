var topics = ["hedgehog", "cat", "puppy", "books", "napping", "sunshine", "Dean Martin", "parks", "tea", "rain storms"]; 


function createButtons(){
	for(var i = 0; i<topics.length; i++){
		var button = $("<button>");
		button.html(topics[i]);
		$(".buttons").append(button); 
	}
}

function createImages(api){
	for(var i=0; i<api.data.length; i++){
			var gif = $("<div>"); 
			gif.attr("class", "gif")
			gif.append(`<img src="${api.data[i].images.fixed_width_still.url}" 
				data-still="${api.data[i].images.fixed_width_still.url}"
				data-active="${api.data[i].images.fixed_width.url}"
				data-status="still">`); 
			gif.append(`Rating: ${api.data[i].rating}`)
			$("#images").append(gif); 
	}
}

createButtons();

$("form button").on('click', function(){
	event.preventDefault();
	if(topics.includes($("input").val().toLowerCase())){
		alert("That's already listed!"); 
		return; 
	}
	$(".buttons").empty();
	topics.push($("input").val());
	createButtons(); 
})

$(document).on('click', ".buttons button", function(){
	$("#images").empty(); 
	var currentTopic = $(this).text(); 
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LgFh8pOyjoAjBE9wnt0ImoP4m377kzdF&q=%22"+ currentTopic +"%22&limit=10"; 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		createImages(response);  
	})
})

$(document).on("click", ".gif img",function(){
	if($(this).attr('data-status')=="still"){
		$(this).attr('src', $(this).attr('data-active')); 
		$(this).attr('data-status', "active"); 
	}else{
		$(this).attr('src', $(this).attr('data-still')); 
		$(this).attr('data-status', "still"); 
	}
})

