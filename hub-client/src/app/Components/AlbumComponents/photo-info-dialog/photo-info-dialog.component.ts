import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/Models/Category';
import { PhotoModel } from 'src/app/Models/PhotoModel';
import { AlbumService } from 'src/app/Services/Album/album.service';
import { ConfigService } from 'src/app/Services/config/config.service';

@Component({
  selector: 'app-photo-info-dialog',
  templateUrl: './photo-info-dialog.component.html',
  styleUrls: ['./photo-info-dialog.component.css']
})
export class PhotoInfoDialogComponent{
  isEditMode: boolean = false;

  // When updating a file, send the original fileName too to identify the file in case of photo.caption changes.
  fileName: string = this.photo.caption;
  categories = new FormControl();
  categoriesList = [];

  constructor(@Inject(MAT_DIALOG_DATA) public photo: PhotoModel, private albumService: AlbumService, private configService: ConfigService) {
    this.initCategories();
  }

  initCategories = async () => {
    this.categoriesList = await this.configService.getCategories();
    this.categories.setValue(this.photo.categories);
  }

  compareCategories = (firstCat: Category, secondCat: Category) => {
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

  updatePhoto = () => {
    this.photo.categories = this.categories.value;
    this.albumService.updatePhoto(this.photo, this.fileName);
  }
}
