import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDrawerComponent } from './chart-drawer.component';

describe('ChartDrawerComponent', () => {
  let component: ChartDrawerComponent;
  let fixture: ComponentFixture<ChartDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
