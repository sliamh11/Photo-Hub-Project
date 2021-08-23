import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCarrouselComponent } from './album-carrousel.component';

describe('AlbumCarrouselComponent', () => {
  let component: AlbumCarrouselComponent;
  let fixture: ComponentFixture<AlbumCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumCarrouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
