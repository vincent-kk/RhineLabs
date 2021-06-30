class View {
  constructor() {}

  objectLinker = (controller, views) => {
    this._controller = controller;
    this._views = views;
  };

  addEventHandler = (eventHandlers) => {
    if (eventHandlers === undefined) return;
    for (const key in eventHandlers) {
      if (eventHandlers.hasOwnProperty(key)) {
        const element = eventHandlers[key];
        this._views[key].addEventHandler(element);
      }
    }
  };

  update = (viewModel) => {
    if (viewModel === undefined) return;
    for (const key in viewModel) {
      if (viewModel.hasOwnProperty(key)) {
        const element = viewModel[key];
        if (element.modified) {
          this._views[key].update(element.object);
        }
      }
    }
  };

  getViewData = (view, type) => {
    let data;
    switch (type) {
      case "code":
        data = this._views[view].getCodeData();
        break;
      default:
        break;
    }
    return data;
  };

  quickChange = (view, element) => {
    this._views[view].quickChange(element);
  };
}
