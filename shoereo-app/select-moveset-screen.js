/* === IMPORT STATEMENTS === */
import { changeScreen, backScreen, switchTitleScreen } from "main";

/* === NAVBAR === */

let navbarSkin = new Skin({ fill: "#4F4F4F" });
let navbarBackStyle = new Style({ font: "bold 30px", color: "#F2F2F2" });

export var Navbar = Line.template($ => ({
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

/* === SELECT MOVESET SCREEN === */

let backgroundSkin = new Skin({ fill: "#333333" });
let thinStyle = new Style({ font: "30px", color: "#56CCF2"});

let MovesetBar = Container.template($ => ({
	left: 30, right: 30,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/moveset/friendBar.png" }),
    new Label({ left: 80, string: $.title, style: thinStyle})
  ],
}));

export let selectMovesetScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'selectMovesetContainer',
    contents: [
        new Navbar(),
        new Picture({ left: 0, right: 0, top: 30, url:"assets/moveset/selectMoveset.png"}),
        new Column({
          left: 0, right: 0, top: 50, bottom: 0, skin: backgroundSkin,
          contents: [
						new MovesetBar({title: "Dance 1"}),
						new MovesetBar({title: "Dance 2"}),
						new MovesetBar({title: "Dance 3"}),
						new MovesetBar({title: "Dance 4"}),
						new MovesetBar({title: "Dance 5"}),
						new MovesetBar({title: "Dance 6"}),
          ],
        }),
    ],
});