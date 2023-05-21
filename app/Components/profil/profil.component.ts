import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { isMember } from '../../Functions/UserLS';

import { ToastService } from '../../Services/toast-service/toast.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  //----------------------------------------------------------------------------------
  // USER DATA

  updateprofile = true;
  changepassword = false;
  changebio = false;
  isMember = isMember();

  GetUser() {
    return this.userService.User;
  }

  IhaveToPassTest = () => {
    if (this.GetUser()?.score == -1 && isMember()) {
      window.open('/test', '_self');
    }
  };

  GetAge(): number {
    return (
      new Date().getFullYear() -
      new Date(this.GetUser()?.birthDate).getFullYear()
    );
  }

  manipulationLevel =
    this.GetUser().role === 'profile-A'
      ? 'Low'
      : this.GetUser().role === 'profile-B'
      ? 'Medium'
      : 'Hard';
  // USER DATA
  //----------------------------------------------------------------------------------

  // data
  engagements = [
    { id: 1, day: 'Mon', value: 90 },
    { id: 2, day: 'Tue', value: 50 },
    { id: 3, day: 'Wed', value: 30 },
    { id: 4, day: 'Thu', value: 40 },
    { id: 5, day: 'Fri', value: 60 },
    { id: 6, day: 'Sat', value: 20 },
    { id: 7, day: 'Sun', value: 80 },
  ];
  profileType = this.GetUser().role;
  tags = ['Peace', 'Shield', 'Hope', 'Power', 'Mind'];
  historys = [
    {
      id: 1,
      title: 'Mental Wellness is a Neccesity ',
      description: `Creating more awareness about mental welness is important.`,
      img: '../../../assets/images/profile/hist1.png',
      type: 'podcast',
    },
    {
      id: 2,
      title: 'Six I learnt after I graduated',
      description: `Let me walk you through my journey as a new graduate.`,
      img: '../../../assets/images/profile/hist2.png',
      type: 'podcast',
    },
    {
      id: 3,
      title: 'Mental Wellness is a Neccesity ',
      description: `Creating more awareness about mental welness is important.`,
      img: '../../../assets/images/profile/hist1.png',
      type: 'live',
    },
  ];

  public date_values: Date[] = [
    new Date('2022-10-17T03:24:00'),
    new Date('2022-10-15T03:24:00'),
    new Date('2022-10-20T03:24:00'),
  ];

  public multiSelect: Boolean = true;
  public cssClass = 'e-custom';

  //-------------------------------------------------------------------------------
  //modal
  popupAdd: boolean = false;
  popupDel: boolean = false;
  openPopupAdd = () => {
    this.popupAdd = true;
  };
  openPopupDel = () => {
    this.popupAdd = false;
    this.popupDel = true;
  };
  closePopup = () => {
    this.popupAdd = false;
    this.popupDel = false;
    this.submitted = false;
  };

  // form
  form!: FormGroup;
  formPassword!: FormGroup;
  formbio!: FormGroup;

  submitted = false;
  hide = true;
  showPass: boolean;
  showNewPass: boolean;
  showCNewPass: boolean;

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

  FromValuesFromBD = () => {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      sex,
      location,
      phoneNumber,
      bio,
    } = this.GetUser();
    this.form.patchValue({
      firstName,
      lastName,
      email,
      birthDate: new Date(birthDate).toISOString().split('T')[0],
      sex,
      location,
      phoneNumber,
    });

    this.formbio.patchValue({
      bio: bio || '',
    });
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: ToastService
  ) {
    this.showPass = false;
    this.showNewPass = false;
    this.showCNewPass = false;
  }

  HandlePassView(): void {
    this.showPass = !this.showPass;
  }

  HandleNewPassView(): void {
    this.showNewPass = !this.showNewPass;
  }

  HandleCNPassView(): void {
    this.showCNewPass = !this.showCNewPass;
  }

  ngOnInit(): void {
    this.IhaveToPassTest();
    this.forme();
    this.formPassworde();
    this.formbioValidator();
    this.FromValuesFromBD();
  }

  forme() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      location: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  formPassworde() {
    this.formPassword = this.formBuilder.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_new_password: ['', [Validators.required]],
    });
  }

  formbioValidator() {
    this.formbio = this.formBuilder.group({
      bio: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  get p() {
    return this.formPassword.controls;
  }

  get h() {
    return this.formbio.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid && this.phoneForm.invalid) {
      return;
    }
    this.userService.UpdateMyProfile(
      this.GetUser()._id,
      {
        ...this.form.value,
      },
      this.closePopup()
    );
  }

  openUploadImg() {
    document.getElementById('uploadImage')?.click();
  }

  UploadImage = async (event: any) => {
    const file = event?.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.userService.UploadProfileImage(this.GetUser()._id, reader.result);
    };
  };
  changePassword() {
    this.submitted = true;
    if (this.formPassword.invalid) {
      return;
    }
    this.userService
      .changePassword(this.GetUser()._id, this.formPassword.value)
      .subscribe(
        (data) => {
          localStorage.clear();
          this.router.navigate(['/login']);
          return data;
        },
        (error) => {
          this.toast.ErrorToast(error.error.Message);
        }
      );
  }

  ChangeBioBD() {
    this.submitted = true;
    if (this.formbio.invalid) {
      return;
    }
    this.userService.UpdateMyProfileBio(
      this.GetUser()._id,
      this.formbio.value.bio,
      this.closePopup()
    );
  }

  updateprofilee() {
    this.updateprofile = true;
    this.changepassword = false;
    this.changebio = false;
  }

  changepasswordd() {
    this.updateprofile = false;
    this.changepassword = true;
    this.changebio = false;
  }

  changeBio() {
    this.changebio = true;
    this.updateprofile = false;
    this.changepassword = false;
  }
}
