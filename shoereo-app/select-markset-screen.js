/* === IMPORT STATEMENTS === */
import { changeScreen } from "main";
import { newMarksetScreen } from "new-markset-screen";
import { Navbar } from "navbar";

/* === SELECT MARKSET SCREEN === */

let backgroundSkin = new Skin({ fill: "#333333" });
let thinStyle = new Style({ font: "25px", color: "#56CCF2"});

let MarksetBar = Layer.template($ => ({
	left: 30, right: 30,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/markset/friendBar.png" }),
    new Label({ left: 80, string: $.title, style: thinStyle})
  ],
	behavior: Behavior({
		onTouchEnded: function(content) {
				trace("Do something");
		}
	})
}));

let CreateBar = Layer.template($ => ({
	left: 30, right: 30, active: true,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/markset/create.png" }),
    new Label({ left: 80, string: "Create Markset", style: thinStyle})
  ],
	behavior: Behavior({
		onTouchEnded: function(content) {
				changeScreen(newMarksetScreen);
		}
	})
}));

export let selectMarksetScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'selectMarksetContainer',
    contents: [
        new Navbar(),
        new Picture({ left: 0, right: 0, top: 30, url:"assets/markset/selectMarkset.png"}),
        new Column({
          left: 0, right: 0, top: 50, bottom: 0, skin: backgroundSkin,
          contents: [
            new CreateBar(),
						new MarksetBar({title: "Markset 1"}),
						new MarksetBar({title: "Markset 2"}),
						new MarksetBar({title: "Markset 3"}),
						new MarksetBar({title: "Markset 4"}),
						new MarksetBar({title: "Markset 5"}),
						new MarksetBar({title: "Markset 6"}),
          ],
        }),
    ],
		behavior: Behavior({
      onTouchEnded: function(content) {
          trace("Do something");
			}
		})
});
