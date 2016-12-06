/* === IMPORT STATEMENTS === */
import { changeScreen, confirmDelete } from "main";
import { newMovesetScreen } from "new-moveset-screen";
import { performanceScreen } from "performance-screen";
import { sharingMovesetScreen } from "sharing-screen";
import { Navbar, NavbarDeleteMoveset } from "navbar";

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

var danceTitles = ["Dance 1", "Dance 2", "Dance 3", "Dance 4", "Dance 5", "Dance 6"];

var selectMovesetScreenTemplate = Layer.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'selectMovesetContainer',
    contents: [
			Picture($, ({
        top: 0, bottom: 0, right: 0, left: 0,
        url: "assets/menuBackground.png"
      })),
      Column($, ({
        top: 0, bottom: 0, right: 0, left: 0,
        contents: [
	        new NavbarDeleteMoveset(),
	        new Picture({ left: 0, right: 0, top: 30, url:"assets/moveset/selectMoveset.png"}),
	        new Column({
	          left: 0, right: 0, top: 50, bottom: 0,
	          contents: [
	            new CreateBar(),
							danceTitles.map(danceTitle => 
                new MovesetBar({ title: danceTitle })
              )
	          ],
	        }),
				]
			}))
    ],
}));

export let selectMovesetScreen = new selectMovesetScreenTemplate();

/* === DELETE MOVESET SCREEN === */
let ConfirmDeleteBar = Layer.template($ => ({
  left: 30, right: 30, bottom: 20, active: true,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/moveset/confirmDeleteBox.png" }),
    new Label({ left: 80, string: "Confirm Delete", style: thinStyle})
  ],
  behavior: Behavior({
    onTouchEnded: function(content) {
      for (var i = 0; i < deleteMovesetArray.length; i++) {
        danceTitles.splice(danceTitles.indexOf(deleteMovesetArray[i]), 1);
      }
      deleteMovesetArray = [];
      selectMovesetScreen = new selectMovesetScreenTemplate();
      deleteMovesetScreen = new deleteMovesetScreenTemplate();
      confirmDelete();
    }
  })
}));

var deleteMovesetArray = [];
var redCheck = Picture.template($ => ({ right: 17, url: "assets/moveset/check1.png" }));

let DeleteMovesetBar = Layer.template($ => ({
  left: 30, right: 30, bottom: 20, active: true,
  name: $.title,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/moveset/friendBar.png" }),
    new Picture({ right: 20, url: "assets/moveset/deleteBox.png" }),
    $.redCheck,
    new Label({ left: 80, string: $.title, style: thinStyle})
  ],
  behavior: Behavior({
    onTouchEnded: function(content) {
      var index = deleteMovesetArray.indexOf($.title);
      if (index == -1) {
        deleteMovesetArray.push($.title);
        $.redCheck.url = "assets/moveset/check.png";
      } else {
        deleteMovesetArray.splice(index, 1);
        $.redCheck.url = "assets/moveset/check1.png";
      }
    }
  })
}));

let deleteMovesetScreenTemplate = Layer.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'deleteMovesetContainer',
    contents: [
      Picture($, ({
        top: 0, bottom: 0, right: 0, left: 0,
        url: "assets/menuBackground.png"
      })),
      Column($, ({
        top: 0, bottom: 0, right: 0, left: 0,
        contents: [
          new Navbar(),
          new Picture({ left: 0, right: 0, top: 30, url:"assets/moveset/deleteMoveset.png"}),
          new Column({
            left: 0, right: 0, top: 50, bottom: 0,
            contents: [
              new ConfirmDeleteBar(),
              danceTitles.map(danceTitle => 
                new DeleteMovesetBar({ title: danceTitle, redCheck: new redCheck() })
              )
            ],
          }),
        ]
      }))
    ],
}));

export let deleteMovesetScreen = new deleteMovesetScreenTemplate();

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
