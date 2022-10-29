import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import { catchError } from 'rxjs/operators';

import { Photo } from "./photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photosUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl)
      .pipe(
        catchError(this.handleError<Photo[]>('getPhotos', []))
      );
  }

  getPhoto(id: number): Observable<Photo> {
    const url = `${this.photosUrl}/${id}`;
    return this.http.get<Photo>(url).pipe(
      catchError(this.handleError<Photo>(`getPhoto id=${id}`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
