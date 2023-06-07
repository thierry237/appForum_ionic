import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCoursePage } from './edit-course.page';

describe('EditCoursePage', () => {
  let component: EditCoursePage;
  let fixture: ComponentFixture<EditCoursePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
