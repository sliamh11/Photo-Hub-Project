import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PirvateModeDialogComponent } from './pirvate-mode-dialog.component';

describe('PirvateModeDialogComponent', () => {
  let component: PirvateModeDialogComponent;
  let fixture: ComponentFixture<PirvateModeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PirvateModeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PirvateModeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
