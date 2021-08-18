import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalMachineComponent } from './local-machine.component';

describe('LocalMachineComponent', () => {
  let component: LocalMachineComponent;
  let fixture: ComponentFixture<LocalMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
