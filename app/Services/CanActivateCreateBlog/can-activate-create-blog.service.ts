import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanActivateCreateBlogService implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (
      localStorage
        .getItem('weSheild_user')
        ?.includes('"role":"Administrator"') ||
      localStorage.getItem('weSheild_user')?.includes('"role":"Expert"') ||
      localStorage.getItem('weSheild_user')?.includes('"role":"profile-B"') ||
      localStorage.getItem('weSheild_user')?.includes('"role":"profile-C"')
    ) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}
