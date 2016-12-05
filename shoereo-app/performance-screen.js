/* === IMPORT STATEMENTS === */
import { backScreen, changeScreen, distribute } from "main";
import { sharingPerformanceScreen } from "sharing-screen";
import { Navbar } from "navbar";

/* === PERFORMANCE SCREEN === */

let backgroundSkin = new Skin({ fill: "#333333" });

let titleStyle = new Style({ font: "bold 30px", color: "#F2F2F2"});
let thinStyle = new Style({ font: "30px", color: "#F2F2F2"});
let badPerformanceStyle = new Style({ font: "30px", color: "#EB5757"});
let okayPerformanceStyle = new Style({ font: "30px", color: "#F2994A"});
let goodPerformanceStyle = new Style({ font: "30px", color: "#27AE60"});

let BadPerformanceSection = Layer.template($ => ({
  left: 0, right: 0,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/performance/performanceBar.png" }),
    new Label({ left: 10, string: $.title, style: thinStyle}),
    new Label({ right: 30, string: $.percent.toString() + "%", style: badPerformanceStyle}),
  ],
}));

let OkayPerformanceSection = Layer.template($ => ({
  left: 0, right: 0, active: true,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/performance/performanceBar.png" }),
    new Label({ left: 10, string: $.title, style: thinStyle}),
    new Label({ right: 30, string: $.percent.toString() + "%", style: okayPerformanceStyle}),
  ],
  behavior: Behavior({
    onTouchEnded: function(content) {
      changeScreen(performanceExpandedScreen);
    }
  })
}));

let OkayPerformanceSectionExpanded = Layer.template($ => ({
  left: 0, right: 0, active: true,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/performance/performanceBarExpanded.png" }),
    new Label({ left: 10, string: $.title, style: thinStyle}),
    new Label({ right: 30, string: $.percent.toString() + "%", style: okayPerformanceStyle}),
  ],
  behavior: Behavior({
    onTouchEnded: function(content) {
      backScreen();
    }
  })
}));

let GoodPerformanceSection = Layer.template($ => ({
  left: 0, right: 0,
  contents: [
    new Picture({ left: 0, right: 0, url:"assets/performance/performanceBar.png" }),
    new Label({ left: 10, string: $.title, style: thinStyle}),
    new Label({ right: 30, string: $.percent.toString() + "%", style: goodPerformanceStyle}),
  ],
}));

export let performanceScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'performanceContainer',
    contents: [
        new Navbar(),
        new Picture({ left: 0, right: 0, top: 30, url:"assets/performance/performanceTitle.png"}),
        new Picture({ left: 0, right: 0, top: 15, url:"assets/performance/performanceGraph.png"}),
        new Column({
          left: 0, right: 0, top: 50, bottom: 0, skin: backgroundSkin,
          contents: [
						new Layer({
							left: 0, right: 0,
							contents: [
								new Label({left: 5, string: "Your Performance", style: titleStyle}),
								new Picture({
									right: 5, url: "assets/performance/share.png", active: true,
									behavior: Behavior({
										onTouchEnded: function(content) {
											changeScreen(sharingPerformanceScreen);
										}
									})
								}),
							]
						}),
            new OkayPerformanceSection({title: "Section 1", percent: 67}),
            new GoodPerformanceSection({title: "Section 2", percent: 100}),
            new GoodPerformanceSection({title: "Section 3", percent: 100}),
            new GoodPerformanceSection({title: "Section 4", percent: 100}),
            new GoodPerformanceSection({title: "Section 5", percent: 100}),
            new BadPerformanceSection({title: "Section 6", percent: 30}),
            new GoodPerformanceSection({title: "Section 7", percent: 100}),
          ],
        }),
    ],
});

export let performanceExpandedScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'performanceExpandedContainer',
    contents: [
        new Navbar(),
        new Picture({ left: 0, right: 0, top: 30, url:"assets/performance/performanceTitle.png"}),
        new Picture({ left: 0, right: 0, top: 15, url:"assets/performance/performanceGraph.png"}),
        new Column({
          left: 0, right: 0, top: 50, bottom: 0, skin: backgroundSkin,
          contents: [
						new Layer({
							left: 0, right: 0,
							contents: [
								new Label({ left: 5, string: "Your Performance", style: titleStyle }),
								new Picture({
									right: 5, url: "assets/performance/share.png", active: true,
									behavior: Behavior({
										onTouchEnded: function(content) {
											changeScreen(sharingPerformanceScreen);
										}
									})
								}),
							]
						}),
            new OkayPerformanceSectionExpanded({title: "Section 1", percent: 67}),
						new Layer({
							contents: [
								new Picture({left: 0, right: 0, top: 0, url: "assets/performance/details.png"}),
								new Column({
									right: 0, top: 0,
									contents: [
										new Picture({
                      right: 0, url: "assets/performance/badExpand.png", active: true,
                      behavior: Behavior({
                        onTouchEnded: function(picture) {
                          changeScreen(performanceDetailsScreen);
                        }
                      })
                    }),
										new Picture({right: 0, url: "assets/performance/goodExpand.png"}),
										new Picture({right: 0, url: "assets/performance/goodExpand.png"}),
									]
								})
							]
						}),
            new GoodPerformanceSection({title: "Section 2", percent: 100}),
            new GoodPerformanceSection({title: "Section 3", percent: 100}),
            new GoodPerformanceSection({title: "Section 4", percent: 100}),
            new GoodPerformanceSection({title: "Section 5", percent: 100}),
            new BadPerformanceSection({title: "Section 6", percent: 30}),
            new GoodPerformanceSection({title: "Section 7", percent: 100}),
          ],
        }),
    ],
});

var actualChecked = true;
var resultChecked = true;

// TODO: Change Original and My Steps to check/uncheck. Images exist
export let performanceDetailsScreen = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
    name: 'performanceDetailsContainer',
    contents: [
        new Navbar(),
				new Layer({
					left: 20, right: 20, top: 20,
					contents: [
						new Picture({ left: 0, url:"assets/performance/details/step.png"}),
		        new Picture({ right: 0, url:"assets/performance/details/section.png"}),
					]
				}),
        new Layer({
          left: 0, right: 0, top: 30, bottom: 0,
          contents: [
						new Picture({ top: 20, bottom: 50, right: 0, left: 0, url:"assets/performance/details/actualSteps.png",
              behavior: Behavior({
                updateActualSteps: function(picture, checked) {
                  if (checked) {
                    picture.url = "assets/performance/details/actualSteps.png";
                  } else {
                    picture.url = "";
                  }
                }
              })
            }),
						new Picture({ top: 120, bottom: 100, url:"assets/performance/details/arrow.png"}),
						new Picture({ top: 20, bottom: 50, right: 0, left: 0, url:"assets/performance/details/resultSteps.png",
              behavior: Behavior({
                updateResultSteps: function(picture, checked) {
                  if (checked) {
                    picture.url = "assets/performance/details/resultSteps.png";
                  } else {
                    picture.url = "";
                  }
                }
              })
            }),
          ],
        }),
				new Line({
					contents: [
						new Picture({ left: 0, active: true, url:"assets/performance/details/actualChecked.png",
              behavior: Behavior({
                onTouchEnded: function(picture) {
                  if (actualChecked) {
                    picture.url = "assets/performance/details/actualUnchecked.png";
                    actualChecked = false;
                  } else {
                    picture.url = "assets/performance/details/actualChecked.png";
                    actualChecked = true;
                  }
                  distribute("updateActualSteps", actualChecked);
                }
              })
          }),
		        new Picture({ right: 0, active: true, url:"assets/performance/details/resultChecked.png",
              behavior: Behavior({
                onTouchEnded: function(picture) {
                  if (resultChecked) {
                    picture.url = "assets/performance/details/resultUnchecked.png";
                    resultChecked = false;
                  } else {
                    picture.url = "assets/performance/details/resultChecked.png";
                    resultChecked = true;
                  }
                  distribute("updateResultSteps", resultChecked);
                }
              })
          }),
					]
				})
    ],
});
