import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/Models/ICategory';
import { ILocation } from 'src/app/Models/ILocation';
import { PhotoModel } from 'src/app/Models/PhotoModel';
import { AlbumService } from 'src/app/Services/Album/album.service';
import { ConfigService } from 'src/app/Services/config/config.service';
import { LocationDialogComponent } from '../../location-dialog/location-dialog.component';

@Component({
  selector: 'app-photo-info-dialog',
  templateUrl: './photo-info-dialog.component.html',
  styleUrls: ['./photo-info-dialog.component.css']
})
export class PhotoInfoDialogComponent implements OnInit {

  fileName: string = this.photo.caption; // saving caption in case caption will be changed (original must be sent to server).
  categories = new FormControl();
  isEditMode: boolean = false;
  categoriesList: ICategory[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public photo: PhotoModel,
    private albumService: AlbumService,
    private configService: ConfigService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.initCategories();
  }
  ngOnInit(): void {
  }

  initCategories = async () => {
    this.categoriesList = await this.configService.getCategories();
    this.categories.setValue(this.photo.categories);
  }

  compareCategories = (firstCat: ICategory, secondCat: ICategory) => {
    // Categories comparison in html - if true -> is a current category in photo.categories.
    return firstCat && secondCat
      ? firstCat.id === secondCat.id
      : firstCat === secondCat;
  }

  handleEditClicked = () => {
    this.isEditMode = true;
  }

  handleFavoriteClicked = () => {
    this.photo.isFavorite = !this.photo.isFavorite;
    this.updatePhoto();
  }

  handleLockClicked = () => {
    this.photo.isPrivate = !this.photo.isPrivate;
    this.updatePhoto();
  }

  handleSaveClicked = () => {
    this.isEditMode = false;
    this.updatePhoto();
  }

  openLocationDialog = () => {
    // Send the current location of the photo to the location-dialog
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      data: this.photo.location
    });

    dialogRef.afterClosed().subscribe(newLocation => {
      if (newLocation) {
        this.photo.location = newLocation.data;
      }
    });
  }

  updatePhoto = () => {
    try {
      this.photo.categories = this.categories.value;
      this.albumService.updatePhoto(this.photo, this.fileName);
    } catch (error) {
      this.snackBar.open(error, "Ok");
    }
  }
}
