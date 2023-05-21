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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forme!: FormGroup;
  submitted = false;
  disable = '';
  email: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: ToastService
  ) {}

  form() {
    this.forme = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.forme.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.forme.invalid) {
      return;
    }
    this.disable = 'disabled';

    this.userService.resetpass_send_otp(this.forme.value.email).subscribe(
      (data) => {
        this.email = data;
        localStorage.setItem('email', this.forme.value.email);
        this.toast.SuccessToast('code send to your mail');
        this.router.navigate(['/otpPassword']);
        return this.email;
      },
      (error) => {
        this.disable = '';
        this.toast.ErrorToast(error.error.Message);
      }
    );
  }

  ngOnInit(): void {
    this.form();
  }
}
