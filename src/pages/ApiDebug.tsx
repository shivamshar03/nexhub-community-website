import { useState, useEffect } from 'react';
import api from '../utils/api';

const ApiDebug = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    const fetchDebugInfo = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/debug');
        setDebugInfo(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching debug info:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDebugInfo();
  }, []);

  const runTest = async (endpoint: string) => {
    try {
      setTestResults(prev => ({ 
        ...prev, 
        [endpoint]: { loading: true, data: null, error: null } 
      }));
      
      const response = await api.get(`/api/test-${endpoint}`);
      
      setTestResults(prev => ({ 
        ...prev, 
        [endpoint]: { loading: false, data: response.data, error: null } 
      }));
    } catch (err) {
      console.error(`Error testing ${endpoint}:`, err);
      setTestResults(prev => ({ 
        ...prev, 
        [endpoint]: { 
          loading: false, 
          data: null, 
          error: err instanceof Error ? err.message : 'Unknown error'
        } 
      }));
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">API Diagnostic Tool</h1>
        
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">API Connection Status</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-700 dark:text-red-300">
              <p className="font-semibold">Connection Error:</p>
              <p>{error}</p>
              <p className="mt-2 text-sm">
                This likely means the API server is not reachable. Check your server deployment.
              </p>
            </div>
          ) : (
            <div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-green-700 dark:text-green-300 mb-4">
                <p>✅ API server is connected</p>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Server Info:</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-auto text-sm">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">API Endpoint Tests</h2>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => runTest('recruitment')}
              disabled={loading || testResults.recruitment?.loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              {testResults.recruitment?.loading ? 'Testing...' : 'Test Recruitment API'}
            </button>
            
            <button
              onClick={() => runTest('registration')}
              disabled={loading || testResults.registration?.loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              {testResults.registration?.loading ? 'Testing...' : 'Test Registration API'}
            </button>
          </div>
          
          {Object.entries(testResults).map(([key, value]: [string, any]) => (
            <div key={key} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 capitalize text-gray-800 dark:text-white">
                {key} Test Result:
              </h3>
              
              {value.loading ? (
                <div className="flex items-center py-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
                  <span>Testing...</span>
                </div>
              ) : value.error ? (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-700 dark:text-red-300">
                  <p className="font-semibold">Error:</p>
                  <p>{value.error}</p>
                </div>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-green-700 dark:text-green-300">
                  <p className="font-semibold">Success:</p>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-auto text-sm mt-2">
                    {JSON.stringify(value.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md text-yellow-700 dark:text-yellow-300">
          <p className="font-semibold">⚠️ How to use this diagnostic tool:</p>
          <ol className="list-decimal ml-6 mt-2 space-y-2">
            <li>Check if the API server is connected successfully</li>
            <li>Run the test endpoints to verify specific API functionality</li>
            <li>If tests fail, check server logs for more detailed error information</li>
            <li>Verify network connectivity and CORS configuration</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ApiDebug; 