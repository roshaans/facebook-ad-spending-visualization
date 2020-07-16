import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTwoComponent } from './chart-two.component';

describe('ChartTwoComponent', () => {
  let component: ChartTwoComponent;
  let fixture: ComponentFixture<ChartTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
