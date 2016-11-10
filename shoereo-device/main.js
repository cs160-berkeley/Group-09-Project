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
import Pins from "pins";

let greenStyle = new Style({font: '18px marker felt', color: 'green'});
let redStyle = new Style({font: '18px marker felt', color: 'red'});
let whiteSkin = new Skin ({fill: 'white'});


let MainContainer = Container.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [

    ]
}));

class AppBehavior extends Behavior {
    onLaunch(application) {
        Pins.configure({
            connectme: {
        require: "Analog",
                pins: {
                   power: {pin: 51, voltage: 3.3, type: "Power"},
                   ground: {pin: 52, type: "Ground"},
                   analog: {pin: 53, direction: "input"},
                }
             },
            }, function(success) {
           if (!success) trace("Failed to configure\n");
           else {
              Pins.share("ws", {zeroconf: true, name: "pins-share"});
        Pins.repeat("/connectme/read", 500, value => {
          application.add(new MainContainer);
          if (value == 0){
            application.add(new Label({ left: 0, right:0, top: 0, bottom: 0, style: redStyle, string: "Disconnected",}))
          }
          else{
            application.add(new Label({ left: 0, right:0, top: 0, bottom: 0, style: greenStyle, string: "Shoes Connected!",}))
          }
        });
           }
        });
       
    }
}
application.behavior = new AppBehavior();
