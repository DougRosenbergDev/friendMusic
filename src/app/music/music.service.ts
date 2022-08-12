import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, of, from } from 'rxjs';
import { Song, SongDTO } from './song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  //private musicUrl = 'http://localhost:7004/api/Music';
  private musicUrl = 'api/Music';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getSongs(id: number): Observable<Song[]> {
    return this.http.get<Song[]>(this.musicUrl, this.httpOptions);
  }

createSong(song: SongDTO): Observable<Song> {
  let songToAdd: Song = {
    id: this.tempSongsData.length + 1,
    name: song.name,
    artist: song.artist,
    length: song.length,
    keySignature: song.keySignature
  };
  this.tempSongsData.push(song);
  this.http.post<SongDTO>(this.musicUrl, JSON.stringify(songToAdd, this.httpOptions)
    .pipe(
      catchError(this.errorHandler))
    )
  return of(songToAdd);
}

updateSong(song: Song): Observable<Song> {
  let url = `${this.musicUrl}/${song.id}`;
  return this.http.put<Song>(url, song, this.httpOptions);
}

deleteSong(id: Number): Observable<Song> {
  return  this.http.delete<Song>(`${this.musicUrl}/${id}`, this.httpOptions);
}

errorHandler(error: Error | ErrorEvent | any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // get client side error
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => new Error(errorMessage));
  }
  }
}


