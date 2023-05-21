import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { UserService } from 'src/app/Services/User/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../Services/toast-service/toast.service';

@Component({
  selector: 'app-register-expert',
  templateUrl: './register-expert.component.html',
  styleUrls: ['./register-expert.component.scss'],
})
export class RegisterExpertComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  submitted = false;
  response: any;
  msg = '';
  hideMsg = true;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      sex: ['Man', Validators.required],
      experience: ['0', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userService.registerExpert(this.registerForm.value).subscribe(
        (response) => {
          this.router.navigate(['/login']);
          this.msg = 'Registred Succsessfully !';
          this.toast.SuccessToast('a verification link was send to your email');
          this.registerForm.reset();
          this.hideMsg = false;
          return this.response;
        },
        (error) => {
          this.toast.ErrorToast(error.error.Message);
        }
      );
    }
  }
}
