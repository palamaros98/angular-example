import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Subscription} from 'rxjs';
import {RequestService} from '../../../../services/request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UploaderService} from '../../../../services/uploader.service';
import {NotifierService} from 'angular-notifier';
const dateFormat = require('dateformat');

@Component({
    selector: 'app-actions-news',
    templateUrl: './actions-news.component.html',
    styleUrls: ['./actions-news.component.scss']
})
export class ActionsNewsComponent implements OnInit {
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no'
        //uploadUrl: 'http://shopukrposhta.awery.com/admin/api/pages/upload_image', // if needed
    };
    private readonly notifier: NotifierService;
    private routeSubscription: Subscription;

    news = {
        id: '',
        slug: '',
        image: '',
        published: '',
        is_active: false,
        translations: []
    };
    translations = [];
    pageType = {
        type: '',
        btn_form: ''
    };
    attachedFile;
    uploadResponse = { error: '', message: '', data_list: {filepath: ''} };
    uploadResponseError = { status: '', message: '', filePath: '' };

    constructor(
        public request: RequestService,
        private router: Router,
        private acRouter: ActivatedRoute,
        private uploadService: UploaderService,
        notifierService: NotifierService) {

        this.notifier = notifierService;
        let id = '';
        this.routeSubscription = acRouter.params.subscribe(params => id = params.id);
        id ? this.news.id = id : this.news.id = '';
        if (Number(this.news.id) > 0) {
            this.getNews();
            this.pageType.type = 'Edit';
            this.pageType.btn_form = 'Save Change';
        } else {
            this.getLanguages();
            this.pageType.type = 'Create';
            this.pageType.btn_form = 'Create';
        }
    }

    ngOnInit(): void  {
    }

    public getNews(): void {
        this.request.post('/news/get', { id : this.news.id })
            .subscribe(value => {
                if (value.error === 0) {
                    this.news = value.data_list.news;
                    this.translations = value.data_list.translations;
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

    public updateNews(): void {
        this.news.translations = this.translations;
        this.news.published = dateFormat(this.news.published, 'yyyy-mm-dd');
        this.request.post('/news/update', { news : this.news})
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/news']);
                }
            });
    }

    public createNews(): void {
        this.news.translations = this.translations;
        this.request.post('/news/create', { news  : this.news})
            .subscribe(value => {
                if (value.error === 0) {
                    this.router.navigate(['/app/news']);
                }
            });
    }

    public onUploadClicked(): void {
        if (this.attachedFile[0]) {
            this.uploadService.upload(this.attachedFile[0], 'news/upload').subscribe(
                (res) => {
                    this.uploadResponse = res;
                    if (Number(this.uploadResponse.error) > 0) {
                        this.notifier.notify('error', this.uploadResponse.message);
                    } else if (Number(this.uploadResponse.error) === 0) {
                        this.notifier.notify('success', this.uploadResponse.message);
                        this.news.image = this.uploadResponse.data_list.filepath;
                    }
                },
                (err) => {
                    this.uploadResponseError = err;
                    console.log(this.uploadResponseError);
                }
            );
        }
    }

    public onSelectedFilesChanged(event): void {
        this.attachedFile = event;
    }
}
