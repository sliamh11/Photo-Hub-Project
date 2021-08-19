import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoModel } from 'src/app/Models/PhotoModel';
import { AlbumService } from 'src/app/Services/Album/album.service';

@Component({
  selector: 'app-photo-info-dialog',
  templateUrl: './photo-info-dialog.component.html',
  styleUrls: ['./photo-info-dialog.component.css']
})
export class PhotoInfoDialogComponent implements OnInit {

  isEditMode: boolean = false;
  // When updating a file, send the original fileName too to identify the file in case of photo.caption changes.
  fileName: string = this.photo.caption;

  constructor(@Inject(MAT_DIALOG_DATA) public photo: PhotoModel, private albumService: AlbumService) {

  }

  ngOnInit(): void {
  }

  handleEditClicked = () => {
    this.isEditMode = true;
  }

  handleSaveClicked = () => {
    this.isEditMode = false;
    this.albumService.updatePhoto(this.photo, this.fileName);
  }

}
