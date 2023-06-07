import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCoursePage } from './add-course.page';

describe('AddCoursePage', () => {
  let component: AddCoursePage;
  let fixture: ComponentFixture<AddCoursePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
