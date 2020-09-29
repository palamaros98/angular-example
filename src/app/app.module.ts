import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatFileUploadModule} from 'mat-file-upload';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NewsComponent } from './components/authorized/news/news.component';
import { ActionsNewsComponent } from './components/authorized/news/actions-news/actions-news.component';
import { PagesComponent } from './components/authorized/pages/pages.component';
import { ActionsPagesComponent } from './components/authorized/pages/actions-pages/actions-pages.component';
import { ProfileComponent } from './components/authorized/profile/profile.component';
import { TranslationsComponent } from './components/authorized/translations/translations.component';
import { ActionsTransComponent } from './components/authorized/translations/actions-trans/actions-trans.component';
import { DashboardComponent } from './components/authorized/dashboard/dashboard.component';
import { ServicesComponent } from './components/authorized/services/services.component';
import { ActionsServicesComponent } from './components/authorized/services/actions-services/actions-services.component';
import { RequestService} from './services/request.service';
import { UploaderService} from './services/uploader.service';
import { SidenavService} from './services/sidenav.service';
import {MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import {MomentUtcDateAdapter} from './services/moment-utc-date-adapter';

const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 10
        },
        vertical: {
            position: 'top',
            distance: 10,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatSelectModule,
        MatRadioModule,
        MatStepperModule,
        MatExpansionModule,
        NgxSmartModalModule.forRoot(),
        MatDatepickerModule,
        MatNativeDateModule,
        NotifierModule.withConfig( customNotifierOptions ),
        MatRippleModule,
        MatTabsModule,
        AngularEditorModule,
        MatFileUploadModule
    ],
    declarations: [
        AppComponent,
        AuthorizedComponent,
        UnauthorizedComponent,
        NewsComponent,
        ActionsNewsComponent,
        PagesComponent,
        ActionsPagesComponent,
        ProfileComponent,
        TranslationsComponent,
        ActionsTransComponent,
        DashboardComponent,
        ServicesComponent,
        ActionsServicesComponent,
    ],
    providers: [RequestService, SidenavService, UploaderService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
