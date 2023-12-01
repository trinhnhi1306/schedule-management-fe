import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ClazzComponent } from './component/clazz/clazz.component';
import { UserComponent } from './component/user/user.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { CourseComponent } from './component/course/course.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Sử dụng AuthGuard để bảo vệ route này
    children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      { path: 'user', component: UserComponent },
      { path: 'class', component: ClazzComponent },
      { path: 'course', component: CourseComponent },
      { path: 'schedule', component: ScheduleComponent },
    ],
  },
  { path: '**', redirectTo: 'login' }, // handle in case of invalid URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
