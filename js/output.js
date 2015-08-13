chrome.storage.sync.get("date", function (result) {
	console.log('grabbing date');
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth();
	var date = today.getDate();
	var dateString = year + '-' + month + '-' + date;
	if((+ new Date(dateString) !== + new Date(result.date))) {
		console.log(dateString);
		console.log(result.date);
		grab(dateString);	
	} else {
		chrome.storage.sync.get(["appendString", "imageString"], function (result) {
			$('.text').append(result.appendString);
			$('.image').append(result.imageString);
		});
	}
});

var grab = function (dateString) {
	$.get('http://ntireader.org/topic.php?english=Idiom', function (data) {
		var dom = $.parseHTML(data);
		var tr = $(dom).find('tr');
		var num = tr.length;
		var rand = Math.floor(Math.random() * num) + 1;
		var outer = $(tr).get(rand);
		var inner = $(outer).contents();
		var simplified = '<p id="simplified">Simplified: ' + $($(inner).get(0)).text() + '</p>';
		var traditional = '<p id="traditional">Traditional: ' + $($(inner).get(1)).text() + '</p>';
		if(!$($(inner).get(1)).text()) {
			traditional ='<p id="traditional">Traditional: ' + $($(inner).get(0)).text() + '</p>';
		}
		var pinyin = '<p id="pinyin">Pinyin: ' + $(inner).get(2).innerHTML + '</p>';	
		var definition = '<p id="definition">Definition: ' + $(inner).get(3).innerHTML + '</p>';
		var appendString = simplified + traditional + pinyin + definition;
		$('.text').append(appendString);
		var searchString = $(inner).get(3).innerHTML.split(' ').join('+');
		var search = $(inner).get(3).innerHTML;
		search = search.replace('/', '');
		$.get('https://nounproject-bridge.herokuapp.com/top/' + search, function (data) {
			console.log(data);
			var imageURL = data["image"];
			var imageString;
			if(imageURL === null) {
				imageString = '<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/22717-200.png"/><div class="noImage">No relevant image was found ):</div>';
			} else {
				imageString = '<img src="' + imageURL + '"/>';
			}
			$('.image').append(imageString);
			chrome.storage.sync.set({
				date: dateString,
				appendString: appendString,
				imageString: imageString
			});
		});
	});
}