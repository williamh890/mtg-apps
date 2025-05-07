import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchfulRadstagComponent } from './watchful-radstag.component';

describe('WatchfulRadstagComponent', () => {
  let component: WatchfulRadstagComponent;
  let fixture: ComponentFixture<WatchfulRadstagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchfulRadstagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchfulRadstagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
