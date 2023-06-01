import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '', loadChildren: () => import('./auth/auth.module')
  //     .then(m => m.AuthModule)
  // },
  // {
  //   path: 'course', loadChildren: () => import('./course/course.module')
  //     .then(m => m.CourseModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'post', loadChildren: () => import('./post/post.module')
  //     .then(m => m.PostModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'comment', loadChildren: () => import('./comments/comments.module')
  //     .then(m => m.CommentsModule), canActivate: [AuthGuard]
  // },
  // {
  //   path: 'user', loadChildren: () => import('./user/user.module')
  //     .then(m => m.UserModule), canActivate: [AuthGuard]
  // },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {

    path: 'course',
    loadChildren: () => import('./course/course.module').then(m => m.CoursePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
