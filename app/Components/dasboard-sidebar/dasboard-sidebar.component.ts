import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { GetUserLocalStorage, isMember } from '../../Functions/UserLS';

@Component({
  selector: 'app-dasboard-sidebar',
  templateUrl: './dasboard-sidebar.component.html',
  styleUrls: ['./dasboard-sidebar.component.scss'],
})
export class DasboardSidebarComponent implements OnInit {
  isAdmin!: boolean;
  isAdminOrExpert!: boolean;
  canMakeBlogs: boolean = false;
  opened = true;
  navbar_classes = '';
  trogle_hide = '';

  user = GetUserLocalStorage();

  constructor(private router: Router, private userService: UserService) {}

  trogleNavbar() {
    if (this.opened === true) {
      this.opened = false;
      this.navbar_classes = 'close_navbar';
      this.trogle_hide = 'close_trogle_hider';
    } else {
      this.opened = true;
      this.navbar_classes = 'open_navbar';
      this.trogle_hide = 'open_trogle_hider';
    }
  }

  gotoProfileOrTest = () => {
    if (this.user?.score === -1 && isMember()) {
      window.open('/test', '_self');
    } else {
      window.open('/profil', '_self');
    }
  };

  ngOnInit(): void {
    this.isAdministrator();
    this.isAdministratorOrExpert();
  }

  logOut() {
    this.userService.logout().subscribe((data) => {
      return data;
    });
    localStorage.clear();
  }

  isAdministrator() {
    if (
      localStorage.getItem('weSheild_user')?.includes('"role":"Administrator"')
    ) {
      this.isAdmin = true;
    }
  }

  isAdministratorOrExpert() {
    if (
      localStorage
        .getItem('weSheild_user')
        ?.includes('"role":"Administrator"') ||
      localStorage.getItem('weSheild_user')?.includes('"role":"Expert"')
    ) {
      this.isAdminOrExpert = true;
    }

    if (
      localStorage
        .getItem('weSheild_user')
        ?.includes('"role":"Administrator"') ||
      localStorage.getItem('weSheild_user')?.includes('"role":"Expert"') ||
      localStorage.getItem('weSheild_user')?.includes('"role":"profile-B"') ||
      localStorage.getItem('weSheild_user')?.includes('"role":"profile-C"')
    ) {
      this.canMakeBlogs = true;
    }
  }
}
