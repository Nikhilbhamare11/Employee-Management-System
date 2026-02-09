import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employs } from './employs';

describe('Employs', () => {
  let component: Employs;
  let fixture: ComponentFixture<Employs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
