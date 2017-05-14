var dataAdded = $('#dataSent'); // the <ul>
var dataEntered = $('#data'); // the input

 function deleteItemFromServer (item) {
	$.ajax({
		type: 'DELETE',
		url: 'http://rest.learncode.academy/api/dragosbercea/mydata/' + item.id,
	});
}

function setUpNewDataValue (dataValue) {
	var listItem = $('<li>' + dataValue.dataValue + '</li>');
	var deleteButton = $('<button>' + 'done' + '</button>').on('click',function(){
		$(listItem,dataAdded).remove();
		deleteItemFromServer(dataValue);
	});				
	listItem.append(deleteButton);
	dataAdded.append(listItem);
}

$(function(){
	// Get all the data that has been sent up to the server, and 
	// display it on the webpage:
	$.ajax({ 
		type: 'GET',
		url: 'http://rest.learncode.academy/api/dragosbercea/mydata',
		success: function (data) {
			// iterate over each data item added to the server api
			// and add it to the ul with the id: dataSent
			$.each(data,function(index, value) {
				setUpNewDataValue(value);
			});
		},
		error: function () {alert("Error retreiving data!");}
	});

	$('#send').on('click', function () {
		var dataToSend = {
			dataValue: dataEntered.val(),
		};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/dragosbercea/mydata',
			data: dataToSend,
			success: function (dataSent) {
				setUpNewDataValue(dataSent);
			},
			error: function () {alert("Error sending data!");}
		});
	});

});

