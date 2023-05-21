import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-complete',
  templateUrl: './reset-complete.component.html',
  styleUrls: ['./reset-complete.component.scss'],
})
export class ResetCompleteComponent implements OnInit {
  constructor(private router: Router) { }

  contunue = () => {
    localStorage.clear()
    this.router.navigate(['/login']);
  };

  ngOnInit(): void { }
}
