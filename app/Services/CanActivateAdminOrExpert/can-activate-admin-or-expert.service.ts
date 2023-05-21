import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAdminOrExpertService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem("weSheild_user")?.includes('"role":"Administrator"') || localStorage.getItem("weSheild_user")?.includes('"role":"Expert"')) {
      return true;
    } else {
      this.router.navigateByUrl("");
      return false;
    }
  }
}
