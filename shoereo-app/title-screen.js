import { changeScreen } from "main";
import { selectMovesetScreen } from "select-moveset-screen";
import { selectMarksetScreen } from "select-markset-screen";

/* === TITLE SCREEN === */

var menuButtonTextStyle = new Style({ font: "bold 36px", color: "white" });

var menuButtonTextTemplate = Label.template($ => ({
	string: $.string, height: 50, top: 0,
	style: menuButtonTextStyle
}));

var menuButtonTemplate = Container.template($ => ({
	top: $.top, left: ((375 - 250)/2), width: 250, active: true,
	contents: [
		new menuButtonTextTemplate({ string: $.string })
	],
	behavior: Behavior({
		onCreate: function(content) {
            this.upSkin = new Skin({ fill: "#65BEE2" });
            this.downSkin = new Skin({ fill: "#71A2B9" });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content) {
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content) {
            content.skin = this.upSkin;
            if ($.number == 1) {
				changeScreen(selectMarksetScreen);
            } else if ($.number == 2) {
            	changeScreen(selectMovesetScreen);
            } else if ($.number == 3) {
            } else if ($.number == 4) {
            }
		}
	})
}));

var settingsStyle = new Style({ font: "30px", color: "white" });

var settingsButton = new Container({
 	left: 20, top: 20, active: true, height: 50, width: 50,
 	contents: [
 		new Label({
 			string: "?", style: settingsStyle, height: 50
 		})
 	],
 	behavior: Behavior({
 		onCreate: function(content) {
             this.upSkin = new Skin({ fill: "#F37D70" });
             this.downSkin = new Skin({ fill: "#C17A6F" });
             content.skin = this.upSkin;
         },
         onTouchBegan: function(content) {
             content.skin = this.downSkin;
         },
         onTouchEnded: function(content) {
             content.skin = this.upSkin;
 		}
 	})
 });

var title = new Picture({
 	top: 120, left: 35,
 	url: "assets/logo.png"
});

var menuBackground = new Picture({
   	top: 0, bottom: 0, left: 0, right: 0,
    url: "assets/menuBackground.png"
});

var titleBackgroundColor = new Skin({ fill: "#BFBFBF" });

var marksetsButton = new menuButtonTemplate({ string: "Marksets", top: 100, number: 1 });
var movesetsButton = new menuButtonTemplate({ string: "Movesets", top: 20, number: 2 });
var profileButton = new menuButtonTemplate({ string: "Profile", top: 20, number: 3 });
var friendsButton = new menuButtonTemplate({ string: "Friends", top: 20, number: 4 });

export var titleScreen = new Layer({
  	top: 0, bottom: 0, left: 0, right: 0,
  	skin: titleBackgroundColor,
  	contents: [
    	menuBackground,
    	new Column({
      		top: 0, bottom: 0, left: 0, right: 0,
     		contents: [
         		title,
     			marksetsButton, movesetsButton, profileButton, friendsButton,
     			settingsButton
    		]
    	}),
  	]
 });
