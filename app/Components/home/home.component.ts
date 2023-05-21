import { Component, OnInit, VERSION } from '@angular/core';
import { GetUserLocalStorage } from 'src/app/Functions/UserLS';
import { BlogService } from 'src/app/Services/Blog/blog.service';
import { ToastService } from '../../Services/toast-service/toast.service';
import { GetFullDate } from '../../Functions/DateParser';
import { HomeScrollsService } from '../../Services/Home_Scrolls/home-scrolls.service';
import { Router } from '@angular/router';
import { BlogsType } from '../../Types/Blogs.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  TypeWriteWords: any = ['Peace'];
  user = GetUserLocalStorage();
  start: boolean = true;
  inOtherPage = false;
  loading_done = false;
  blogs: BlogsType = [];
  skeleton_blogs = [null, null, null, null, null, null];

  constructor(
    private blogServices: BlogService,
    private toast: ToastService,
    private router: Router,
    private home_scroll_service: HomeScrollsService
  ) {}

  testScroll() {
    let fragment = this.home_scroll_service.get_section_name();
    setTimeout(() => {
      this.router.navigate(['/'], { fragment });
      document.body.style.cursor = 'auto';
    }, 500);
    // this.router.events.subscribe((evt: any) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     if (evt?.anchor === null) {
    //       this.inOtherPage = true;
    //     }
    //     if (evt?.anchor && this.inOtherPage) {
    //       this.inOtherPage = false;
    //       document.body.style.cursor = 'wait';
    //       setTimeout(() => {
    //         this.router.navigate(['/'], { fragment: evt?.anchor });
    //         document.body.style.cursor = 'auto';
    //       }, 200);
    //     }
    //     return;
    //   }
    // });
  }

  ngOnInit() {
    this.restart();
    this.getAllBlogs();
  }

  ngAfterViewInit() {
    this.testScroll();
  }

  restart() {
    this.start = false;
    setTimeout('', 1000);
    this.start = true;
  }

  DateParse(date: string): string {
    return GetFullDate(date);
  }

  getAllBlogs() {
    this.blogServices.getAllApprouvedgBlogs().subscribe(
      (data) => {
        this.blogs = data.data.blogs.filter(
          (blg: any, index: any) => index < 6
        );
      },
      (error) => {
        console.log(error); //toast
      }
    );
  }

  delete(id: any) {
    this.blogServices.delete(id).subscribe((data) => {
      this.toast.ErrorToast(data.error.Message);
      return data;
    });
  }
}
