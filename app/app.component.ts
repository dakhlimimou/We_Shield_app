import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserService } from './Services/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'WESHEILDFRONT';
  showheader: boolean = false;
  showSidebar: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] == '/register' ||
          event['url'] == '/register_anonymous' ||
          event['url'] == '/register_expert' ||
          event['url'] == '/login' ||
          event['url'] == '/forgotPassword' ||
          event['url'] == '/newPassword' ||
          event['url'] == '/otpPassword' ||
          event['url'] == '/resetComplete' ||
          event['url'] == '/under' ||
          event['url'] == '/profileComplete' ||
          event['url'] == '/check_profile' ||
          event['url'].indexOf('/verifmail') != -1
        ) {
          this.showheader = false;
        } else {
          this.showheader = true;
        }
      }
    });
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] == '/users' ||
          event['url'] == '/profil' ||
          event['url'] == '/manage_blogs' ||
          event['url'] == '/create_blog' ||
          event['url'] == '/dashboard' ||
          event['url'] == '/test' ||
          event['url'] == '/test_result' ||
          event['url'] == '/manage_tests'
        ) {
          this.showSidebar = true;
          this.showheader = false;
        } else {
          this.showSidebar = false;
        }
      }
    });
  }

  ngOnInit() {
    this.userService.GetUserByToken();
  }
}
