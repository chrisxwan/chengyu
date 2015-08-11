$.get('http://ntireader.org/topic.php?english=Idiom', function (data) {
	console.log(data);
	var dom = $.parseHTML(data);
	var tr = $(dom).find('tr');
	var num = tr.length;
	var rand = Math.floor(Math.random() * num) + 1;
	var outer = $(tr).get(rand);
	var inner = $(outer).contents();
	var simplified = $(inner).get(0).innerHTML;
	var traditional = $(inner).get(1).innerHTML;
	if(!traditional) {
		simplified = traditional;
	}
	var pinyin = $(inner).get(2).innerHTML;	
	var definition = $(inner).get(3).innerHTML;
});