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
		chrome.storage.sync.get("appendString", function (result) {
			var appendString = result.appendString;
			$('.text').append(appendString);
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
			traditional = simplified;
		}
		var pinyin = '<p id="pinyin">Pinyin: ' + $(inner).get(2).innerHTML + '</p>';	
		var definition = '<p id="definition">Definition: ' + $(inner).get(3).innerHTML + '</p>';
		var appendString = simplified + traditional + pinyin + definition;
		chrome.storage.sync.set({
			date: dateString,
			appendString: appendString
		}, function() {
			$('.text').append(appendString);
		});
	});
}