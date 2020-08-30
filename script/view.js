class View {
  constructor() {}

  ObjectLinker = (controller, views) => {
    this._controller = controller;
    this._views = views;
  };

  AddEventHandler = (eventHandlers) => {
    if (eventHandlers === undefined) return;
    for (const key in eventHandlers) {
      if (eventHandlers.hasOwnProperty(key)) {
        const element = eventHandlers[key];
        this._views[key].AddEventHandler(element);
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

  GetViewData = (view, type) => {
    let data;
    switch (type) {
      case "code":
        data = this._views[view].GetCodeData();
        break;
      default:
        break;
    }
    return data;
  };

  QuickChange = (view, element) => {
    this._views[view].QuickChange(element);
  };
}
