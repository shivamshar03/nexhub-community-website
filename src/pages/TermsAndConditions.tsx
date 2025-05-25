import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="bg-primary/10 dark:bg-primary-light/10 p-8 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl font-bold text-center text-primary dark:text-primary-light">
                Terms & Conditions
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div className="p-8">
              <div className="prose dark:prose-invert max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">1. Acceptance of Terms</h2>
                  <p className="mt-4">
                    By submitting your application to join NexHub, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not submit your application.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">2. Application Process</h2>
                  <p className="mt-4">
                    The application process involves:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Submission of personal and professional information</li>
                    <li>Evaluation of your skills and experience</li>
                    <li>Possible interviews or assessments</li>
                    <li>Final selection based on merit and fit</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">3. Eligibility</h2>
                  <p className="mt-4">
                    To be eligible for consideration:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>You must be currently enrolled in a recognized educational institution</li>
                    <li>You must provide accurate and complete information</li>
                    <li>You must meet the specific requirements of the division you're applying to</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">4. Code of Conduct</h2>
                  <p className="mt-4">
                    As a member of NexHub, you agree to:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Maintain professional behavior at all times</li>
                    <li>Respect fellow team members and their work</li>
                    <li>Adhere to project deadlines and commitments</li>
                    <li>Protect confidential information</li>
                    <li>Follow all community guidelines</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">5. Intellectual Property</h2>
                  <p className="mt-4">
                    Any work created as part of NexHub activities:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Remains the property of NexHub</li>
                    <li>Cannot be used for personal gain without permission</li>
                    <li>Must be properly credited when shared</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">6. Termination</h2>
                  <p className="mt-4">
                    NexHub reserves the right to:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Reject any application without explanation</li>
                    <li>Terminate membership for violation of terms</li>
                    <li>Modify or discontinue any program or activity</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">7. Changes to Terms</h2>
                  <p className="mt-4">
                    We may update these Terms and Conditions at any time. Continued participation in NexHub after such changes constitutes your acceptance of the new terms.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">8. Contact Information</h2>
                  <p className="mt-4">
                    For any questions regarding these Terms and Conditions, please contact:
                  </p>
                  <p className="mt-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg inline-block">
                    Email: <a href="mailto:terms@nexhub.com" className="text-primary hover:underline">terms@nexhub.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} NexHub. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 