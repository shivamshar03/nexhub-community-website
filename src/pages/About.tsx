import { motion } from 'framer-motion';
import PageBanner from '../components/PageBanner';
import aboutBanner from '../assets/OtherImages/aboutusbannerf9a9.jpg';
import React from 'react';

const About = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Header Section */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About <span className="text-primary dark:text-primary-light">NexHub</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A community-driven initiative bringing together tech enthusiasts
          </p>
        </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              NexHub is a community-driven initiative that brings together developers, designers, and innovators. 
              We host events, workshops, and hackathons to foster learning and collaboration in tech.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our mission is to create an inclusive environment where technology enthusiasts can share knowledge, 
              collaborate on projects, and grow their skills together.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Whether you're a seasoned professional or just starting your journey in tech, 
              NexHub provides resources, mentorship, and networking opportunities to help you succeed.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              width="240"
              height="320"
              src="https://www.youtube.com/embed/pSbDSNWQSEk?autoplay=1&mute=1"
              title="NexHub Introduction Video"
              frameBorder="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="mt-4 text-center">
              <a 
                href="https://www.youtube.com/channel/UCUHmRuQ9ELLTC9lVeTtEQpw" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary inline-flex items-center"
              >
                Visit our YouTube channel
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collaboration */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary dark:text-primary-light text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe that the best solutions emerge when diverse minds work together toward a common goal.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary dark:text-primary-light text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We encourage creative thinking and embrace new technologies to solve complex problems.
              </p>
            </div>

            {/* Growth */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary dark:text-primary-light text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're committed to continuous learning and helping each member reach their full potential.
              </p>
            </div>
          </div>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Our Journey</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <div className="space-y-8">
              {/* Year 1 */}
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-bold text-primary dark:text-primary-light">2023</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    The Beginning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    NexHub was founded by a group of tech enthusiasts who saw the need for a collaborative community. 
                    The first meetup had just 15 members but sparked meaningful connections.
                  </p>
                </div>
              </div>

              {/* Year 2 */}
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-bold text-primary dark:text-primary-light">2024</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Growing Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The community expanded rapidly, reaching over 500 members. We hosted our first hackathon, 
                    established regular workshops, and formed partnerships with local tech companies.
                  </p>
                </div>
              </div>

              {/* Year 3 */}
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-bold text-primary dark:text-primary-light">2025</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Expanding Horizons
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Today, NexHub continues to grow and evolve. With over 1,000 members, we're expanding our offerings 
                    to include mentorship programs, specialized learning tracks, and collaborative projects with real-world impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

       
      </div>
    </div>
  );
};

export default About; 