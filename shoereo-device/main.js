import Pins from "pins";

let greenStyle = new Style({font: '18px marker felt', color: 'green'});
let redStyle = new Style({font: '18px marker felt', color: 'red'});
let whiteSkin = new Skin ({fill: 'white'});


let MainContainer = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,    contents: [
    ]}));

class AppBehavior extends Behavior {    onLaunch(application) {        Pins.configure({
            connectme: {				require: "Analog",	              pins: {	                 power: {pin: 51, voltage: 3.3, type: "Power"},	                 ground: {pin: 52, type: "Ground"},	                 analog: {pin: 53, direction: "input"},	              }	           },            }, function(success) {           if (!success) trace("Failed to configure\n");           else {
           		Pins.share("ws", {zeroconf: true, name: "pins-share"});
				Pins.repeat("/connectme/read", 500, value => {
					application.add(new MainContainer);
					if (value == 0){
						application.add(new Label({ left: 0, right:0, top: 0, bottom: 0, style: redStyle, string: "Disconnected",}))
					}
					else{
						application.add(new Label({ left: 0, right:0, top: 0, bottom: 0, style: greenStyle, string: "Shoes Connected!",}))
					}
				});           }        });           }}application.behavior = new AppBehavior();

