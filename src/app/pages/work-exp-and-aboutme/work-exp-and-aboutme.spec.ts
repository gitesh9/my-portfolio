import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExpAndAboutme } from './work-exp-and-aboutme';

describe('WorkExpAndAboutme', () => {
  let component: WorkExpAndAboutme;
  let fixture: ComponentFixture<WorkExpAndAboutme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkExpAndAboutme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkExpAndAboutme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
