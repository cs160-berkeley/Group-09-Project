/* === IMPORT STATEMENTS === */
import { changeScreen, backScreen, switchTitleScreen } from "main";

/* === NAVBAR === */

let navbarSkin = new Skin({ fill: "#4F4F4F" });
let navbarBackStyle = new Style({ font: "bold 30px", color: "#F2F2F2" });

var Navbar = Line.template($ => ({
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

/* === SHARING SCREENS === */

let backgroundSkin = new Skin({ fill: "#333333" });

let ShareColumn = Column.template($ => ({
  left: 0, right: 0, top: 0, bottom: 0,
  contents: [
    new Picture({ left: 0, right: 0, top: 30, active: true, url:"assets/social/friends.png",
      behavior: Behavior({
        onTouchEnded: function(content) {
          changeScreen(sharingFriendsScreen);
        }
      })
    }),
    new Picture({ left: 0, right: 0, top: 30, url:"assets/social/team.png"}),
    new Picture({ left: 0, right: 0, top: 50, url:"assets/social/socialMedia.png"}),
  ]
}));

export let sharingPerformanceScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'sharingPerformanceContainer',
    contents: [
        new Navbar(),
        new Picture({ left: 0, right: 0, top: 30, url:"assets/social/title.png"}),
        new Picture({ left: 0, right: 0, top: 15, url:"assets/social/performance.png"}),
        new ShareColumn(),
    ],
});

export let sharingMovesetScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'sharingMovesetContainer',
    contents: [
        new Navbar(),
        new Picture({ left: 0, right: 0, top: 30, url:"assets/social/title.png"}),
        new Picture({ left: 0, right: 0, top: 15, url:"assets/social/movesetTitle.png"}),
				new ShareColumn(),
    ],
});

let FriendBar = Picture.template($ => ({
  left: 0, right: 0, top: 0,
  active: true,
  url:"assets/social/friendBar.png",
  behavior: Behavior({
    onCreate: function(content) {
      this.checked = false;
    },
    onTouchEnded: function(content) {
      if (this.checked) {
        content.url = "assets/social/friendBar.png";
        this.checked = false;
      } else {
        content.url = "assets/social/friendCheckedBar.png";
        this.checked = true;
      }
    }
  })
}));

export let sharingFriendsScreen = new Layer({
  left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
  contents: [
    new Column({
      left: 0, right: 0, top: 0, bottom: 0,
      name: 'sharingFriendsContainer',
      contents: [
          new Navbar(),
          new Picture({ left: 0, right: 0, top: 30, url:"assets/social/selectFriends.png"}),
          new Container({ top: 30 }),
          new FriendBar(),
          new FriendBar(),
          new FriendBar(),
          new FriendBar(),
          new FriendBar(),
          new FriendBar(),
          new FriendBar(),
          new FriendBar(),
          new FriendBar(),
      ],
    }),
    new Layer({
      left: 0, right: 0, bottom: 0, skin: backgroundSkin,
      contents: [
        new Picture({ left: 0, right: 0, bottom: 0, url: "assets/social/sendBar.png" }),
        new Picture({ right: 10, top: 0, bottom: 0, active: true, url: "assets/social/send.png",
          behavior: Behavior({
            onTouchEnded: function(content) {
              switchTitleScreen();
            }
          })
        }),
      ]
    })
  ]
});
