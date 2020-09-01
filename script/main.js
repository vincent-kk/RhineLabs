// let model;
// let view;
// let controller;
// let base;
// let parser;

$(document).ready(() => {
  console.log("ready");

  let model = new Model();
  let view = new View();
  let controller = new Controller();
  let base = new BaseView();
  let parser = new CodeParser("CultureLand");

  model.ObjectLinker(view);
  controller.ObjectLinker(model, view, parser);
  view.ObjectLinker(controller, { "base-view": base });

  controller.AddEventHandler();
  controller.Preload("./style/images/", [
    "cross.png",
    "efmom.png",
    "giftcard.png",
    "icon.png",
    "rhine.png",
  ]);
});
