/**
 * View에 보여지는 데이터 중 변경이 발생하는 부분에 대한 명세를 가지고 있는 데이터 객체
 * View Model이라는 가상 DOM 구조체를 가지며 View의 가변 데이터를 저장한다.
 * Model에 변경이 발생하면 View Update를 호출하여 View에 반영한다.
 * DMM의 Reload를 방지하며 잦은 DOM접근을 차단하여 전체적인 속도 개선에 도움을 준다.
 * MVC구조중 유일하게 상태와 데이터를 저장하는 부분이다.
 */
class Model {
  constructor() {
    this.viewModel = {
      "base-view": {
        modified: false,
        object: {
          "text-input": {
            modified: false,
            data: { show: false },
          },
          "code-book": {
            modified: false,
            data: [],
          },
        },
      },
    };
  }

  ObjectLinker = (view) => {
    this._view = view;
  };

  /**
   * @param {*} changes
   *  [
   *   {view : <view name>, object : <object name>, data : <new data>},
   *   ...
   *  ]
   */
  ChangeViewModel = (changes) => {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        const element = changes[key];
        const targe = this.viewModel[element.view].object[element.object];
        targe.modified = true;
        if (element.data !== undefined) targe.data = element.data;
      }
    }
    this.updateView();
  };

  GetModelData = (view, name) => {
    return this.viewModel[view].object[name].data;
  };

  updateView = () => {
    this.modifiedBubbling();
    this._view.update(this.viewModel);
  };

  modifiedBubbling = () => {
    for (const target in this.viewModel) {
      if (this.viewModel.hasOwnProperty(target)) {
        const view = this.viewModel[target];
        for (const key in view.object) {
          if (view.object.hasOwnProperty(key)) {
            const element = view.object[key];
            view.modified = view.modified || element.modified;
          }
        }
      }
    }
  };
}
