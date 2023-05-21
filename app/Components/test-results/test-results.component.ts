import { Component, OnInit } from '@angular/core';
import { TestService } from '../../Services/test-service/test.service';
import { GetUserLocalStorage } from '../../Functions/UserLS';
@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss'],
})
export class TestResultsComponent implements OnInit {
  constructor(private testServices: TestService) {}
  user = GetUserLocalStorage();
  tests = this.testServices.tests;
  myAnswers = JSON.parse(
    localStorage.getItem('weshield_myanswers') ||
      JSON.stringify(this.testServices.myAnswers)
  );

  printPage() {
    window.print();
  }

  ngOnInit(): void {}
}
