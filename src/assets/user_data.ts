// portfolioData.ts

// Define types for categories and other constants to avoid duplication
export type Category =
  | 'web-development'
  | 'mobile-development'
  | 'data-science'
  | 'graphic-design';

// Interface for the structure of the "about" section
export interface About {
  name: string;
  githubLink: string;
  linkedInLink: string;
  email: string;
  phone: string;
  roleTitles: string[];  // Multiple role titles in an array
  shortDescription: string;
  resumeLink: string;
  openForOpportunities: boolean;
}

// Interface for Project data
export interface Project {
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: string;
  links: {
    isLive: boolean;
    liveUrl: string;
    gitUrl: string;
  };
}

// Interface for Skills data
export interface Skill {
  name: string;
  logoUrl: string;
  rating: number; // Rating as a number for comparison and sorting
  category: Category;
}

// Interface for Work Experience data
export interface WorkExperience {
  jobTitle: string;
  company: string;
  description: string;
  skillsUsed: string[]; // List of skills used
  startDate: string;
  endDate: string;
}

// Interface for Achievements data
export interface Achievement {
  type: 'achievement';
  title: {
    isVisible: boolean;
    name: string;
  };
  description: string;
  image: {
    isVisible: boolean;
    url: string;
  };
}

// Interface for Testimonials data
export interface Testimonial {
  type: 'testimonial';
  title: {
    isVisible: boolean;
    name: string;
  };
  description: string;
  image: {
    isVisible: boolean;
    url: string;
  };
  user: {
    isVisible: boolean;
    name: string;
    title: string;
  };
}

// Interface for the entire Portfolio Data structure
export interface Portfolio {
  about: About;
  projects: Project[];
  skills: Skill[];
  workExperience: WorkExperience[];
  achievements: Achievement[];
  testimonials: Testimonial[];
}

// Define the data as a constant and export it
export const portfolioData: Portfolio = {
  about: {
    name: 'Gitesh Wankhede',
    githubLink: 'https://github.com/gitesh9',
    linkedInLink: 'https://www.linkedin.com/in/gitesh-wankhede-6218701b7/',
    email: 'giteshwan98@gmail.com',
    phone: '+91 7219583781',
    roleTitles: ['Full-stack developer'],
    shortDescription: "Hi, I'm Gitesh — a full-stack software engineer specializing in building scalable web applications. I transform complex problems into elegant, user-friendly solutions.",
    resumeLink: 'https://drive.google.com/uc?export=download&id=1REkBfGqAD9GpdBquTE7xLujFSaao7O-P',
    openForOpportunities: true,
  },
  projects: [
    {
      name: 'SME Boost',
      description: 'Built a high-performance FastAPI backend in Python for automating SME marketing campaigns, integrating OpenAI API for content generation (blogs, posts, stories) and Agentic AI for optimization. Used python Fast API for server logic, integrated social media APIs for publishing, and hosted with Firebase. Frontend built with Angular and Tailwind CSS, and authentication handled via Clerk SDK.',
      imageUrl: 'assets/SME_Boost',
      tags: ['Angular', 'Python', 'Firebase', 'pipelines'],
      category: 'E-commerce/AI/Consumer Hackathons',  // Use a valid category from the Category type
      links: {
        isLive: true,
        liveUrl: 'https://sme-boost-463309.web.app/services',
        gitUrl: 'https://github.com/gitesh9/SMEBoost',
      },
    },
    {
      name: "Coding Interview Platform",
      description: "A platform to learn, practice and have real simulation of interviews with the help of AI",
      imageUrl: "",
      tags: ['Python', 'Angular', 'API-Gateway', 'full-stack development', 'Microservices', 'Postgres'],
      category: "Learning",
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: ""
      }
    },
    {
      name: "Game Stream",
      description: "A platform to stream and chat with role level accesses and moderation",
      imageUrl: "assets/game-stream.png",
      tags: ['NextJS', 'SQL', 'RTMP', 'WebSockets'],
      category: "Entertainment Video Streaming",
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: "https://github.com/gitesh9/game-stream"
      }
    },
    {
      name: "Discord",
      description: "A platform to stream and chat with role level accesses and moderation along with making friends and servers...",
      imageUrl: "assets/discord.jpg",
      tags: ['NextJS', 'SQL', 'Websockets'],
      category: "Communication",
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: "https://github.com/gitesh9/dev-Discord-clone"
      }
    },
    {
      name: "WareHouse Management",
      description: "A platform with location based allocation of services and management through a single interface",
      imageUrl: "assets/inventory-management.jpg",
      tags: ['Angular', 'Postgres', 'Python'],
      category: "Food Delivery",
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: ""
      }
    },
    {
      name: "Freetube",
      description: "A contribution to freetube platform where I build a featre and reduce the latenc of the app",
      imageUrl: "assets/FreeTube.png",
      tags: ['React'],
      category: "Communication",
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: "https://github.com/gitesh9/FreeTube-Contribution"
      }
    },
    {
      name: "N8N automation",
      description: "A RAG-powered incident agent:Reads through incident logs, runbooks, system alerts Suggests troubleshooting steps, potential resolutions, relevant playbooks Integrates with ticketing systems like AWS S3, AWS CloudWatch, PagerDuty. Why Useful: Cuts downtime, makes even junior engineers more effective, improves response time.",
      imageUrl: "assets/N8N.png",
      tags: ['N8N', 'automation'],
      category: "Hackathons",
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: ""
      }
    },
    {
      name: "Bootstrap",
      description: "A contribution to freetube platform where I build a featre and reduce the latenc of the app",
      imageUrl: "assets/FreeTube.png",
      tags: ['React'],
      category: "Communication",
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: "https://github.com/gitesh9/bootstrap-main"
      }
    },
    {
      name: "Secret Website",
      description: "Working",
      imageUrl: "",
      tags: ['React'],
      category: "Communication",
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: "https://github.com/gitesh9/bootstrap-main"
      }
    },
  ],
  skills: [
    {
      name: 'Angular',
      logoUrl: '',
      rating: 0,
      category: 'web-development',
    },
  ],
  workExperience: [
    {
      jobTitle: '',
      company: '',
      description: '',
      skillsUsed: [],
      startDate: '',
      endDate: '',
    },
  ],
  achievements: [
    {
      type: 'achievement',
      title: {
        isVisible: true,
        name: '',
      },
      description: '',
      image: {
        isVisible: false,
        url: '',
      },
    },
  ],
  testimonials: [
    {
      type: 'testimonial',
      title: {
        isVisible: false,
        name: '',
      },
      description: '',
      image: {
        isVisible: false,
        url: '',
      },
      user: {
        isVisible: true,
        name: '',
        title: '',
      },
    },
  ],
};
