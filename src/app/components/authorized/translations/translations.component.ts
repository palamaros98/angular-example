import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {RequestService} from '../../../services/request.service';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {
    translations: MatTableDataSource<any[]>;
    languages: MatTableDataSource<any[]>;
    displayedColumns: string[] = ['id', 'slug', 'origin', 'trans', 'operations'];
    displayedColumnsLanguages: string[] = ['id', 'full_name', 'name', 'code', 'is_active', 'operations'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(public request: RequestService) { }

    ngOnInit(): void {
        this.getTranslations();
        this.getLanguages();
    }

    public getTranslations(): void {
        this.request.post('/translations/', {})
            .subscribe(value => {
                if (value.error === 0) {
                    this.translations = new MatTableDataSource(value.data_list.words);
                    if (value.data_list.words.length > 0) {
                        this.translations.paginator = this.paginator;
                    }
                }
            });
    }

    public getLanguages(): void {
        this.request.post('/translations/languages', {})
            .subscribe(value => {
                if (value.error === 0) {
                    this.languages = value.data_list;
                }
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.translations.filter = filterValue.trim().toLowerCase();
    }

}
