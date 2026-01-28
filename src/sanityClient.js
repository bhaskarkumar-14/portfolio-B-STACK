import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// --------------------------------------------------------
// TODO: Replace with your actual Sanity Project ID
// You can create a free project at https://www.sanity.io
// --------------------------------------------------------
export const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'your_project_id_here';
export const DATASET = 'production';

export const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
