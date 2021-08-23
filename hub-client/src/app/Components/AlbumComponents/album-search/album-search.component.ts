import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/Services/Album/album.service';
import { ConfigService } from 'src/app/Services/config/config.service';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.css']
})
export class AlbumSearchComponent implements OnInit {

  captionInput: string;
  categoryInput: string;

  constructor(private albumService: AlbumService, private configService: ConfigService) {
    this.captionInput = "";
    this.categoryInput = "";
  }

  ngOnInit(): void {
    // Every time Private/Favorite mode are changed, re-search the photos.
    this.configService.onPrivateModeChanged.subscribe(() => {
      this.searchPhoto();
    });

    this.albumService.onFavoriteModeChanged.subscribe(() => {
      this.searchPhoto();
    });
  }

  searchPhoto = () => {
    const editedCategoriese = this.categoryInput.trim().toLowerCase().split(/(?:,| )+/);
    const editedCaption = this.captionInput.toLowerCase().trim();
    this.albumService.handleSearch({
      caption: editedCaption,
      categories: editedCategoriese,
    });
  }

}
