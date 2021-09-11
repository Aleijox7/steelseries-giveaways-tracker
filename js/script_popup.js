var port = chrome.extension.connect({
	name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
	console.log("message recieved" + msg);
});

$(document).ready(function(){
	$(function () {
		$(".manipulator").load("../html/banner.html");
	});
});

