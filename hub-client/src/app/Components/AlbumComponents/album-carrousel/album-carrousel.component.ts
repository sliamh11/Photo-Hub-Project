import { Component, OnInit } from '@angular/core';
import { IPhoto } from 'src/app/Models/IPhoto';
import { AlbumService } from 'src/app/Services/Album/album.service';
import { ConfigService } from 'src/app/Services/config/config.service';

@Component({
  selector: 'app-album-carrousel',
  templateUrl: './album-carrousel.component.html',
  styleUrls: ['./album-carrousel.component.css']
})
export class AlbumCarrouselComponent implements OnInit {

  isPrivateMode: boolean;
  photos: IPhoto[];
  currentSource: string;

  constructor(private albumService: AlbumService, private configService: ConfigService) {
    this.currentSource = "";
    this.loadPhotos();
    this.startCarrousel();
  }

  ngOnInit(): void {
    // Update every time the Private Mode changes.
    this.configService.onPrivateModeChanged.subscribe((isEnabled) => {
      this.filterPrivateImages(isEnabled);
    });
  }

  loadPhotos = async () => {
    this.photos = await this.albumService.getPhotos();
    this.filterPrivateImages(this.configService.getPrivateMode());
    this.currentSource = this.photos[0].src;
  }

  startCarrousel = () => {
    setInterval(() => {
      this.setRandomImage();
    }, 4000);
  }

  setRandomImage = () => {
    if (this.photos.length > 0) {
      const randNumber = Math.floor(Math.random() * this.photos.length);
      this.currentSource = this.photos[randNumber].src;
    }
  }

  filterPrivateImages = (isPrivateMode: boolean) => {
    // Filter private images if private mode is on.
    if (isPrivateMode) {
      this.photos = this.photos?.filter((photo) => {
        return photo.isPrivate;
      });
    } else {
      this.photos = this.albumService.photos;
    }
  }
}
