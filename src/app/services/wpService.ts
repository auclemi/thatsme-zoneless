// import { signal, computed, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { catchError, map, tap } from 'rxjs/operators';
// import { EMPTY, Observable, Observer, BehaviorSubject } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class WpService {
//   readonly http = inject(HttpClient);
//   readonly apiUrl = 'http://localhost/wp/wp-json/wp/v2/';

//   _loading = signal(false);
//   _error = signal<string | null>(null);
//   // _page = signal<any | null>(null);

//   loading = computed(() => this._loading());
//   error = computed(() => this._error());
//   // page = computed(() => this._page());
//   page$ = new Observable<any>

//   loadBySlug(slug: string): void {
//     this._loading.set(true);
//     this._error.set(null);

//     this.http.get<any[]>(`${this.apiUrl}pages/?slug=${slug}`).pipe(
//       map(res => {
//         if (!res.length) throw new Error(`Page: ${slug} non trouvée.`);
//         this._loading.set(false)
//         return res[0];
//       }),
//       tap(res => this.page$.next(res)),
//       catchError(err => {
//         this._error.set(err.message);
//         this._loading.set(false);
//         return EMPTY;
//       }),
//     ).subscribe();
//   }

//   getBySlug(slug: string): Observable<any> {
//     this._loading.set(true);
//     this._error.set(null);

//     return this.http.get<any[]>(`${this.apiUrl}pages/?slug=${slug}`).pipe(
//       tap(res => {
//         if (!res.length) throw new Error(`Page: ${slug} non trouvée.`);
//         this._loading.set(false)
//         // return res[0];
//       }),
//       tap(res => this._page.set(res)),
//       catchError(err => {
//         this._error.set(err.message);
//         this._loading.set(false);
//         return EMPTY;
//       }),
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export interface Page {
  title: { rendered: string };
  content: { rendered: string };
}

@Injectable({ providedIn: 'root' })
export class WpService {
  private pageSubject = new BehaviorSubject<Page | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<any>(null);

  // Expose as observables
  page$ = this.pageSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  readonly apiUrl = 'http://localhost/wp/wp-json/wp/v2/';


  constructor(private http: HttpClient) {}

  loadBySlug(slug: string): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.http.get<Page[]>(`${this.apiUrl}pages/?slug=${slug}`).pipe(
      tap(page => {
        if(page.length){
        this.pageSubject.next(page[0])
      } else {
        this.errorSubject.next('Page not found');
      }
      }),
      catchError(err => {
        this.errorSubject.next(err);
        throw err;
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe();
  }
}

