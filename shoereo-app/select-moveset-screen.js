/* === IMPORT STATEMENTS === */
import { changeScreen } from "main";
import { newMovesetScreen } from "new-moveset-screen";
import { performanceScreen } from "performance-screen";
import { sharingMovesetScreen } from "sharing-screen";
import { Navbar } from "navbar";

/* === SELECT MOVESET SCREEN === */

let backgroundSkin = new Skin({ fill: "#333333" });
let thinStyle = new Style({ font: "25px", color: "#F2F2F2"});

let MovesetBar = Container.template($ => ({
	left: 30, right: 30, bottom: 20, active: true,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/moveset/friendBar.png" }),
    new Label({ left: 80, string: $.title, style: thinStyle})
  ],
  behavior: Behavior({
    onTouchEnded: function(content) {
      changeScreen(viewMovesetScreen);
    }
  })
}));

let CreateBar = Layer.template($ => ({
	left: 30, right: 30, bottom: 20, active: true,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/moveset/create.png" }),
    new Label({ left: 80, string: "Create Moveset", style: thinStyle})
  ],
	behavior: Behavior({
		onTouchEnded: function(content) {
				changeScreen(newMovesetScreen);
		}
	})
}));

export let selectMovesetScreen = new Layer({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'selectMovesetContainer',
    contents: [
			new Picture({
        top: 0, bottom: 0, right: 0, left: 0,
        url: "assets/menuBackground.png"
      }),
      new Column({
        top: 0, bottom: 0, right: 0, left: 0,
        contents: [
	        new Navbar(),
	        new Picture({ left: 0, right: 0, top: 30, url:"assets/moveset/selectMoveset.png"}),
	        new Column({
	          left: 0, right: 0, top: 50, bottom: 0,
	          contents: [
	            new CreateBar(),
							new MovesetBar({title: "Dance 1"}),
							new MovesetBar({title: "Dance 2"}),
							new MovesetBar({title: "Dance 3"}),
							new MovesetBar({title: "Dance 4"}),
							new MovesetBar({title: "Dance 5"}),
							new MovesetBar({title: "Dance 6"}),
	          ],
	        }),
				]
			})
    ],
});

/* === VIEW MOVESET SCREEN === */

let shareDanceBar = Layer.template($ => ({
	left: 30, right: 30, top: 100, active: true,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/moveset/share.png" }),
  ],
	behavior: Behavior({
		onTouchEnded: function(content) {
				changeScreen(sharingMovesetScreen);
		}
	})
}));

let startDancingBar = Layer.template($ => ({
	left: 30, right: 30, top: 30, active: true,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/moveset/startDancing.png" }),
  ],
	behavior: Behavior({
		onTouchEnded: function(content) {
				changeScreen(performanceScreen);
		}
	})
}));

export let viewMovesetScreen = new Layer({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'viewMovesetContainer',
    contents: [
			new Picture({
        top: 0, bottom: 0, right: 0, left: 0,
        url: "assets/menuBackground.png"
      }),
      new Column({
        top: 0, bottom: 0, right: 0, left: 0,
        contents: [
	        new Navbar(),
	        new Picture({ left: 0, right: 0, top: 60, url:"assets/moveset/movesetTitle.png"}),
	        new Column({ left: 0, right: 0, top: 100,
	          contents: [
	            new Picture({ left: 80, url:"assets/moveset/music.png"}),
	            new Picture({ left: 85, top: 20, url:"assets/moveset/time.png"}),
	          ]
	        }),
					new shareDanceBar(),
	        new startDancingBar(),
				]
			})
    ],
});
