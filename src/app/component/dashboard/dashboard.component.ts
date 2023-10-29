import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { User } from 'src/app/interface/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService],
})
export class DashboardComponent {
  messageService = inject(MessageService);
  router = inject(Router);
  user: User;
  image: string = ""

  menuItems: any[] = [
    { label: 'Schedule', routerLink: ['schedule'], icon: PrimeIcons.CALENDAR },
    { label: 'Class', routerLink: ['class'], icon: PrimeIcons.HOME },
    { label: 'Course', routerLink: ['course'], icon: PrimeIcons.SITEMAP },
    { label: 'User', routerLink: ['user'], icon: PrimeIcons.USER },
  ];

  successMessage = {
    severity: 'success',
    content: 'Login account successfully!',
  };

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.user = JSON.parse(token).user;
    this.image = environment.apiUrl + '/users/images/' + this.user.avatar;
  }

  capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  show(data: any) {
    this.messageService.add({
      severity: data.severity,
      summary: this.capitalizeFirstLetter(data.severity),
      detail: data.content,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
