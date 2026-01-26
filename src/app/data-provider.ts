import { Injectable } from '@angular/core';
import { portfolioData } from 'assets/user_data';

@Injectable({
  providedIn: 'root',
})
export class DataProvider {

  getAbout(){
    return portfolioData.about
  }
  getProjects(){
    return portfolioData.projects
  }
  getSkills(){
    return portfolioData.skills
  }
  getTestimonials(){
    return portfolioData.testimonials
  }
  getAchievements(){
    return portfolioData.achievements
  }
  getWorkExperience(){
    return portfolioData.workExperience
  }

}
