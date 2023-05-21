import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  isLoading = 'yes';
  constructor() {}

  StartLoading() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', (event) => {
      setTimeout(() => {
        this.isLoading = 'no';
        document.body.style.overflow = 'visible';
      }, 500);
    });
  }

  ngOnInit(): void {
    this.StartLoading();
  }
}
