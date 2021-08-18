import { Component, Input, OnInit } from '@angular/core';
import { PhotoInterface } from 'src/app/Models/PhotoInterface';

@Component({
  selector: 'app-album-photo',
  templateUrl: './album-photo.component.html',
  styleUrls: ['./album-photo.component.css']
})

export class AlbumPhotoComponent implements OnInit {
@Input() photo: PhotoInterface;

  constructor() {
   }

  ngOnInit(): void {
  }

}
