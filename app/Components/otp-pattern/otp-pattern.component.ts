import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { ToastService } from '../../Services/toast-service/toast.service';

@Component({
  selector: 'app-otp-pattern',
  templateUrl: './otp-pattern.component.html',
  styleUrls: ['./otp-pattern.component.scss'],
})
export class OtpPatternComponent implements OnInit {
  form_group!: FormGroup;
  submitted = false;
  disabled = '';
  otp: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: ToastService
  ) {}

  form() {
    this.form_group = this.formBuilder.group({
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
      otp5: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form_group.controls;
  }

  concat() {
    return (
      this.form_group.value.otp1 +
      this.form_group.value.otp2 +
      this.form_group.value.otp3 +
      this.form_group.value.otp4 +
      this.form_group.value.otp5
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.form_group.invalid) {
      return;
    } else {
      this.userService
        .resetpass_verif_otp(localStorage.getItem('email'), this.concat())
        .subscribe(
          (data) => {
            this.otp = data;
            localStorage.setItem(
              'passChangeAccessKey',
              this.otp.data.passChangeAccessKey
            );
            this.router.navigate(['/newPassword']);
            return this.otp;
          },
          (error) => {
            this.toast.ErrorToast(error.error.Message);
          }
        );
    }
  }

  resendOtp() {
    this.disabled = 'disabled';
    this.userService
      .resetpass_send_otp(localStorage.getItem('email'))
      .subscribe(
        (data) => {
          this.toast.SuccessToast('code send to your mail');
          this.disabled = '';
          return data;
        },
        (error) => {
          this.disabled = '';
        }
      );
  }

  ngOnInit(): void {
    this.form();
  }
}
