import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortUser } from './sort-user';

describe('SortUser', () => {
  let component: SortUser;
  let fixture: ComponentFixture<SortUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
