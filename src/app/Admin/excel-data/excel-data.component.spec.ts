import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDataComponent } from './excel-data.component';

describe('ExcelDataComponent', () => {
  let component: ExcelDataComponent;
  let fixture: ComponentFixture<ExcelDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
