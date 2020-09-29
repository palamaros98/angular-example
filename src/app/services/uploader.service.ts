import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UploaderService {
    SERVER_URL = 'https://newkatrinasite.awery.com/admin/api';

    constructor(private httpClient: HttpClient) { }

    public upload(data: File, tablePath) {
        const uploadURL = `${this.SERVER_URL}/${tablePath}`;
        const formData = new FormData();
        formData.append('file', data);
        return this.httpClient.post<any>(uploadURL, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);
                        return { status: 'progress', message: progress };

                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return `Unhandled event: ${event.type}`;
                }
            })
        );
    }

}