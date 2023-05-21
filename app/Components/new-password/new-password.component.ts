import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  showPass1: boolean;
  showPass2: boolean;
  form_group!: FormGroup;
  submitted = false;
  match: boolean;
  email = localStorage.getItem('email');
  passChangeAccessKey = localStorage.getItem('passChangeAccessKey');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.showPass1 = false;
    this.showPass2 = false;
    this.match = false;
  }

  HandlePassView1(): void {
    this.showPass1 = !this.showPass1;
  }

  HandlePassView2(): void {
    this.showPass2 = !this.showPass2;
  }

  form() {
    this.form_group = this.formBuilder.group({
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form_group.controls;
  }

  handlePass2Change = (event: any) => {
    let { password1, password2 } = this.form_group.value;
    if (password1 !== password2) {
      this.match = false;
    } else {
      this.match = true;
    }
  };

  onSubmit() {
    this.submitted = true;
    if (this.form_group.invalid) {
      return;
    }
    if (!this.match) {
      return;
    } else {
      const new_password = this.form_group.value.password1;
      this.userService
        .resetpass_newpass(this.email, this.passChangeAccessKey, new_password)
        .subscribe(
          (data) => {
            this.router.navigate(['/resetComplete']);
            return data;
          },
          (error) => {
            alert(error.error.Message);
          }
        );
    }
  }

  ngOnInit(): void {
    this.form();
  }
}
