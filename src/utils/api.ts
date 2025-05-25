/// <reference types="vite/client" />
import axios from 'axios';

// Determine the base URL for API requests
const getBaseUrl = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // In production, use the same origin as the current page
    if (import.meta.env.PROD) {
      console.log('Production API URL:', window.location.origin);
      return window.location.origin;
    }
    // In development, point to the Express server running on port 5000
    console.log('Development API URL: http://localhost:5000');
    return 'http://localhost:5000';
  }
  return '';
};

// Get the base URL once to avoid recalculation
const baseURL = getBaseUrl();
console.log('API baseURL configured as:', baseURL);

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent hanging requests
  timeout: 15000,
});

// Log API requests for debugging
api.interceptors.request.use(request => {
  console.log('API Request:', request.method, request.url);
  if (request.baseURL && request.url) {
    console.log('Request full URL:', request.baseURL + request.url);
  }
  console.log('Request headers:', request.headers);
  if (request.data) {
    console.log('Request payload:', JSON.stringify(request.data).substring(0, 500));
  }
  return request;
});

// Log API responses for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response Success:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API Error:', error.message);
    
    // Network errors (no response from server)
    if (!error.response) {
      console.error('Network Error - No response received from server');
      if (error.config?.baseURL && error.config?.url) {
        console.error('Request was sent to:', error.config.baseURL + error.config.url);
      }
      console.error('Check if the server is running and accessible');
      console.error('Also verify CORS settings on the server');
      
      // Create a more descriptive error
      const enhancedError = new Error(
        `Network Error: Could not connect to the API server at ${error.config?.baseURL}. ` +
        'Please ensure the server is running and accessible. ' +
        'This could be due to server downtime, network connectivity issues, or CORS configuration.'
      );
      
      return Promise.reject(enhancedError);
    }
    
    // Server responded with error status
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      console.error('Error headers:', error.response.headers);
      
      const statusCode = error.response.status;
      let errorMessage = `Server Error (${statusCode}): `;
      
      // Add specific messages based on status code
      if (statusCode === 404) {
        errorMessage += 'The requested endpoint was not found on the server. Check your API path.';
      } else if (statusCode === 401 || statusCode === 403) {
        errorMessage += 'Authentication or permission error. You may not have access to this resource.';
      } else if (statusCode === 500) {
        errorMessage += 'The server encountered an internal error. Please check server logs.';
      } else if (statusCode === 422 || statusCode === 400) {
        errorMessage += 'Invalid data submitted. Please check form fields and try again.';
      } else {
        errorMessage += error.response.data?.message || 'Unknown server error';
      }
      
      const enhancedError = new Error(errorMessage);
      return Promise.reject(enhancedError);
    }
    
    return Promise.reject(error);
  }
);

// API functions for event registration
export const submitEventRegistration = async (eventData: any) => {
  try {
    console.log('Submitting event registration:', eventData);
    const response = await api.post('/api/send-registration-email', eventData);
    return response.data;
  } catch (error) {
    console.error('Event registration API error:', error);
    throw error;
  }
};

interface RecruitmentFormData {
  // Basic Information
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  branch: string;
  year: string;
  
  // Social Profiles
  linkedin: string;
  portfolio: string;
  instagram: string;
  otherLink?: string;
  
  // Division Selection
  division: string;
  
  // Tech & Development specific
  programmingLanguages?: string;
  techProject?: string;
  familiarWithFrameworks?: boolean;
  frameworksList?: string;
  techContributions?: string;
  
  // Operations & Management specific
  hasEventExperience?: boolean;
  eventExperience?: string;
  taskManagement?: string;
  eventSuggestion?: string;
  
  // Design & Creatives specific
  designTools?: string;
  designWorkInterest?: string;
  
  // Photography & Cinematics specific
  cameraPreference?: string;
  contentType?: string;
  comfortableWithReels?: boolean;
  
  // Final Section
  weeklyHours: string;
  comfortableWithMeetings: boolean;
  privacyPolicy: boolean;
  termsAccepted: boolean;
}

export const submitRecruitmentApplication = async (formData: RecruitmentFormData) => {
  try {
    console.log('Original form data:', JSON.stringify(formData, null, 2));
    
    // Map division values to proper role names
    const divisionToRoleMap: Record<string, string> = {
      'tech': 'Technical',
      'operations': 'Management',
      'design': 'designing',
      'photography': 'photo and videography'
    };
    
    // Format data according to the server's expectations
    const serverData = {
      // Basic information - always required
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      collegeName: formData.collegeName.trim(),
      branch: formData.branch.trim(),
      year: formData.year.trim(),
      
      // Social profiles - optional
      linkedin: formData.linkedin?.trim() || '',
      portfolio: formData.portfolio?.trim() || '',
      instagram: formData.instagram?.trim() || '',
      otherLink: formData.otherLink?.trim() || '',
      
      // Division selection mapped to role with proper naming
      division: formData.division.trim(),
      role: divisionToRoleMap[formData.division.trim()] || formData.division.trim(),
      
      // Final section - required
      weeklyHours: formData.weeklyHours.trim(),
      comfortableWithMeetings: formData.comfortableWithMeetings === true,
      privacyPolicy: formData.privacyPolicy === true,
      termsAccepted: formData.termsAccepted === true,
    };
    
    // Add division-specific fields based on selection
    if (formData.division === 'tech') {
      Object.assign(serverData, {
        programmingLanguages: formData.programmingLanguages?.trim() || 'Not specified',
        techProject: formData.techProject?.trim() || '',
        familiarWithFrameworks: formData.familiarWithFrameworks === true,
        frameworksList: formData.frameworksList?.trim() || '',
        techContributions: formData.techContributions?.trim() || 'Not specified',
      });
    } else if (formData.division === 'operations') {
      Object.assign(serverData, {
        hasEventExperience: formData.hasEventExperience === true,
        eventExperience: formData.eventExperience?.trim() || '',
        taskManagement: formData.taskManagement?.trim() || 'Not specified',
        eventSuggestion: formData.eventSuggestion?.trim() || 'Not specified',
      });
    } else if (formData.division === 'design') {
      Object.assign(serverData, {
        designTools: formData.designTools?.trim() || 'Not specified',
        designWorkInterest: formData.designWorkInterest?.trim() || 'Not specified',
      });
    } else if (formData.division === 'photography') {
      Object.assign(serverData, {
        cameraPreference: formData.cameraPreference?.trim() || 'Not specified',
        contentType: formData.contentType?.trim() || 'Not specified',
        comfortableWithReels: formData.comfortableWithReels === true,
      });
    }
    
    console.log('Prepared data for submission:', JSON.stringify(serverData, null, 2));
    
    const response = await api.post('/api/submit-recruitment', serverData);
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to submit application');
    }
    throw error;
  }
};

// Helper function to generate a message with all form details
function generateMessage(formData: RecruitmentFormData): string {
  let message = `Weekly Availability: ${formData.weeklyHours} hours\n`;
  message += `Comfortable with meetings: ${formData.comfortableWithMeetings ? 'Yes' : 'No'}\n\n`;
  
  // Add social links if provided
  if (formData.linkedin) message += `LinkedIn: ${formData.linkedin}\n`;
  if (formData.instagram) message += `Instagram: ${formData.instagram}\n`;
  if (formData.otherLink) message += `Other Link: ${formData.otherLink}\n\n`;
  
  // Add division-specific information
  if (formData.division === 'tech') {
    message += `Programming Languages: ${formData.programmingLanguages || 'Not specified'}\n`;
    message += `Tech Project: ${formData.techProject || 'Not provided'}\n`;
    message += `Familiar with Frameworks: ${formData.familiarWithFrameworks ? 'Yes' : 'No'}\n`;
    if (formData.familiarWithFrameworks) {
      message += `Frameworks List: ${formData.frameworksList || 'Not specified'}\n`;
    }
    message += `Tech Contributions: ${formData.techContributions || 'Not specified'}\n`;
  } else if (formData.division === 'operations') {
    message += `Event Experience: ${formData.hasEventExperience ? 'Yes' : 'No'}\n`;
    if (formData.hasEventExperience) {
      message += `Event Experience Details: ${formData.eventExperience || 'Not provided'}\n`;
    }
    message += `Task Management: ${formData.taskManagement || 'Not specified'}\n`;
    message += `Event Suggestion: ${formData.eventSuggestion || 'Not specified'}\n`;
  } else if (formData.division === 'design') {
    message += `Design Tools: ${formData.designTools || 'Not specified'}\n`;
    message += `Design Work Interest: ${formData.designWorkInterest || 'Not specified'}\n`;
  } else if (formData.division === 'photography') {
    message += `Camera Preference: ${formData.cameraPreference || 'Not specified'}\n`;
    message += `Content Type: ${formData.contentType || 'Not specified'}\n`;
    message += `Comfortable with Reels: ${formData.comfortableWithReels ? 'Yes' : 'No'}\n`;
  }
  
  return message;
}

export default api;