import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backend_url } from '../../../configs/external';
import {
  GetTokenLocalStorage,
  GetUserLocalStorage,
  updateUserLocalStorageWithoutReload,
} from '../../Functions/UserLS';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private toast: ToastService) {}

  User: any = GetUserLocalStorage();
  baseURL = `${backend_url}/users`;
  baseURLUpload = `${backend_url}/file/fileupload`;

  SetUser(user: any) {
    this.User = user;
    updateUserLocalStorageWithoutReload(user);
  }

  registerMember(user: any): Observable<any> {
    return this.http.post<any>(this.baseURL + '/register_member', {
      ...user,
      role: 'Member',
      experience: '',
    });
  }
  registerAnonymous(user: any): Observable<any> {
    return this.http.post<any>(this.baseURL + '/register_anonymous', {
      ...user,
    });
  }
  registerExpert(user: any): Observable<any> {
    return this.http.post<any>(this.baseURL + '/register_member', {
      ...user,
      role: 'Expert',
      speciality: '',
    });
  }

  verifEmail(token: any): Observable<any> {
    return this.http.post<any>(this.baseURL + '/verifEmail', {
      token,
    });
  }

  login(user: any): Observable<any> {
    return this.http.get(this.baseURL + '/login', { params: user });
  }

  resetpass_send_otp(email: any): Observable<any> {
    return this.http.post(
      this.baseURL + '/resetpass_send_otp' + '?email=' + email,
      ''
    );
  }

  resetpass_verif_otp(email: any, otp: any): Observable<any> {
    return this.http.post(
      this.baseURL + '/resetpass_verif_otp' + '?email=' + email + '&otp=' + otp,
      ''
    );
  }

  resetpass_newpass(
    email: any,
    passChangeAccessKey: any,
    new_password: any
  ): Observable<any> {
    return this.http.put(
      this.baseURL +
        '/resetpass_newpass?email=' +
        email +
        '&passChangeAccessKey=' +
        passChangeAccessKey,
      { new_password: new_password }
    );
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseURL + '/getAllUsers');
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseURL + '/delete?_id=' + id);
  }

  UpdateMyProfile(userId: string, newUserData: any, next: any) {
    this.http
      .put(`${this.baseURL}/update?_id=${userId}`, {
        ...newUserData,
      })
      .subscribe(
        (response: any) => {
          this.toast.SuccessToast(response.Message);
          this.User = response.user;
          updateUserLocalStorageWithoutReload(response.user);
          next();
        },
        (error) => {
          this.toast.ErrorToast(error.error.Message);
        }
      );
  }

  UpdateMyProfileBio(userId: string, bio: any, next: any) {
    return this.http
      .put(`${this.baseURL}/updatebio?_id=${userId}`, {
        bio,
      })
      .subscribe(
        (response: any) => {
          this.toast.SuccessToast(response.Message);
          this.User = response?.user;
          updateUserLocalStorageWithoutReload(response.user);
          next();
        },
        (error) => {
          this.toast.ErrorToast(error.error.Message);
        }
      );
  }

  UploadProfileImage(userId: any, image: any) {
    this.toast.InfoToastUpload('we are uploading your picture please wait...');
    this.http
      .put(`${this.baseURL}/profileimage?_id=${userId}`, {
        image: image,
      })
      .subscribe(
        (response: any) => {
          this.User = response?.user;
          this.toast.SuccessToast('your picture Uploaded');
          updateUserLocalStorageWithoutReload(response.user);
        },
        (error) => {
          this.toast.ErrorToast(error.error.Message);
        }
      );
  }

  AffectProfileType(userId: any, score: number): Observable<any> {
    return this.http.put<any>(
      `${this.baseURL}/assign_profile_type?_id=${userId}`,
      {
        score: score,
      }
    );
  }

  uploadFile(file: any): Observable<any> {
    return this.http.post<any>(`${this.baseURLUpload}`, {
      file,
    });
  }

  updateUser(id: any, user: any): Observable<any> {
    return this.http.put<any>(this.baseURL + '/update?_id=' + id, user);
  }

  findById(id: any): Observable<any> {
    return this.http.get(this.baseURL + '/findById?_id=' + id);
  }

  blockUnBlock(id: any): Observable<any> {
    return this.http.put(this.baseURL + '/BlockUnblockUser?_id=' + id, '');
  }

  count(): Observable<any> {
    return this.http.get(this.baseURL + '/count');
  }

  logout(): Observable<any> {
    return this.http.get(this.baseURL + '/logout?_id=' + this.User._id);
  }

  changePassword(id: any, user: any): Observable<any> {
    return this.http.put(this.baseURL + '/changepassword?_id=' + id, user);
  }

  getAllExperts(): Observable<any> {
    return this.http.get(this.baseURL + '/getAllExperts');
  }

  GetUserByToken() {
    const token = GetTokenLocalStorage();
    this.http
      .get(this.baseURL + '/get_user_by_token', {
        headers: { authorization: token },
      })
      .subscribe(
        (response: any) => {
          this.User = response?.data;
          updateUserLocalStorageWithoutReload(response?.data);
        },
        (error) => {
          console.log(error); //toast
        }
      );
  }
}
