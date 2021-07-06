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
    return function () {
      const context = this;
      const args = arguments;
      clearInterval(timer);
      timer = setTimeout(() => callback.apply(context, args), wait);
    };
  };

  objectLinker(model, view, parser) {
    this._model = model;
    this._view = view;
    this._parser = parser;
  }

  addEventHandler() {
    this._view.addEventHandler({
      baseView: {
        onStartHandler: this.showOverlay(),
        onChangeHandler: this.updateText(),
        makeGiftCardHander: this.makeGiftCard(),
        onCloseHandler: this.closeOverlay(),
      },
    });
  }

  /**
   *  [
   *   {view : <view name>, object : <object name>, data : <new data>},
   *   ...
   *  ]
   */

  showOverlay() {
    return () => {
      this._model.updateModel([
        { view: "baseView", object: "textModal", data: { show: true } },
      ]);
    };
  }

  updateText() {
    return (e) => {
      this._model.updateModel([
        { view: "baseView", object: "textValue", data: e.target.value },
      ]);
    };
  }

  makeGiftCard() {
    return () => {
      this._view.quickChange("baseView", "goButton");
      let text = this._model.getModelData("baseView", "textValue");
      let codes = this._parser.run(text);
      if (codes.length === 0) {
        return;
      }
      this._model.updateModel([
        { view: "baseView", object: "codeBook", data: codes },
      ]);
    };
  }
  closeOverlay() {
    return () => {
      this._model.updateModel([
        { view: "baseView", object: "textModal", data: { show: false } },
      ]);
    };
  }
}
