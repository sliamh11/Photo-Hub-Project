import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoInterface } from 'src/app/Models/PhotoInterface';
import { PhotoInfoDialogComponent } from '../photo-info-dialog/photo-info-dialog.component';


@Component({
  selector: 'app-album-photo',
  templateUrl: './album-photo.component.html',
  styleUrls: ['./album-photo.component.css']
})

export class AlbumPhotoComponent implements OnInit {
  @Input() photo: PhotoInterface;

  constructor(public dialog: MatDialog) {
  }

  openPhotoInfo = () => {
    this.dialog.open(PhotoInfoDialogComponent, {
      data: this.photo
    });
  }

  ngOnInit(): void {
  }
}