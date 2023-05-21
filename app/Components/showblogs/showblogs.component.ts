import { Component, OnInit } from '@angular/core';
import { GetUserLocalStorage } from 'src/app/Functions/UserLS';
import { BlogService } from '../../Services/Blog/blog.service';
import { ToastService } from '../../Services/toast-service/toast.service';
import { GetFullDate } from 'src/app/Functions/DateParser';
import { ScrollToTop } from 'src/app/Functions/Scroll';
import { BlogsType } from '../../Types/Blogs.types';

@Component({
  selector: 'app-showblogs',
  templateUrl: './showblogs.component.html',
  styleUrls: ['./showblogs.component.scss'],
})
export class ShowblogsComponent implements OnInit {
  constructor(
    private blogServices: BlogService,
    private tastService: ToastService
  ) {}
  user = GetUserLocalStorage();
  showDelete!: boolean;
  carossel_current_item = 0;
  changeTime = 10;
  blogs: BlogsType = [];
  skeleton_blogs = [null, null, null, null, null, null];

  carossel_items = [
    {
      image: '../../../assets/images/blog/header.png',
      title:
        'Find people who challenge and inspire you; spend a lot of time with them, and it will change your life',
    },
    {
      image: '../../../assets/images/blog/Imageb.png',
      title:
        'Find people who challenge and inspire you; spend a lot of time with them, and it will change your life',
    },
    {
      image: '../../../assets/images/blog/comforting_sunrise_1440x520.jpg',
      title:
        'Find people who challenge and inspire you; spend a lot of time with them, and it will change your life',
    },
  ];

  next() {
    if (this.carossel_current_item < this.carossel_items.length - 1) {
      this.carossel_current_item++;
    } else {
      this.carossel_current_item = 0;
    }
  }

  prev() {
    if (this.carossel_current_item > 0) {
      this.carossel_current_item--;
    } else {
      this.carossel_current_item = this.carossel_items.length - 1;
    }
  }

  autoSwipp() {
    setInterval(() => {
      this.next();
    }, this.changeTime * 1000);
  }

  gotoitem(index: number) {
    if (index >= 0 && index < this.carossel_items.length) {
      this.carossel_current_item = index;
    }
  }

  getAllBlogs() {
    this.blogServices.getAllApprouvedgBlogs().subscribe(
      (data) => {
        this.blogs = data.data.blogs;
      },
      (error) => {
        console.log(error); //toast
      }
    );
  }

  parseDate(date: string = ''): string {
    return GetFullDate(date);
  }

  ngOnInit(): void {
    ScrollToTop();
    this.autoSwipp();
    this.getAllBlogs();
  }

  delete(id: any) {
    this.blogServices.delete(id).subscribe((data) => {
      this.tastService.SuccessToast(data.Message);
      return data;
    });
  }
}
