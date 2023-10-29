import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);

  onLogin() {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(loginData).subscribe(
      (response: any) => {
        // Xử lý phản hồi từ API
        const token = response.data; // Điều này phụ thuộc vào cấu trúc phản hồi từ API
        // Lưu trữ token vào localStorage
        localStorage.setItem('token', JSON.stringify(token));

        // Chuyển hướng đến trang Dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Incorrect username or password',
        });
      }
    );
  }
}
