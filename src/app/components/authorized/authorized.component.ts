import {AfterViewInit, Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {User} from '../../clasess/user';
import {FormControl} from '@angular/forms';
import {SidenavService} from '../../services/sidenav.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
    selector: 'app-authorized',
    templateUrl: './authorized.component.html',
    styleUrls: ['./authorized.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AuthorizedComponent implements OnInit, AfterViewInit {
    user: User;
    mode = (window.innerWidth < 1200) ? new FormControl('over') : new FormControl('side');
    openSide = (window.innerWidth < 1200) ? false : true;
    @ViewChild('sidenav') public sidenav: MatSidenav;

    constructor(
        private request: RequestService,
        private router: Router,
        private app: AppComponent,
        private sidenavService: SidenavService
    ) {}

    ngOnInit(): void {
        this.getUserData();
    }

    ngAfterViewInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }

    @HostListener('window:resize', [''])
    onResize() {
        if (window.innerWidth < 1200) {
            this.sidenavService.close();
            this.mode = new FormControl('over');
        } else {
            this.sidenavService.open();
            this.mode = new FormControl('side');
        }
    }

    public sidenavToggle() {
        this.sidenavService.toggle();
    }


    private getUserData() {
        this.user = this.app.getUserData();
        if (this.user === null) {
            setTimeout(() => {
                this.getUserData();
            }, 100);
        }
    }

    logout() {
        this.request.post('/logout', {})
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/unauthorized']);
                    this.app.setAuthorization(false);
                }
            });
    }

}
