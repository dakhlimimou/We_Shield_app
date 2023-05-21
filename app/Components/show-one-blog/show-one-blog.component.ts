import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../Services/Blog/blog.service';
import { UserService } from '../../Services/User/user.service';
import { ToastService } from 'src/app/Services/toast-service/toast.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GetFullDateAndTime } from '../../Functions/DateParser';
import { CommentType, CommentsType } from 'src/app/Services/Blog/Comment.type';
import { ScrollToTop } from 'src/app/Functions/Scroll';
import { ViewEncapsulation } from '@angular/core'

// import { LikeType } from 'src/app/Services/LikesService/like.type';
import { LikesServiceService } from 'src/app/Services/LikesService/likes-service.service';

@Component({
  selector: 'app-show-one-blog',
  templateUrl: './show-one-blog.component.html',
  styleUrls: ['./show-one-blog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowOneBlogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private blogServices: BlogService,
    private userService: UserService,
    private toastService: ToastService,
    private likeService: LikesServiceService
  ) {}
  AddCommentForm!: FormGroup;
  submittedCreate = false;

  edit = {
    isEditing: false,
    idComment: '',
  };

  likes = { nblikes: 0, liked: false };
  like_loading = false;

  GetUser(): any {
    return this.userService.User;
  }

  GetComments(): CommentsType {
    return this.blogServices.ShowedComments;
  }

  GetBlog() {
    console.log(this.blogServices.ShowedBlog);
    return this.blogServices.ShowedBlog;
  }

  commentDate(date: string) {
    return GetFullDateAndTime(date);
  }

  AddCommentform() {
    this.AddCommentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
    });
  }

  get formAdd() {
    return this.AddCommentForm.controls;
  }

  ResetAddForm() {
    this.AddCommentForm.reset();
  }

  resetComment() {
    this.AddCommentForm.reset();
    this.submittedCreate = false;
  }

  cancelEditing() {
    this.AddCommentForm.reset();
    this.edit = { isEditing: false, idComment: '' };
  }

  DeleteComment(comment: CommentType) {
    this.blogServices.DeleteComment(comment._id);
  }

  SubmitComment() {
    this.submittedCreate = true;
    if (this.AddCommentForm.invalid) {
      this.toastService.WarningToast("Comment can't be empty");
      return;
    } else {
      if (!this.edit.isEditing) {
        this.blogServices.AddComment(
          this.GetBlog()._id,
          this.GetUser()._id,
          this.AddCommentForm.value.comment,
          this.resetComment()
        );
      } else {
        this.blogServices.UpdateComment(
          this.edit.idComment,
          this.AddCommentForm.value.comment,
          this.resetComment()
        );
      }
    }
  }

  GetOneBlog(id: string) {
    this.blogServices.getOneBlog(id);
    this.GetLikesForBlog(id);
  }

  GetAllComments(id: string) {
    this.blogServices.getAllCommentsByBlog(id);
  }

  GetLikesForBlog(id: any) {
    this.likeService.GetLikesForBlog(id).subscribe(
      (response: any) => {
        this.likes = response.data;
      },
      (error: any) => {}
    );
  }

  FakeLikeDislike() {
    const { nblikes, liked } = this.likes;
    if (liked) {
      this.likes = { nblikes: nblikes - 1, liked: !liked };
    } else {
      this.likes = { nblikes: nblikes + 1, liked: !liked };
    }
  }

  LikeDislikeBlog() {
    if (!this.like_loading) {
      this.like_loading = true;
      this.FakeLikeDislike();
      this.likeService
        .LikeDeslikeBlog(this.blogServices.ShowedBlog._id)
        .subscribe(
          (response: any) => {
            this.likes = response.data;
            this.like_loading = false;
          },
          (error: any) => {
            this.like_loading = false;
          }
        );
    }
  }

  ngOnInit(): void {
    ScrollToTop();
    let id = this.route.snapshot.paramMap.get('id') || '';
    this.GetOneBlog(id);
    this.GetAllComments(id);
    this.AddCommentform();
  }
}
