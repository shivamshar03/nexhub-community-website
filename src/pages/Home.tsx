import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroImage = '/images/heroimg54a6.png';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-tr from-gray-900 via-purple-900 to-primary-dark pt-32 pb-24 dark:from-black dark:via-gray-900 dark:to-primary-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <motion.div 
            className="text-center md:text-left md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Nexhub<br/>
              <span className="text-primary-light">Where Developers Connect, Learn & Grow.</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 md:pr-10">
              Join NexHub Community to learn, build, and collaborate with like-minded tech enthusiasts.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/events" className="btn bg-white text-primary-dark hover:bg-gray-100">
                Explore Events
              </Link>
              <Link to="/join" className="btn bg-primary-light text-white hover:bg-primary">
                Join NexHub
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={heroImage} 
              alt="Developer working on laptop" 
              className="w-full max-w-lg mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <motion.div 
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md h-full flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-primary dark:text-primary-light text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community-Driven",
      description: "Join a diverse community of tech enthusiasts, developers, designers, and innovators."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Hands-on Learning",
      description: "Participate in workshops, hackathons, and collaborative projects to enhance your skills."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation-Focused",
      description: "Build solutions for real-world problems and push the boundaries of technology."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Why Join NexHub?</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're more than just events - we're a community focused on growth, innovation, and collaboration.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UpcomingEventsSection = () => {
  const events = [
    {
      id: 1,
      name: "AI/ML Bootcamp",
      date: "April 15, 2025",
      location: "Online",
      description: "A hands-on workshop on AI and ML fundamentals, featuring industry experts."
    },
    {
      id: 2,
      name: "Web3 Workshop Series",
      date: "May 10, 2025",
      location: "NexHub HQ",
      description: "Explore blockchain technology, smart contracts, and decentralized applications."
    },
    {
      id: 3,
      name: "DevOps Fundamentals",
      date: "June 5, 2025",
      location: "Online",
      description: "Learn about CI/CD pipelines, Docker, Kubernetes and modern DevOps practices."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Upcoming Events</h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Join us at our next events and expand your knowledge.
            </p>
          </div>
          <Link to="/events" className="mt-4 md:mt-0 inline-flex items-center text-primary dark:text-primary-light hover:underline">
            View all events
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-dark bg-primary-light/10 rounded-full mb-4">
                  {event.date}
                </span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{event.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </p>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{event.description}</p>
                <Link 
                  to={`/events/${event.id}`} 
                  className="mt-5 block w-full py-2 text-center rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-16 bg-primary dark:bg-primary-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to become a part of NexHub?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join our community of tech enthusiasts today and accelerate your growth through collaboration and learning.
        </p>
        <Link 
          to="/join" 
          className="btn bg-white text-primary-dark hover:bg-gray-100 inline-flex items-center"
        >
          Join NexHub Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <UpcomingEventsSection />
      <CTASection />
    </>
  );
};

export default Home; 