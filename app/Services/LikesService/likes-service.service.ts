import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backend_url } from '../../../configs/external';
import { UserService } from '../User/user.service';
import { BlogService } from '../Blog/blog.service';
@Injectable({
  providedIn: 'root',
})
export class LikesServiceService {
  baseURL = `${backend_url}/likes`;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private blogService: BlogService
  ) {}

  LikeDeslikeBlog(blogId: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/like_deslike_blog?blogId=${blogId}&userId=${this.userService.User._id}`,
      {}
    );
  }

  LikeDeslikeComment(comtId: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/like_deslike_comment?comtId=${comtId}&userId=${this.userService.User._id}`,
      {}
    );
  }

  GetLikesForBlog(blogId: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/blog_likes?blogId=${blogId}&userId=${this.userService.User._id}`,
      {}
    );
  }
}
