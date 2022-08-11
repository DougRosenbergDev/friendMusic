import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, of, from } from 'rxjs';
import { Song, SongDTO } from './song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private musicUrl = 'http://localhost:7004/api/Music';

  tempSongsData: Song[] = [{"id":1,"name":"Movies","artist":"Alien Ant Farm","length":"00:03:20","keySignature":"C"},{"id":2,"name":"Tribute","artist":"Tenacious D","length":"00:04:08","keySignature":"B"},{"id":3,"name":"Bohemian Rhapsody","artist":"Queen","length":"00:05:55","keySignature":"C"},{"id":4,"name":"Thriller","artist":"Michael Jackson","length":"00:05:57","keySignature":"Bb"},{"id":5,"name":"We Belong Together","artist":"Mariah Carey","length":"00:04:01","keySignature":"C"},{"id":6,"name":"Hollaback Girl","artist":"Gwen Stefani","length":"00:04:01","keySignature":"Bb"},{"id":7,"name":"Let Me Love You","artist":"Mario","length":"00:04:01","keySignature":"Bb"},{"id":8,"name":"Since U Been Gone","artist":"Kelly Clarkson","length":"00:04:01","keySignature":"B"},{"id":9,"name":"1, 2 Step","artist":"Ciara featuring Missy Elliott","length":"00:04:01","keySignature":"B"},{"id":10,"name":"Gold Digger","artist":"Kanye West featuring Jamie Foxx","length":"00:04:01","keySignature":"F"},{"id":11,"name":"Boulevard of Broken Dreams","artist":"Green Day","length":"00:04:01","keySignature":"E"},{"id":12,"name":"Candy Shop","artist":"50 Cent featuring Olivia","length":"00:04:01","keySignature":"C#"},{"id":13,"name":"Don't Cha","artist":"The Pussycat Dolls featuring Busta Rhymes","length":"00:04:01","keySignature":"F#"},{"id":14,"name":"Behind These Hazel Eyes","artist":"Kelly Clarkson","length":"00:04:01","keySignature":"B"},{"id":15,"name":"Disco Inferno","artist":"50 Cent","length":"00:04:01","keySignature":"F#"},{"id":16,"name":"You and Me","artist":"Lifehouse","length":"00:04:01","keySignature":"C"},{"id":17,"name":"Don't Phunk with My Heart","artist":"The Black Eyed Peas","length":"00:04:01","keySignature":"E"},{"id":18,"name":"Lose Control","artist":"Missy Elliott featuring Ciara and Fatman Scoop","length":"00:04:01","keySignature":"C"},{"id":19,"name":"Shake It Off","artist":"Mariah Carey","length":"00:04:01","keySignature":"E"},{"id":20,"name":"Mr. Brightside","artist":"The Killers","length":"00:04:01","keySignature":"A"}
,{"id":21,"name":"Just a Lil Bit","artist":"50 Cent","length":"00:04:01","keySignature":"A"},{"id":22,"name":"Pon de Replay","artist":"Rihanna","length":"00:04:01","keySignature":"E"},{"id":23,"name":"How We Do","artist":"The Game featuring 50 Cent","length":"00:04:01","keySignature":"A"},{"id":24,"name":"Beverly Hills","artist":"Weezer","length":"00:04:01","keySignature":"D"},{"id":25,"name":"Oh","artist":"Ciara featuring Ludacris","length":"00:04:01","keySignature":"D"},{"id":26,"name":"Lonely No More","artist":"Rob Thomas","length":"00:04:01","keySignature":"F"},{"id":27,"name":"Drop It Like It's Hot","artist":"Snoop Dogg featuring Pharrell","length":"00:04:01","keySignature":"B"},{"id":28,"name":"Hate It or Love It","artist":"The Game featuring 50 Cent","length":"00:04:01","keySignature":"G"},{"id":29,"name":"Lovers & Friends","artist":"Lil Jon featuring Usher and Ludacris","length":"00:04:01","keySignature":"F#"},{"id":30,"name":"Soldier","artist":"Destiny's Child featuring T.I. and Lil Wayne","length":"00:04:01","keySignature":"A"},{"id":31,"name":"Breakaway","artist":"Kelly Clarkson","length":"00:04:01","keySignature":"A"},{"id":32,"name":"Switch","artist":"Will Smith","length":"00:04:01","keySignature":"G"},{"id":33,"name":"Let Me Hold You","artist":"Bow Wow featuring Omarion","length":"00:04:01","keySignature":"D"},{"id":34,"name":"Like You","artist":"Bow Wow featuring Ciara","length":"00:04:01","keySignature":"D"},{"id":35,"name":"Rich Girl","artist":"Gwen Stefani featuring Eve","length":"00:04:01","keySignature":"G"},{"id":36,"name":"My Humps","artist":"The Black Eyed Peas","length":"00:04:01","keySignature":"A"},{"id":37,"name":"Obsession (No Es Amor)","artist":"Frankie J featuring Baby Bash","length":"00:04:01","keySignature":"C"},{"id":38,"name":"Caught Up","artist":"Usher","length":"00:04:01","keySignature":"G"},{"id":39,"name":"Listen to Your Heart","artist":"DHT featuring Edmee","length":"00:04:01","keySignature":"F#"},{"id":40,"name":"Scars","artist":"Papa Roach","length":"00:04:01","keySignature":"D"},{"id":41,"name":"Feel Good Inc.","artist":"Gorillaz","length":"00:04:01","keySignature":"A"},{"id":42,"name":"Let Me Go","artist":"3 Doors Down","length":"00:04:01","keySignature":"C#"},{"id":43,"name":"Holiday","artist":"Green Day","length":"00:04:01","keySignature":"C"},{"id":44,"name":"Sugar, We're Goin Down","artist":"Fall Out Boy","length":"00:04:01","keySignature":"C"},{"id":45,"name":"Grind with Me","artist":"Pretty Ricky","length":"00:04:01","keySignature":"C#"},{"id":46,"name":"Run It!","artist":"Chris Brown featuring Juelz Santana","length":"00:04:01","keySignature":"D"},{"id":47,"name":"Photograph","artist":"Nickelback","length":"00:04:01","keySignature":"G"},{"id":48,"name":"Lonely","artist":"Akon","length":"00:04:01","keySignature":"C#"},{"id":49,"name":"Collide","artist":"Howie Day","length":"00:04:01","keySignature":"F#"},{"id":50,"name":"Wake Me Up When September Ends","artist":"Green Day","length":"00:04:01","keySignature":"E"},{"id":51,"name":"Slow Down","artist":"Bobby Valentino","length":"00:04:01","keySignature":"E"},{"id":52,"name":"Over and Over","artist":"Nelly featuring Tim McGraw","length":"00:04:01","keySignature":"C"},{"id":53,"name":"Some Cut","artist":"Trillville featuring Cutty","length":"00:04:01","keySignature":"F"},{"id":54,"name":"Get It Poppin'","artist":"Fat Joe featuring Nelly","length":"00:04:01","keySignature":"C#"},{"id":55,"name":"Play","artist":"David Banner","length":"00:04:01","keySignature":"D"},{"id":56,"name":"Soul Survivor","artist":"Young Jeezy featuring Akon","length":"00:04:01","keySignature":"G"},{"id":57,"name":"Pimpin' All Over the World","artist":"Ludacris featuring Bobby Valentino","length":"00:04:01","keySignature":"C"},{"id":58,"name":"My Boo","artist":"Usher and Alicia Keys","length":"00:04:01","keySignature":"G"},{"id":59,"name":"Sugar (Gimme Some)","artist":"Trick Daddy featuring Ludacris, Lil' Kim and Cee Lo Green","length":"00:04:01","keySignature":"B"},{"id":60,"name":"Karma","artist":"Alicia Keys","length":"00:04:01","keySignature":"C#"},{"id":61,"name":"Speed of Sound","artist":"Coldplay","length":"00:04:01","keySignature":"E"},{"id":62,"name":"I Don't Want to Be","artist":"Gavin DeGraw","length":"00:04:01","keySignature":"B"},{"id":63,"name":"Mockingbird","artist":"Eminem","length":"00:04:01","keySignature":"D"},{"id":64,"name":"La Tortura","artist":"Shakira featuring Alejandro Sanz","length":"00:04:01","keySignature":"E"},{"id":65,"name":"She Will Be Loved","artist":"Maroon 5","length":"00:04:01","keySignature":"Bb"},{"id":66,"name":"Baby I'm Back","artist":"Baby Bash featuring Akon","length":"00:04:01","keySignature":"D"},{"id":67,"name":"Wait (The Whisper Song)","artist":"Ying Yang Twins","length":"00:04:01","keySignature":"C"},{"id":68,"name":"Incomplete","artist":"Backstreet Boys","length":"00:04:01","keySignature":"Bb"},{"id":69,"name":"Bring Em Out","artist":"T.I.","length":"00:04:01","keySignature":"B"},{"id":70,"name":"Cater 2 U","artist":"Destiny's Child","length":"00:04:01","keySignature":"C"},{"id":71,"name":"1 Thing","artist":"Amerie","length":"00:04:01","keySignature":"E"},{"id":72,"name":"Best of You","artist":"Foo Fighters","length":"00:04:01","keySignature":"F"},{"id":73,"name":"It's Like That","artist":"Mariah Carey featuring Jermaine Dupri and Fatman Scoop","length":"00:04:01","keySignature":"B"},{"id":74,"name":"Goin' Crazy","artist":"Natalie","length":"00:04:01","keySignature":"Bb"},{"id":75,"name":"Inside Your Heaven","artist":"Carrie Underwood","length":"00:04:01","keySignature":"G"},{"id":76,"name":"Because of You","artist":"Kelly Clarkson","length":"00:04:01","keySignature":"F"},{"id":77,"name":"Truth Is","artist":"Fantasia","length":"00:04:01","keySignature":"B"},{"id":78,"name":"Your Body","artist":"Pretty Ricky","length":"00:04:01","keySignature":"B"},{"id":79,"name":"Beautiful Soul","artist":"Jesse McCartney","length":"00:04:01","keySignature":"Bb"},{"id":80,"name":"Cool","artist":"Gwen Stefani","length":"00:04:01","keySignature":"E"},{"id":81,"name":"Get Back","artist":"Ludacris","length":"00:04:01","keySignature":"A"},{"id":82,"name":"Outta Control","artist":"50 Cent featuring Mobb Deep","length":"00:04:01","keySignature":"C#"},{"id":83,"name":"U Don't Know Me","artist":"T.I.","length":"00:04:01","keySignature":"A"},{"id":84,"name":"These Words","artist":"Natasha Bedingfield","length":"00:04:01","keySignature":"Bb"},{"id":85,"name":"Don't Lie","artist":"The Black Eyed Peas","length":"00:04:01","keySignature":"A"},{"id":86,"name":"Get Right","artist":"Jennifer Lopez","length":"00:04:01","keySignature":"G"},{"id":87,"name":"Daughters","artist":"John Mayer","length":"00:04:01","keySignature":"A"},{"id":88,"name":"As Good as I Once Was","artist":"Toby Keith","length":"00:04:01","keySignature":"D"},{"id":89,"name":"Girlfight","artist":"Brooke Valentine featuring Lil Jon and Big Boi","length":"00:04:01","keySignature":"F#"},{"id":90,"name":"Lose My Breath","artist":"Destiny's Child","length":"00:04:01","keySignature":"A"},{"id":91,"name":"Ordinary People","artist":"John Legend","length":"00:04:01","keySignature":"F#"},{"id":92,"name":"We Be Burnin'","artist":"Sean Paul","length":"00:04:01","keySignature":"E"},{"id":93,"name":"Just the Girl","artist":"The Click Five","length":"00:04:01","keySignature":"E"},{"id":94,"name":"True","artist":"Ryan Cabrera","length":"00:04:01","keySignature":"D"},{"id":95,"name":"O","artist":"Omarion","length":"00:04:01","keySignature":"G"},{"id":96,"name":"Back Then","artist":"Mike Jones","length":"00:04:01","keySignature":"C#"},{"id":97,"name":"Numb\/Encore","artist":"Jay-Z and Linkin Park","length":"00:04:01","keySignature":"G"},{"id":98,"name":"Wonderful","artist":"Ja Rule featuring R. Kelly and Ashanti","length":"00:04:01","keySignature":"A"},{"id":99,"name":"I'm Sprung","artist":"T-Pain","length":"00:04:01","keySignature":"D"},{"id":100,"name":"Chariot","artist":"Gavin DeGraw","length":"00:04:01","keySignature":"E"},{"id":101,"name":"U Already Know","artist":"112 featuring Foxy Brown","length":"00:04:01","keySignature":"F"},{"id":102,"name":"Mississippi Girl","artist":"Faith Hill","length":"00:04:01","keySignature":"D"},{"id":103,"name":"Number One Spot","artist":"Ludacris","length":"00:04:01","keySignature":"B"},{"id":104,"name":"Give Me That","artist":"Webbie featuring Bun B","length":"00:04:01","keySignature":"C"}];

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getSongs(id: number): Observable<Song[]> {
    let url = `${this.musicUrl}/${id}`;
    return of(this.tempSongsData)
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


