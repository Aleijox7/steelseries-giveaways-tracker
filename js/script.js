$(document).ready(function(){
	console.log(document);
	var idsGiveaways = [1828378856];
	var urls = {
		1828378856 : 'https://games.steelseries.com/giveaway/1828378856/dead-by-daylight-raising-dlc-hell-key-giveaway'
	};
	
	var banner = $.get("../html/banner.html", function(response) {
		console.log(response);
		return response;
	});

	$('body').find(".manipulator").each(function(index, element){
		$(this).html(banner);
		
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', '../audio/bell.mp3');
		
		audioElement.addEventListener("canplay",function(){
			$('body').find("#status").text("Status: WAITING").css("color","green");
		});
		
		$('body').find('#play').click(function() {
			console.log('click');
			audioElement.play();
		});
		
		$('body').find('#pause').click(function() {
			console.log('click');

			audioElement.pause();
			$('body').find("#status").text("Status: STOPED");
		});
		
		$('body').find('#restart').click(function() {
			console.log('click');

			$('body').find("#status").text("Status: TRACKING GIVEAWAYS");
			startCheck();
		});

		function checkGiveaways(){
			$.ajax({
				url: 'https://api.igsp.io/promotions',
				type: 'get',
				success: function (giveaways) {
					$.each(giveaways, function(key, giveaway){
						if($.inArray(giveaway.id,idsGiveaways) !== -1) {
							if (giveaway.percentRemaining > 0 || giveaway.numberTotal > giveaway.numberClaimed) {
								console.log(giveaway);
								audioElement.play();
								if (typeof giveawayInterval !=='undefined') {
									clearInterval(giveawayInterval);
								}
								//window.open(urls[giveaway.id], '_blank').focus();
							}
						}
					});
				}
			});
		};

		function startCheck() {
			var giveawayInterval = setInterval(checkGiveaways, 10000);
			checkGiveaways();
		}

		startCheck();
	});

	console.log("done");
});