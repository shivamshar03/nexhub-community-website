import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
                Privacy Policy
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div className="p-8">
              <div className="prose dark:prose-invert max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">1. Introduction</h2>
                  <p className="mt-4">
                    At NexHub, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our services.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">2. Information We Collect</h2>
                  <p className="mt-4">We collect the following types of information:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Personal identification information (name, email, phone number)</li>
                    <li>Educational information (college name, branch, year of study)</li>
                    <li>Professional information (skills, experience, portfolio links)</li>
                    <li>Social media profiles and other online presence</li>
                    <li>Files you upload (resumes, portfolios, etc.)</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">3. How We Use Your Information</h2>
                  <p className="mt-4">We use your information to:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Process your application for joining NexHub</li>
                    <li>Communicate with you about your application status</li>
                    <li>Improve our services and recruitment process</li>
                    <li>Send you updates about NexHub events and opportunities</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">4. Data Security</h2>
                  <p className="mt-4">
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">5. Data Sharing</h2>
                  <p className="mt-4">
                    We do not sell or rent your personal information to third parties. We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>NexHub team members involved in the recruitment process</li>
                    <li>Service providers who assist in our operations</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">6. Your Rights</h2>
                  <p className="mt-4">You have the right to:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of communications</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">7. Changes to This Policy</h2>
                  <p className="mt-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">8. Contact Us</h2>
                  <p className="mt-4">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="mt-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg inline-block">
                    Email: <a href="mailto:privacy@nexhub.com" className="text-primary hover:underline">privacy@nexhub.com</a>
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

export default PrivacyPolicy; 