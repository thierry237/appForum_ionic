import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { CourseGuard } from './_helpers/course.guard';


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {

    path: 'course',
    loadChildren: () => import('./course/course.module').then(m => m.CoursePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserPageModule), canActivate: [AuthGuard]
  },

  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(m => m.PostPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'comment',
    loadChildren: () => import('./comment/comment.module').then(m => m.CommentPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'course/add',
    loadChildren: () => import('./add-course/add-course.module').then(m => m.AddCoursePageModule), canActivate: [AuthGuard, CourseGuard]
  },
  {
    path: 'course/edit-course/:id',
    loadChildren: () => import('./edit-course/edit-course.module').then(m => m.EditCoursePageModule), canActivate: [AuthGuard, CourseGuard]
  },
  {
    path: 'post/edit-post/:id ',
    loadChildren: () => import('./edit-post/edit-post.module').then(m => m.EditPostPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'post/add',
    loadChildren: () => import('./add-post/add-post.module').then(m => m.AddPostPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'comment/edit-comment/:id',
    loadChildren: () => import('./edit-comment/edit-comment.module').then(m => m.EditCommentPageModule), canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
