import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPhoto } from 'src/app/Models/IPhoto';
import { IView } from 'src/app/Models/IView';
import { AlbumService } from 'src/app/Services/Album/album.service';
import { ConfigService } from 'src/app/Services/config/config.service';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {

  photos: IPhoto[];
  viewOptions: IView[];
  isFavoriteMode: boolean;
  viewMode: IView;

  constructor(
    private albumService: AlbumService,
    private snackBar: MatSnackBar,
    private configService: ConfigService
    ) {
    this.loadViewMode();
    this.photos = [];

    // Subscribed here because it needs to get the value before AlbumSearchComponent.
    this.albumService.onFavoriteModeChanged.subscribe((isEnabled) => {
      this.isFavoriteMode = isEnabled;
    });
  }

  loadViewMode = async () => {
    this.viewMode = await this.configService.getSelectedView();
  }

  ngOnInit(): void {
    try {
      // When a new search request has been made.
      this.albumService.handleSearchEvent.subscribe((filterData) => {
        this.filterPhotos(filterData);
      });

      // When the photo's list updates.
      this.albumService.onPhotosUpdatedEvent.subscribe((photos) => {
        this.photos = this.additionalFilters(photos);
      });

      // When view selection changes.
      this.albumService.onViewModeChanged.subscribe((view) => {
        this.viewMode = view;
      })

      // If still not loaded (will occur when coming back to the photos album for the second time without reloading the site.)
      if (this.photos.length === 0) {
        this.photos = this.additionalFilters(this.albumService.photos);
      }
    } catch (error) {
      this.snackBar.open(error.message);
    }
  }

  filterPrivateMode = (photosList: IPhoto[]) => {
    // Get current private mode status.
    const isPrivateMode = this.configService.getPrivateMode();
    // Filter accordingly.
    if (isPrivateMode) {
      return photosList = photosList.filter((photo) => {
        return photo.isPrivate;
      });
    } else {
      return photosList = photosList.filter((photo) => {
        return !photo.isPrivate;
      });
    }
  }

  filterFavoriteMode = (photosList: IPhoto[]) => {
    if (this.isFavoriteMode) {
      return photosList = photosList.filter((photo) => {
        return photo.isFavorite;
      });
    }
    return photosList;
  }

  // Combination of Private & Favorite modes
  additionalFilters = (photosList: IPhoto[]) => {
    photosList = this.filterPrivateMode(photosList);
    photosList = this.filterFavoriteMode(photosList);
    return photosList;
  }

  filterPhotos = (filter: any) => {
    try {
      let filteredPhotos: IPhoto[] = this.albumService.photos;

      // Private Mode && Favorite Pictures filtering
      filteredPhotos = this.additionalFilters(filteredPhotos);

      // If empty - return all
      if (filter.caption.trim() === "" && filter.categories[0].length === 0) {
        this.photos = filteredPhotos;
        return;
      }

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
