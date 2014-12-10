
template = '{{#.}}<p><a href="#" data-toggle="modal" data-target="#myModal" onclick="loadSingle(\'{{header}}\')"><span class="like-a-h">{{header}}</span></a><br><br>added by: <strong>{{author}}</strong> on <strong>{{date}}</strong><br><br>{{text}}<hr></p>{{/.}}';
withoutPaginTemplate = '{{#.}}<p><span class="like-a-h">{{header}}</span><br><br>added by: <strong>{{author}}</strong> on <strong>{{date}}</strong><br><br>{{text}}<hr></p>{{/.}}';
templateSingle = '{{#.}}<p><a href="#" data-toggle="modal" data-target="#myModal" onclick="loadSingle(\'{{header}}\')"><h6>{{header}}</h6></a><p>added on {{date}}</p><hr>{{/.}}';
sorryTemplate = '{{#.}}<center><h3>{{sorry}}</h3><br><br><p>{{text}}</p>{{/.}}';
imgTemplate = '{{#.}}<a href="{{href}}" title="{{title}}" data-gallery><img src="{{src}}"></img></a>';

function loadTemplate() {			 
	$.getJSON('js/json/content.json').done(function(jsondata) {
		$('#content-container')[0].innerHTML = Mustache.render(template, jsondata.articles);
		pagin();
		for(var i=0; i<jsondata.articles.length || i<5; i++){
			var obj = jsondata.articles[i];	  
			$('#last-headers-container'+i)[0].innerHTML = Mustache.render(templateSingle, jsondata.articles[i]);
		};
		$('#links')[0].innerHTML = Mustache.render(imgTemplate, jsondata.images);		   
	});
}

function showArticles () {
	$.getJSON('js/json/content.json').done(function(jsondata) {
		var startDate = new Date($('#start').val());
		var endDate = new Date($('#end').val());
		var showData = [];
		for(var i=0; i<jsondata.articles.length; i++){
	  		var obj = jsondata.articles[i];	  
	  		var objDate = new Date(obj.date);
	  		if (objDate >= startDate && objDate <= endDate) {
	  			showData.push(obj);	  	
	  		};
		};
		if (showData.length>0) {
			$('#modal-body1')[0].innerHTML = Mustache.render(withoutPaginTemplate, showData);		
		} else{
			var sorry = {
				sorry: 'SORRY',
				text: 'nothing to show =\('
			};
			$('#modal-body1')[0].innerHTML = Mustache.render(sorryTemplate, sorry);		
		};			   
	});			
}

function loadSingle(header) {
	$.getJSON('js/json/content.json').done(function(jsondata) {
		for(var i=0; i<jsondata.articles.length; i++){
	  		var obj = jsondata.articles[i];
	  		if (obj.header === header) {
	  			$('#modal-body')[0].innerHTML = Mustache.render(template, obj);	  	
	  		};
		};		   
	});			
}

function pagin() {
  $('.liPaginate').liPaginate({
    easing:'easeOutQuart',
    duration: 1000,       
    effect:'fade',       
    pagePos:'double',    
    pageHeight:1390,     
    maxPage:3            
  });
}

$(document).ready(		
	function () {		
		loadTemplate();	
		$('.input-daterange').datepicker({
		  weekStart: 1,
		  todayBtn: "linked"
		});							
	}
);


	  

