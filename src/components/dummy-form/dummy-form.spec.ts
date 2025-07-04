import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyForm } from './dummy-form';

describe('DummyForm', () => {
  let component: DummyForm;
  let fixture: ComponentFixture<DummyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
