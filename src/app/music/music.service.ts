import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, of } from 'rxjs';

import { Song, SongDTO } from './song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  //switch out these lines once swagger is running...
  //private musicUrl = 'http://localhost:7004/api/Music';
  private musicUrl = 'api/Music';

private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

constructor(private http: HttpClient) { }

getSongs(): Observable<Song[]> {
  return this.http.get<Song[]>(this.musicUrl, this.httpOptions);
}

getSong(id: number): Observable<Song> {
  let url = `${this.musicUrl}/${id}`;
  return this.http.get<Song>(url, this.httpOptions);
}

createSong(song: Song): Observable<Song> {
  return this.http.post<Song>(this.musicUrl, song, this.httpOptions);
}

updateSong(song: Song): Observable<Song> {
  let url = `${this.musicUrl}/${song.id}`;
  return this.http.put<Song>(url, song, this.httpOptions);
}

deleteSong(id: Number): Observable<Song> {
  return this.http.delete<Song>(`${this.musicUrl}/${id}`, this.httpOptions);
}

// errorHandler(error: any, caught: Observable<Song[]>) {
//   let errorMessage = '';
//   if (error.error instanceof ErrorEvent) {
//     // get client side error
//     errorMessage = error.error.message;
//   } else {
//     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     return throwError(() => new Error(errorMessage));
//   }
// }

}