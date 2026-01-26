// portfolioData.ts

// Define types for categories and other constants to avoid duplication

export const SKILL_CATEGORIES = [
  'Front-end development',
  'Back-end development',
  'DevOps',
  'Tools',
  'Cloud Technologies',
  'Databases',
  'Languages',
] as const;

export const FILTER_CATEGORIES = [
  'All',
  'E-commerce',
  'Communication',
  'Video Streaming',
  'Entertainment',
  'Consumers',
  'Open-Source Contributions',
  'Food Delivery',
  'Hackathons',
  'Educational',
] as const;

export const SKILLS = [
  'Python',
  'Java',
  'Git',
  'JavaScript',
  'TypeScript',
  'Angular',
  'React',
  'Google Cloud',
  'Firebase',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Figma',
  'Jira',
  'Docker',
  'Jenkins',
  'NextJS',
  'Express',
  'NodeJS',
  'CI/CD',
  'ChatGPT',
  'AWS',
] as const;

export type SkillCategory = typeof SKILL_CATEGORIES[number];
export type FilterCategory = typeof FILTER_CATEGORIES[number];
export type SkillType = typeof SKILLS[number];

// Interface for the structure of the "about" section
export interface About {
  name: string;
  githubLink: string;
  linkedInLink: string;
  DevPost:string;
  leetCode:string;
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
  category: FilterCategory[];
  links: {
    isLive: boolean;
    liveUrl: string;
    gitUrl: string;
  };
}

// Interface for Skills data
export interface Skill {
  name: SkillType;
  logoUrl: string;
  rating: number; // Rating as a number for comparison and sorting
  background: boolean;
}

export type SkillsByCategory = {
  [key in SkillCategory]: Skill[];  // Dynamically using category names as keys
}

// Interface for Work Experience data
export interface WorkExperience {
  jobTitle: string;
  company: string;
  description: string;
  skillsUsed: SkillType[]; // List of skills used
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
  description: string;
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
  skills: SkillsByCategory;
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
    DevPost: 'https://devpost.com/giteshwan98?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav',
    leetCode: 'https://leetcode.com/u/Gitesh982/',
    email: 'giteshwan98@gmail.com',
    phone: '+91 7219583781',
    roleTitles: ['Full-stack developer • Creating Digital Experiences', 'Senior Software Engineer'],
    shortDescription: "Hi, I'm Gitesh — a full-stack software engineer specializing in building scalable web applications. I transform complex problems into elegant, user-friendly solutions.",
    resumeLink: 'https://drive.google.com/uc?export=download&id=1REkBfGqAD9GpdBquTE7xLujFSaao7O-P',
    openForOpportunities: true,
  },
  projects: [
    {
      name: 'SME Boost',
      description: 'Developed a high-performance backend in FastAPI using Python for automating marketing campaigns for SMEs. Integrated OpenAI API for content generation (blogs, posts, stories) and Agentic AI for campaign optimization. The system integrates with social media APIs for publishing, and is hosted on Firebase. The frontend was developed using Angular and styled with Tailwind CSS.',
      imageUrl: 'assets/SME_Boost.png',
      tags: ['Angular', 'Python', 'Firebase', 'pipelines'],
      category: ["All","Consumers", "Hackathons"], // Use a valid category from the Category type
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
      category: ["All","Educational"],
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
      category: ["All","Entertainment", "Video Streaming"],
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
      category: ["All","Communication"],
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
      category: ["All","Food Delivery"],
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
      category: ["All","Open-Source Contributions"],
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
      category: ["All","Hackathons"],
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
      category: ["All","Open-Source Contributions"],
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
      category: ["All","Consumers"],
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: "https://github.com/gitesh9/bootstrap-main"
      }
    },
  ],
  skills: {
    "Front-end development": [
      {
        name: 'Angular',
        logoUrl: 'assets/Angular.svg',
        rating: 90,
        background: false
      },
      {
        name: 'React',
        logoUrl: 'assets/React.svg',
        rating: 90,
        background: false
      },
      {
        name: 'NextJS',
        logoUrl: 'assets/Next.js.svg',
        rating: 70,
        background: true
      },
    ],
    'Back-end development': [
      {
        name: 'Express',
        logoUrl: 'assets/Express.svg',
        rating: 80,
        background: true
      },
      {
        name: 'NodeJS',
        logoUrl: 'assets/Node.js.svg',
        rating: 85,
        background: false
      },
    ],
    'Languages': [
      {
        name: 'Python',
        logoUrl: 'assets/Python.svg',
        rating: 90,
        background: false
      },
      {
        name: 'JavaScript',
        logoUrl: 'assets/JavaScript.svg',
        rating: 87,
        background: false
      },
      {
        name: 'TypeScript',
        logoUrl: 'assets/TypeScript.svg',
        rating: 87,
        background: false
      },
      {
        name: 'Java',
        logoUrl: 'assets/Java.svg',
        rating: 65,
        background: false
      },
    ],
    'Databases': [
      {
        name: 'PostgreSQL',
        logoUrl: 'assets/PostgresSQL.svg',
        rating: 75,
        background: false
      },
      {
        name: 'MySQL',
        logoUrl: 'assets/MySQL.svg',
        rating: 75,
        background: false
      },
      {
        name: 'MongoDB',
        logoUrl: 'assets/MongoDB.svg',
        rating: 73,
        background: false
      },
    ],
    'Tools': [
      {
        name: 'Git',
        logoUrl: 'assets/Git.svg',
        rating: 90,
        background: false
      },
      {
        name: 'CI/CD',
        logoUrl: 'assets/Angular.svg',
        rating: 70,
        background: false
      },
      {
        name: 'ChatGPT',
        logoUrl: 'assets/Angular.svg',
        rating: 85,
        background: false
      },
      {
        name: "Firebase",
        logoUrl: "assets/Firebase.svg",
        rating: 70,
        background: false
      },
      {
        name: "Figma",
        logoUrl: "assets/Figma.svg",
        rating: 70,
        background: false
      },
      {
        name: "Jira",
        logoUrl: "assets/Jira.svg",
        rating: 70,
        background: false
      },
    ],
    DevOps: [
      {
        name: "Docker",
        logoUrl: "assets/Docker.svg",
        rating: 70,
        background: false
      },
      {
        name: "Jenkins",
        logoUrl: "assets/Jenkins.svg",
        rating: 70,
        background: false
      },
    ],
    "Cloud Technologies": [
      {
        name: "AWS",
        logoUrl: "assets/AWS.svg",
        rating: 85,
        background: true
      },
      {
        name: "Google Cloud",
        logoUrl: "assets/Google Cloud.svg",
        rating: 70,
        background: false
      },
    ]
  },
  workExperience: [
    {
      jobTitle: 'Software Engineer',
      company: 'UBS',
      description: 'Delivered high-quality, reusable components for library as part of UBS wealth management, improving scalability, performance and consistency across applications through ongoing optimizationa and team collaboration.',
      skillsUsed: ['React','CI/CD'],
      startDate: 'Sept 2025',
      endDate: 'Current',
    },
    {
      jobTitle: 'Software Engineer',
      company: 'Mastercard',
      description: 'Worked on enterprise-scale internal services, focusing on accessibility compliance, security hardening, performance optimization and system stability for more than 50,000+ DAU.',
      skillsUsed: ['Angular','Java','CI/CD','Jenkins'],
      startDate: 'Nov 2024',
      endDate: 'Sept 2025',
    },
    {
      jobTitle: 'Junior Software Engineer',
      company: 'Generix',
      description: 'Worked on WMS, focusing on workflow reliability, defect resolution and effective collaboration across engineering product teams.',
      skillsUsed: ['Angular','TypeScript'],
      startDate: 'Dec 2023',
      endDate: 'Aug 2024',
    },
    {
      jobTitle: 'Junior Software Engineer',
      company: 'EPAM Systems',
      description: 'Worked as an Engineer contributing to multiple enterprises and internal projects, Gaining strong experiencea and delivering high quality solutions in Agile and cross functional teams',
      skillsUsed: ['Angular','React','NodeJS','Express','JavaScript','TypeScript'],
      startDate: 'July 2022',
      endDate: 'current',
    },
  ],
  achievements: [
    // {
    //   type: 'achievement',
    //   title: {
    //     isVisible: true,
    //     name: 'Contributed to multiple open-source projects',
    //   },
    //   description: '',
    //   image: {
    //     isVisible: false,
    //     url: '',
    //   },
    // },
    // {
    //   type: 'achievement',
    //   title: {
    //     isVisible: true,
    //     name: 'Participated in multiple hackathons and succesfully completed projects in a tight deadline',
    //   },
    //   description: '',
    //   image: {
    //     isVisible: false,
    //     url: '',
    //   },
    // },
    // {
    //   type: 'achievement',
    //   title: {
    //     isVisible: true,
    //     name: 'Coding Platform',
    //   },
    //   description: '',
    //   image: {
    //     isVisible: false,
    //     url: '',
    //   },
    // },
  ],
  testimonials: [
    {
      type: 'testimonial',
      description: 'Gitesh Consistently demonstrates exceptional teamwork and efficiency in addressing all accessibility changes promptly. Thank you for your outstanding commitment and hardwork. Your dedication to resolving issues on-time greatly contributes to our success',
      user: {
        isVisible: true,
        name: 'Kishore',
        title: 'Senior Manager',
      },
    },
    {
      type: 'testimonial',
      description: 'Gitesh Wankhede demonstrates strong consistency in meeting and often exceeding expectations across multiple performance signals. He is recognized for his teamwork, adaptability, and commitment to continous learning. Feedback from peers and managers are overwhelmingly positive, highlighting his reliability, proactive problem-solving, and alignment with EPAM\'s core values. Gitesh has successfully comppleted all his goals and expectations, and his engagement in training and skill development is evident.',
      user: {
        isVisible: true,
        name: 'Ravi',
        title: 'Director of DEP practice EPAM India',
      },
    },
    {
      type: 'testimonial',
      description: 'Gitesh has recieved overwhelming positive feedback from peers highlighting solution oriented mindset, strong collaboration skills, and consistent delivery of high quality work. He is recognized as dependable team member who communicates clearly and fosters a productive environment.',
      user: {
        isVisible: true,
        name: 'Vibhor',
        title: 'Lead Sofware Engineer',
      },
    },
  ],
};
