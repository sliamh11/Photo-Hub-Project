import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineImageComponent } from './online-image.component';

describe('OnlineImageComponent', () => {
  let component: OnlineImageComponent;
  let fixture: ComponentFixture<OnlineImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
