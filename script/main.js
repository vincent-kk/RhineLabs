$(document).ready(() => {
  console.log("ready");

  const model = new Model();
  const view = new View();
  const controller = new Controller();
  const base = new BaseView();
  const parser = new CodeParser("CultureLand");

  model.objectLinker(view);
  controller.objectLinker(model, view, parser);
  view.objectLinker(controller, { baseView: base });

  controller.addEventHandler();
  Controller.preload("./style/images/", [
    "cross.png",
    "efmom.png",
    "giftcard.png",
    "icon.png",
    "rhine.png",
  ]);
});
