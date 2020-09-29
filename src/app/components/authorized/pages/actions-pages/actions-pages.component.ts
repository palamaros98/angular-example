import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestService} from '../../../../services/request.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
const host = 'https://newkatrinasite.awery.com/admin/api';

@Component({
    selector: 'app-actions-pages',
    templateUrl: './actions-pages.component.html',
    styleUrls: ['./actions-pages.component.scss']
})
export class ActionsPagesComponent implements OnInit {
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        uploadUrl: host + '/pages/upload_photo', // if needed
    };

    private routeSubscription: Subscription;
    pages = [];
    allPages = [];
    page = {
        id: '',
        slug: '',
        pid: 0,
        is_show: false,
        is_special: false,
        translations: []
    };
    translations = [];
    pageType = {
        type: '',
        btn_form: ''
    };

    constructor(public request: RequestService, private router: Router, private acRouter: ActivatedRoute) {
        let id = '';
        this.routeSubscription = acRouter.params.subscribe(params => id = params.id);
        id ? this.page.id = id : this.page.id = '';
        if (Number(this.page.id) > 0) {
            this.getPage();
            this.pageType.type = 'Edit';
            this.pageType.btn_form = 'Save Change';
        } else {
            this.getPages();
            this.getLanguages();
            this.pageType.type = 'Create';
            this.pageType.btn_form = 'Create';
        }
    }

    ngOnInit(): void  {
    }

    public getPage(): void {
        this.request.post('/pages/get', {id : this.page.id})
            .subscribe(value => {
                if (value.error === 0) {
                    this.page = value.data_list.page;
                    this.allPages = value.data_list.allPages;
                    this.translations = value.data_list.translations;
                }
            });
    }

    public getPages(): void {
        this.request.post('/pages/parent_pages', {})
            .subscribe(value => {
                if (value.error === 0) {
                    this.allPages = value.data_list.parents;
                }
            });
    }

    public getLanguages(): void {
        this.request.post('/pages/languages', {})
            .subscribe(value => {
                if (value.error === 0) {
                    this.translations = value.data_list;
                }
            });
    }

    public updatePage(): void {
        this.page.translations = this.translations;
        this.request.post('/pages/update', {'page' : this.page})
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/pages']);
                }
            });
    }

    public createPage(): void {
        this.page.translations = this.translations;
        this.request.post('/pages/create', {'page' : this.page})
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/pages']);
                }
            });
    }

}
