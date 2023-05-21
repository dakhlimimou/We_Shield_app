import { Component, OnInit } from '@angular/core';
import { GetUserLocalStorage, isMember } from '../../../Functions/UserLS';

@Component({
  selector: 'app-test-and-profile',
  templateUrl: './test-and-profile.component.html',
  styleUrls: ['./test-and-profile.component.scss'],
})
export class TestAndProfileComponent implements OnInit {
  user = GetUserLocalStorage();

  gotoProfileOrTest = () => {
    if (this.user?.score === -1 && isMember()) {
      window.open('/test', '_self');
    } else {
      window.open('/profil', '_self');
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.gotoProfileOrTest();
  }
}
