import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyList } from './dummy-list';

describe('DummyList', () => {
  let component: DummyList;
  let fixture: ComponentFixture<DummyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
