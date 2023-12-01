import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Clazz } from 'src/app/interface/clazz';
import { Schedule } from 'src/app/interface/schedule';
import { ScheduleSearch } from 'src/app/interface/schedulesearch';
import { User } from 'src/app/interface/user';
import { ClazzService } from 'src/app/service/clazz.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ScheduleComponent {
  schedules: Schedule[] = [];
  first = 0;
  last = 10;
  rows = 10;
  totalRecords = 0;

  pageNum = 1;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;

  trainers: User[] = [];
  clazzes: Clazz[] = [];
  schedule: Schedule = {};
  trainingTypes: any[] = [];
  clazzTypes: any[] = [];
  dialog: boolean = false;
  date!: Date;
  startTime!: Date;
  endTime!: Date;

  path: string = '';

  scheduleSearch: ScheduleSearch = {};

  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    private clazzService: ClazzService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getPage();

    this.trainingTypes = [
      { label: 'MONTHLY', value: 'MONTHLY' },
      { label: 'T_AND_S', value: 'T_AND_S' },
      { label: 'AD_HOC', value: 'AD_HOC' },
    ];

    this.clazzTypes = [
      { label: 'Classroom', value: 'CLASSROOM' },
      { label: 'Zoom', value: 'ZOOM' },
    ];

    this.path = environment.apiUrl;

    this.getTrainers();
    this.getClazzes();
  }

  // toggle(label: string) {
  //   this.filterToggle.set(label, !this.filterToggle.get(label));
  // }

  applyAndClose(event: any, element: any) {
    element.hide(event);
    this.pageNum = 1;
    this.getSearchPage();
  }

  clearFilter() {
    this.scheduleSearch = {}
    this.getSearchPage()
  }

  singleClear(label: string) {
    switch (label) {
      case 'sessionName':
        this.scheduleSearch.sessionName = null;
        break;
      case 'date':
        this.scheduleSearch.startTime = null;
        this.scheduleSearch.endTime = null;
        break;
      case 'trainingType':
        this.scheduleSearch.trainingType = null;
        break;
      case 'clazzType':
        this.scheduleSearch.clazzType = null;
        break;
      case 'trainers':
        this.scheduleSearch.trainers = null;
        break;
      case 'clazz':
        this.scheduleSearch.clazz = null;
        break;
    }
    this.getSearchPage();
  }

  getTrainers() {
    this.userService.getAllTrainers().subscribe(
      (response: any) => {
        this.trainers = response.data;
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

  getClazzes() {
    this.clazzService.getAll().subscribe(
      (response: any) => {
        this.clazzes = response.data;
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

  getPage() {
    this.scheduleSearch = {};
    const params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    };

    this.scheduleService.getPage(params).subscribe(
      (response: any) => {
        this.schedules = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;

        this.first = this.pageNum * this.pageSize - this.pageSize;
        this.last = this.first + this.pageSize - 1;
        this.rows = this.pageSize;
        this.totalRecords = this.totalElements;
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

  getSearchPage() {
    const params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    };

    this.scheduleService.getSearchPage(this.scheduleSearch, params).subscribe(
      (response: any) => {
        this.schedules = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;

        this.first = this.pageNum * this.pageSize - this.pageSize;
        this.last = this.first + this.pageSize - 1;
        this.rows = this.pageSize;
        this.totalRecords = this.totalElements;
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

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.pageNum = (this.first + this.rows) / this.rows;
    this.pageSize = this.rows;
    this.getSearchPage();
  }

  hideDialog() {
    this.dialog = false;
  }

  save() {
    const dateStr = this.datepipe.transform(this.date, 'yyyy-MM-dd') + 'T';
    this.schedule.startTime =
      dateStr + this.datepipe.transform(this.startTime, 'HH:mm:ss');
    this.schedule.endTime =
      dateStr + this.datepipe.transform(this.endTime, 'HH:mm:ss');
    if (this.schedule.id) {
      this.scheduleService.update(this.schedule).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: response.message,
          });
          this.schedule = {};
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
      this.scheduleService.createNew(this.schedule).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: response.message,
          });
          this.schedule = {};
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

  add() {
    this.getTrainers();
    this.getClazzes();
    this.schedule = {};
    this.schedule.organizer = JSON.parse(localStorage.getItem('token')).user;
    this.dialog = true;
    this.startTime = new Date();
    this.endTime = new Date();
    this.date = new Date();
  }

  export() {}

  edit(schedule: Schedule) {
    this.getTrainers();
    this.getClazzes();
    this.schedule = { ...schedule };
    this.dialog = true;
    this.startTime = this.schedule.startTime
      ? new Date(this.schedule.startTime)
      : new Date();
    this.endTime = this.schedule.endTime
      ? new Date(this.schedule.endTime)
      : new Date();
    this.date = this.startTime;
  }

  delete(schedule: Schedule) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.scheduleService.deleteById(schedule.id).subscribe(
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

  getSeverity(status: string) {
    switch (status) {
      case 'MONTHLY':
        return 'success';
      case 'T_AND_S':
        return 'warning';
      case 'AD_HOC':
        return 'danger';
      default:
        return 'success';
    }
  }

  remove(option: User) {
    this.schedule.trainers = this.schedule.trainers.filter(
      (item) => item.id !== option.id
    );
  }

  removeSearch(option: User) {
    this.scheduleSearch.trainers = this.scheduleSearch.trainers.filter(
      (item) => item.id !== option.id
    );
  }
}
