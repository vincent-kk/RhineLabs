var model;
var view;
var controller;
var base;
var parser;

$(document).ready(function() {
  console.log("ready");

  model = new Model();
  view = new View();
  controller = new Controller();
  base = new BaseView();
  parser = new CodeParser("CultureLand");

  model.ObjectLinker(view);
  controller.ObjectLinker(model, view, parser);
  view.ObjectLinker(controller, { "base-view": base });

  controller.AddEventHandler();
});
