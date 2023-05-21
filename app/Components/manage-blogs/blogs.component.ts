import { Component, OnInit } from '@angular/core';
import { GetUserLocalStorage } from 'src/app/Functions/UserLS';
import { BlogService } from 'src/app/Services/Blog/blog.service';
import { UserService } from 'src/app/Services/User/user.service';
import { ToastService } from '../../Services/toast-service/toast.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  user = GetUserLocalStorage();
  nblogs: any;
  nusers: any;
  pendings: any;
  plength: any;
  live: Array<any> = [];
  canApprove =
    this.user.role === 'Administrator' ||
    this.user.role === 'Super-Administrator';

  public chart: any;

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  GetUser() {
    return this.userService.User;
  }

  createChart() {
    this.chart = new Chart('UserActivity', {
      type: 'line', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Overall User Activity',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: '#3a76ea',
          },
        ],
      },
      options: { responsive: true },
    });
  }

  ngOnInit(): void {
    this.countBlogs();
    this.countUsers();
    this.getPending();
    this.getLive();
    this.createChart();
  }

  countBlogs() {
    this.blogService.count().subscribe((data) => {
      this.nblogs = data.Message;
      return this.nblogs;
    });
  }

  countUsers() {
    this.userService.count().subscribe((data) => {
      this.nusers = data.Message;
      return this.nusers;
    });
  }

  getPending() {
    this.blogService.getPending().subscribe((data) => {
      this.pendings = data.data.blogs;
      this.plength = this.pendings.length;
      return this.pendings;
    });
  }

  getLive() {
    this.blogService.getApprouvedgBlogs().subscribe((data) => {
      let i = 0;
      let max = data.data.blogs.length <= 4 ? data.data.blogs.length : 4;
      for (i = 0; i < max; i++) {
        this.live.push(data.data.blogs[i]);
      }
      return this.live;
    });
  }

  delete(id: any) {
    this.blogService.delete(id).subscribe((data) => {
      this.toastService.SuccessToast(data.Message);
      return data;
    });
  }

  approuve(id: any) {
    this.blogService.approuve(id).subscribe((data) => {
      this.toastService.SuccessToast(data.Message);
      return data;
    });
  }
}
