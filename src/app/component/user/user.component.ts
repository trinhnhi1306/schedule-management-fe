import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class UserComponent {
  users: User[] = [];
  first = 0;
  last = 10;
  rows = 10;
  totalRecords = 0;

  pageNum = 1;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;

  dialog: boolean = false;
  roles: any[] = [];
  user: User = {};

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) {}

  ngOnInit(): void {
    this.getPage();

    this.roles = [
      { label: 'ADMIN', value: 'ADMIN' },
      { label: 'TRAINER', value: 'TRAINER' },
      { label: 'TRAINEE', value: 'TRAINEE' },
    ];
  }

  getPage() {
    const params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    };

    this.userService.getPage(params).subscribe(
      (response: any) => {
        this.users = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;

        this.first = this.pageNum * this.pageSize - this.pageSize;
        this.last = this.first + this.pageSize - 1;
        this.rows = this.pageSize;
        this.totalRecords = this.totalElements;
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.pageNum = (this.first + this.rows) / this.rows;
    this.pageSize = this.rows;
    this.getPage();
  }

  add() {
    this.user = {};
    this.dialog = true;
  }

  edit(user: User) {
    this.user = { ...user };
    this.dialog = true;
  }

  delete(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteById(user.id).subscribe(
          (response: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: response.message,
            });
            this.getPage();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: error.error.message,
            });
          }
        );
      },
    });
  }

  hideDialog() {
    this.dialog = false;
  }

  save() {    
    if (this.user.id) {
      this.userService.update(this.user).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: response.message,
          });
          this.user = {};
          this.getPage();
          this.dialog = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: error.error.message,
          });
        }
      );
    } else {
      this.userService.createNew(this.user).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: response.message,
          });
          this.user = {};
          this.getPage();
          this.dialog = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: error.error.message,
          });
        }
      );
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'ADMIN':
        return 'success';
      case 'TRAINER':
        return 'warning';
      case 'TRAINEE':
        return 'primary';
      default:
        return 'success';
    }
  }

}
