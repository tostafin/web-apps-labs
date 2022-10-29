import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable, of} from "rxjs";
import { catchError } from 'rxjs/operators';

import { Post } from "./post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  // getPost(id: number): Observable<Post> {
  //   const url = `${this.postsUrl}/${id}`;
  //   return this.http.get<Post>(url).pipe(
  //     catchError(this.handleError<Post>(`getPost id=${id}`))
  //   )
  // }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions).pipe(
      catchError(this.handleError<Post>('addPost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
