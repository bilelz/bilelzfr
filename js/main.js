$(document).ready(function() {

	$('a[href^="#"]').click(function (){		
		$('html, body').animate({scrollTop:$($(this).attr("href")).offset().top-40}, 'slow');
		return false;
	});
	
	$('.hello').textillate({ loop: true,initialDelay: 1000, in: { effect: 'fadeInDown', loop: true, shuffle: true }, 
															out: { effect: 'hinge', loop: true, shuffle: true } });

	

	var rss = "https://api.twitter.com/1/statuses/user_timeline.rss?screen_name=bilelz";
	rss = "http://blog.bilelz.fr/feeds/posts/default";
	
	var nbPerColumn = 2;
	var nbPost = 6;
	$.ajax({
		url : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+nbPost+'&callback=?&q=' + encodeURIComponent(rss),
		dataType : 'json',
		success : function(data) {

			var tmpl = $("#blog-tmpl").html(), html = "";
			var feed = data.responseData.feed;

			//feed.entries[0].title = replaceURLWithHTMLLinks(feed.entries[0].title);
			/* set id & only one thunbmail*/
			
			for(var i in feed.entries){
				if(  i%nbPerColumn == 0){
					feed.entries[i].newdiv = "true";
				}
				//feed.entries[i].contentText = $.trim($(feed.entries[i].content).text()).replace(/\n\n/ig,"\n");
				feed.entries[i].img = $(feed.entries[i].content).find("img:first").attr("src");
				feed.entries[i].date = (new Date(feed.entries[i].publishedDate)).toLocaleDateString() + " " + (new Date(feed.entries[i].publishedDate)).toLocaleTimeString();
			}
			
			var html = Mustache.render(tmpl, feed);
			$('#blogrss').html("").append(html);

		}
	});
	
	// donate
	
	$(".quantity").change(function(){
		var total = 0;
		
		$(".quantity").each(function(){
			total += $(this).val()/2;
			//$(this).next(".coffeeResult").text(($(this).val()/2).toFixed(2) + " €");
		});
		
		$("#coffeeTotal").text((total.toFixed(2) + "€"));
		$("#amount").val(total.toFixed(2));
	}).keyup(function(){
		$(".quantity").change();
	});
	
	$(".quantity").change();




/* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        
            
            var bottom_of_object = $("#skills").position().top + $("#skills").outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                
                $("#skills").addClass("showAnimation");
                    
            }else{
            	$("#skills").removeClass("showAnimation");
            }
    
    });
    $(window).scroll();

	
	$('#resumejson').click(function (){		
		
		
		$.get('js/resume.mustache', function(templates) {// chargement des templates html pour les indicateurs et le consignateur
		
			var template = $(templates);
			var resumeTmpl = template.filter('#resume-tmpl').html();
			var resumetitleTmpl = template.filter('#resumetitle-tmpl').html();
			
			
			$.getJSON('js/resume.json', function(json){
				var html = Mustache.render(resumeTmpl, json);
				$("#resume .modal-body p").html("").append(html);
				
				html = Mustache.render(resumetitleTmpl, json);
				$("#resumetitle").html("").append(html);
				
				$('#resume').modal();
				document.location.hash = "resume";
			});
			
			
			
		});
		
		return false;
	});
	
	$('#resume').on('hide', function () {
	  /* remove hash # from url */		
		if(window.history && window.history.pushState){
			/* to really remove "#"  http://stackoverflow.com/a/5298684 */
			history.pushState("", document.title, window.location.pathname + window.location.search);
		}else{
			document.location.hash = "";
		}
	})
	
	if(location.hash == "#resume"){		
		$('#resumejson').click();
	}

	var map;
	function initialize() {
		var mapOptions = {
			zoom : 17,
			center : new google.maps.LatLng(48.858115, 2.294726),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
	
	
	var mapmedina;
	function initializeMedina() {
		var mapOptions = {
			zoom : 10,
			center : new google.maps.LatLng(24.460899,39.62019),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		mapmedina = new google.maps.Map(document.getElementById('map-medina'), mapOptions);
	}

	google.maps.event.addDomListener(window, 'load', initializeMedina);
	
	
});

function replaceURLWithHTMLLinks(text) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}