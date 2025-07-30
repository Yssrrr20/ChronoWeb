// WEB/test-fetch-guardian/testFetch.js
require('dotenv').config(); // Memuat variabel dari .env

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;
const BASE_URL = 'https://content.guardianapis.com/search';

async function testGuardianFetch() {
    if (!GUARDIAN_API_KEY) {
        console.error('ERROR: Guardian API Key is not set in .env file!');
        return;
    }

    // URL sederhana tanpa query 'q' default, hanya order-by dan page-size
    const url = `${BASE_URL}?api-key=${GUARDIAN_API_KEY}&order-by=newest&page-size=3&show-fields=trailText`;

    console.log('Attempting to fetch from URL:', url);

    try {
        const response = await fetch(url);
        
        // Log respons mentah sebelum parsing JSON
        const rawResponseText = await response.clone().text();
        console.log('Raw Response Status:', response.status);
        console.log('Raw Response Body (text):', rawResponseText);

        const data = await response.json(); // Coba parsing JSON

        if (!response.ok || data.response.status !== 'ok') {
            console.error('ERROR from Guardian API (non-OK response):', data.response.message || JSON.stringify(data.response) || 'Unknown API error');
            return;
        }

        if (data.response.results && data.response.results.length > 0) {
            console.log('SUCCESS! Fetched articles:', data.response.results.length);
            data.response.results.forEach((article, index) => {
                console.log(`--- Article ${index + 1} ---`);
                console.log('Title:', article.webTitle);
                console.log('Section:', article.sectionName);
                console.log('URL:', article.webUrl);
                console.log('Thumbnail:', article.fields?.thumbnail);
            });
        } else {
            console.log('SUCCESS! No articles found with current query.');
        }

    } catch (error) {
        console.error('ERROR during fetch operation:', error);
        console.error('Full Error Object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
}

testGuardianFetch();