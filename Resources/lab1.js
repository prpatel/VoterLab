var voteWinButton = Titanium.UI.createButton({
	color:'#abcdef',
	top:110,
	width:100,
	height:40,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Vote'
});

var shareWinButton = Titanium.UI.createButton({
	color:'#000',
	top:160,
	width:100,
	height:40,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Share'
});

var buttonLabel = Titanium.UI.createLabel({
	color:'#abcdef',
	highlightedColor:'#0f0',
	backgroundColor:'transparent',
	width:'200',
	height:'auto',
	top:300,
	text:'Please select one of the above options'
});

Ti.UI.currentWindow.add(voteWinButton);
Ti.UI.currentWindow.add(shareWinButton);
Ti.UI.currentWindow.add(buttonLabel);


var voteWin = Titanium.UI.createWindow({
title : 'Vote',
backButtonTitle : 'Login',
navBarHidden : false,
backgroundColor: '#000'
});

var shareWin = Titanium.UI.createWindow({
title : 'Share',
backButtonTitle : 'Login',
navBarHidden : false,
backgroundColor: '#000'
});

voteWinButton.addEventListener('click', function() {
		Titanium.UI.currentTab.open(voteWin, {
			animated : true
		});
});

shareWinButton.addEventListener('click', function() {
		Titanium.UI.currentTab.open(shareWin, {
			animated : true
		});
});