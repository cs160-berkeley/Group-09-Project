/* === IMPORT STATEMENTS === */
import { changeScreen } from "main";
import { selectMovesetScreen } from "select-moveset-screen";
import { selectMarksetScreen } from "select-markset-screen";

/* === TITLE SCREEN === */

var menuButtonTemplate = Container.template($ => ({
	top: $.top, left: ((375 - 250)/2), width: 250, active: true,
	contents: [
		$.img
	],
	behavior: Behavior({
		onCreate: function(content) {
            $.img.url = $.upURL;
        },
        onTouchBegan: function(content) {
						$.img.url = $.downURL;
        },
        onTouchEnded: function(content) {
						$.img.url = $.upURL;
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

var helpPicture = new Picture({
    url: "assets/title/help.png"
});

var settingsButton = new Container({
 	left: 20, top: 20, active: true, height: 50, width: 50,
 	contents: [
		helpPicture
 	],
 	behavior: Behavior({
 		onCreate: function(content) {
            this.upURL = "assets/title/help.png";
            this.downURL = "assets/title/helpSelect.png";
         },
         onTouchBegan: function(content) {
            helpPicture.url = "assets/title/helpSelect.png";
         },
         onTouchEnded: function(content) {
            helpPicture.url = "assets/title/help.png";
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

var marksetsPicture = new Picture({url: "assets/title/marksets.png"});
var movesetsPicture = new Picture({url: "assets/title/movesets.png"});
var profilePicture = new Picture({url: "assets/title/profile.png"});
var friendsPicture = new Picture({url: "assets/title/friends.png"});

var marksetsButton = new menuButtonTemplate({ upURL: "assets/title/marksets.png", downURL: "assets/title/marksetsSelect.png", img: marksetsPicture, top: 80, number: 1 });
var movesetsButton = new menuButtonTemplate({ upURL: "assets/title/movesets.png", downURL: "assets/title/movesetsSelect.png", img: movesetsPicture, top: 15, number: 2 });
var profileButton = new menuButtonTemplate({ upURL: "assets/title/profile.png", downURL: "assets/title/profileSelect.png", img: profilePicture, top: 15, number: 3 });
var friendsButton = new menuButtonTemplate({ upURL: "assets/title/friends.png", downURL: "assets/title/friendsSelect.png", img: friendsPicture, top: 15, number: 4 });

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
