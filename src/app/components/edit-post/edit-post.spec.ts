import { ComponentFixture, TestBed } from '@angular/core/testing';

import { editPost } from './edit-post';

describe('editPost', () => {
  let component: editPost;
  let fixture: ComponentFixture<editPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [editPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(editPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
