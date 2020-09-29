import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {RequestService} from './services/request.service';
import {Router} from '@angular/router';
import {User} from './clasess/user';
import {SidenavService} from './services/sidenav.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    authorized: boolean;
    private user: User;
    host = '';

    constructor(
        private router: Router,
        private request: RequestService) {

        this.authorized = false;
        this.user = new User();
        this.host = 'https://newkatrinasite.awery.com/admin/api';
        this.request.get('/isLogin')
            .subscribe(value => {
                this.authorized = value.error !== 401;

                if (value.error !== 401) {
                    this.authorized = true;
                    this.router.navigate(['/app/news']);
                } else if (value.error === 401) {
                    this.router.navigate(['/unauthorized']);
                }
                console.log('User:');
                console.log(value.error !== 401, value, value.error);
                if (value.error !== 401) {
                    this.setUserData(JSON.parse(localStorage.getItem('user')));
                    if (this.user === null) {
                        this.router.navigate(['/unauthorized']);
                    }
                }
            });
    }

    public setAuthorization(authorized: boolean): boolean {
        this.authorized = authorized;
        return this.authorized;
    }

    public setUserData(user): void {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    public getUserData(): User {
        return this.authorized ? JSON.parse(JSON.stringify(this.user)) : null;
    }
}
