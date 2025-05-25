import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import eventBanner from '../assets/EventPage/GamingDevelopment/banner.jpg';

const Events = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming');

  const upcomingEvents = [
    {
      id: 1,
      name: "Game Alchemy 2.0 ( SVVV )",
      date: "April 26, 2025",
      location: "SVVV Auditorium",
      description: "join us for Game Alchemy, an immersive seminar on game development featuring expert talks, hands-on workshops, and networking opportunities.",
      organizer: "NexHub Team",
    },
    /*{
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
    },
    {
      id: 4,
      name: "Mobile App Development Workshop",
      date: "July 12, 2025",
      location: "NexHub HQ",
      description: "Hands-on session on building cross-platform mobile applications with React Native."
    },
    {
      id: 5,
      name: "Tech Career Fair",
      date: "August 20, 2025",
      location: "City Convention Center",
      description: "Connect with top tech companies hiring for various roles in development, design, and product."
    }*/
  ];

  const previousEvents = [
    {
      id: 101,
      name: "Game Alchemy",
      date: "December 07, 2024",
      location: "NexHub HQ",
      image: "/src/assets/OtherImages/GameAlchemyPoster2816.png",
      summary: "The Game Alchemy event on December 7, 2024, was a workshop by NexHub Community and The UpThrust, focusing on game design and development through expert talks and hands-on experiences.",
      youtubeTrailer: "https://youtube.com/shorts/8a5w-PO-f9I?si=V4ZK20ZB-mWB7IEH"
    },
    /*{
      id: 102,
      name: "Frontend Development Masterclass",
      date: "February 15, 2024",
      location: "Online",
      image: "/event-frontend.jpg",
      summary: "An intensive workshop covering modern frontend frameworks and best practices.",
      youtubeTrailer: "https://www.youtube.com/channel/UCUHmRuQ9ELLTC9lVeTtEQpw"
    },
    {
      id: 103,
      name: "Data Science Summit",
      date: "March 22, 2024",
      location: "Tech University",
      image: "/event-datascience.jpg",
      summary: "A day-long conference featuring talks from leading data scientists and researchers.",
      youtubeTrailer: "https://www.youtube.com/channel/UCUHmRuQ9ELLTC9lVeTtEQpw"
    },
    {
      id: 104,
      name: "Cloud Computing Workshop",
      date: "April 8, 2024",
      location: "Online",
      image: "/event-cloud.jpg",
      summary: "Practical sessions on AWS, Azure, and Google Cloud Platform fundamentals.",
      youtubeTrailer: "https://www.youtube.com/channel/UCUHmRuQ9ELLTC9lVeTtEQpw"
    },
    {
      id: 105,
      name: "Women in Tech Panel",
      date: "May 15, 2024",
      location: "Community Center",
      image: "/event-womenintech.jpg",
      summary: "Inspiring discussions with women leaders in various technology fields.",
      youtubeTrailer: "https://www.youtube.com/channel/UCUHmRuQ9ELLTC9lVeTtEQpw"
    }*/
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Header Section with Banner */}
      <PageBanner 
        title="Events" 
        subtitle="Join our workshops, hackathons, and meetups to learn and collaborate"
        backgroundImage={eventBanner}
      />

      {/* Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'previous'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
              }`}
              onClick={() => setActiveTab('previous')}
            >
              Previous Events
            </button>
          </div>
        </div>

        {/* Events Content */}
        <div className="mt-8">
          {activeTab === 'upcoming' ? (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg flex flex-col md:flex-row"
                >
                  <div className="md:w-1/4 bg-gray-100 dark:bg-gray-700 p-6 flex flex-col justify-center items-center text-center">
                    <div className="text-primary dark:text-primary-light font-bold text-xl mb-2">{event.date}</div>
                    <div className="text-gray-600 dark:text-gray-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <div className="md:w-3/4 p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{event.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link 
                        to={`/events/${event.id}`} 
                        className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        View Details
                      </Link>
                      <Link 
                        to={`/events/${event.id}/register`} 
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Register Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {previousEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/600x400/3563E9/FFFFFF?text=${event.name.replace(/ /g, '+')}`;
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="text-white text-sm font-medium">{event.date}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{event.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </p>
                      <p className="mt-3 text-gray-600 dark:text-gray-300">{event.summary}</p>
                      <Link 
                        to={`/events/${event.id}`} 
                        className="mt-4 inline-flex items-center text-primary dark:text-primary-light hover:underline"
                      >
                        View Recap
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events; 