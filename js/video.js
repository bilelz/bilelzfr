var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player('video-yt', {
		height : '175',
		width : '310',
		videoId : 'uGEFVMdoG74',
		
		playerVars  : {controls :'0'},
		events : {
			'onReady' : onPlayerReady,
			'onStateChange' : onPlayerStateChange
		}
	});

}

function onPlayerReady(event) {
	
	event.target.seekTo(223);
	event.target.pauseVideo();
	event.target.setVolume(0);
	$("#video-time-slide").val(223/player.getDuration()*1000);
	$("#video-time-duration").text(toHHMMSS(player.getDuration()));
	$("#video-time-current").text(toHHMMSS(233));//.css("left",233/player.getDuration()*100+"%");
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		$("#video-status").addClass("play");
	} else {
		$("#video-status").removeClass("play");
	}
}
var videoStatusTimeInterval;

function timeStatusStart() {	
	videoStatusTimeInterval = setInterval(function(){
		timeStatusTimeSet(player.getCurrentTime());
	},500);
}

function timeStatusTimeSet(_value){
	$("#video-time-slide").val(_value/player.getDuration()*1000);
	$("#video-time-current").text(toHHMMSS(_value));//.css("left",_value/player.getDuration()*100+"%");
	
}

function timeStatusStop() {	
	clearInterval(videoStatusTimeInterval);
}

$(document).ready(function() {

	
	$("#video-status").click(function(){
		if (player.getPlayerState() == YT.PlayerState.PLAYING) {
			player.pauseVideo();
			timeStatusStop();
		} else {
			player.playVideo();
			timeStatusStart();
		}
	});
	
	$("#video-time-slide").change(function(){
		player.seekTo((player.getDuration())*($(this).val()/1000));
		$("#video-time-current").text(toHHMMSS(player.getCurrentTime()));//.css("left",player.getCurrentTime()/player.getDuration()*100+"%");
	});
	
	$("#video-fs").click(function(){
		
			if($("#video").hasClass("fullscreen")){
				cancelFullscreen();
				$("#video").removeClass("fullscreen");
			}
			else{
				// Once the user clicks a custom fullscreen button
			var el = document.getElementById('video');
			$("#video").addClass("fullscreen");
			if (el.requestFullScreen) {
				el.requestFullScreen();
			} else if (el.mozRequestFullScreen) {
				el.mozRequestFullScreen();
			} else if (el.webkitRequestFullScreen) {
				el.webkitRequestFullScreen();
			}else{
				$("#video").removeClass("fullscreen");
			}
			}
			
			
		})

	
});


function cancelFullscreen(){
    if(document.cancelFullScreen) {
            //fonction officielle du w3c
            document.cancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
            //fonction pour Google Chrome
            document.webkitCancelFullScreen();
    } else if(document.mozCancelFullScreen){
            //fonction pour Firefox
            document.mozCancelFullScreen();
    }
 
}

document.addEventListener("fullscreenchange", function () {
    if(document.fullscreen){
    	$("#video").addClass("fullscreen");
    }else{
    	$("#video").removeClass("fullscreen");
    }
}, false);

document.addEventListener("mozfullscreenchange", function () {
    if(document.mozFullScreen){
    	$("#video").addClass("fullscreen");
    }else{
    	$("#video").removeClass("fullscreen");
    }
}, false);

document.addEventListener("webkitfullscreenchange", function () {
    if(document.webkitIsFullScreen){
    	$("#video").addClass("fullscreen");
    }else{
    	$("#video").removeClass("fullscreen");
    }
}, false);

function toHHMMSS(_str){

	try {
		sec_numb = parseInt(_str, 10);
		var hours = Math.floor(sec_numb / 3600);
		var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
		var seconds = sec_numb - (hours * 3600) - (minutes * 60);

		if (minutes < 10 && hours > 0) {
			minutes = "0" + minutes;
		}
		if (seconds < 10 && (minutes != "00" || hours > 0)) {
			seconds = "0" + seconds;
		}

		var time = seconds + '';

		if (minutes != "00") {
			time = minutes + ':' + time;
		}
		if (hours != "00") {
			time = hours + ':' + time;
		}

		return time;
	} catch(e) {
		return _str;
	}    
}