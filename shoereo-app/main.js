/*
 *     Copyright (C) 2010-2016 Marvell International Ltd.
 *     Copyright (C) 2002-2010 Kinoma, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */

/* == GLOBAL VARIABLES DECLARATION === */

var currentScreen;

/* === TITLE SCREEN === */

var titleBackgroundColor = new Skin({ fill: "#BFBFBF" });

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
            application.remove(currentScreen);
            if ($.number == 1) {            	
            } else if ($.number == 2) {
            	currentScreen = performanceScreen;
            } else if ($.number == 3) {
            } else if ($.number == 4) {
            }
            application.add(currentScreen);
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

var marksetsButton = new menuButtonTemplate({ string: "Marksets", top: 80, number: 1 });
var movesetsButton = new menuButtonTemplate({ string: "Movesets", top: 20, number: 2 });
var profileButton = new menuButtonTemplate({ string: "Profile", top: 20, number: 3 });
var friendsButton = new menuButtonTemplate({ string: "Friends", top: 20, number: 4 });

var title = new Picture({
	top: 80, left: 35,
	url: "img/title.png"
});

var titleScreen = new Column({
	top: 0, bottom: 0, left: 0, right: 0,
	skin: titleBackgroundColor,
	contents: [
		title,
		marksetsButton, movesetsButton, profileButton, friendsButton,
		settingsButton
	]
});

currentScreen = titleScreen;
application.add(currentScreen);

/* === PERFORMANCE SCREEN === */

let navbarSkin = new Skin({ fill: "#4F4F4F" });
let backgroundSkin = new Skin({ fill: "#333333" });
let navbarBackStyle = new Style({ font: "bold 30px", color: "#F2F2F2" })

let Navbar = Line.template($ => ({
    left: 0, right: 0, top: 0,
    height: 40,
    skin: navbarSkin,
    contents: [
    	Label($, {left:5, top: 5, bottom: 5, string: "<", style: navbarBackStyle}),
    	Picture($, {
     		left: 90, right: 90, url: "assets/navbarLogo.png", height: 30, active: true,
     		behavior: Behavior({
     			onTouchEnded: function(content) {
     				application.remove(currentScreen);
     				currentScreen = titleScreen;
     				application.add(currentScreen);
     			}
     		})
     	}),
   	],
}));

let performanceScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'performanceContainer',
    contents: [
        new Navbar()
    ]
});