import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoInfoDialogComponent } from './photo-info-dialog.component';

describe('PhotoInfoDialogComponent', () => {
  let component: PhotoInfoDialogComponent;
  let fixture: ComponentFixture<PhotoInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
