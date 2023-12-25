const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Please provide a URL to scrape' });
    }

    // Fetch the website
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract data from the website
    const pageTitle = $('title').text();
    const titleLength = pageTitle.length;

    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const descriptionLength = metaDescription.length;

    const headings = extractHeadings($);

    const images = extractImages($);

    // Extract keywords from the page content
    const pageTextContent = text();
    const keywords = extractKeywords(pageContent, 5); // Extract the top 5 keywords

    // Extract internal and external links
    const { internalLinks, externalLinks } = extractLinks($, url);

    // Extract canonical tag
    const canonicalTag = extractCanonicalTag($);

    // Extract Open Graph (OG) tags
    const ogTags = extractOGTags($);

    // Check for Google Analytics script
    const { isGoogleAnalyticsPresent, googleAnalyticsCode } = extractGoogleAnalytics(html);

    // Check for robots.txt
    const isRobotTxtPresent = html.includes('robots.txt');

    // Check for schema markup
    const schemaMarkup = extractSchemaMarkup($);

    // Page size and paragraph count
    const { pageSize, totalParagraphs } = extractPageInfo(html, $);

    // Check for social media links
    const socialMediaLinks = extractSocialMediaLinks($);

    // Check if the website uses HTTPS
    const isHTTPS = url.startsWith('https://');

    // Extract schema markup code
    const commonWords = analyzeCommonWords(pageContent);

    const security = await performSecurityChecks(url);

    res.json({
      title: { length: titleLength, data: pageTitle },
      description: { length: descriptionLength, data: metaDescription },
      headings,
      images,
      keywords,
      internal_links: { total: internalLinks.length, list: internalLinks },
      external_links: { total: externalLinks.length, list: externalLinks },
      canonical_tag: canonicalTag,
      og_tags: ogTags,
      is_google_analytics: isGoogleAnalyticsPresent,
      google_analytics_code: googleAnalyticsCode,
      is_robot_txt: isRobotTxtPresent,
      schema_markup: schemaMarkup,
      page: { page_size: pageSize, page_words: keywords.length, total_para: totalParagraphs },
      social_media_links: socialMediaLinks,
      is_https: isHTTPS,
      common_words: commonWords,
      security: security,
      pageContent: { length: pageContent.length, data: pageContent }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping and analyzing the website' });
  }
});

function extractHeadings($) {
  const headings = {};
  for (let i = 1; i <= 6; i++) {
    const headingSelector = `h${i}`;
    headings[headingSelector] = {
      is_present: $(headingSelector).length > 0,
      total: $(headingSelector).length,
      list: $(headingSelector).toArray().map((element) => $(element).text())
    };
  }
  return headings;
}

function extractImages($) {
  return {
    total: $('img').length,
    images_list: $('img').toArray().map((element) => ({
      image: $(element).attr('src'),
      alt_text: $(element).attr('alt') || 'No alt text'
    }))
  };
}

function extractKeywords(textContent, topN) {
  const words = textContent.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFrequency = {};
  words.forEach((word) => {
    if (word.length > 2) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });
  const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);
  return sortedWords.slice(0, topN);
}

function extractLinks($, baseUrl) {
  const internalLinks = [];
  const externalLinks = [];
  $('a').each((index, element) => {
    try {
      const link = new URL($(element).attr('href'), baseUrl);
      if (link.origin === new URL(baseUrl).origin) {
        internalLinks.push(link.href);
      } else {
        externalLinks.push(link.href);
      }
    } catch (error) {
      // Handle URL parsing errors
    }
  });
  return { internalLinks, externalLinks };
}

function extractCanonicalTag($) {
  return {
    is_canonical: $('link[rel="canonical"]').length > 0,
    link: $('link[rel="canonical"]').attr('href') || ''
  };
}

function extractOGTags($) {
  return {
    is_present: $('meta[property^="og:"]').length > 0,
    og_title: $('meta[property="og:title"]').attr('content') || '',
    og_description: $('meta[property="og:description"]').attr('content') || '',
    og_url: $('meta[property="og:url"]').attr('content') || '',
    og_type: $('meta[property="og:type"]').attr('content') || ''
  };
}

function extractGoogleAnalytics(html) {
  const isGoogleAnalyticsPresent = html.includes("window.dataLayer = window.dataLayer || []") && html.includes("gtag('config',");
  let googleAnalyticsCode = '';
  if (isGoogleAnalyticsPresent) {
    const startIndex = html.indexOf("window.dataLayer = window.dataLayer || []");
    const endIndex = html.indexOf("gtag('config',", startIndex);
    if (startIndex !== -1 && endIndex !== -1) {
      googleAnalyticsCode = html.substring(startIndex, endIndex);
    }
  }
  return { isGoogleAnalyticsPresent, googleAnalyticsCode };
}

function extractSchemaMarkup($) {
  const schemaElement = $('script[type="application/ld+json"]');
  if (schemaElement.length > 0) {
    return {
      is_present: true,
      schema_code: JSON.parse(schemaElement.html())
    };
  }
  return { is_present: false, schema_code: null };
}

function extractPageInfo(html, $) {
  return {
    pageSize: html.length,
    totalParagraphs: $('p').length
  };
}

function extractSocialMediaLinks($) {
  return {
    is_present: $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').length > 0,
    list: $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').toArray().map((element) => $(element).attr('href'))
  };
}

async function performSecurityChecks(url) {
  try {
    const response = await axios.get(url);

    const securityChecks = [
      { name: 'Uses HTTPS', result: url.startsWith('https://') },
      { name: 'Valid SSL Certificate', result: response.request.connection.encrypted },
      { name: 'HTTP Strict Transport Security (HSTS)', result: response.headers['strict-transport-security'] !== undefined },
      { name: 'Content Security Policy (CSP) Header', result: response.headers['content-security-policy'] !== undefined },
      { name: 'X-Content-Type-Options Header', result: response.headers['x-content-type-options'] === 'nosniff' },
      { name: 'X-Frame-Options Header', result: response.headers['x-frame-options'] !== undefined },
      { name: 'Cross-Origin Resource Sharing (CORS) Headers', result: response.headers['access-control-allow-origin'] !== undefined },
      { name: 'Secure Cookies', result: Array.isArray(response.headers['set-cookie']) && response.headers['set-cookie'].some(cookie => cookie.includes('Secure')) },
      { name: 'HTTP Public Key Pinning (HPKP)', result: response.headers['public-key-pins'] !== undefined },
      { name: 'Server Software Information', result: response.headers.server !== undefined },
    ];

    return securityChecks;
  } catch (error) {
    console.error('Error fetching URL:', error.message);
    throw new Error('Unable to fetch URL');
  }
}

function analyzeCommonWords(textContent) {
  const tokens = textContent.toLowerCase().match(/\b\w+\b/g) || [];
  const words = tokens.reduce((acc, token, index, array) => {
    if (index < array.length - 1) {
      const twoWordPhrase = `${token} ${array[index + 1]}`;
      acc[twoWordPhrase] = (acc[twoWordPhrase] || 0) + 1;
    }
    acc[token] = (acc[token] || 0) + 1;
    return acc;
  }, {});

  const commonWords = Object.keys(words).filter((word) => words[word] > 3);
  const sortedCommonWords = commonWords.sort((a, b) => words[b] - words[a]);

  return {
    common_words_total: sortedCommonWords.length,
    list: sortedCommonWords.slice(0, 30),
  };
}

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
