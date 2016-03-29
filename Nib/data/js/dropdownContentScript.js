
self.port.on(HOME, function (storage) {

	for (let i = 0; i < storage.length; i++){
		if ($('#' + i).val() === 'null' || $('#' + i).val() === '') {
			continue;
		}
		$('#projects').append('<h6 id=' + i + '>' + storage[i].name + '</h6>')
	}
});

$("#submitNewProject").click(function(){
	self.port.emit(ADD_NEW_PROJECT, $("#project_name").val())
	$("html").load('dropdown.html')
	self.port.emit(SEND_STORAGE, HOME)
})

$('#options').click(function(){
	console.log('options')
})

$('#home').click(function(){
	self.port.emit(SEND_STORAGE, HOME)
})

self.port.on('getURLResponse', function (url) {

})
