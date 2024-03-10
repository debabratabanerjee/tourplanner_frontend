import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID, // Use environment variable
  dataset: process.env.REACT_APP_SANITY_DATASET, // Use environment variable
  apiVersion: '2024-03-10', // use a current ISO date
  useCdn: true,
});