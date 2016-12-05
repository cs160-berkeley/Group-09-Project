/* === IMPORT STATEMENTS === */
import { changeScreen } from "main";
import { sharingMovesetScreen } from "sharing-screen";
import { Navbar } from "navbar";
import Pins from "pins";

/* === NEW MOVESET SCREEN === */

import KEYBOARD from './keyboard';

import {
    FieldScrollerBehavior,
    FieldLabelBehavior
} from 'field';

let backgroundSkin = new Skin({ fill: "#333333" });
let nameInputSkin = new Skin({ fill: "white", borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray' });
let fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let whiteSkin = new Skin({ fill: "white" });
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });

let MyField = Container.template($ => ({ 
    width: 250, height: 36, top: 75, skin: nameInputSkin, contents: [
        Scroller($, { 
            left: 4, right: 4, top: 4, bottom: 4, active: true, 
            Behavior: FieldScrollerBehavior, clip: true, 
            contents: [
                Label($, { 
                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin, 
                    style: fieldStyle, anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            label.container.hint.visible = (data.name.length == 0);
                            trace(data.name+"\n");
                        }
                    },
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,
                    string: "Insert Title Here", name: "hint"
                }),
            ]
        })
    ]
}));

let movesetStyle = new Style({font: "bold 40px", color: "#56CCF2"});
let whiteStyle = new Style({font: "bold 24px", color: "white"});
let greenSkin = new Skin({ fill: "#27AE60" });
let bluetoothStyle = new Style({font: "bold 18px", color: "#828282"});
let textStyle = new Style({font: "bold 18px", color: "gray"});
let whiteStyle2 = new Style({font: "bold 18px", color: "white"});
let yellowSkin = new Skin({ fill: "#FFFF00" });
let redSkin = new Skin({ fill: "#EB5757" });

//Title
var title = new Picture({
 	top: 75,
 	url: "assets/moveset/newMoveset.png",
});

//Record Button
var buttonPane = new Picture({
 	top: 10,
 	url: "assets/moveset/startDancing.png",
});

//Bluetooth
let StringPane3 = new Label({
    left: 0, right: 0,
    style: whiteStyle2,
    string: "Shoes Connected!",
});

//Music

var music = new Picture({
 	top: 10,
 	url: "assets/moveset/selectMusic.png",
});

let bluetoothButton = new Container({height: 40, width: 250, top: 175, skin: greenSkin, 
  contents: [
    new Picture({left: 5, height: 30, width: 30, url: "img/bluetooth.png", active: true,}),
    StringPane3,
  ]
});



var recordButtonTemplate = Container.template($ => ({
  top: $.top, left: ((375 - 250)/2), width: 250, height: 80, active: true, 
  contents: [
    buttonPane,
  ],
  behavior: Behavior({
    onCreate: function(content) {
            this.click = 0;
        },
        onTouchBegan: function(content) {
          KEYBOARD.hide();
          content.focus();
        },
        onTouchEnded: function(content) {
            if (this.click == 0) {
              buttonPane.url = "assets/moveset/stopDancing.png";
              this.click = 1;              
            } else if (this.click == 1) {
              buttonPane.url = "assets/moveset/shareDancing.png";
              this.click = 2;
            } else if (this.click == 2) {
              changeScreen(sharingMovesetScreen);
            }
    }
  })
}));

let remotePins;
class AppBehavior extends Behavior {
    onLaunch(application) {
        let discoveryInstance = Pins.discover(
            connectionDesc => {
                if (connectionDesc.name == "pins-share") {
                    trace("Connecting to remote pins\n");
                    remotePins = Pins.connect(connectionDesc);
		        	remotePins.repeat("/connectme/read", 50, result => {
		        		if (result == 0){
							StringPane3.string = "Not Connected";
							StringPane3.style = whiteStyle2;
							bluetoothButton.skin = redSkin;	
		        		}
		        		else if (result < 0.3){
		        			StringPane3.string = "Weak Signal";
		        			StringPane3.style = whiteStyle2;
		        			bluetoothButton.skin = yellowSkin;
		        		
		        		}
		        		else{
		        			StringPane3.string = "Shoes Connected!";
		        			StringPane3.style = textStyle;
		        			bluetoothButton.skin = greenSkin;
		        		}
		        		
		        	});
		        	
                }
            }, 
            connectionDesc => {
                if (connectionDesc.name == "pins-share") {
                    trace("Disconnected from remote pins\n");
                    remotePins = undefined;
                }
            }
        );
    }
}
application.behavior = new AppBehavior();

var startButton = new recordButtonTemplate({ string: "Start Dancing", top: 20});

var menuBackground = new Picture({
   	top: 0, bottom: 0, left: 0, right: 0,
    url: "assets/menuBackground.png"
});
var titleBackgroundColor = new Skin({ fill: "#BFBFBF" });

export let newMovesetScreen = new Layer({
  	top: 0, bottom: 0, left: 0, right: 0,
  	skin: titleBackgroundColor,
  	contents: [
  		menuBackground,
	  	new Column({
	    left: 0, right: 0, top: 0, bottom: 0,
	    name: 'newMovesetContainer',
	    contents: [
	        new Navbar(),
	        title,
	        new MyField({name: ""}),
	        music,
	        bluetoothButton,
	        startButton  
	    ],
	}),
	],});

