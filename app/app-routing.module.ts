import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './Components/creat-blog/blog.component';
import { BlogsComponent } from './Components/manage-blogs/blogs.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { OtpPatternComponent } from './Components/otp-pattern/otp-pattern.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';
import { ResetCompleteComponent } from './Components/reset-complete/reset-complete.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { RegisterComponent } from './Components/register/register.component';
import { RegisterAnonymousComponent } from './Components/register-anonymous/register-anonymous.component';
import { RegisterExpertComponent } from './Components/register-expert/register-expert.component';
import { ProfileCompleteComponent } from './Components/profile-complete/profile-complete.component';
import { TestComponent } from './Components/test/test.component';
import { TestResultsComponent } from './Components/test-results/test-results.component';
import { UsersComponent } from './Components/users/users.component';
import { UnderMaintenaceComponent } from './Components/under-maintenace/under-maintenace.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CanActivateAdminService } from './Services/CanActivateAdmin/can-activate-admin.service';
import { ShowOneBlogComponent } from './Components/show-one-blog/show-one-blog.component';
import { ShowblogsComponent } from './Components/showblogs/showblogs.component';
import { ManageTestsComponent } from './Components/manage-tests/manage-tests.component';
import { VerifEmailComponent } from './Components/verif-email/verif-email.component';
import { TestAndProfileComponent } from './Components/TestAndProfile/test-and-profile/test-and-profile.component';
import { CanActivateVisitorService } from './Services/CanActivateVisitor/can-activate-visitor.service';
import { CanActivateCreateBlogService } from './Services/CanActivateCreateBlog/can-activate-create-blog.service';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollOffset: [0, 0],
  relativeLinkResolution: 'legacy',
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register_anonymous', component: RegisterAnonymousComponent },
  { path: 'register_expert', component: RegisterExpertComponent },
  {
    path: 'profileComplete',
    component: ProfileCompleteComponent,
    // canActivate: [CanActivateVisitorService],
  },
  { path: 'resetComplete', component: ResetCompleteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'otpPassword', component: OtpPatternComponent },
  { path: 'newPassword', component: NewPasswordComponent },
  { path: 'resetComplete', component: ResetCompleteComponent },
  { path: 'verifmail/:token', component: VerifEmailComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [CanActivateAdminService],
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [CanActivateVisitorService],
  },
  {
    path: 'check_profile',
    component: TestAndProfileComponent,
    canActivate: [CanActivateVisitorService],
  },
  {
    path: 'manage_blogs',
    component: BlogsComponent,
    canActivate: [CanActivateCreateBlogService],
  },
  {
    path: 'create_blog',
    component: BlogComponent,
    canActivate: [CanActivateCreateBlogService],
  },
  {
    path: 'blogs',
    component: ShowblogsComponent,
  },
  {
    path: 'blog/:id',
    component: ShowOneBlogComponent,
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [CanActivateVisitorService],
  },
  {
    path: 'test_result',
    component: TestResultsComponent,
  },
  {
    path: 'manage_tests',
    component: ManageTestsComponent,
    canActivate: [CanActivateAdminService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateAdminService],
  },

  { path: 'under', component: UnderMaintenaceComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
