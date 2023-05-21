import { Component, OnInit } from '@angular/core';
import {
  GetUserLocalStorage,
  updateUserLocalStorageWithoutReload,
} from '../../Functions/UserLS';
import { TestExemple } from './test-exemple';
import { UserService } from 'src/app/Services/User/user.service';
import { TestService } from '../../Services/test-service/test.service';

import { ToastService } from '../../Services/toast-service/toast.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  testStep: number = -1;
  submitted: boolean = false;
  totalPoints: number = 0;
  tests = TestExemple;
  user = GetUserLocalStorage();

  myAnswers = this.tests.map(() => {
    return {
      _id: '',
      points: 0,
    };
  });

  constructor(
    private userService: UserService,
    private testService: TestService,
    private toast: ToastService
  ) {}

  startTest = () => {
    this.testStep = 0;
  };

  nextQuestion = () => {
    if (this.testStep < this.tests.length - 1) {
      this.testStep++;
    }
  };

  prevQuestion = () => {
    if (this.testStep > -1) {
      this.testStep--;
    }
  };

  selectAnswer = (index: number, answer: any) => {
    this.myAnswers[index]._id = answer._id;
    this.myAnswers[index].points = answer.points;
  };

  submitQuestion = () => {
    if (this.myAnswers[this.testStep]._id == '') {
      this.toast.WarningToast('Please select an answer');
    } else {
      this.nextQuestion();
    }
  };

  checkAllQuestions(): boolean {
    for (let i = 0; i < this.myAnswers.length; i++) {
      if (this.myAnswers[i]._id == '') {
        this.toast.WarningToast(
          `Please select an answer for question ${i + 1}`
        );
        return false;
      }
    }
    return true;
  }

  submitTest = () => {
    // calculate the score
    if (this.checkAllQuestions() === false) {
      return;
    }

    let allPoints = 0;
    this.myAnswers.forEach((answer) => {
      allPoints += answer.points;
    });
    this.userService.AffectProfileType(this.user._id, allPoints).subscribe(
      (data) => {
        updateUserLocalStorageWithoutReload(data.user);
      },
      (error) => {
        console.log(error); //toast
      }
    );
    localStorage.setItem('weshield_myanswers', JSON.stringify(this.myAnswers));
    this.testService.tests = this.tests;
    this.testService.score = allPoints;
    this.submitted = true;
  };

  closePopup = () => {
    this.submitted = false;
  };

  gotoprofile = () => {
    window.open('/profil', '_self');
  };

  printTestResult = () => {
    window.open('/test_result', '_self');
  };

  ngOnInit(): void {}
}
