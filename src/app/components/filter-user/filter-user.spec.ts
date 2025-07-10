import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUser } from './filter-user';

describe('FilterUser', () => {
  let component: FilterUser;
  let fixture: ComponentFixture<FilterUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
