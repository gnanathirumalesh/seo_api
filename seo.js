/*const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/scrape', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Please provide a URL to scrape' });
    }

    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Extract data from the website
      const pageTitle = $('title').text();
      const titleLength = pageTitle.length;

      const metaDescription = $('meta[name="description"]').attr('content') || '';
      const descriptionLength = metaDescription.length;

      const headings = {
        h1: {
          is_present: $('h1').length > 0,
          total: $('h1').length,
          h1_list: $('h1').toArray().map((element) => $(element).text())
        },
        h2: {
          is_present: $('h2').length > 0,
          total: $('h2').length,
          h2_list: $('h2').toArray().map((element) => $(element).text())
        },
        h3: {
          is_present: $('h3').length > 0,
          total: $('h3').length,
          h3_list: $('h3').toArray().map((element) => $(element).text())
        },
        h4:{
          is_present: $('h4').length > 0,
          total: $('h4').length,
          h3_list: $('h4').toArray().map((element) => $(element).text())
        },
        h5:{
          is_present: $('h5').length > 0,
          total: $('h5').length,
          h3_list: $('h5').toArray().map((element) => $(element).text())
        },
        h6:{
          is_present: $('h6').length > 0,
          total: $('h6').length,
          h3_list: $('h6').toArray().map((element) => $(element).text())
        }
        // Add h4, h5, and h6 in a similar way
      };

      const images = {
        total: $('img').length,
        images_list: $('img').toArray().map((element) => ({
          image: $(element).attr('src'),
          alt_text: $(element).attr('alt') || 'No alt text'
        }))
      };

      // Extract keywords (You may need to implement a keyword extraction algorithm)
      const keywords = [];

      // Extract internal and external links
      const internalLinks = [];
      const externalLinks = [];

      $('a').each((index, element) => {
        const link = $(element).attr('href');
        if (link.startsWith('http://localhost') || link.startsWith(url)) {
          internalLinks.push(link);
        } else {
          externalLinks.push(link);
        }
      });

      // Extract canonical tag
      const canonicalTag = {
        is_canonical: $('link[rel="canonical"]').length > 0,
        link: $('link[rel="canonical"]').attr('href') || ''
      };

      // Extract Open Graph (OG) tags
      const ogTags = {
        is_present: $('meta[property^="og:"]').length > 0,
        og_title: $('meta[property="og:title"]').attr('content') || '',
        og_description: $('meta[property="og:description"]').attr('content') || '',
        og_url: $('meta[property="og:url"]').attr('content') || '',
        og_type: $('meta[property="og:type"]').attr('content') || ''
        // Add other OG tags as needed
      };

      // Check if Google Analytics script is present
      const isGoogleAnalyticsPresent = html.includes('google-analytics.com/analytics.js');

      // Check for robots.txt
      const isRobotTxtPresent = html.includes('robots.txt');

      // Check for schema markup
      const isSchemaMarkupPresent = html.includes('schema.org');

      // Page size, word count, and paragraph count
      const pageSize = html.length;
      const pageWords = html.split(/\s+/).length;
      const totalParagraphs = $('p').length;

      // Check for social media links
      const social_media_links = {
        is_present: $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').length > 0,
        list: $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').toArray().map((element) => $(element).attr('href'))
      };
      // Check if the website uses HTTPS
      const isHTTPS = url.startsWith('https://');

      res.json({
        title: {
          length: titleLength,
          data: pageTitle
        },
        description: {
          length: descriptionLength,
          data: metaDescription
        },
        headings,
        images,
        keywords, // You need to implement keyword extraction
        internal_links: {
          total: internalLinks.length,
          list: internalLinks
        },
        external_links: {
          total: externalLinks.length,
          list: externalLinks
        },
        canonical_tag: canonicalTag,
        og_tags: ogTags,
        is_google_analytics: isGoogleAnalyticsPresent,
        is_robot_txt: isRobotTxtPresent,
        schema_markup: {
          is_present: isSchemaMarkupPresent,
          schema_code: 'code' // You may need to extract schema code
        },
        page: {
          page_size: pageSize,
          page_words: pageWords,
          total_para: totalParagraphs
        },
       social_media_links,
        is_https: isHTTPS
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch the website' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping the website' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});*/
/*

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const app = express();

app.get('/scrape', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Please provide a URL to scrape' });
    }

    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Extract data from the website
      const pageTitle = $('title').text();
      const titleLength = pageTitle.length;

      const metaDescription = $('meta[name="description"]').attr('content') || '';
      const descriptionLength = metaDescription.length;

      const headings = {
        h1: {
          is_present: $('h1').length > 0,
          total: $('h1').length,
          h1_list: $('h1').toArray().map((element) => $(element).text())
        },
        h2: {
          is_present: $('h2').length > 0,
          total: $('h2').length,
          h2_list: $('h2').toArray().map((element) => $(element).text())
        },
        h3: {
          is_present: $('h3').length > 0,
          total: $('h3').length,
          h3_list: $('h3').toArray().map((element) => $(element).text())
        }
        // Add h4, h5, and h6 in a similar way
      };

      const images = {
        total: $('img').length,
        images_list: $('img').toArray().map((element) => ({
          image: $(element).attr('src'),
          alt_text: $(element).attr('alt') || 'No alt text'
        }))
      };

      // Extract keywords from the page content
      const pageContent = $('body').text();
      const pageWords = tokenizer.tokenize(pageContent);
      const keywords = extractKeywords(pageWords, 5); // Extract the top 5 keywords

      // Extract internal and external links
      const internalLinks = [];
      const externalLinks = [];

      $('a').each((index, element) => {
        const link = $(element).attr('href');
        if (link.startsWith('http://localhost') || link.startsWith(url)) {
          internalLinks.push(link);
        } else {
          externalLinks.push(link);
        }
      });

      // Extract canonical tag
      const canonicalTag = {
        is_canonical: $('link[rel="canonical"]').length > 0,
        link: $('link[rel="canonical"]').attr('href') || ''
      };

      // Extract Open Graph (OG) tags
      const ogTags = {
        is_present: $('meta[property^="og:"]').length > 0,
        og_title: $('meta[property="og:title"]').attr('content') || '',
        og_description: $('meta[property="og:description"]').attr('content') || '',
        og_url: $('meta[property="og:url"]').attr('content') || '',
        og_type: $('meta[property="og:type"]').attr('content') || ''
        // Add other OG tags as needed
      };

      // Check if Google Analytics script is present
      const isGoogleAnalyticsPresent = html.includes('google-analytics.com/analytics.js');

      // Check for robots.txt
      const isRobotTxtPresent = html.includes('robots.txt');

      // Check for schema markup
      const isSchemaMarkupPresent = html.includes('schema.org');

      // Page size and paragraph count
      const pageSize = html.length;
      const totalParagraphs = $('p').length;

      // Check for social media links
      const social_media_links = {
        is_present: $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').length > 0,
        list: $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').toArray().map((element) => $(element).attr('href'))
      };

      // Check if the website uses HTTPS
      const isHTTPS = url.startsWith('https://');

      res.json({
        title: {
          length: titleLength,
          data: pageTitle
        },
        description: {
          length: descriptionLength,
          data: metaDescription
        },
        headings,
        images,
        keywords,
        internal_links: {
          total: internalLinks.length,
          list: internalLinks
        },
        external_links: {
          total: externalLinks.length,
          list: externalLinks
        },
        canonical_tag: canonicalTag,
        og_tags: ogTags,
        is_google_analytics: isGoogleAnalyticsPresent,
        is_robot_txt: isRobotTxtPresent,
        schema_markup: {
          is_present: isSchemaMarkupPresent,
          schema_code: 'code' // You may need to extract schema code
        },
        page: {
          page_size: pageSize,
          page_words: pageWords.length,
          total_para: totalParagraphs
        },
        social_media_links,
        is_https: isHTTPS
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch the website' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping the website' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});

function extractKeywords(words, topN) {
  const wordFrequency = {};
  words.forEach((word) => {
    if (word.length > 2) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });

  const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);
  return sortedWords.slice(0, topN);
}


function extractSchemaCode($) {
  const schemaElement = $('script[type="application/ld+json"]');
  if (schemaElement.length > 0) {
    return schemaElement.html();
  }
  return '';
}
*/

  const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/scrape', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Please provide a valid URL to scrape' });
    }

    // Fetch the website
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // Extract data from the website
    const pageTitle = $('title').text();
    if (!pageTitle) {
      return res.status(404).json({ error: 'The requested page does not exist' });
    }

    const titleLength = pageTitle.length;

    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const descriptionLength = metaDescription.length;

    const headings = extractHeadings($);

    const images = {
      total: $('img').length,
      images_list: $('img').toArray().map((element) => ({
        image: $(element).attr('src'),
        alt_text: $(element).attr('alt') || 'No alt text'
      }))
    };

    const pageContent = $('body').text();
    const pageWords = pageContent.split(/\s+/);
    const keywords = extractKeywords(pageWords, 5);

    const { internalLinks, externalLinks } = extractLinks($, url);

    const canonicalTag = extractCanonicalTag($);

    const ogTags = extractOgTags($);

    const { isGoogleAnalyticsPresent, googleAnalyticsCode } = extractGoogleAnalytics(html);

    const isRobotTxtPresent = html.includes('robots.txt');

    const isSchemaMarkupPresent = $('script[type="application/ld+json"]').length > 0;

    const pageSize = html.length;
    const totalParagraphs = $('p').length;

    const socialMediaLinks = extractSocialMediaLinks($);

    const isHTTPS = url.startsWith('https://');

    const schemaMarkup = {
      is_present: isSchemaMarkupPresent,
      schema_code: extractSchemaCode($)
    };

    res.json({
      title: {
        length: titleLength,
        data: pageTitle
      },
      description: {
        length: descriptionLength,
        data: metaDescription
      },
      headings,
      images,
      keywords,
      internal_links: internalLinks,
      external_links: externalLinks,
      canonical_tag: canonicalTag,
      og_tags: ogTags,
      is_google_analytics: isGoogleAnalyticsPresent,
      google_analytics_code: googleAnalyticsCode,
      is_robot_txt: isRobotTxtPresent,
      schema_markup: schemaMarkup,
      page: {
        page_size: pageSize,
        page_words: pageWords.length,
        total_para: totalParagraphs
      },
      social_media_links: socialMediaLinks,
      is_https: isHTTPS
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping the website' });
  }
});

function isValidUrl(url) {
  try {
    // Add "https://" if missing
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    const urlObject = new URL(formattedUrl);

    // Check if the hostname is present
    const isValidDomain = !!urlObject.hostname;

    // Check if the path is valid, allowing for no path, or a path with optional filename
    const hasValidPath = /^\/?[a-zA-Z0-9-]+\/?(\.html)?$/.test(urlObject.pathname);

    if (isValidDomain && hasValidPath) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}


function extractHeadings($) {
  const headings = {};
  for (let i = 1; i <= 6; i++) {
    const headingSelector = `h${i}`;
    headings[headingSelector] = {
      is_present: $(headingSelector).length > 0,
      total: $(headingSelector).length,
      h_list: $(headingSelector).toArray().map((element) => $(element).text())
    };
  }
  return headings;
}

function extractKeywords(words, topN) {
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

function extractOgTags($) {
  const ogTags = {
    is_present: $('meta[property^="og:"]').length > 0
  };

  $('meta[property^="og:"]').each((index, element) => {
    const property = $(element).attr('property');
    const content = $(element).attr('content');
    ogTags[property.substring(3)] = content || '';
  });

  return ogTags;
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

function extractSocialMediaLinks($) {
  return {
    is_present: $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').length > 0,
    list: $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').toArray().map((element) => $(element).attr('href'))
  };
}

function extractSchemaCode($) {
  const schemaElement = $('script[type="application/ld+json"]');
  if (schemaElement.length > 0) {
    return JSON.parse(schemaElement.html());
  }
  return null;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});


