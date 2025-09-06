import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { ReactNode } from 'react';

interface SocialIcon {
  href: string;
  icon: ReactNode;
  color: string;
}

interface Skill {
  name: string;
}

interface SkillsData {
  [key: string]: Skill[];
}

export const socialIcons: SocialIcon[] = [
  {
    href: 'https://github.com/AlbakerAMA',
    icon: <FaGithub />,
    color: 'text-black dark:text-white',
  },
  {
    href: 'https://linkedin.com/in/albaker',
    icon: <FaLinkedin />,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    href: 'https://instagram.com/albaker.me',
    icon: <FaInstagram />,
    color: 'text-pink-500',
  },
  {
    href: 'https://facebook.com/albaker114',
    icon: <FaFacebook />,
    color: 'text-blue-700',
  },
];

export const skillsData: SkillsData = {
  "Languages": [
    { name: "HTML" },
    { name: "JavaScript" },
    { name: "Python" },
    { name: "MySQL" },
  ],
  "Frameworks & Libraries": [
    { name: "Next.js" },
    { name: "React" },
    { name: "Flutter" },
    { name: "Firebase" },
  ],
  "ML & Data Science": [
    { name: "Pandas" },
    { name: "Scikit-learn" },
    { name: "NumPy" },
    { name: "TensorFlow" },
    { name: "Matplotlib" },
    { name: "Jupyter" },
  ]
};
