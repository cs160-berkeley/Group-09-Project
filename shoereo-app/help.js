/* === IMPORT STATEMENTS === */
import { changeScreen, confirmDelete } from "main";
import { Navbar, NavbarDeleteMoveset } from "navbar";

/* === SELECT MOVESET SCREEN === */

let backgroundSkin = new Skin({ fill: "#333333" });
let thinStyle = new Style({ font: "25px", color: "#F2F2F2"});
let headerStyle = new Style({ font: "36px", color: "#F2F2F2"});

export let helpScreen = new Layer({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'helpContainer',
    contents: [
			new Picture({
        top: 0, bottom: 0, right: 0, left: 0,
        url: "assets/menuBackground.png"
      }),
      new Column({
        top: 0, bottom: 0, right: 0, left: 0,
        contents: [
	        new Navbar(),
          new Label({ top: 40, style: headerStyle, string: "Help"}),
	        new Text({ top: 30, left: 20, right: 20, style: thinStyle, string: "The Shoereo app requires a pair of Shoereo insoles to connect with before use." }),
          new Text({ top: 10, left: 20, right: 20, style: thinStyle, string: "A moveset refers to the steps that you take during a dance." }),
          new Text({ top: 10, left: 20, right: 20, style: thinStyle, string: "A markset refers to a series of diagrams that detail where you should be during a dance. These help groups coordinate their movements." })
				]
			})
    ],
});
