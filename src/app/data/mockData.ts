import { Application, Tag } from '../types';

export const TAGS: Tag[] = [
  { id: '1', name: 'Leadership', color: '#6366f1' },
  { id: '2', name: 'Teamwork', color: '#10b981' },
  { id: '3', name: 'Technical Skills', color: '#06b6d4' },
  { id: '4', name: 'Problem Solving', color: '#f59e0b' },
  { id: '5', name: 'Communication', color: '#ec4899' },
  { id: '6', name: 'Career Goals', color: '#8b5cf6' },
  { id: '7', name: 'Personal Growth', color: '#14b8a6' },
  { id: '8', name: 'Innovation', color: '#f97316' },
  { id: '9', name: 'Research', color: '#3b82f6' },
  { id: '10', name: 'Community Impact', color: '#84cc16' },
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    title: 'Google Software Engineering Internship',
    status: 'submitted',
    dateCreated: '2026-02-15',
    questions: [
      {
        id: 'q1',
        question: 'Tell us about a time you led a technical project from start to finish.',
        response: 'During my junior year, I led a team of 4 students to build a full-stack web application for our university\'s student organization directory. I was responsible for architecting the system, managing the project timeline, and coordinating with stakeholders. We used React for the frontend, Node.js/Express for the backend, and PostgreSQL for the database. I implemented Agile methodologies, organizing bi-weekly sprints and daily standups. The project successfully launched after 3 months and now serves over 2,000 students. This experience taught me the importance of clear communication, adaptability, and breaking down complex problems into manageable tasks.',
        tags: [TAGS[0], TAGS[2], TAGS[4]],
      },
      {
        id: 'q2',
        question: 'Describe a technical challenge you faced and how you overcame it.',
        response: 'While working on an ML project, I encountered severe overfitting issues with my model. The training accuracy was 98% but validation accuracy was only 65%. I systematically debugged by: (1) visualizing the learning curves, (2) implementing k-fold cross-validation, (3) adding dropout layers and L2 regularization, (4) augmenting the training dataset, and (5) reducing model complexity. After these iterations, I achieved 88% validation accuracy. This taught me the importance of proper validation techniques and the iterative nature of machine learning development.',
        tags: [TAGS[3], TAGS[2], TAGS[7]],
      },
      {
        id: 'q3',
        question: 'Why do you want to work at Google?',
        response: 'Google\'s commitment to solving problems at massive scale deeply resonates with my career aspirations. I\'m particularly drawn to Google\'s culture of innovation and its 20% time policy, which has led to products like Gmail and Google News. The opportunity to work with world-class engineers on products used by billions would accelerate my growth as a software engineer. Additionally, Google\'s investment in open source projects like TensorFlow and Kubernetes aligns with my belief in collaborative development.',
        tags: [TAGS[5], TAGS[7]],
      },
    ],
  },
  {
    id: '2',
    title: 'Meta Product Management Fellowship',
    status: 'draft',
    dateCreated: '2026-02-10',
    questions: [
      {
        id: 'q4',
        question: 'Tell us about a product you love and how you would improve it.',
        response: 'I\'m a daily user of Notion and appreciate its flexibility, but I\'ve noticed the mobile experience lags behind the desktop version. I would improve it by: (1) implementing an offline-first architecture for better reliability, (2) adding quick-capture widgets for rapid note-taking, (3) introducing voice-to-text for hands-free entry, and (4) creating a simplified mobile-specific UI that prioritizes common actions. These improvements would make Notion more accessible for users who primarily work on mobile devices.',
        tags: [TAGS[3], TAGS[7], TAGS[8]],
      },
      {
        id: 'q5',
        question: 'Describe a time when you worked cross-functionally to achieve a goal.',
        response: 'As president of the Computer Science club, I collaborated with the Marketing department, Campus Events, and IT Services to organize our annual hackathon. I coordinated with Marketing to create promotional materials, worked with Campus Events for venue logistics, and partnered with IT for network infrastructure. We had to navigate different priorities and timelines, which taught me to be a diplomatic communicator and proactive problem-solver. The event attracted 200+ participants, our highest turnout yet.',
        tags: [TAGS[0], TAGS[1], TAGS[4]],
      },
    ],
  },
  {
    id: '3',
    title: 'Rhodes Scholarship Application',
    status: 'in-review',
    dateCreated: '2026-01-20',
    questions: [
      {
        id: 'q6',
        question: 'How have you demonstrated leadership in service to others?',
        response: 'For the past two years, I\'ve led a student-run tutoring initiative that provides free STEM tutoring to underserved high school students in my community. I recruit and train volunteer tutors, coordinate scheduling, and develop curriculum materials. We\'ve grown from 5 tutors serving 15 students to 25 tutors serving 80+ students. Beyond logistics, I mentor the tutors, helping them develop effective teaching strategies. This experience reinforced my belief that education is the most powerful tool for social mobility and strengthened my commitment to making it accessible to all.',
        tags: [TAGS[0], TAGS[9], TAGS[6]],
      },
      {
        id: 'q7',
        question: 'What do you hope to study at Oxford and why?',
        response: 'I aim to pursue a DPhil in Computer Science, focusing on the intersection of AI and healthcare. Oxford\'s strong research groups in machine learning and partnerships with medical institutions provide the ideal environment for this work. I\'m particularly interested in Prof. Smith\'s work on interpretable AI for medical diagnosis. My goal is to develop AI systems that can assist doctors in diagnosing rare diseases while maintaining transparency and trust. This research would directly address the critical challenge of healthcare accessibility in underserved communities.',
        tags: [TAGS[5], TAGS[8], TAGS[9]],
      },
    ],
  },
  {
    id: '4',
    title: 'Microsoft Explore Internship',
    status: 'submitted',
    dateCreated: '2026-02-20',
    questions: [
      {
        id: 'q8',
        question: 'Tell us about a time you learned a new technology quickly.',
        response: 'When I joined a research lab last summer, I needed to learn PyTorch within two weeks to contribute to an ongoing project. Despite having only used TensorFlow before, I created a structured learning plan: (1) completed the official PyTorch tutorials, (2) reimplemented a simple CNN I had built in TensorFlow, (3) studied the lab\'s existing codebase, and (4) built a small proof-of-concept project. Within the timeframe, I was able to make meaningful contributions to the lab\'s research. This experience taught me how to learn efficiently under time constraints and the value of hands-on practice.',
        tags: [TAGS[2], TAGS[6], TAGS[7]],
      },
    ],
  },
  {
    id: '5',
    title: 'Fulbright Scholarship',
    status: 'accepted',
    dateCreated: '2025-11-05',
    questions: [
      {
        id: 'q9',
        question: 'Describe your proposed project and its potential impact.',
        response: 'I propose to develop and implement an open-source platform for community-driven water quality monitoring in rural India. The platform will use low-cost IoT sensors combined with a mobile app to enable local communities to track water quality in real-time. By partnering with local NGOs and government agencies, we can create a scalable model for citizen science in environmental monitoring. This project has the potential to impact thousands of rural communities by providing them with actionable data about their water resources and empowering them to advocate for clean water access.',
        tags: [TAGS[8], TAGS[9], TAGS[2]],
      },
      {
        id: 'q10',
        question: 'How will this experience contribute to your long-term goals?',
        response: 'This Fulbright experience will be instrumental in my goal of bridging technology and international development. Living and working in rural India will give me firsthand understanding of the challenges faced by underserved communities and how technology can be appropriately adapted to local contexts. It will also expand my cross-cultural communication skills and global network. Long-term, I aim to work at the intersection of technology and social impact, and this experience will provide the foundation I need to develop solutions that are both technically sound and culturally appropriate.',
        tags: [TAGS[5], TAGS[6], TAGS[9]],
      },
    ],
  },
];
