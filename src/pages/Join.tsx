import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import React from "react";
import { submitRecruitmentApplication } from "../utils/api";
import { Link } from "react-router-dom";

const JoinBenefitCard = ({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full">
    <div className="text-primary dark:text-primary-light mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
  </div>
);

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  branch: string;
  year: string;
  linkedin: string;
  portfolio: string;
  instagram: string;
  otherLink: string;
  division: string;
  programmingLanguages: string;
  techProject: string;
  familiarWithFrameworks: boolean;
  frameworksList: string;
  techContributions: string;
  hasEventExperience: boolean;
  eventExperience: string;
  taskManagement: string;
  eventSuggestion: string;
  designTools: string;
  designWorkInterest: string;
  cameraPreference: string;
  contentType: string;
  comfortableWithReels: boolean;
  weeklyHours: string;
  comfortableWithMeetings: boolean;
  privacyPolicy: boolean;
  termsAccepted: boolean;
}

const Join = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    collegeName: "",
    branch: "",
    year: "",
    linkedin: "",
    portfolio: "",
    instagram: "",
    otherLink: "",
    division: "",
    programmingLanguages: "",
    techProject: "",
    familiarWithFrameworks: false,
    frameworksList: "",
    techContributions: "",
    hasEventExperience: false,
    eventExperience: "",
    taskManagement: "",
    eventSuggestion: "",
    designTools: "",
    designWorkInterest: "",
    cameraPreference: "",
    contentType: "",
    comfortableWithReels: false,
    weeklyHours: "",
    comfortableWithMeetings: false,
    privacyPolicy: false,
    termsAccepted: false,
  });

  const handleChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Log the entire form state for debugging
    console.log("Form state before submission:", formData);

    // Additional validation before submission
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "collegeName",
      "branch",
      "year",
      "division",
      "weeklyHours",
      "comfortableWithMeetings",
      "privacyPolicy",
      "termsAccepted",
    ];

    // Check for division-specific required fields
    if (formData.division === "tech") {
      requiredFields.push("programmingLanguages", "techContributions");
      // Only add frameworksList as required if familiarWithFrameworks is true
      if (formData.familiarWithFrameworks) {
        requiredFields.push("frameworksList");
      }
    } else if (formData.division === "operations") {
      requiredFields.push(
        "hasEventExperience",
        "taskManagement",
        "eventSuggestion"
      );
      if (formData.hasEventExperience) {
        requiredFields.push("eventExperience");
      }
    } else if (formData.division === "design") {
      requiredFields.push("designTools", "designWorkInterest");
    } else if (formData.division === "photography") {
      requiredFields.push(
        "cameraPreference",
        "contentType",
        "comfortableWithReels"
      );
    }

    const missingFields = requiredFields.filter((field) => {
      const value = formData[field as keyof FormData];
      return (
        value === "" ||
        value === null ||
        value === undefined ||
        // Only consider false as a missing value for checkbox fields
        (field === "privacyPolicy" || field === "termsAccepted"
          ? value === false
          : false)
      );
    });

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      setSubmitting(false);
      return;
    }

    try {
      // Send the form data 
      console.log("Submitting form data:", JSON.stringify(formData, null, 2));
      const result = await submitRecruitmentApplication(formData);
      console.log("Application submitted successfully:", result);
      setSuccess(true);

      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        collegeName: "",
        branch: "",
        year: "",
        linkedin: "",
        portfolio: "",
        instagram: "",
        otherLink: "",
        division: "",
        programmingLanguages: "",
        techProject: "",
        familiarWithFrameworks: false,
        frameworksList: "",
        techContributions: "",
        hasEventExperience: false,
        eventExperience: "",
        taskManagement: "",
        eventSuggestion: "",
        designTools: "",
        designWorkInterest: "",
        cameraPreference: "",
        contentType: "",
        comfortableWithReels: false,
        weeklyHours: "",
        comfortableWithMeetings: false,
        privacyPolicy: false,
        termsAccepted: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Join a Thriving Community",
      description:
        "Connect with like-minded tech enthusiasts, share ideas, and collaborate on exciting projects.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      title: "Exclusive Workshop Access",
      description:
        "Get priority registration and discounts for all workshops, hackathons, and special events.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Career Opportunities",
      description:
        "Access job postings, networking events, and mentorship opportunities to accelerate your career.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Knowledge Sharing",
      description:
        "Access our resource library, discussion forums, and code repositories to enhance your skills.",
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative">
              <span className="relative inline-block">
                Join Our{" "}
                <span className="text-primary dark:text-primary-light">
                  Team
                </span>
                <div className="absolute -top-6 -right-6 w-12 h-12 text-primary dark:text-primary-light animate-spin-slow hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Be part of a dynamic team that's shaping the future of technology
              and innovation. At NexHub, we value creativity, passion, and
              dedication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800"></div>
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 relative"
          >
            Our{" "}
            <span className="text-primary dark:text-primary-light">
              Recruitment
            </span>{" "}
            Process
            <div className="absolute -top-4 -right-4 w-8 h-8 text-primary/30 dark:text-primary-light/30 animate-ping hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
      </div>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 relative group"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative space-y-4">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-primary dark:text-primary-light"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                  Application Review
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Submit your application and portfolio. Our team will review
                  your skills and experience.
                </p>
              </div>
        </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 relative group"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative space-y-4">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-primary dark:text-primary-light"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                  Team Interview
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Meet with our team to discuss your experience, showcase your
                  skills, and learn about NexHub.
                </p>
              </div>
            </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 relative group"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative space-y-4">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-primary dark:text-primary-light"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
            </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                  Final Selection
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Selected candidates will receive an offer to join our dynamic
                  team.
                </p>
              </div>
        </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          viewport={{ once: true }}
            className="max-w-4xl mx-auto"
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                Join NexHub Team
          </h2>

              {success ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Application Submitted!
              </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for your interest in joining NexHub. We'll review
                    your application and get back to you soon.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                      1. Basic Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleChange("fullName", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          College Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={(e) =>
                            handleChange("collegeName", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="Enter your college name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Branch *
                        </label>
                        <input
                          type="text"
                          required
                          name="branch"
                          value={formData.branch}
                          onChange={(e) =>
                            handleChange("branch", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="Enter your branch/major"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Year *
                        </label>
                        <select
                          required
                          name="year"
                          value={formData.year}
                          onChange={(e) => handleChange("year", e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                        >
                          <option value="">Select Year</option>
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Social Profiles */}
                  <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                      2. Social Profiles
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={(e) =>
                            handleChange("linkedin", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="https://linkedin.com/in/yourusername"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          GitHub / Portfolio 
                        </label>
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={(e) =>
                            handleChange("portfolio", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="https://github.com/yourusername"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Instagram Handle
                        </label>
                        <input
                          type="text"
                          name="instagram"
                          value={formData.instagram}
                          onChange={(e) =>
                            handleChange("instagram", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="@yourusername"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Any Other Link (youtube,kaggle, etc.)
                        </label>
                        <input
                          type="url"
                          name="otherLink"
                          value={formData.otherLink}
                          onChange={(e) =>
                            handleChange("otherLink", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Division Selection */}
                  <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                      2. Role Selection
                    </h3>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Select Your Role *
                      </label>
                      <select
                        required
                        name="division"
                        value={formData.division}
                        onChange={(e) =>
                          handleChange("division", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                      >
                        <option value="">Select a division</option>
                        <option value="tech">Tech & Development</option>
                        <option value="operations">
                          Operations & Management
                        </option>
                        <option value="design">Design & Creatives</option>
                        <option value="photography">
                          Photography & Cinematics
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Tech & Development Section */}
                  {formData.division === "tech" && (
                    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                        Tech & Development Questions
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            What programming languages or technologies are you
                            proficient in? *
                          </label>
                          <input
                            type="text"
                            required
                            name="programmingLanguages"
                            value={formData.programmingLanguages}
                            onChange={(e) =>
                              handleChange(
                                "programmingLanguages",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                            placeholder="e.g., JavaScript, Python, Java"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Share your best tech project or GitHub repo
                          </label>
                          <textarea
                            name="techProject"
                            value={formData.techProject}
                            onChange={(e) =>
                              handleChange("techProject", e.target.value)
                            }
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                            placeholder="Describe your project and include links if available"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Are you familiar with any frameworks/tools like
                            Flask, React, Firebase, etc.? *
                          </label>
                          <select
                            required
                            name="familiarWithFrameworks"
                            value={
                              formData.familiarWithFrameworks ? "true" : "false"
                            }
                            onChange={(e) =>
                              handleChange(
                                "familiarWithFrameworks",
                                e.target.value === "true"
                              )
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          >
                            <option value="">Select an option</option>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                        {formData.familiarWithFrameworks && (
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                              Which frameworks/tools? *
                            </label>
                            <input
                              type="text"
                              required={formData.familiarWithFrameworks}
                              name="frameworksList"
                              value={formData.frameworksList}
                              onChange={(e) =>
                                handleChange("frameworksList", e.target.value)
                              }
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                              placeholder="e.g., React, Flask, Firebase, Docker"
                            />
                          </div>
                        )}
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            What kind of tech contributions do you want to make
                            to NexHub? *
                          </label>
                          <textarea
                            required
                            name="techContributions"
                            value={formData.techContributions}
                            onChange={(e) =>
                              handleChange("techContributions", e.target.value)
                            }
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                            placeholder="Describe how you would like to contribute technically"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Operations & Management Section */}
                  {formData.division === "operations" && (
                    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Operations & Management Questions
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Have you handled event planning or team management
                            before? *
                          </label>
                          <select
                            required
                            name="hasEventExperience"
                            value={
                              formData.hasEventExperience ? "true" : "false"
                            }
                            onChange={(e) =>
                              handleChange(
                                "hasEventExperience",
                                e.target.value === "true"
                              )
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                        {formData.hasEventExperience === true && (
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                              Describe your role. *
                            </label>
                            <textarea
                              required
                              name="eventExperience"
                              value={formData.eventExperience}
                              onChange={(e) =>
                                handleChange("eventExperience", e.target.value)
                              }
                              rows={4}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </div>
                        )}
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            How would you manage tasks and coordinate with team
                            members? *
                          </label>
                          <textarea
                            required
                            name="taskManagement"
                            value={formData.taskManagement}
                            onChange={(e) =>
                              handleChange("taskManagement", e.target.value)
                            }
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Suggest an event you would love to organize under
                            NexHub. *
                          </label>
                          <textarea
                            required
                            name="eventSuggestion"
                            value={formData.eventSuggestion}
                            onChange={(e) =>
                              handleChange("eventSuggestion", e.target.value)
                            }
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Design & Creatives Section */}
                  {formData.division === "design" && (
                    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                        Design & Creatives Questions
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            What tools do you use for designing? *
                          </label>
                          <input
                            type="text"
                            required
                            name="designTools"
                            value={formData.designTools}
                            onChange={(e) =>
                              handleChange("designTools", e.target.value)
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Upload or link your design portfolio *    
                            {/* <span className="text-gray-500"></span> */}
                          </label>
                          <div>
                            <a
                              href="https://docs.google.com/forms/d/e/1FAIpQLScBAsGl3lT2-LJKqV1PAOoTw3ClkBiIgu2kQxiLoY893Qytuw/viewform?usp=header"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button
                                type="button"
                                className="px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                              >
                                Click Here to Upload
                              </button>
                            </a>
                            <div className="flex mt-2">
                              <div className="flex-shrink-0">
                                <svg
                                  className="h-5 w-5 text-blue-600 dark:text-blue-300"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                  You'll be redirected to a separate form to upload your portfolio.
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            What kind of design work are you interested in? *
                          </label>
                          <textarea
                            required
                            name="designWorkInterest"
                            value={formData.designWorkInterest || ""}
                            onChange={(e) =>
                              handleChange("designWorkInterest", e.target.value)
                            }
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Photography & Cinematics Section */}
                  {formData.division === "photography" && (
                    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Photography & Cinematics Questions
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Do you own a camera or prefer using a phone? *
                          </label>
                          <select
                            required
                            name="cameraPreference"
                            value={formData.cameraPreference}
                            onChange={(e) =>
                              handleChange("cameraPreference", e.target.value)
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="">Select</option>
                            <option value="camera">Camera</option>
                            <option value="phone">Phone</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            What type of content do you enjoy capturing? *
                          </label>
                          <input
                            type="text"
                            required
                            name="contentType"
                            value={formData.contentType}
                            onChange={(e) =>
                              handleChange("contentType", e.target.value)
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Upload or link to a video or photo album *
                            {/* <span className="text-gray-500">(optional)</span> */}
                          </label>
                          <div>
                            <a
                              href="https://docs.google.com/forms/d/e/1FAIpQLScBAsGl3lT2-LJKqV1PAOoTw3ClkBiIgu2kQxiLoY893Qytuw/viewform?usp=header"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button
                                type="button"
                                className="px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                              >
                                Click Here to Upload
                              </button>
                            </a>
                            <div className="flex mt-2">
                              <div className="flex-shrink-0">
                                <svg
                                  className="h-5 w-5 text-blue-600 dark:text-blue-300"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                  You'll be redirected to a separate form to upload your media.
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Are you comfortable editing short-form content like
                            reels? *
                          </label>
                          <select
                            required
                            name="comfortableWithReels"
                            value={
                              formData.comfortableWithReels ? "true" : "false"
                            }
                            onChange={(e) =>
                              handleChange(
                                "comfortableWithReels",
                                e.target.value === "true"
                              )
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                      </div>
            </div>
                  )}

                  {/* Weekly Hours */}
                  <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                      3. Availability
              </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Weekly Hours Available *
                        </label>
                        <input
                          type="text"
                          required
                          name="weeklyHours"
                          value={formData.weeklyHours}
                          onChange={(e) =>
                            handleChange("weeklyHours", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                          placeholder="e.g. 10-15 hours"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Comfortable with Meetings? *
                        </label>
                        <select
                          required
                          name="comfortableWithMeetings"
                          value={
                            formData.comfortableWithMeetings ? "true" : "false"
                          }
                          onChange={(e) =>
                            handleChange(
                              "comfortableWithMeetings",
                              e.target.value === "true"
                            )
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700"
                        >
                          <option value="">Select an option</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
            </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                      4. Terms and Conditions
              </h3>
                    <div className="space-y-4">
                      <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <input
                          type="checkbox"
                          required
                          name="privacyPolicy"
                          checked={formData.privacyPolicy}
                          onChange={(e) =>
                            handleChange("privacyPolicy", e.target.checked)
                          }
                          className="mt-1 h-5 w-5 text-primary dark:text-primary-light focus:ring-primary"
                        />
                        <label className="ml-3 text-gray-700 dark:text-gray-300">
                          I agree to the{" "}
                          <Link
                            to="/privacy-policy"
                            className="text-primary hover:underline font-medium"
                          >
                            Privacy Policy
                          </Link>{" "}
                          *
                        </label>
                      </div>
                      <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <input
                          type="checkbox"
                          required
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={(e) =>
                            handleChange("termsAccepted", e.target.checked)
                          }
                          className="mt-1 h-5 w-5 text-primary dark:text-primary-light focus:ring-primary"
                        />
                        <label className="ml-3 text-gray-700 dark:text-gray-300">
                          I accept the{" "}
                          <Link
                            to="/terms"
                            className="text-primary hover:underline font-medium"
                          >
                            Terms and Conditions
                          </Link>{" "}
                          *
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center mt-8">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="text-red-500 text-center mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
                      {error}
            </div>
                  )}
                </form>
              )}
          </div>
        </motion.div>
      </div>
      </section>
    </div>
  );
};

export default Join; 
