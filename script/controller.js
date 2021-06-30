class Controller {
  constructor() {}

  static preload = (path, images) => {
    for (const key in images) {
      if (images.hasOwnProperty(key)) {
        const element = images[key];
        let image = new Image();
        image.src = path + element;
      }
    }
  };

  static debounce = (callback, wait) => {
    let timer;
    return () => {
      clearInterval(timer);
      timer = setTimeout(callback, wait);
    };
  };

  objectLinker = (model, view, parser) => {
    this._model = model;
    this._view = view;
    this._parser = parser;
  };

  addEventHandler = () => {
    this._view.addEventHandler({
      baseView: {
        onStartHandler: this.showOverlay,
        onChangeHandler: this.updateText,
        makeGiftCardHander: this.makeGiftCard,
        onCloseHandler: this.closeOverlay,
      },
    });
  };

  /**
   *  [
   *   {view : <view name>, object : <object name>, data : <new data>},
   *   ...
   *  ]
   */

  showOverlay = () => {
    this._model.updateModel([
      { view: "baseView", object: "textModal", data: { show: true } },
    ]);
  };

  updateText = (text) => {
    console.log(text);
    // Controller.debounce(() => {
    //   // this._model.updateModel([
    //   //   { view: "baseView", object: "textValue", data: text },
    //   // ]);
    //   console.log(text);
    // }, 500);
  };
  makeGiftCard = () => {
    this._view.quickChange("baseView", "goButton");
    let text = this._view.getModelData("baseView", "textValue");
    let codes = this._parser.run(text);
    if (codes.length === 0) {
      return;
    }
    this._model.updateModel([
      { view: "baseView", object: "codeBook", data: codes },
    ]);
  };
  closeOverlay = () => {
    this._model.updateModel([
      { view: "baseView", object: "textModal", data: { show: false } },
    ]);
  };
}
