import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../../../services/request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-actions-trans',
    templateUrl: './actions-trans.component.html',
    styleUrls: ['./actions-trans.component.scss']
})
export class ActionsTransComponent implements OnInit {
    currentTable = '';
    word = {
        id: '',
        slug: '',
        languages: []
    };
    languages = [];
    lang = {
        id: '',
        name: '',
        full_name: '',
        code: '',
        is_deleted: false,
        is_active:  false
    };
    pageType = {
        type: '',
        btn_form: ''
    };

    private routeSubscription: Subscription;

    constructor(
        public request: RequestService,
        private router: Router,
        private acRouter: ActivatedRoute) {

        let id = '';
        this.routeSubscription = acRouter.params.subscribe(params => id = params.id);
        this.routeSubscription = acRouter.params.subscribe(params => this.currentTable = params.table);
        (Number(id) > 0) ?
            (this.pageType.type = 'Edit', this.pageType.btn_form = 'Save Change') :
            (this.pageType.btn_form = 'Create', this.pageType.type = 'Create');

        if (this.currentTable === 'trans') {
            id ? this.word.id = id : this.word.id = '';
            (Number(this.word.id) > 0) ? this.getTranslation() : this.getLanguages();
        } else if (this.currentTable === 'language') {
            id ? this.lang.id = id : this.lang.id = '';
            if (Number(this.lang.id) > 0) { this.getLang(); }
        }
    }

    ngOnInit(): void {
    }

    public getTranslation(): void {
        this.request.post('/translations/getTranslation', {id : this.word.id})
            .subscribe(value => {
                if (value.error === 0) {
                    this.word = value.data_list.word;
                }
            });
    }

    public getLanguages(): void {
        this.request.post('/translations/getLanguages', {})
            .subscribe(value => {
                if (value.error === 0) {
                    this.word.languages = value.data_list.languages;
                }
            });
    }

    public updateTranslation(): void {
        this.request.post('/translations/update', { word : this.word })
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/translations']);
                }
            });
    }

    public createTranslation(): void {
        this.request.post('/translations/create', { word : this.word })
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/translations']);
                }
            });
    }

    public getLang(): void {
        this.request.post('/translations/getLang', {id : this.lang.id })
            .subscribe(value => {
                if (value.error === 0) {
                    this.lang = value.data_list;
                    this.lang.is_active = !this.lang.is_deleted;
                }
            });
    }

    public updateLang(): void {
        this.request.post('/translations/updateLang', { lang : this.lang })
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/translations']);
                }
            });
    }

    public createLang(): void {
        this.request.post('/translations/createLang', { lang : this.lang })
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/translations']);
                }
            });
    }

}
