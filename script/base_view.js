import $ from 'jquery';

export class BaseView {
  constructor() {
    this._overlay = $('#overlay');
    this._textInput = $('#overlay > #text-box > #text-input');
    this._closeButton = $('#overlay > #text-box > #close-icon ');
    this._goButton = $('#overlay > #text-box > #button');
    this._itemBox = $('#overlay > #item-box');
    this._centerButton = $('#context > #button-section > #button-core');
    this._centerImage = $(
      '#context > #button-section > #button-core > #core-img',
    );
    this._haloEffect = $('#context > #button-section > .effect-halo');
  }
  objectLinker(view) {
    this._view = view;
    this._controller = view.controller;
  }

  addEventHandler(eventHandlers) {
    this._centerButton.click(eventHandlers['onStartHandler']);
    this._goButton.click(eventHandlers['makeGiftCardHander']);
    this._closeButton.click(eventHandlers['onCloseHandler']);
    this._textInput.change(eventHandlers['onChangeHandler']);
  }

  update(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.modified) {
          this._domUpdater(key, element.data);
          element.modified = false;
        }
      }
    }
  }

  _domUpdater(name, data) {
    switch (name) {
      case 'textModal':
        this._showTextBox(data);
        break;
      case 'codeBook':
        this._makeCodeBook(data);
        break;
      default:
    }
  }

  quickChange(element) {
    switch (element) {
      case 'goButton':
        this._goButton.addClass('press-button');
        setTimeout(() => {
          this._goButton.removeClass('press-button');
        }, 210);
        break;
      default:
    }
  }

  _getCodeData() {
    return this._textInput.val();
  }

  _makeCodeBook(data) {
    this._itemBox.empty();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        let cardForm = this._createGiftCard(key, element);
        this._itemBox.append(cardForm);
      }
    }
  }

  _showTextBox(data) {
    if (data.show) {
      this._centerImage.addClass('press-button');
      setTimeout(() => {
        this._centerImage.removeClass('press-button');
      }, 210);
      this._haloEffect
        .addClass('effect-halo-runnig')
        .removeClass('effect-halo-blink');
      this._overlay.addClass('fade-in').removeClass('fade-out');
      this._overlay.css({opacity: '1', 'pointer-events': 'auto'});
    } else {
      this._closeButton.addClass('press-button');
      setTimeout(() => {
        this._closeButton.removeClass('press-button');
      }, 210);
      this._haloEffect
        .addClass('effect-halo-blink')
        .removeClass('effect-halo-runnig');
      this._overlay.addClass('fade-out').removeClass('fade-in');
      this._overlay.css({opacity: '0', 'pointer-events': 'none'});
    }
  }

  _createGiftCard(index, pin) {
    const element = `<input type="checkbox" id="check_${index}" />
                   <label for="check_${index}">
                     <div class="item animation-dom">
                       <div class="pin">
                         <div class="pin-num">${pin[0]}-${pin[1]}-${pin[2]}</div>
                         <div class="pin-num">${pin[3]}</div>
                       </div>
                     </div>
                   </label>`;
    return element;
  }
}
