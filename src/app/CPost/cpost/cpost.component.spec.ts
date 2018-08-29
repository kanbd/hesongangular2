import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CPostComponent } from './cpost.component';

describe('CPostComponent', () => {
  let component: CPostComponent;
  let fixture: ComponentFixture<CPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
