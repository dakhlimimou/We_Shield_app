import { Component, Input, OnInit } from '@angular/core';
import { GetFullDateAndTime } from '../../Functions/DateParser';
import { CommentType } from 'src/app/Services/Blog/Comment.type';
import { UserService } from '../../Services/User/user.service';
import { BlogService } from '../../Services/Blog/blog.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentType;
  @Input() startEditHere: any;
  @Input() form: any;
  @Input() edit: any;

  constructor(
    private userService: UserService,
    private blogServices: BlogService
  ) {}

  commentDate(date: string) {
    return GetFullDateAndTime(date);
  }

  GetUser(): any {
    return this.userService.User;
  }

  startEditing(
    element: HTMLElement,
    comment: CommentType,
    form: any,
    edit: any
  ) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    form.patchValue({ comment: comment.content });
    edit = { isEditing: true, idComment: comment._id };
  }

  DeleteComment(comment: CommentType) {
    this.blogServices.DeleteComment(comment._id);
  }

  ngOnInit(): void {}
}
