import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrystallineGiantComponent } from './crystalline-giant.component';

describe('CrystallineGiantComponent', () => {
  let component: CrystallineGiantComponent;
  let fixture: ComponentFixture<CrystallineGiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrystallineGiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrystallineGiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
