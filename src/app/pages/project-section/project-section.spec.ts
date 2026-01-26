import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSection } from './project-section';

describe('ProjectSection', () => {
  let component: ProjectSection;
  let fixture: ComponentFixture<ProjectSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
