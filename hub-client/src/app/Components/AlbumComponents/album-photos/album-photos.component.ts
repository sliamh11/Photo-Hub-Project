import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPhoto } from 'src/app/Models/IPhoto';
import { AlbumService } from 'src/app/Services/Album/album.service';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {

  photos: IPhoto[];

  constructor(private albumService: AlbumService, private snackBar: MatSnackBar) {
    this.photos = [];
  }

  ngOnInit(): void {
    try {
      this.albumService.handleSearchEvent.subscribe((filterData) => {
        this.filterPhotos(filterData);
      });

      this.albumService.onPhotosUpdatedEvent.subscribe((photos) => {
        this.photos = photos;
      });

    } catch (error) {
      this.snackBar.open(error.message);
    }
  }

  filterPhotos = (filter: any) => {
    try {
      // If empty - return all
      if (filter.caption === "" && filter.categories[0].length === 0) {
        this.photos = this.albumService.photos;
        return;
      }

      let filteredPhotos: IPhoto[] = this.albumService.photos;

      // Check if string is not empty / whitespaces only
      if (/\S/.test(filter.caption)) {
        filteredPhotos = filteredPhotos.filter((photo) => {
          return photo.caption.toLowerCase().includes(filter.caption);
        });
      }

      // Check if first elem of array isn't empty string (array is after .trim())
      if (filter.categories[0].length > 0) {
        filteredPhotos = filteredPhotos.filter((photo) => {
          return photo.categories.some(categ => filter.categories.indexOf(categ.name.toLowerCase()) >= 0);
        });
      }

      this.photos = filteredPhotos;
    } catch (error) {
      this.snackBar.open(error.message, "Ok");
    }
  }
}
