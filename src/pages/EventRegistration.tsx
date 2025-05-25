import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageBanner from '../components/PageBanner';
// Remove the generic banner import and use event-specific banners
// const eventBanner = "https://placehold.co/1200x400/3563E9/FFFFFF?text=Event+Registration";
import emailService from '../utils/emailService';
import { submitEventRegistration } from '../utils/api';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description?: string;
  time?: string;
  banner?: string; // Add banner field
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  additionalInfo: string;
}

const EventRegistration = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    additionalInfo: ''
  });

  // Fetch event details
  useEffect(() => {
    // Mock event data fetch
    const mockEvents: Record<string, Event> = {
      '1': {
        id: 1,
        name: "Game Alchemy 2.0 ( SVVV )",
        date: "April 26, 2025",
        time: "11:00 AM - 4:00 PM",
        location: "SVVV Auditorium",
        description: "A hands-on workshop on game development fundamentals, featuring industry experts.",
        banner: "/src/assets/OtherImages/GameAlchemyPoster2816.png"
      },
      /*'2': {
        id: 2,
        name: "Web3 Workshop Series",
        date: "May 10, 2025",
        time: "11:00 AM - 5:00 PM",
        location: "NexHub HQ",
        description: "Explore blockchain technology, smart contracts, and decentralized applications.",
        banner: "/banners/web3-workshop.jpg"
      },*/
      // Add more events as needed
    };

    setTimeout(() => {
      if (eventId && mockEvents[eventId]) {
        setEvent(mockEvents[eventId]);
      }
      setLoading(false);
    }, 300);
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone || !formData.organization) {
        throw new Error('Please fill in all required fields');
      }

      if (!event) {
        throw new Error('Event information not available');
      }

      console.log('Submitting form data:', {
        ...formData,
        eventId: event.id,
        eventName: event.name,
        eventDate: event.date,
        eventTime: event.time || 'Not specified',
        eventLocation: event.location
      });

      // Use the API utility to send registration data
      const result = await submitEventRegistration({
        ...formData,
        eventId: event.id,
        eventName: event.name,
        eventDate: event.date,
        eventTime: event.time || 'Not specified',
        eventLocation: event.location
      });

      console.log('Registration successful:', result);

      // For successful registration but failed email
      if (result.success && result.emailSent === false) {
        setFormSubmitted(true);
        setFormError("Registration completed, but we couldn't send a confirmation email. Please take a screenshot of this page as your confirmation.");
      } else {
        // Success state for everything working correctly
        setFormSubmitted(true);
        setFormError(null);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('There was an error submitting your registration. Please try again.');
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-24 pb-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Event not found</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">The event you're looking for does not exist or has been removed.</p>
        <Link to="/events" className="mt-6 inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
          Back to Events
        </Link>
      </div>
    );
  }

  // Show success message after form submission
  if (formSubmitted) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center"
          >
            <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Registration Successful!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {formError || 'Thank you for registering for ' + event.name + '. A confirmation email with your hall ticket has been sent to ' + formData.email + '.'}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {formError ? 'Please try again later.' : 'Please check your inbox (and spam folder) for the email and bring your hall ticket to the event.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to={`/events/${eventId}`}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Event
              </Link>
              <Link 
                to="/events"
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Explore More Events
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      {/* Event Banner */}
      <PageBanner 
        title={`Register for ${event.name}`} 
        subtitle={`${event.date} | ${event.location}`}
        backgroundImage={event.banner || `https://placehold.co/1200x400/3563E9/FFFFFF?text=Register+for+${encodeURIComponent(event.name)}`}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Event summary and registration form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Registration for {event.name}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Fill out the form below to secure your spot at this event.
              </p>
            </div>

            <div className="p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Registration form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your email address"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      A confirmation email with your hall ticket will be sent to this address.
                    </p>
                  </div>

                  {/* Phone input */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Organization input */}
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      College/Organization *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your college or organization name"
                    />
                  </div>

                  {/* Additional info */}
                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={3}
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Any additional information or specific requirements"
                    ></textarea>
                  </div>

                  {/* Error message */}
                  {formError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
                      {formError}
                    </div>
                  )}

                  {/* Form actions */}
                  <div className="flex items-center justify-between pt-4">
                    <Link 
                      to={`/events/${eventId}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className={`px-6 py-2 bg-primary text-white rounded-md transition-colors ${
                        formSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'
                      }`}
                    >
                      {formSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Register Now'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>

          {/* Event information sidebar */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Event Information
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Event</h3>
                  <p className="text-gray-900 dark:text-white">{event.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Date</h3>
                  <p className="text-gray-900 dark:text-white">{event.date}</p>
                </div>
                {event.time && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Time</h3>
                    <p className="text-gray-900 dark:text-white">{event.time}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Location</h3>
                  <p className="text-gray-900 dark:text-white">{event.location}</p>
                </div>
                {event.description && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Description</h3>
                    <p className="text-gray-900 dark:text-white">{event.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Registration note */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Registration Note</h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>
                    After registration, you will receive a confirmation email with your hall ticket.
                    Please bring this hall ticket (either printed or on your mobile device) to the event.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration; 