export interface Student {
  id: string;
  name: string;
  course: string;
  year: number;
  bio: string;
  photo: string;
  skillsTeach: string[];
  skillsLearn: string[];
  subjects: string[];
  learningStyle: string[];
  interactionMode: string[];
  availability: string[];
}

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Sarah Chen",
    course: "Computer Science",
    year: 3,
    bio: "Passionate about AI and machine learning. Love helping others understand complex programming concepts!",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    skillsTeach: ["Python", "React", "Data Structures"],
    skillsLearn: ["UI/UX Design", "Cloud Computing"],
    subjects: ["Algorithms", "Machine Learning", "Web Development"],
    learningStyle: ["Visual", "Hands-on"],
    interactionMode: ["Online", "Offline"],
    availability: ["Weekday Evenings", "Weekends"],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    course: "Business Administration",
    year: 2,
    bio: "Entrepreneurship enthusiast with a knack for marketing strategies. Always up for collaborative projects!",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    skillsTeach: ["Marketing", "Public Speaking", "Excel"],
    skillsLearn: ["Web Development", "Graphic Design"],
    subjects: ["Business Strategy", "Digital Marketing", "Finance"],
    learningStyle: ["Auditory", "Reading/Writing"],
    interactionMode: ["Online"],
    availability: ["Weekday Mornings", "Weekday Afternoons"],
  },
  {
    id: "3",
    name: "Priya Patel",
    course: "Graphic Design",
    year: 4,
    bio: "Creative designer specializing in branding and illustration. Love teaching design thinking!",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    skillsTeach: ["Adobe Illustrator", "UI/UX Design", "Branding"],
    skillsLearn: ["3D Modeling", "Animation"],
    subjects: ["Visual Communication", "Typography", "Color Theory"],
    learningStyle: ["Visual", "Hands-on"],
    interactionMode: ["Offline"],
    availability: ["Weekday Evenings", "Weekends"],
  },
  {
    id: "4",
    name: "Alex Rivera",
    course: "Mathematics",
    year: 3,
    bio: "Math tutor with 2 years of experience. I make calculus fun and statistics simple!",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    skillsTeach: ["Calculus", "Statistics", "Linear Algebra"],
    skillsLearn: ["Programming", "Data Visualization"],
    subjects: ["Advanced Calculus", "Probability Theory", "Mathematical Modeling"],
    learningStyle: ["Visual", "Reading/Writing"],
    interactionMode: ["Online", "Offline"],
    availability: ["Weekday Afternoons", "Weekends"],
  },
  {
    id: "5",
    name: "Emma Williams",
    course: "Psychology",
    year: 2,
    bio: "Interested in cognitive psychology and research methods. Great at explaining concepts clearly!",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    skillsTeach: ["Research Methods", "Essay Writing", "SPSS"],
    skillsLearn: ["Public Speaking", "Data Analysis"],
    subjects: ["Cognitive Psychology", "Research Design", "Social Psychology"],
    learningStyle: ["Reading/Writing", "Auditory"],
    interactionMode: ["Online"],
    availability: ["Weekday Evenings", "Weekday Mornings"],
  },
  {
    id: "6",
    name: "David Kim",
    course: "Mechanical Engineering",
    year: 4,
    bio: "Engineering senior with experience in CAD and robotics. Love building things and solving problems!",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    skillsTeach: ["CAD", "Physics", "Problem Solving"],
    skillsLearn: ["Electronics", "Programming"],
    subjects: ["Thermodynamics", "Fluid Mechanics", "Robotics"],
    learningStyle: ["Hands-on", "Visual"],
    interactionMode: ["Offline"],
    availability: ["Weekends"],
  },
  {
    id: "7",
    name: "Zoe Martinez",
    course: "English Literature",
    year: 3,
    bio: "Avid reader and writer. I can help with essays, creative writing, and literary analysis!",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    skillsTeach: ["Essay Writing", "Literary Analysis", "Creative Writing"],
    skillsLearn: ["Public Speaking", "Video Editing"],
    subjects: ["19th Century Literature", "Contemporary Fiction", "Poetry"],
    learningStyle: ["Reading/Writing", "Auditory"],
    interactionMode: ["Online", "Offline"],
    availability: ["Weekday Afternoons", "Weekends"],
  },
  {
    id: "8",
    name: "James Thompson",
    course: "Economics",
    year: 2,
    bio: "Economics student passionate about policy and data analysis. Happy to study together!",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    skillsTeach: ["Economics", "Data Analysis", "Excel"],
    skillsLearn: ["Python", "Web Development"],
    subjects: ["Microeconomics", "Macroeconomics", "Econometrics"],
    learningStyle: ["Visual", "Reading/Writing"],
    interactionMode: ["Online"],
    availability: ["Weekday Mornings", "Weekday Evenings"],
  },
];

export const currentUser: Student = {
  id: "current",
  name: "You",
  course: "Computer Science",
  year: 2,
  bio: "Passionate learner always looking to grow and help others!",
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
  skillsTeach: ["JavaScript", "HTML/CSS"],
  skillsLearn: ["Backend Development", "DevOps"],
  subjects: ["Web Development", "Databases", "Software Engineering"],
  learningStyle: ["Visual", "Hands-on"],
  interactionMode: ["Online"],
  availability: ["Weekday Evenings", "Weekends"],
};
