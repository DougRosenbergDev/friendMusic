import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/music/music.service';
import { Song } from '../song';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  songs: Song[] = [];

//ask angular to inject our musicService
  constructor(private musicService: MusicService) { }

  // initialization of the component
  ngOnInit(): void {
    this.getMusic();
  }

  getMusic(): void {
    this.musicService.getSongs().subscribe(songs => this.songs = songs);
  }

// provide a way 
retrieveSongs() : void {
  this.musicService.getSongs().subscribe(songs => this.songs = songs);
}

}