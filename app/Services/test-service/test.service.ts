import { Injectable } from '@angular/core';
import {
  TestExemple,
  myAnswersExemple,
} from '../../Components/test/test-exemple';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  tests = TestExemple;
  myAnswers = myAnswersExemple;
  score = 0;
  constructor() {}
}
