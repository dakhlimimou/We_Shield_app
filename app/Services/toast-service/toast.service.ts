import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  open = false;
  show = 'hide';
  type = 'success';
  text = '';
  constructor() {}

  SuccessToast(text: string) {
    this.open = true;
    this.show = 'show';
    this.text = text;
    this.type = 'success';
    this.autoClose();
  }

  ErrorToast(text: string) {
    this.open = true;
    this.show = 'show';
    this.text = text;
    this.type = 'error';
    this.autoClose();
  }

  InfoToast(text: string) {
    this.open = true;
    this.show = 'show';
    this.text = text;
    this.type = 'info';
    this.autoClose();
  }

  InfoToastUpload(text: string) {
    this.open = true;
    this.show = 'show';
    this.text = text;
    this.type = 'info';
  }

  WarningToast(text: string) {
    this.open = true;
    this.show = 'show';
    this.text = text;
    this.type = 'warning';
    this.autoClose();
  }

  closeToast() {
    this.show = 'hide';
    setTimeout(() => {
      this.open = false;
    }, 0.5 * 1000);
  }

  autoClose() {
    setTimeout(() => {
      this.closeToast();
    }, 4 * 1000);
  }
}
