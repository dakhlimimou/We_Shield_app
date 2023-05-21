import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backend_url } from '../../../configs/external';
import { GetUserLocalStorage } from 'src/app/Functions/UserLS';
import { ToastService } from '../toast-service/toast.service';
import { CommentsType } from './Comment.type';
import { BlogType } from '../../Types/Blogs.types';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogs = [];
  baseURL = `${backend_url}/blogs`;
  baseURLComments = `${backend_url}/comments`;
  user = GetUserLocalStorage();

  ShowedBlog!: BlogType;
  ShowedComments: CommentsType = [];

  constructor(private http: HttpClient, private toastService: ToastService) {}

  createBlog(blog: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/create`, {
      ...blog,
      userId: this.user._id,
    });
  }

  getApprouvedgBlogs(): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/getapprouvedgBlogs?userId=${this.user._id}`,
      {}
    );
  }

  getAllApprouvedgBlogs(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/getallapprouvedgBlogs`, {});
  }

  getOneBlog(id: string) {
    return this.http.get<any>(`${this.baseURL}/getOne?_id=${id}`, {}).subscribe(
      (response) => {
        this.ShowedBlog = response.data.blog;
      },
      (error) => {
        this.toastService.ErrorToast(error.error.Message);
      }
    );
  }

  getAllCommentsByBlog(id: string) {
    return this.http
      .get<any>(`${this.baseURLComments}/getAllByBlog?blogId=${id}`, {})
      .subscribe(
        (response) => {
          this.ShowedComments = response.data.comments;
        },
        (error) => {
          this.toastService.ErrorToast(error.error.Message);
        }
      );
  }

  count(): Observable<any> {
    return this.http.get(this.baseURL + '/count');
  }

  getPending(): Observable<any> {
    return this.http.get(
      this.baseURL + `/get_pending_blogs?userId=${this.user._id}`
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseURL + '/delete?_id=' + id);
  }

  approuve(id: any): Observable<any> {
    return this.http.put(this.baseURL + '/change_pending?_id=' + id, '');
  }

  AddComment(blogId: string, userId: string, content: string, next: any) {
    return this.http
      .post(
        `${this.baseURLComments}/create?blogId=${blogId}&userId=${userId}`,
        { content }
      )
      .subscribe(
        (response: any) => {
          this.toastService.SuccessToast('comment created succesffully');
          this.getAllCommentsByBlog(this.ShowedBlog._id);
          next();
        },
        (error) => {
          this.toastService.ErrorToast(error.error.Message);
        }
      );
  }

  UpdateComment(_id: string, content: string, next: any) {
    return this.http
      .put(`${this.baseURLComments}/update?_id=${_id}`, { content })
      .subscribe(
        (response: any) => {
          this.toastService.SuccessToast('comment updated succesffully');
          this.getAllCommentsByBlog(this.ShowedBlog._id);
          next();
        },
        (error) => {
          this.toastService.ErrorToast(error.error.Message);
        }
      );
  }

  DeleteComment(_id: string) {
    return this.http
      .delete(`${this.baseURLComments}/delete?_id=${_id}`, {})
      .subscribe(
        (response: any) => {
          this.toastService.SuccessToast('comment deleted succesffully');
          this.getAllCommentsByBlog(this.ShowedBlog._id);
        },
        (error) => {
          this.toastService.ErrorToast(error.error.Message);
        }
      );
  }
}
