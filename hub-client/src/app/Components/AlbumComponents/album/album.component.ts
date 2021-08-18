import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/Services/Album/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(private albumService: AlbumService) {
  }

  ngOnInit(): void {
  }


}
