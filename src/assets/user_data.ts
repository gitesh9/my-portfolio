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
  // 'E-commerce',
  'Communication',
  'Video Streaming',
  'Entertainment',
  'Consumers',
  'Open-Source Contributions',
  // 'Food Delivery',
  'Hackathons',
  'Educational',
  'AI',
  'RAG'
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
  DevPost: string;
  leetCode: string;
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
export interface SkillDetails {
  name: SkillType;
  logoUrl: string;
  rating: number; // Rating as a number for comparison and sorting
  background: boolean;
}

export type SkillsByCategory = {
  [key in SkillCategory]: SkillDetails[];  // Dynamically using category names as keys
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
    shortDescription: "I design and build scalable, secure distributed systems as a full-stack engineer, integrating microservices architecture and AI-driven semantic retrieval. With 3+ years of enterprise experience, I’ve delivered accessible platforms for 50K+ users, built production-grade AI assistants, and led CI/CD and deployment workflows to ensure reliable delivery at scale",
    // resumeLink: 'https://drive.google.com/uc?export=download&id=1REkBfGqAD9GpdBquTE7xLujFSaao7O-P',
    resumeLink: 'assets/Gitesh_Wankhede_Resume.pdf',
    openForOpportunities: true,
  },
  projects: [
    {
      name: 'SME Boost',
      description: 'Developed a high-performance backend in FastAPI using Python for automating marketing campaigns for SMEs. Integrated OpenAI API for content generation (blogs, posts, stories) and Agentic AI for campaign optimization. The system integrates with social media APIs for publishing, and is hosted on Firebase. The frontend was developed using Angular and styled with Tailwind CSS.',
      imageUrl: 'assets/SME_Boost_full.png',
      tags: ['Angular', 'Python', 'Firebase', 'pipelines'],
      category: ["All", "Consumers", "Hackathons", "AI"], // Use a valid category from the Category type
      links: {
        isLive: true,
        liveUrl: 'https://sme-boost-463309.web.app/services',
        gitUrl: 'https://github.com/gitesh9/SMEBoost',
      },
    },
    {
      name: "Game Stream",
      description: "Low-latency real-time streaming platform supporting RTMP ingestion and WebSocket-based chat communication. Designed role-based authorization and moderation controls with scalable backend handling concurrent streaming sessions.",
      imageUrl: "assets/gameStream.svg",
      tags: ['Next.js', 'WebSockets', 'RTMP', 'Real-Time Systems', 'Authorization Architecture'],
      category: ["All", "Entertainment", "Video Streaming"],
      links: {
        isLive: true,
        liveUrl: "https://game-stream.onrender.com",
        gitUrl: "https://github.com/gitesh9/game-stream"
      }
    },
    {
      name: "Community Comms",
      description: "Distributed real-time communication platform inspired by server-based community systems. Engineered multi-tenant architecture with role-based access control and WebSocket-driven bidirectional messaging for scalable multi-user interaction.",
      imageUrl: "assets/discord.jpg",
      tags: ['Next.js', 'WebSockets', 'PostgreSQL', 'Distributed Messaging', 'RBAC'],
      category: ["All", "Entertainment", "Communication"],
      links: {
        isLive: true,
        liveUrl: "https://communitycomms.onrender.com/invite/bac0346a-cb6c-497a-8831-cceb2bc84128",
        gitUrl: "https://github.com/gitesh9/dev-Discord-clone"
      }
    },
    // {
    //   name: "WareHouse Management",
    //   description: "A platform with location based allocation of services and management through a single interface",
    //   imageUrl: "assets/inventory-management.jpg",
    //   tags: ['Angular', 'Postgres', 'Python'],
    //   category: ["All", "Food Delivery"],
    //   links: {
    //     isLive: false,
    //     liveUrl: "",
    //     gitUrl: ""
    //   }
    // },
    {
      name: "Personal AI Agent",
      description: "Production-oriented AI assistant built using Retrieval-Augmented Generation (RAG). Implemented document ingestion, embedding pipelines, vector similarity search, and OpenAI tool-calling for context-aware responses. Designed stateful conversation handling and persistence layer for lead capture and observability.",
      imageUrl: "assets/Personal-AI-Agent.png",
      tags: ['RAG', 'LLMs', 'Vector Search', 'Embeddings', 'OpenAI API', 'System Design'],
      category: ["All", "AI", "RAG"],
      links: {
        isLive: false,
        liveUrl: "https://giteshw-personal-assistant.hf.space",
        gitUrl: "https://github.com/gitesh9/project-AI-Agent"
      }
    },
    {
      name: "Freetube",
      description: "Optimized playlist sorting and filtering logic in a large-scale open-source React application. Reduced unnecessary network calls by implementing local computation strategy, improving performance and reducing load by 70%.",
      imageUrl: "assets/FreeTube.png",
      tags: ['React', 'Performance Optimization', 'Client-Side Architecture', 'Open Source'],
      category: ["All", "Open-Source Contributions"],
      links: {
        isLive: true,
        liveUrl: "https://freetubeapp.io/",
        gitUrl: "https://github.com/gitesh9/FreeTube-Contribution"
      }
    },
    {
      name: "N8N automation",
      description: "A RAG-powered incident agent:Reads through incident logs, runbooks, system alerts Suggests troubleshooting steps, potential resolutions, relevant playbooks Integrates with ticketing systems like AWS S3, AWS CloudWatch, PagerDuty. Why Useful: Cuts downtime, makes even junior engineers more effective, reducing mean-time-to-resolution (MTTR).",
      imageUrl: "assets/N8N.svg",
      tags: ['RAG', 'Incident Automation', 'AWS', 'Observability', 'Distributed Systems', 'N8N'],
      category: ["All", "Hackathons", "AI", "RAG"],
      links: {
        isLive: false,
        liveUrl: "",
        gitUrl: ""
      }
    },
    {
      name: "Bootstrap",
      description: "Contributed cross-browser layout consistency improvement to Bootstrap (#41243) by refining CSS inheritance behavior. Enhanced rendering stability across modern browser engines.",
      imageUrl: "assets/Bootstrap.png",
      tags: ['CSS Architecture', 'Frontend Systems', 'Open Source'],
      category: ["All", "Open-Source Contributions"],
      links: {
        isLive: true,
        liveUrl: "https://github.com/twbs/bootstrap/pull/41243",
        gitUrl: "https://github.com/gitesh9/bootstrap-main/tree/refactor/box-sizing-consistency"
      }
    },
    // {
    //   name: "Secret Website",
    //   description: "Working",
    //   imageUrl: "",
    //   tags: ['React'],
    //   category: ["All", "Consumers"],
    //   links: {
    //     isLive: false,
    //     liveUrl: "",
    //     gitUrl: "https://github.com/gitesh9/bootstrap-main"
    //   }
    // },
    {
      name: "Coding Interview Platform",
      description: "Microservices-based interview simulation platform supporting real-time collaboration. Designed API gateway routing, gRPC-based inter-service communication, PostgreSQL persistence, and semantic search for contextual question retrieval. Built for scalability and service isolation.",
      imageUrl: "assets/Coding_Platform.png",
      tags: ['Microservices', 'gRPC', 'API Gateway', 'WebSockets', 'PostgreSQL', 'Semantic Search'],
      category: ["All", "Educational", "AI"],
      links: {
        isLive: true,
        liveUrl: "https://interviewpracticeplatform.netlify.app/",
        gitUrl: "https://github.com/gitesh9"
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
      skillsUsed: ['React', 'CI/CD'],
      startDate: 'Sept 2025',
      endDate: 'Current',
    },
    {
      jobTitle: 'Software Engineer',
      company: 'Mastercard',
      description: 'Worked on enterprise-scale internal services, focusing on accessibility compliance, security hardening, performance optimization and system stability for more than 50,000+ DAU.',
      skillsUsed: ['Angular', 'Java', 'CI/CD', 'Jenkins'],
      startDate: 'Nov 2024',
      endDate: 'Sept 2025',
    },
    {
      jobTitle: 'Junior Software Engineer',
      company: 'Generix',
      description: 'Worked on WMS, focusing on workflow reliability, defect resolution and effective collaboration across engineering product teams.',
      skillsUsed: ['Angular', 'TypeScript'],
      startDate: 'Dec 2023',
      endDate: 'Aug 2024',
    },
    {
      jobTitle: 'Junior Software Engineer',
      company: 'EPAM Systems',
      description: 'Worked as an Engineer contributing to multiple enterprises and internal projects, Gaining strong experiencea and delivering high quality solutions in Agile and cross functional teams',
      skillsUsed: ['Angular', 'React', 'NodeJS', 'Express', 'JavaScript', 'TypeScript'],
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
