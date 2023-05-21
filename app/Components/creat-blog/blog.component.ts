import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUserLocalStorage } from '../../Functions/UserLS';
import { BlogService } from '../../Services/Blog/blog.service';
import { UploadService } from '../../Services/upload/upload.service';
import { ToastService } from '../../Services/toast-service/toast.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogForm!: FormGroup;
  submitted = false;
  closeResult!: string;
  user = GetUserLocalStorage();
  uploading = false;
  blogImage = null;
  isCreating = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private blogService: BlogService,
    private uploadService: UploadService,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form();
  }

  GetUser() {
    return this.userService.User;
  }

  form() {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      language: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
    });
  }

  get f() {
    return this.blogForm.controls;
  }

  UploadImage = async (event: any) => {
    const file = event?.target?.files[0];
    const reader = new FileReader();
    this.uploading = true;
    this.toastService.InfoToastUpload('Uploading Image...');
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.uploadService.Upload(reader.result).subscribe(
        (data) => {
          this.toastService.InfoToast('Image Uploaded');
          this.blogImage = data.url;
          this.uploading = false;
        },
        (error) => {
          this.toastService.ErrorToast("Can't upload image");
        }
      );
    };
  };

  resetAll() {
    this.blogForm.reset();
    this.blogImage = null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.blogForm.invalid) {
      this.toastService.WarningToast('please fill all the field');
      return;
    }
    if (this.uploading) {
      this.toastService.InfoToastUpload('Uploading Image...');
      return;
    }
    if (this.blogImage === null) {
      this.toastService.WarningToast('please select an image');
      return;
    }
    this.isCreating = true;
    this.blogService
      .createBlog({ ...this.blogForm.value, image: this.blogImage })
      .subscribe(
        (data) => {
          this.isCreating = false;
          this.submitted = false;
          this.toastService.SuccessToast(data.Message);
          this.resetAll();
        },
        (error) => {
          this.isCreating = false;
          this.toastService.ErrorToast(error.error.Message);
        }
      );

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.blogForm.value, null, 4));
  }

  open(post: any) {
    this.modalService
      .open(post, { ariaLabelledBy: 'modal-basic-title' })
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
}
