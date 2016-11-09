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

let navbarSkin = new Skin({ fill: "#4F4F4F" });
let backgroundSkin = new Skin({ fill: "#333333" });
let navbarBackStyle = new Style({ font: "bold 30px", color: "#F2F2F2" })

let Navbar = Line.template($ => ({
   left: 0, right: 0, top: 0,
   height: 40,
   skin: navbarSkin,
   contents: [
     Label($, {left:5, top: 5, bottom: 5, string: "<", style: navbarBackStyle}),
     Picture($, {left: 90, right: 90, url: "assets/navbarLogo.png", height: 30}),
   ],
}));

let PerformanceContainer = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'performanceContainer',
    contents: [
        new Navbar()
    ]
}));

let mainContainer = new PerformanceContainer();
application.add(mainContainer);
