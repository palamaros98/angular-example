import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RequestService} from '../../../services/request.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PagesComponent implements OnInit {
    pages: MatTableDataSource<any[]>;
    displayedColumns: string[] = ['id', 'name', 'slug', 'is_show', 'is_special', 'operations'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(public request: RequestService) { }

    ngOnInit(): void {
        this.getPages();

    }

    public getPages(): void {
        this.request.post('/pages/', {})
            .subscribe(value => {
                if (value.error === 0) {
                    this.pages = new MatTableDataSource(value.data_list.pages);
                    if (value.data_list.pages.length > 0) {
                        this.pages.paginator = this.paginator;
                    }
                }
            });
    }

    public deletePage(id): void {
        this.request.post('/pages/delete', {id})
            .subscribe(value => {
                if (value.error === 0) {
                    this.getPages();
                }
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.pages.filter = filterValue.trim().toLowerCase();
    }

    public pageUp(item): void {
        this.request.post('/pages/page_up', {item})
            .subscribe(value => {
                if (value.error === 0) {
                    this.getPages();
                }
            });
    }

    public pageDown(item): void {
        this.request.post('/pages/page_down', {item})
            .subscribe(value => {
                if (value.error === 0) {
                    this.getPages();
                }
            });
    }
}
