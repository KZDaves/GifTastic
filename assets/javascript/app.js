var topics = ["hedgehog", "cat", "puppy", "books", "napping", "sunshine", "Dean Martin", "parks", "tea", "rain storms"]; 


function createButtons(){
	for(var i = 0; i<topics.length; i++){
		var button = $("<button>");
		button.html(topics[i]);
		$(".buttons").append(button); 
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

$(".buttons button").on('click', function(){
	var currentTopic = $(this).text(); 
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LgFh8pOyjoAjBE9wnt0ImoP4m377kzdF&q=%22"+ currentTopic +"%22&limit=10"; 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		for(var i=0; i<response.data.length; i++){
			var img = $("<img>"); 
			img.attr("src", response.data[i].images.fixed_width_still.url); 
			$(".images").append(img); 
		}
		
	})
})

