import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {RequestService} from '../../../services/request.service';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(
    public request: RequestService,
    notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
  }

  updateUserData(): void {

  }

  clearCategoryCache(): void {
    this.request.post('/clearCategoriesCache', {})
      .subscribe(value => {
        if (value.error === 0) {
          this.notifier.notify( 'success', value.message);
        }
      });
  }

}
