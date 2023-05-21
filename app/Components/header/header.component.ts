import { Component, HostListener, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../../Services/User/user.service';
import { HomeScrollsService } from '../../Services/Home_Scrolls/home-scrolls.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  open: boolean;
  submitted!: boolean;
  closeResult!: string;
  hide: boolean = false;
  deconnect: boolean = true;
  user = JSON.parse(
    localStorage.getItem('weSheild_user') ||
      `{"firstName": "", "lastName": "" }`
  );

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService,
    private home_scroll_service: HomeScrollsService
  ) {
    if (window.innerWidth < 1280) {
      this.open = false;
    } else {
      this.open = true;
    }
  }

  getUser(): any {
    return this.userService.User;
  }

  ngOnInit(): void {
    this.testConnection();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 1280) {
      this.open = false;
    } else {
      this.open = true;
    }
  }

  navigateToSection(section: string) {
    let current_link = this.router.url;
    if (['/blogs'].indexOf(current_link) !== -1) {
      this.router.navigate(['/']);
      this.home_scroll_service.set_section_name(section);
    } else {
      this.router.navigate(['/'], { fragment: section });
    }
  }

  openNavbar(): void {
    this.open = true;
  }

  closeNavbar(): void {
    this.open = false;
  }

  onSubmit() {
    this.submitted = true;
  }

  opene(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
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

  hiding() {
    this.hide = true;
  }

  showing() {
    this.hide = false;
  }

  GoToRegisterPage = () => {
    if (this.hide) {
      this.router.navigate(['/register_expert']);
    } else {
      this.router.navigate(['/register']);
    }
    this.modalService.dismissAll('Cross click');
  };

  testConnection() {
    if (localStorage.getItem('weSheild_user')) {
      this.deconnect = false;
    }
  }
}
