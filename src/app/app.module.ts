import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user.component';
import { ClazzComponent } from './component/clazz/clazz.component';
import { CourseComponent } from './component/course/course.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { JwtModule } from '@auth0/angular-jwt';
import { TableModule } from 'primeng/table';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    ClazzComponent,
    CourseComponent,
    ScheduleComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DividerModule,
    RadioButtonModule,
    ToolbarModule,
    CardModule,
    PaginatorModule,
    ToastModule,
    CalendarModule,
    MultiSelectModule,
    ConfirmDialogModule,
    DialogModule,
    ChipModule,
    TagModule,
    TableModule,
    MenubarModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return JSON.parse(localStorage.getItem('token')).accessToken;
        },
        allowedDomains: ['localhost:4200'],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
