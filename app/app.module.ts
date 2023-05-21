import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UsersComponent } from './Components/users/users.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { BlogsComponent } from './Components/manage-blogs/blogs.component';
import { BlogComponent } from './Components/creat-blog/blog.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';
import { TestComponent } from './Components/test/test.component';
import { OtpPatternComponent } from './Components/otp-pattern/otp-pattern.component';
import { ResetCompleteComponent } from './Components/reset-complete/reset-complete.component';
import { ProfileCompleteComponent } from './Components/profile-complete/profile-complete.component';
import { DasboardSidebarComponent } from './Components/dasboard-sidebar/dasboard-sidebar.component';
import { UnderMaintenaceComponent } from './Components/under-maintenace/under-maintenace.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { RegisterExpertComponent } from './Components/register-expert/register-expert.component';
import { RouterModule } from '@angular/router';
import { ShowblogsComponent } from './Components/showblogs/showblogs.component';
import { ShowOneBlogComponent } from './Components/show-one-blog/show-one-blog.component';
import { ManageTestsComponent } from './Components/manage-tests/manage-tests.component';
import { TypingAnimationModule } from 'angular-typing-animation';
import { RegisterAnonymousComponent } from './Components/register-anonymous/register-anonymous.component';
import { TestResultsComponent } from './Components/test-results/test-results.component';
import { ToastComponent } from './Components/toast/toast.component';
import { VerifEmailComponent } from './Components/verif-email/verif-email.component';
import { TestAndProfileComponent } from './Components/TestAndProfile/test-and-profile/test-and-profile.component';
import { UserActivityComponent } from './Components/Charts/Blogs/user-activity/user-activity.component';
import { CommentComponent } from './Components/comment/comment.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { BlogSkeletonComponent } from './Components/Sub-Components/Blog-Skeleton/blog-skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    ProfilComponent,
    BlogsComponent,
    BlogComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    TestComponent,
    OtpPatternComponent,
    ResetCompleteComponent,
    ProfileCompleteComponent,
    DasboardSidebarComponent,
    UnderMaintenaceComponent,
    DashboardComponent,
    RegisterExpertComponent,
    ShowblogsComponent,
    ShowOneBlogComponent,
    ManageTestsComponent,
    RegisterAnonymousComponent,
    TestResultsComponent,
    ToastComponent,
    VerifEmailComponent,
    TestAndProfileComponent,
    UserActivityComponent,
    CommentComponent,
    LoadingComponent,
    BlogSkeletonComponent,
  ],
  imports: [
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule,
    QuillModule.forRoot(),
    HttpClientModule,
    RouterModule,
    TypingAnimationModule,
    NgbCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
