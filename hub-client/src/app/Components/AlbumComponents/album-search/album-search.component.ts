import { Component } from '@angular/core';
import { AlbumService } from 'src/app/Services/Album/album.service';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.css']
})
export class AlbumSearchComponent {

  constructor(private albumService: AlbumService) { }

  searchPhoto(caption: string, category: string) {
    const editedCategoriese = category.trim().toLowerCase().split(/(?:,| )+/);
    const editedCaption = caption.toLowerCase().trim();
    this.albumService.handleSearch({ caption: editedCaption, categories: editedCategoriese });
  }

}
