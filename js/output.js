chrome.storage.sync.get("date", function (result) {
	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth():
	var date = today.getDate();
	var dateString = year + '-' + month + '-';
	if(result === undefined || (+ new Date(dateString) !== + new Date(result.date))) {
		chrome.storage.sync.set({
			dateString: dateString
		});
		var appendString = grab();
		chrome.storage.sync.set({
			appendString: appendString
		});
	}
	
});

var grab = function() {
	$.get('http://ntireader.org/topic.php?english=Idiom', function (data) {
		console.log(data);
		var dom = $.parseHTML(data);
		var tr = $(dom).find('tr');
		var num = tr.length;
		var rand = Math.floor(Math.random() * num) + 1;
		var outer = $(tr).get(rand);
		var inner = $(outer).contents();
		var simplified = '<p id="simplified">Simplified: ' + $($(inner).get(0)).text() + '</p>';
		var traditional = '<p id="traditional">Traditional: ' + $($(inner).get(1)).text() + '</p>';
		if(!traditional) {
			simplified = traditional;
		}
		var pinyin = '<p id="pinyin">Pinyin: ' + $(inner).get(2).innerHTML + '</p>';	
		var definition = '<p id="definition">Definition: ' + $(inner).get(3).innerHTML + '</p>';
		var appendString = simplified + traditional + pinyin + definition;
		return appendString;
	});
}