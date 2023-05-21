import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../Services/toast-service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}
  getOpen(): boolean {
    return this.toastService.open;
  }
  getShow(): string {
    return this.toastService.show;
  }
  getType(): string {
    return this.toastService.type;
  }
  getText(): string {
    return this.toastService.text;
  }

  close() {
    this.toastService.closeToast();
  }

  ngOnInit(): void {}
}
