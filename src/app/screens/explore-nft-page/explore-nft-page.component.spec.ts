import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreNftPageComponent } from './explore-nft-page.component';

describe('ExploreNftPageComponent', () => {
  let component: ExploreNftPageComponent;
  let fixture: ComponentFixture<ExploreNftPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreNftPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreNftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
