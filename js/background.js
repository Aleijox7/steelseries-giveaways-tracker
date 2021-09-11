chrome.runtime.onInstalled.addListener(function() {
	var idsGiveaways = [1828378856];
	var urls = {
		1828378856: 'https://games.steelseries.com/giveaway/1828378856/dead-by-daylight-raising-dlc-hell-key-giveaway',
		18283788562: 'https://www.lyrics.com/lyrics/waiting%20room',
	};

	var inQueue = false;

	var audioElement = new Audio("../audio/bell.mp3");

	const synth = window.speechSynthesis;

	function checkGiveaways() {
		if (inQueue == false) {
			$.each(idsGiveaways, function (key, idGiveaway) {
				$.ajax({
					url: urls[idGiveaway],
					type: 'get',
					success: function (webContent) {
						if (webContent.includes("waiting room")) {
							inQueue = true;
							window.open(urls[idGiveaway], '_blank').focus();
							console.log('%cIN QUEUE','background:red;color:#fff');

							textToSpeech('Estás en cola');
						}
					}
				});
			});
		}

		$.ajax({
			url: 'https://api.igsp.io/promotions',
			type: 'get',
			success: function (giveaways) {
				$.each(giveaways, function (key, giveaway) {
					if ($.inArray(giveaway.id, idsGiveaways) !== -1) {
						if (giveaway.percentRemaining > 0 || giveaway.numberTotal > giveaway.numberClaimed) {
							console.log(giveaway);

							playAudio('Quedan un total de ' + parseInt(parseInt(giveaway.numberTotal) - parseInt(giveaway.numberClaimed)) + ' keys');

							clearInterval(giveawayInterval);
							if (inQueue == false) {
								window.open(urls[giveaway.id], '_blank').focus();
							}
						}
					}
				});
			}
		});
	};

	function playAudio(msg = null) {
		audioElement.play();
		setInterval(function(){
			audioElement.pause()
		}, 11500);

		if (typeof msg !== 'undefined') {
			textToSpeech(msg);
		}
	}

	function textToSpeech(text) {
		var textToSpeechSynth = new SpeechSynthesisUtterance(text);
		synth.speak(textToSpeechSynth);
	}

	var giveawayInterval = setInterval(checkGiveaways, 10000);
});

chrome.extension.onConnect.addListener(function(port) {
	console.log("Connected .....");
	port.onMessage.addListener(function(msg) {
		 console.log("message recieved" + msg);
		 port.postMessage("Hi Popup.js");
	});
})