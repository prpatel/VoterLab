
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
	// do nothing right now, next lab will submit via xhr
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
Ti.UI.currentWindow.add(view);