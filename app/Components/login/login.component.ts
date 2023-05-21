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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPass: boolean = false;
  loginForm!: FormGroup;
  submitted = false;
  logged: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast: ToastService
  ) {}

  HandlePassView(): void {
    this.showPass = !this.showPass;
  }

  form() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          this.userService.SetUser(response.data.existUser);
          localStorage.setItem(
            'weSheild_token',
            JSON.stringify(response.data.token)
          );
          this.router.navigate(['/']);
        },
        (error) => {
          this.toast.ErrorToast(error.error.Message);
        }
      );
    }
  }

  ngOnInit(): void {
    this.form();
  }
}
