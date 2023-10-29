import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Course } from 'src/app/interface/course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CourseComponent {
  courses: Course[] = []
  first = 0
  last = 10
  rows = 10
  totalRecords = 0

  pageNum = 1
  pageSize = 10
  totalElements = 0
  totalPages = 0

  dialog: boolean = false
  course: Course = {}

  constructor(
    private courseService: CourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) {}

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    const params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    };

    this.courseService.getPage(params).subscribe(
      (response: any) => {
        this.courses = response.data.content
        this.totalElements = response.data.totalElements
        this.totalPages = response.data.totalPages

        this.first = this.pageNum * this.pageSize - this.pageSize
        this.last = this.first + this.pageSize - 1
        this.rows = this.pageSize
        this.totalRecords = this.totalElements
      },
      (error) => {
        console.log('Error: ' + error)
      }
    );
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.pageNum = (this.first + this.rows) / this.rows
    this.pageSize = this.rows
    this.getPage()
  }

  add() {
    this.course = {};
    this.dialog = true;
  }

  edit(course: Course) {
    this.course = { ...course };
    this.dialog = true;
  }

  delete(course: Course) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.deleteById(course.id).subscribe(
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
    if (this.course.id) {
      this.courseService.update(this.course).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: response.message,
          });
          this.course = {};
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
      this.courseService.createNew(this.course).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: response.message,
          });
          this.course = {};
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
