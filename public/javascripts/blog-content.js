//pagination init
function pagin() {
	$('.liPaginate').liPaginate({
		easing:'easeOutQuart',
		duration: 1000,
		effect:'fade',
		pagePos:'double',
		pageHeight:1400,
		maxPage:3
	});
}

//render articles
function loadTemplate() {
	$.getJSON('/posts/postlist', function(jsondata) {
		$('#articles-container').html(Mustache.render(template, jsondata));
		pagin();
		for(var i=0; i<=jsondata.length || i<5; i++){
			$('#last-headers-container'+i).html(Mustache.render(templateSingle, jsondata[i]));
		}
	});
}

//show articles for chosen dates
function showArticles () {
	$.getJSON('/posts/postlist', function(jsondata) {
		var startDate = $('#start').datepicker('getDate');
		var endDate = $('#end').datepicker('getDate');
		endDate.setDate(endDate.getDate()+1);
		var showData = [];
		for(var i=0; i<jsondata.length; i++){
	  		var obj = jsondata[i];
	  		var objDate = new Date(obj.date);
	  		if (objDate.getTime() >= startDate.getTime() && objDate.getTime() <= endDate.getTime()) {
	  			showData.push(obj);	  	
	  		}
		}
		if (showData.length>0) {
			$('#modal-body1').html(Mustache.render(withoutPaginTemplate, showData));
		} else{
			var sorry = {
				sorry: 'SORRY',
				text: 'nothing to show =\('
			};
			$('#modal-body1').html(Mustache.render(sorryTemplate, sorry));
		};
	});			
}

//formate date to string
function formatDate(d) {
	var dd = d.getDate()
		if ( dd < 10 ) dd = '0' + dd

	var mm = d.getMonth()+1
		if ( mm < 10 ) mm = '0' + mm

	var yy = d.getFullYear() % 100
		if ( yy < 10 ) yy = '0' + yy

	return dd+'/'+mm+'/'+yy
}

//render single article
function loadSingle(_id) {
	$.getJSON('/posts/postlist', function(jsondata) {
		for(var i=0; i<jsondata.length; i++){
	  		var obj = jsondata[i];
	  		if (obj._id === _id) {
	  			$('#modal-body').html(Mustache.render(withoutPaginTemplate, obj))
	  		};
		};		   
	});			
}

// Add new article
function addPost(event) {
	event.preventDefault();

	// basic validation
	var errorCount = 0;
	$('#add-content-container input').each(function(index, val) {
		if($(this).val() === '') { errorCount++; }
	});
	if($('#add-content-container textarea').val() === '') { errorCount++; }

	if(errorCount === 0) {
		var date = new Date()
		var newPost = {
			'author': $('#add-content-container input#inputAuthor').val(),
			'date': date,
			'textDate': formatDate(date),
			'header': $('#add-content-container input#inputHeader').val(),
			'text': $('#add-content-container textarea#inputText').val()
		}

		$.ajax({
			type: 'POST',
			data: newPost,
			url: '/posts/addpost',
			dataType: 'JSON'
		}).done(function (response) {
			if (response.msg === '') {
				// Clear the form inputs
				$('#add-content-container input').val('');
				$('#add-content-container textarea').val('');
				// Update main page
				loadTemplate();
			}
			else {
				alert('Error: ' + response.msg);
			}
		});
	}
};

// Delete Post
function deletePost(event) {
	event.preventDefault();

	// Pop up a confirmation dialog
	var confirmation = confirm('Are you sure you want to delete this post?')
	if (confirmation === true) {

		$.ajax({
			type: 'DELETE',
			url: '/posts/deletepost/' + $(this).attr('rel')
		}).done(function( response ) {
			if (response.msg === '') {
			}
			else {
				alert('Error: ' + response.msg);
			}
			// Update main page
			loadTemplate();
		});
	}
	else {
		return false;
	}
};

$(window).load(
	function () {
		//render main page
		loadTemplate();

		//datepicker init
		$('.input-daterange').datepicker({
			format: "dd/mm/yyyy",
		  	weekStart: 1,
		  	todayBtn: "linked",
			todayHighlight: true
		});

		//load imgs for gallery from json
		$.getJSON('/javascripts/json/content.json', function(jsondata) {
			$('#links').html(Mustache.render(imgTemplate, jsondata.imgs));
		});

		//Delete post link click
		$('#content-container').on('click', 'a.linkdeletepost', deletePost);

		// Add Post button click
		$('#btnAddPost').on('click', addPost);
	}
);


	  

