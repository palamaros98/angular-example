import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {RequestService} from '../../../services/request.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
    news: MatTableDataSource<any[]>;
    displayedColumns: string[] = ['id', 'name', 'slug', 'published', 'image', 'is_active', 'operations'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(public request: RequestService) { }

    ngOnInit(): void {
        this.getNews();
    }

    public getNews(): void {
        this.request.post('/news/', {})
            .subscribe(value => {
                if (value.error === 0) {
                    this.news = new MatTableDataSource(value.data_list.news);
                    if (value.data_list.news.length > 0) {
                        this.news.paginator = this.paginator;
                    }
                }
            });
    }

    public deletePage(id): void {
        this.request.post('/news/delete', {id})
            .subscribe(value => {
                if (value.error === 0) {
                    this.getNews();
                }
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.news.filter = filterValue.trim().toLowerCase();
    }

}
