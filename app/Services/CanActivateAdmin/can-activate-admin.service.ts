import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAdminService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem("weSheild_user")?.includes('"role":"Administrator"')) {
      return true;
    } else {
      this.router.navigateByUrl("");
      return false;
    }
  }
}
