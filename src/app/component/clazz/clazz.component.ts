import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Clazz } from 'src/app/interface/clazz';
import { Course } from 'src/app/interface/course';
import { ClazzService } from 'src/app/service/clazz.service';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-clazz',
  templateUrl: './clazz.component.html',
  styleUrls: ['./clazz.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ClazzComponent {
  clazzes: Clazz[] = [];
  first = 0;
  last = 10;
  rows = 10;
  totalRecords = 0;

  pageNum = 1;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;

  dialog: boolean = false;
  courses: Course[] = [];
  clazz: Clazz = {};

  constructor(
    private clazzService: ClazzService,
    private courseService: CourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    const params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    };

    this.clazzService.getPage(params).subscribe(
      (response: any) => {
        this.clazzes = response.data.content;
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

  getCourses() {
    this.courseService.getAll().subscribe(
      (response: any) => {
        this.courses = response.data;
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

  add() {
    this.getCourses();
    this.clazz = {};
    this.dialog = true;
  }

  edit(clazz: Clazz) {
    this.getCourses();
    this.clazz = { ...clazz };
    this.dialog = true;
  }

  delete(clazz: Clazz) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clazzService.deleteById(clazz.id).subscribe(
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
    if (this.clazz.id) {
      this.clazzService.update(this.clazz).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: response.message,
          });
          this.clazz = {};
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
      this.clazzService.createNew(this.clazz).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: response.message,
          });
          this.clazz = {};
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

}
