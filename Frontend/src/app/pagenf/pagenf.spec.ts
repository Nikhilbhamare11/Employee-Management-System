import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagenf } from './pagenf';

describe('Pagenf', () => {
  let component: Pagenf;
  let fixture: ComponentFixture<Pagenf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagenf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagenf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
