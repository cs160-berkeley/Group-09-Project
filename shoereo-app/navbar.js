/* === IMPORT STATEMENTS === */
import { backScreen, switchTitleScreen, deleteMoveset } from "main";

/* === NAVBAR === */

let navbarSkin = new Skin({ fill: "#333333" });
let navbarBackStyle = new Style({ font: "30px", color: "#FFFFFF" });

export var Navbar = Layer.template($ => ({
    left: 0, right: 0, top: 0,
    height: 40,
    skin: navbarSkin,
    contents: [
      Container($, {
        top: 0, bottom: 0, left: 0, right: 0,
        skin: navbarSkin
      }),
      Label($, {
        left: 5, top: 5, bottom: 5, active: true, string: "<", style: navbarBackStyle,
        behavior: Behavior({ 
          onTouchEnded: function(content) {
            backScreen();
          }
        })
      }),
      Picture($, {
        left: 90, right: 90, url: "assets/navbar/navbarLogo.png", height: 20, active: true,
        behavior: Behavior({
          onTouchEnded: function(content) {
            switchTitleScreen();
          }
        })
      }),
    ],
}));

export var NavbarDeleteMoveset = Layer.template($ => ({
    left: 0, right: 0, top: 0,
    height: 40,
    skin: navbarSkin,
    contents: [
      Container($, {
        top: 0, bottom: 0, left: 0, right: 0,
        skin: navbarSkin
      }),
      Label($, {
        left: 5, top: 5, bottom: 5, active: true, string: "<", style: navbarBackStyle,
        behavior: Behavior({ 
          onTouchEnded: function(content) {
            backScreen();
          }
        })
      }),
      Picture($, {
        left: 90, right: 90, url: "assets/navbar/navbarLogo.png", height: 20, active: true,
        behavior: Behavior({
          onTouchEnded: function(content) {
            switchTitleScreen();
          }
        })
      }),
      Picture($, {
        right: 10, url: "assets/navbar/delete.png", height: 25, active: true,
        behavior: Behavior({
          onTouchEnded: function(content) {
            deleteMoveset();
          }
        })
      })
    ],
}));

export var NavbarDeleteShare = Line.template($ => ({
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
        left: 90, right: 90, url: "assets/navbar/navbarLogo.png", height: 20, active: true,
        behavior: Behavior({
          onTouchEnded: function(content) {
            switchTitleScreen();
          }
        })
      }),
      Picture($, {
        right: 30, url: "assets/navbar/share.png", height: 25, active: true,
        behavior: Behavior({
          onTouchEnded: function(content) {
            switchTitleScreen();
          }
        })
      }),
      /*Picture($, {
        right: 10, url: "assets/navbar/delete.png", height: 25, active: true,
        behavior: Behavior({
          onTouchEnded: function(content) {
            switchTitleScreen();
          }
        })
      })*/
    ],
}));
