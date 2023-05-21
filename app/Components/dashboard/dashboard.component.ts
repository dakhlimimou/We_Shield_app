import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  closeResult!: string;
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
  blocked!: boolean;
  user: any;
  nusers: any;
  experts: Array<any> = [];

  getAdmin(): any {
    return this.userService.User;
  }

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.count();
    this.getAllExperts();
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  blockUser(id: any) {
    this.blocked = true;
    this.userService.blockUnBlock(id).subscribe(
      (data) => {
        alert(data.Message);
        return data;
      },
      (error) => {
        alert(error.error.Message);
      }
    );
  }

  findById(id: any) {
    this.userService.findById(id).subscribe((data) => {
      this.user = data.Message;
      this.user.birthDate = this.user.birthDate.slice(0, 10);
      return this.user;
    });
  }

  setId(id: any) {
    localStorage.setItem('_id', id);
  }

  getAll() {
    this.userService.getAll().subscribe(
      (data) => {
        let i: any;
        this.users = data.data.users;
        return this.users;
      },
      (error) => {
        alert(error.error.Message);
      }
    );
  }

  count() {
    this.userService.count().subscribe((data) => {
      this.nusers = data.Message;
      return this.nusers;
    });
  }

  getAllExperts() {
    this.userService.getAllExperts().subscribe((data) => {
      let i = 0;
      for (i = 0; i < 5; i++) {
        this.experts.push(data.data.users[i]);
      }
      return data;
    });
  }
}
