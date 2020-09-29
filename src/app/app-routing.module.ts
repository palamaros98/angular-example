import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import { AuthorizedComponent } from './components/authorized/authorized.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { DashboardComponent } from './components/authorized/dashboard/dashboard.component';
import { PagesComponent } from './components/authorized/pages/pages.component';
import { NewsComponent } from './components/authorized/news/news.component';
import { ProfileComponent } from './components/authorized/profile/profile.component';
import { TranslationsComponent } from './components/authorized/translations/translations.component';
import { ActionsTransComponent } from './components/authorized/translations/actions-trans/actions-trans.component';
import { ActionsNewsComponent } from './components/authorized/news/actions-news/actions-news.component';
import { ActionsPagesComponent } from './components/authorized/pages/actions-pages/actions-pages.component';
import { ServicesComponent } from './components/authorized/services/services.component';
import { ActionsServicesComponent } from './components/authorized/services/actions-services/actions-services.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app/pages',
        pathMatch: 'full'
    },
    {
        path: 'app',
        component: AuthorizedComponent,

        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'pages',
                component: PagesComponent,
            },
            {
                path: 'pages/edit/:id',
                component: ActionsPagesComponent
            },
            {
                path: 'pages/create',
                component: ActionsPagesComponent
            },
            {
                path: 'news',
                component: NewsComponent,
            },
            {
                path: 'news/edit/:id',
                component: ActionsNewsComponent
            },
            {
                path: 'news/create',
                component: ActionsNewsComponent
            },
            {
                path: 'translations',
                component: TranslationsComponent,
            },
            {
                path: 'translations/:table/edit/:id',
                component: ActionsTransComponent
            },
            {
                path: 'translations/:table/create',
                component: ActionsTransComponent
            },
            {
                path: 'services',
                component: ServicesComponent,
            },
            {
                path: 'services/edit/:id',
                component: ActionsServicesComponent
            },
            {
                path: 'services/create',
                component: ActionsServicesComponent
            },
            {
                path: 'account',
                component: ProfileComponent
            },
        ],
    },

    {
        path: 'unauthorized', component: UnauthorizedComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
