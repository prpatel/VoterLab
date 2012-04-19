
var view = Ti.UI.createView({
    backgroundColor:'#000',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    layout:'vertical'
});
// create labels, buttons, text fields

var helpLabel = Titanium.UI.createLabel({
	color:'#abcdef',
	highlightedColor:'#0f0',
	backgroundColor:'transparent',
	width:'auto',
	height:'auto',
	text:'Pick your selection and touch submit'
});

var submitButton = Titanium.UI.createButton({
	color:'#abcdef',
	top: 20,
	width:200,
	height:40,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Submit'
});

submitButton.addEventListener('click', function() {
	storeData();
	//submitData();
	
});

var resultsButton = Titanium.UI.createButton({
	color:'#abcdef',
	top: 20,
	width:200,
	height:40,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Results'
});

resultsButton.addEventListener('click', function() {
	showResults();
});

var historyButton = Titanium.UI.createButton({
	color:'#abcdef',
	top: 20,
	width:200,
	height:40,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Show DB History'
});

historyButton.addEventListener('click', function() {
	showDBHistory();
});

var radioGroup = [];
var radioGroupIndex = 0;
var radioSelected;

function createRadioGroupButton(itemName) {
	var buttonView1 = Titanium.UI.createView({
		top: 10, left: 0, height: 50, width: 200,
		borderRadius: 10,
		backgroundColor: '#fff',
		index: radioGroupIndex 
	});
	var selection1 = Titanium.UI.createLabel({
		text : itemName,
		color : '#f79e18',
		font : {fontSize : 40},
		textAlign: 'center' });
	buttonView1.add(selection1);
	
	buttonView1.addEventListener('click', function() {
		buttonView1.backgroundColor = '#cef7ff';
		radioSelected = selection1.text;
		Ti.API.log("DEBUG",'selection1.text'+selection1.text);
		for (var i=0; i < radioGroup.length; i++) {
		  deselect(i,index);
		};
	});
	
	var index = radioGroupIndex;
	
	deselect = function (i,j) {
		//Ti.API.log("DEBUG",'deselect:'+radioGroup[i].index);
		if (radioGroup[i].index != j) {
			radioGroup[i].radioButton.backgroundColor = '#fff';
		}
	}
	radioGroupIndex = radioGroupIndex +1;
	
	var exportWidget = {
		radioButton: buttonView1,
		deselect: deselect, 
		index: index};
		
	radioGroup.push(exportWidget); 
	return exportWidget;
}

view.add(helpLabel);
view.add(createRadioGroupButton('Fish').radioButton);
view.add(createRadioGroupButton('Vegetarian').radioButton);
view.add(createRadioGroupButton('Chicken').radioButton);
view.add(submitButton);
view.add(resultsButton);
view.add(historyButton);

Ti.UI.currentWindow.add(view);

function submitData() {
	
	var jsonData = {vote : {username: 'Joe Bloggs', votedItem: radioSelected}};
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function()
	{
		alert('POSTed to server with response:'+this.responseText);
	};
	xhr.onerror = function(e)
	{
		alert('Unable to post to server:'+e.error);
	};
	xhr.open("POST","http://localhost:3000/lab/ballot/all.json");
	xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
	xhr.send(JSON.stringify(jsonData));	
}

function showResults() {
	var jsonData;
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function()
	{
		//alert('Response:'+this.responseText);
		jsonData = JSON.parse(this.responseText);
		Ti.API.log("DEBUG",jsonData);
		showPopupResults(jsonData);
	};
	xhr.onerror = function(e)
	{
		alert('Unable to post to server:'+e.error);
	};
	xhr.open("POST","http://localhost:3000/lab/tally/all.json");
	xhr.send();	
}

function showPopupResults(jsonData) {
	var resultView = Ti.UI.createView({
	    backgroundColor:'#000',
	    width: '100%',
	    height:'100%',
	    layout:'vertical'
	});
	
	for (i in jsonData) {
		Ti.API.log("DEBUG",i + ' ' + jsonData[i]);
		resultView.add(Titanium.UI.createLabel({
			color:'#abcdef',
			highlightedColor:'#0f0',
			backgroundColor:'transparent',
			width:'auto',
			height:'auto',
			text: i
		}));
		resultView.add(Titanium.UI.createLabel({
			color:'#abcdef',
			highlightedColor:'#0f0',
			backgroundColor:'transparent',
			width:'auto',
			height:'auto',
			text: jsonData[i]
		}));
	}
		
		var closeButton = Titanium.UI.createButton({
			color:'#abcdef',
			top: 20,
			width:200,
			height:40,
			font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
			title:'Close'
		});
		
		closeButton.addEventListener('click', function() {
			resultView.hide();
		});
		resultView.add(closeButton);
		Ti.UI.currentWindow.add(resultView);
		resultView.show();	
}

function storeData() {
var db = Titanium.Database.open('voteDB');

db.execute('CREATE TABLE IF NOT EXISTS vote  (username TEXT, votedItem TEXT)');
db.execute('INSERT INTO vote (username, votedItem ) VALUES(?,?)', 'Joe Bloggs', radioSelected);
Ti.API.log("DEBUG",'rowsAffected:'+db.rowsAffected);
}

function showDBHistory() {
	var resultView = Ti.UI.createView({
	    backgroundColor:'#000',
	    width: '100%',
	    height:'100%',
	    layout:'vertical'
	});
	var db = Titanium.Database.open('voteDB');
	Ti.API.log("DEBUG",'db name:'+db.name);
	var rows = db.execute('SELECT username, votedItem FROM vote');
	while (rows.isValidRow())
	{
		resultView.add(Titanium.UI.createLabel({
			color:'#abcdef',
			highlightedColor:'#0f0',
			backgroundColor:'transparent',
			width:'auto',
			height:'auto',
			text: rows.field(0)
		}));
		resultView.add(Titanium.UI.createLabel({
			color:'#abcdef',
			highlightedColor:'#0f0',
			backgroundColor:'transparent',
			width:'auto',
			height:'auto',
			text: rows.field(1)
		}));	
		rows.next();
	}	
	
		var closeButton = Titanium.UI.createButton({
			color:'#abcdef',
			top: 20,
			width:200,
			height:40,
			font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
			title:'Close'
		});
		
		closeButton.addEventListener('click', function() {
			resultView.hide();
		});
		resultView.add(closeButton);
		Ti.UI.currentWindow.add(resultView);
		resultView.show();		
}
