import { Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { } from 'googlemaps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILocation } from 'src/app/Models/ILocation';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent implements OnInit {
  @ViewChild('search') public searchElementRef: ElementRef;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  constructor(
    @Inject(MAT_DIALOG_DATA) public location: ILocation,
    private mapsAPILoader: MapsAPILoader,
    public dialogRef: MatDialogRef<any>,
    private ngZone: NgZone,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // Load Places Autocomplete's functionality
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      // Get the value of #search <input> element
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // If found a valid place & geometry, update component's data.
          if (place.geometry) {
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.address = place.name;
            this.zoom = 12;
          }
        });
      });
    });
  }

  setCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        // Check if object isn't empty.
        if (this.location && Object.keys(this.location).length > 0) {
          this.latitude = this.location.lat;
          this.longitude = this.location.lng;
          this.address = this.location.address;
        } else {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getAddress(this.latitude, this.longitude);
        }
        this.zoom = 15;
      });
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      // If point on map is valid
      if (status === 'OK') {
        // If point contains any places in google's API.
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.latitude = latitude;
          this.longitude = longitude;
        } else {
          window.alert('No results found');
          this.snackBar.open("No results found, please tag another point.", "Ok");
        }
      } else {
        this.snackBar.open("Place is unkown. Please select another point.", "Ok");
      }
    });
  }

  handleSaveAndClose = () => {
    this.location = {
      address: this.address,
      lat: this.latitude,
      lng: this.longitude
    }
    this.dialogRef.close({ event: 'close', data: this.location });
  }
}
