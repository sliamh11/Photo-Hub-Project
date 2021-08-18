// General imports
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatComponentsModule } from './mat-components.module';

// Components
import { AppComponent } from './Components/AppComponent/app.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { NavComponent } from './Components/nav/nav.component';
import { ConfigComponent } from './Components/config/config.component';
import { UploadImageComponent } from './Components/UploadImageComponents/upload-image/upload-image.component';
import { CameraComponent } from './Components/UploadImageComponents/camera/camera.component';
import { LocalMachineComponent } from './Components/UploadImageComponents/local-machine/local-machine.component';
import { OnlineImageComponent } from './Components/UploadImageComponents/online-image/online-image.component';
import { AlbumComponent } from './Components/AlbumComponents/album/album.component';
import { AlbumSearchComponent } from './Components/AlbumComponents/album-search/album-search.component';
import { AlbumPhotosComponent } from './Components/AlbumComponents/album-photos/album-photos.component';
import { AboutComponent } from './Components/about/about.component';
import { EditCategoriesComponent } from './Components/edit-categories/edit-categories.component';
import { EditImageComponent } from './Components/edit-image/edit-image.component';
import { PrivateModeComponent } from './Components/private-mode/private-mode.component';
import { PhotoInfoComponent } from './Components/photo-info/photo-info.component';
import { AlbumPhotoComponent } from './Components/AlbumComponents/album-photo/album-photo.component'; 



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavComponent,
    ConfigComponent,
    UploadImageComponent,
    CameraComponent,
    LocalMachineComponent,
    OnlineImageComponent,
    AlbumComponent,
    AlbumSearchComponent,
    AlbumPhotosComponent,
    AboutComponent,
    EditCategoriesComponent,
    EditImageComponent,
    PrivateModeComponent,
    PhotoInfoComponent,
    AlbumPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
