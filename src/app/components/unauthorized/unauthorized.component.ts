import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
    form = {
        email: '',
        password: ''
    };

    constructor(public request: RequestService, private router: Router, private app: AppComponent) {
    }

    ngOnInit() {
    }

    login() {
        this.request.post('/login', this.form)
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/dashboard']);
                    this.app.setAuthorization(true);
                    this.app.setUserData(value.data_list.fullAccount);
                }
            });
    }

}
