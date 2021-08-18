import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateModeComponent } from './private-mode.component';

describe('PrivateModeComponent', () => {
  let component: PrivateModeComponent;
  let fixture: ComponentFixture<PrivateModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
