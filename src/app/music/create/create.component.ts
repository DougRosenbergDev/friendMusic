import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MusicModule } from '../music.module';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public newSongForm!: FormGroup

  constructor(
    private musicService: MusicService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newSongForm = new FormGroup({
      name: new FormControl('name', Validators.required),
      artist: new FormControl('artist', Validators.required),
      length: new FormControl('ength', Validators.required),
      keySignature: new FormControl('keySignature', Validators.required)
    });
  }

  get f() { return this.newSongForm.controls; }

  submit(){
    this.musicService.createSong(this.newSongForm.value).subscribe(() => {
      console.log(this.newSongForm.value);
      console.log(this.newSongForm.valid);
      console.log("Song created successfully");
      this.router.navigateByUrl('music/index');
    });
    
  }

}
