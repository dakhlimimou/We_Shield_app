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
  selector: 'app-register-anonymous',
  templateUrl: './register-anonymous.component.html',
  styleUrls: ['./register-anonymous.component.scss'],
})
export class RegisterAnonymousComponent implements OnInit {
  showPass: boolean = false;
  formData!: FormGroup;
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
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.formData.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formData.invalid) {
      return;
    } else {
      this.userService.registerAnonymous(this.formData.value).subscribe(
        (response) => {
          this.formData.reset();
          this.toast.SuccessToast('a verification link was send to your email');
          this.router.navigate(['/login']);
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
