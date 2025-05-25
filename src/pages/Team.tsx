import { motion } from 'framer-motion';
import React from 'react';

// Import team member images
import shivamImg from '../assets/MembersImages/shivam.jpg'; 
//import namanImg from '../assets/MembersImages/naman.jpg';
//import vaidicImg from '../assets/MembersImages/vaidic.jpg';
import utkarshImg from '../assets/MembersImages/utkarsh.jpeg';
import mayankImg from '../assets/MembersImages/mayank.jpg';
import arnavImg from '../assets/MembersImages/arnav.jpg';
import shreyImg from '../assets/MembersImages/shrey.jpg';
import mitaliImg from '../assets/MembersImages/mitali.jpg';

const TeamMember = ({ 
  name, 
  role, 
  image,
  linkedin = "#", 
  instagram = "#",
  github = "#"
}: { 
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="mb-4 rounded-lg overflow-hidden w-full max-w-xs">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-60 object-contain object-center"
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
        {name}
      </h3>
      
      <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full px-4 py-1 text-sm font-medium mt-2 mb-4">
        {role}
      </div>
      
      <div className="flex space-x-4">
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn`}>
          <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Instagram`}>
          <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        {github && github !== "#" && (
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s GitHub`}>
            <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Team = () => {
  

  const teamMembers = [
    {
      id: 1,
      name: "Shivam Sharma",
      role: "Chairperson",
      image: shivamImg,
      linkedin: "https://www.linkedin.com/in/shivam-sharma-ab489721b/",
      instagram: "https://www.instagram.com/shivamsharma.py",
      github: "https://github.com/shivamshar03"
    },
    {
      id: 2,
      name: "Mitali Rampurkar",
      role: "General Secretary",
      image: mitaliImg,
      linkedin: "https://www.linkedin.com/in/mitali-rampurkar-8b18b4303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/mitali.2708__",
      
    },
    {
      id: 3,
      name: "Utkarsh Dave",
      role: "Head of Media and Content",
      image: utkarshImg,
      linkedin: "https://www.linkedin.com/in/utkarsh-dave-8770b7226?trk=contact-info",
      instagram: "https://www.instagram.com/ud_hsraktu?igsh=ejl3ZnJybjQ0b3Fs&utm_source=qr",
      
    },
    {
      id: 4,
      name: "Shrey Patidar",
      role: "Head of Research and Analysis",
      image: shreyImg,
      linkedin: "https://www.linkedin.com/in/shrey-patidar-586272213?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/patidar_ji_28?igsh=MTBvZXJ2eDhrNW5naA==",
      github: "https://github.com/shreypatidar"
    },    
    {
      id: 6,
      name: "Arnav Bhokre",
      role: "Head of Event and Operations",
      image: arnavImg,
      linkedin: "https://www.linkedin.com/in/arnav-bhokre-a09482250",
      instagram: "https://www.instagram.com/arnav_bhokre2813?igsh=MWl3bmw2bjd6MTlkNQ==",
    },
{
      id: 5,
      name: "Mayank Matkar",
      role: "Head of Technical Development",
      image: mayankImg,
      linkedin: "https://www.linkedin.com/in/mayank-matkar-042003k?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/mayank_matkar",
        },
/*{
id: 7,
      name: "Tarang upadhyay",
      role: "",
      image: tarangImg,
      linkedin: "https://www.linkedin.com/in/%F0%9D%9A%83%F0%9D%9A%8A%F0%9D%9A%9B%F0%9D%9A%8A%F0%9D%9A%97%F0%9D%9A%90-%F0%9D%9A%9E%F0%9D%9A%99%F0%9D%9A%8A%F0%9D%9A%8D%F0%9D%9A%91%F0%9D%9A%A2%F0%9D%9A%8A%F0%9D%9A%A2-62b182233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/_.tarang_upadhyay._?igsh=MWUyOHlwaTFsc2l3OA==",
      },
{
      id: 8,
      name: "Aditya choudhary",
      role: "promotion Head",
      image: adityaimg,
      linkedin: "https://www.linkedin.com/in/aditya-choudhary-bab134330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/adityaa_choudhary1017?igsh=MWRpaWVrc3VkZWVyZw==",
      
    },*/
        /*{
      id: 2,
      name: "Vaidic Tiwari",
      role: "Advisor",
      image: vaidicImg,
      linkedin: "https://www.linkedin.com/in/vaidic-tiwari-b01000200/",
      instagram: "https://www.instagram.com/vaidic_tiwari",
      github: "https://github.com/vaidic-tiwari"
    },
    {
      id: 3,
      name: "Naman Sisodiya",
      role: "Advisor",
      image: namanImg,
      linkedin: "https://www.linkedin.com/in/naman-sisodiya-b01000200/",
      instagram: "https://www.instagram.com/naman_sisodiya",
      github: "https://github.com/naman-sisodiya"
    },  */ 

  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-primary dark:text-primary-light">Team</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the passionate individuals behind NexHub Community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member) => (
            <TeamMember 
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedin={member.linkedin}
              instagram={member.instagram}
              github={member.github}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team; 