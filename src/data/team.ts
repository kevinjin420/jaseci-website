export interface TeamMember {
  name: string;
  title: string;
  image: string;
  description: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
  website: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Jason Mars",
    title: "Founder, Computer Science Professor, University of Michigan",
    image: "/images/assets/leadership_team/Jason.png",
    description:
      'Prof. Jason Mars is the founder and architect of Jaseci. His expertise is demonstrated by over 100 research papers, 30+ patents, and his bestselling book, "Breaking Bots." As a serial entrepreneur, his ventures have delivered cutting-edge AI to over 20 million users, raised over $62M in funding, and earned him accolades like the prestigious CARAH Award and Crain\'s 40 under 40.',
    social: {
      linkedin: "https://linkedin.com/in/drjasonmars",
      twitter: "https://x.com/drjasonmars",
    },
    website: "https://www.jasonmars.org",
  },
  {
    name: "Lingjia Tang",
    title: "Computer Science Professor, University of Michigan",
    image: "/images/assets/leadership_team/Lingjia.png",
    description:
      "Prof. Lingjia is an award-winning researcher in AI systems, recognised with the Google Research Award, Facebook Research Award, ISCA Hall of Fame, and MICRO Hall of Fame. As a co-founder of AI companies Myca.ai and Clinc, she built technology serving tens of millions of enterprise users and helped raise $70 million in venture capital for her prior company.",
    social: {
      linkedin: "https://linkedin.com/in/lingjia-tang-a7667912",
      twitter: "https://x.com/Lingjia781856",
    },
    website: "https://lingjia.org",
  },
  {
    name: "Yiping Kang",
    title: "Research Fellow, University of Michigan",
    image: "/images/assets/leadership_team/Yiping.png",
    description:
      "Dr. Yiping Kang is a research expert in natural language processing, computer vision, computer architecture and systems, with numerous publications at top tier academic conferences including ISCA, ASPLOS, ACL and NeurIPS. Previously, he was Head of Product at Clinc, a conversational AI startup, leading the product development of the world's most sophisticated conversational AI platform serving millions of users worldwide.",
    social: {
      linkedin: "https://linkedin.com/in/yipingkang0608",
      twitter: "https://x.com/yipingkang",
    },
    website: "https://ypkang.github.io",
  },
  {
    name: "Kris Flaunter",
    title:
      "Advisor, Professor of Engineering Practice, EECS Department, University of Michigan",
    image: "/images/assets/leadership_team/Krisztian.png",
    description:
      "Kris Flaunter is a Professor of Engineering Practice at the University of Michigan, serving as an advisor to students and researchers. Before his current academic role, he built an extensive career in the tech industry, holding leadership positions such as Director of Strategy, Emerging Technology and Incubation at Cisco and CEO of Banzai cloud. Previously, he was the VP of Research and Development at ARM, where his work on power-efficient computing earned him the 2017 ISCA influential paper award.",
    social: { linkedin: "https://linkedin.com/in/kflautner" },
    website: "https://linkedin.com/in/kflautner",
  },
  {
    name: "Jayanaka Dantanarayana",
    title: "PhD Candidate, University of Michigan",
    image: "/images/assets/leadership_team/Jayanaka.png",
    description:
      "Jayanaka Dantanarayana is a multidisciplinary researcher and PhD student at the University of Michigan's Jaseci Research Laboratory. His work centers on developing novel AI-integration techniques to simplify the process for developers building software with AI functionalities. He is also exploring the field of Agentic-AI through his tool, MTP (MTLLM), within the Jac programming language.",
    social: {
      linkedin: "https://linkedin.com/in/jayanaka-dantanarayana",
      twitter: "https://x.com/JayanakaD",
    },
    website: "https://linkedin.com/in/jayanaka-dantanarayana",
  },
  {
    name: "Logeeshan Velmanickam",
    title:
      "Senior Lecturer in the Department of Electrical Engineering at the University of Moratuwa",
    image: "/images/assets/leadership_team/Logeeshan.png",
    description:
      "Dr. Logeeshan Velamanikkam's primary research focuses on the intersection of AI and the Internet of Things (IoT), biomedical instrumentation, and smart sensor development. He has a keen interest in dielectrophoresis and its applications in biomedical devices, as well as advancements in renewable energy.",
    social: {
      linkedin:
        "https://linkedin.com/in/logeeshan-velmanickam-ph-d-b6727113b",
      twitter: "https://x.com/LogeeshanV",
    },
    website:
      "https://linkedin.com/in/logeeshan-velmanickam-ph-d-b6727113b",
  },
  {
    name: "Eldon Marks",
    title: "Founding Director of V75 Inc. and Co-Founder of TrueSelph Inc",
    image: "/images/assets/leadership_team/Eldon.png",
    description:
      "Eldon Marks is a tech entrepreneur and innovator dedicated to empowering Guyana's tech industry. After 13 years as a university lecturer and mentor, he founded the conversational AI company V75 Inc and its non-profit partner, NeXus Hub Inc, which provides industry-level upskilling and job placement for local youth.",
    social: {
      linkedin: "https://linkedin.com/in/eldonmarks",
      twitter: "https://x.com/theeldonmarks",
    },
    website: "https://eldonmarks.com",
  },
  {
    name: "Asim Salim",
    title: "Head of Technology, BCS Technology",
    image: "/images/assets/leadership_team/Asim.png",
    description:
      "Asim is a technology consultant who has led multiple complex IT engagements delivering innovative solutions for global organizations. Asim led the product development of Zero Shot Bot which uses Jaseci at its core. Asim is currently the Head of Technology at BCS Technology, a leading global IT services provider.",
    social: { linkedin: "https://linkedin.com/in/asimsalim" },
    website: "https://linkedin.com/in/asimsalim",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  logo: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We are very excited that Jaseci solved our challenges of providing AI solutions for our customers, lowered cost and increased our development speed.",
    author: "Richard Parhusip",
    title: "Commercial Director",
    company: "BCS Technology and BCS Consulting",
    logo: "/images/assets/partners/bcs.png",
  },
  {
    quote:
      "Jaseci is a new programming language and runtime system that has the potential to hide the complexity of backend systems for many AI practitioners and thus lowers the barrier of entry for general developers, leading to great improvement of developers' productivity.",
    author: "Robert Hundt",
    title: "Distinguished Engineer",
    company: "Google",
    logo: "/images/assets/partners/google.png",
  },
  {
    quote:
      "I believe that Jaseci has the potential to provide solutions to some of the major pain points for enterprise Al transformation.",
    author: "Judd Standage",
    title: "Enterprise Solution Architect",
    company: "Cognizant",
    logo: "/images/assets/partners/cognizant.png",
  },
  {
    quote:
      "The Jaseci open-source project is a great initiative that has the potential to be a game-changer in enabling the creation and deployment of software that leverages artificial intelligence and machine learning.",
    author: "Krisztian Flautner",
    title: "Director of Engineering",
    company: "CISCO",
    logo: "/images/assets/partners/cisco.png",
  },
];
