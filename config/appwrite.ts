import { Client, Databases, Query } from 'appwrite';

console.log('Initializing Appwrite client...');

// Initialize the Appwrite client
const client = new Client();

// Configure the client
console.log('Configuring Appwrite client with endpoint and project ID');
try {
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('68486d9a000bf96d831b');
  
  console.log('Appwrite client configured successfully');
  
  // Type assertion to access the headers property
  const clientWithHeaders = client as any;
  if (clientWithHeaders.headers) {
    console.log('Setting Appwrite API key...');
    clientWithHeaders.headers['X-Appwrite-Key'] = 'standard_dd14a896f60af21e82a860ea8f92586ed3a1bdeb667f1b02035750394be2515c7b6607bfe4d9b3f85a96821ca605051aa6d5c2a46f586cda05e460a7de02bbff37cfc87098f98199eb64f22e3dc3af56b927356c3b7652d86746c818d2bda4e7bc4e3b2f7d98cfc3debb69177e457c6a2eec36a41c2e26cc40b7bcf47bc73478';
    console.log('API key set successfully');
  } else {
    console.error('Failed to set API key: headers property not found');
  }
} catch (error) {
  console.error('Error configuring Appwrite client:', error);
  throw error; // Re-throw to prevent further execution with invalid client
}

const databases = new Databases(client);

// Database and Collection IDs
export const DATABASE_ID = '68486dab00232503e958';
export const ARTICLES_COLLECTION_ID = '68486dc700012a2a6fbc';

// Test the connection immediately when this file loads
const testConnection = async () => {
  console.log('🚀 Testing Appwrite connection...');
  console.log('Database ID:', DATABASE_ID);
  console.log('Collection ID:', ARTICLES_COLLECTION_ID);
  
  try {
    console.log('🔍 Attempting to list documents...');
    const response = await databases.listDocuments(DATABASE_ID, ARTICLES_COLLECTION_ID, [
      Query.limit(1)
    ]);
    
    console.log('✅ Appwrite connection successful!');
    console.log('📊 Total documents:', response.total);
    console.log('📝 First document (if any):', response.documents[0] || 'No documents found');
    return true;
    
  } catch (error: any) {
    console.error('❌ Appwrite connection failed!');
    console.error('Error code:', error.code || 'N/A');
    console.error('Error message:', error.message || 'Unknown error');
    console.error('Full error:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    return false;
  }
};

// Run the test with a small delay to ensure client is initialized
setTimeout(() => {
  console.log('\n--- Starting Appwrite Connection Test ---');
  testConnection().then(success => {
    console.log('\n--- Test Completed ---');
    console.log('Result:', success ? '✅ SUCCESS' : '❌ FAILED');
    console.log('\nCheck the logs above for details.\n');
  });
}, 1000);

export { databases };
