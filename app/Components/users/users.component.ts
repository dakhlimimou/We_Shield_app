import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { GetUserLocalStorage } from 'src/app/Functions/UserLS';
import { UserService } from 'src/app/Services/User/user.service';
import { ToastService } from '../../Services/toast-service/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  closeResult!: string;
  hide = true;
  users = [
    {
      activated: null,
      anonymous: '',
      birthDate: '',
      connect: '',
      email: '',
      experience: '',
      firstName: '',
      lastName: '',
      otp: '',
      password: '',
      profilImage: '',
      role: '',
      score: null,
      sex: '',
      speciality: '',
      updatedAt: '',
      _id: '',
      phoneNumber: { number: '' },
    },
  ];
  firstName: any;
  response: any;
  msg = '';
  hideMsg = true;
  sex!: string;
  date!: string;
  user: any;
  blocked!: boolean;
  disconnected!: boolean;
  nbusers: any;
  role!: string;

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

  userr = GetUserLocalStorage();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.forme();
    this.getAll();
    this.count();
  }

  forme() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      sex: ['Man', Validators.required],
      speciality: ['Student', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  getAll() {
    this.userService.getAll().subscribe(
      (data) => {
        let i: any;
        this.users = data.data.users;
      },
      (error) => {
        alert(error.error.Message);
      }
    );
  }

  GetUser() {
    return this.userService.User;
  }

  findById(id: any) {
    this.userService.findById(id).subscribe((data) => {
      this.user = data.data;
      this.user.birthDate = this.user.birthDate.slice(0, 10);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.userService.registerMember(this.form.value).subscribe(
        (data) => {
          this.response = data;
          this.hideMsg = false;
          this.toastService.SuccessToast('User created Succsessfully');
          this.getAll();
          return this.response;
        },
        (error) => {
          this.toastService.ErrorToast(error.error.Message);
          this.msg = error.error.Message;
          this.hideMsg = false;
        }
      );
    }
  }

  onDelete() {
    this.userService.delete(this.user._id).subscribe(
      (data) => {
        this.getAll();
        this.toastService.SuccessToast('User deleted Succsessfully');
        return data;
      },
      (error) => {
        this.toastService.ErrorToast(error.error.Message);
      }
    );
    localStorage.removeItem('_id');
  }

  onUpdate() {
    this.userService.updateUser(this.user._id, this.form.value).subscribe(
      (data) => {
        this.getAll();
        this.toastService.SuccessToast('User updated Succsessfully');
        return data;
      },
      (error) => {
        alert(error.error.Message);
      }
    );
  }

  blockUser(id: any) {
    this.blocked = true;
    this.userService.blockUnBlock(id).subscribe(
      (data) => {
        this.getAll();
        this.toastService.SuccessToast(data.Message);
        return data;
      },
      (error) => {
        alert(error.error.Message);
      }
    );
  }

  count() {
    this.userService.count().subscribe((data) => {
      this.nbusers = data.Message;
      return this.nbusers;
    });
  }

  openAdd(add: any) {
    this.modalService
      .open(add, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openDelete(delet: any) {
    this.modalService
      .open(delet, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openUpdate(update: any) {
    this.modalService
      .open(update, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  Search() {
    if (this.firstName != '') {
      this.users = this.users.filter((res: { firstName: string }) =>
        res.firstName.toLowerCase().match(this.firstName.toLowerCase())
      );
    } else if (this.firstName == '') {
      this.getAll();
    }
  }

  SearchSex() {
    if (this.sex != '') {
      this.users = this.users.filter((res: { sex: string }) =>
        res.sex.toLowerCase().match(this.sex.toLowerCase())
      );
    } else if (this.sex == '') {
      this.getAll();
    }
  }

  SearchDate() {
    if (this.date != '') {
      this.users = this.users.filter((res: { birthDate: string }) =>
        res.birthDate.toLowerCase().match(this.date.toLowerCase())
      );
    } else if (this.date == '') {
      this.getAll();
    }
  }

  SearchRole() {
    if (this.role != '') {
      this.users = this.users.filter((res: { role: string }) =>
        res.role.toLowerCase().match(this.role.toLowerCase())
      );
    } else if (this.role == '') {
      this.getAll();
    }
  }

  setUser(user: any) {
    this.user = user;
  }

  refresh() {
    this.router.navigate(['/users']);
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
