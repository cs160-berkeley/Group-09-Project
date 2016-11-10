/* === IMPORT STATEMENTS === */
import { changeScreen, backScreen, switchTitleScreen } from "main";
import { sharingMovesetScreen } from "sharing-screen";

import Pins from "pins";

/* === NAVBAR === */

let navbarSkin = new Skin({ fill: "#4F4F4F" });
let navbarBackStyle = new Style({ font: "bold 30px", color: "#F2F2F2" });

var Navbar = Line.template($ => ({
    left: 0, right: 0, top: 0,
    height: 40,
    skin: navbarSkin,
    contents: [
      Label($, {
        left: 5, top: 5, bottom: 5, active: true, string: "<", style: navbarBackStyle,
        behavior: Behavior({ 
          onTouchEnded: function(content) {
            backScreen();
          }
        })
    }),
      Picture($, {
        left: 90, right: 90, url: "assets/navbarLogo.png", height: 30, active: true,
        behavior: Behavior({
          onTouchEnded: function(content) {
            switchTitleScreen();
          }
        })
      }),
    ],
}));

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
    width: 250, height: 36, top: 25, skin: nameInputSkin, contents: [
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
                    string: "Tap to add title...", name: "hint"
                }),
            ]
        })
    ]
}));

let movesetStyle = new Style({font: "bold 40px", color: "#56CCF2"});
let whiteStyle = new Style({font: "bold 24px", color: "white"});
let greenSkin = new Skin({ fill: "#19F777" });
let bluetoothStyle = new Style({font: "bold 18px", color: "#828282"});
let textStyle = new Style({font: "bold 18px", color: "gray"});
let whiteStyle2 = new Style({font: "bold 18px", color: "white"});
let yellowSkin = new Skin({ fill: "#FFFF00" });
let redSkin = new Skin({ fill: "#EB5757" });

//Title
let StringPane = new Label({
    left: 0, right: 0, top: 25,
    style: movesetStyle,
    string: "New MoveSet",
});

//Record Button
let StringPane2 = new Label({
    left: 0, right: 0,
    style: whiteStyle,
    string: "Start Dancing",
});

//Bluetooth
let StringPane3 = new Label({
    left: 0, right: 0,
    style: bluetoothStyle,
    string: "Shoes Connected!",
});

//Music
let StringPane4 = new Label({
    left: 55,
    style: textStyle,
    string: "Select Music",
});

let bluetoothButton = new Container({height: 40, width: 250, top: 25, skin: greenSkin, 
  contents: [
    new Picture({left: 5, height: 30, width: 30, url: "img/bluetooth.png", active: true,}),
    StringPane3,
  ]
});

let musicButton = new Container({
  height: 40, width: 250, top: 25, skin: whiteSkin, 
  contents: [
    new Picture({left: 5, height: 30, width: 30, url: "img/musicnote.png", active: true,}),
    StringPane4,
  ]
});

var recordButtonTemplate = Container.template($ => ({
  top: $.top, left: ((375 - 250)/2), width: 250, height: 80, active: true, 
  contents: [
    StringPane2,
  ],
  behavior: Behavior({
    onCreate: function(content) {
            this.startSkin = new Skin({ fill: "#1CCD67" });
            this.stopSkin = new Skin({ fill: "#EB5757" });
            this.shareSkin = new Skin({ fill: "#56CCF2" });
            this.click = 0;
            content.skin = this.startSkin;
        },
        onTouchBegan: function(content) {
          KEYBOARD.hide();
          content.focus();
        },
        onTouchEnded: function(content) {
            if (this.click == 0) {
              content.skin = this.stopSkin;
              this.click = 1;
              StringPane2.string = "Stop Dancing";
              
            } else if (this.click == 1) {
              content.skin = this.shareSkin;
              this.click = 2;
              StringPane2.string = "Share MoveSet";
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
		        			StringPane3.style = textStyle;
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

export let newMovesetScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'newMovesetContainer',
    contents: [
        new Navbar(),
        StringPane,
        new MyField({name: ""}),
        musicButton,
        bluetoothButton,
        startButton  
    ],
});
