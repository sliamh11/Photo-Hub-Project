import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPhoto } from 'src/app/Models/IPhoto';
import { PhotoInfoDialogComponent } from '../photo-info-dialog/photo-info-dialog.component';

@Component({
  selector: 'app-album-photo',
  templateUrl: './album-photo.component.html',
  styleUrls: ['./album-photo.component.css']
})

export class AlbumPhotoComponent {
  @Input() photo: IPhoto;

  constructor(public dialog: MatDialog) { }

  openPhotoInfoDialog = () => {
    this.dialog.open(PhotoInfoDialogComponent, {
      data: this.photo
    });
  }
}