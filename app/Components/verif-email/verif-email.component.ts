import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/User/user.service';
import { ToastService } from '../../Services/toast-service/toast.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.scss'],
})
export class VerifEmailComponent implements OnInit {
  verifText = 'we are verifying your email please wait';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toast: ToastService
  ) {}

  verifyEmail(token: string) {
    this.userService.verifEmail(token).subscribe(
      (data) => {
        this.toast.SuccessToast('Mail verified');
        // toast here please
        this.router.navigate(['/login']);
      },
      (error) => {
        this.verifText = 'Mail not verified';
        this.toast.ErrorToast('Mail not verified');
      }
    );
  }

  ngOnInit(): void {
    let token = this.route.snapshot.paramMap.get('token') || '';
    this.verifyEmail(token);
  }
}
