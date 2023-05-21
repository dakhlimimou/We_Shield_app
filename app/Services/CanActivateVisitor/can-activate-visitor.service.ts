import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanActivateVisitorService implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.length === 0) {
      this.router.navigateByUrl('');
      return false;
    } else {
      return true;
    }
  }
}
