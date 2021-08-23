import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { AlbumCarrouselComponent } from './Components/AlbumComponents/album-carrousel/album-carrousel.component';
import { AlbumComponent } from './Components/AlbumComponents/album/album.component';
import { ConfigComponent } from './Components/config/config.component';
import { EditCategoriesComponent } from './Components/edit-categories/edit-categories.component';
import { PhotoInfoComponent } from './Components/photo-info/photo-info.component';
import { UploadImageComponent } from './Components/UploadImageComponents/upload-image/upload-image.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "config", component: ConfigComponent },
  { path: "upload-image", component: UploadImageComponent },
  { path: "album", component: AlbumComponent },
  { path: "album-carrousel", component: AlbumCarrouselComponent },
  { path: "photo-info", component: PhotoInfoComponent },
  { path: "about", component: AboutComponent },
  { path: "edit-categories", component: EditCategoriesComponent },
  { path: "**", component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
