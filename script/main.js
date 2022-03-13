import $ from 'jquery';

import {Model} from './model';
import {View} from './view';
import {Controller} from './controller';
import {BaseView} from './base_view';
import {CodeParser} from './code_parser';

$(document).ready(() => {
  const model = new Model();
  const view = new View();
  const controller = new Controller();
  const base = new BaseView();
  const parser = new CodeParser('CultureLand');

  model.objectLinker(view);
  controller.objectLinker(model, view, parser);
  view.objectLinker(controller, {baseView: base});

  controller.addEventHandler();
  Controller.preload('./style/images/', [
    'cross.png',
    'efmom.png',
    'giftcard.png',
    'icon.png',
    'rhine.png',
  ]);

  console.log('ready');
});
