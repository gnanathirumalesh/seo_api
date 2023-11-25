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

    const seoScore = calculateSeoScore(titleLength, descriptionLength, headings, images, internalLinks, externalLinks, canonicalTag, ogTags, isGoogleAnalyticsPresent, isSchemaMarkupPresent, isHTTPS);


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
        h4_list: $('h4').toArray().map((element) => $(element).text())
      },
      h5:{
        is_present: $('h5').length > 0,
        total: $('h5').length,
        h5_list: $('h5').toArray().map((element) => $(element).text())
      },
      h6:{
        is_present: $('h6').length > 0,
        total: $('h6').length,
        h6_list: $('h6').toArray().map((element) => $(element).text())
      }
      
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
    const pageWords = pageContent.split(/\s+/);
    const keywords = extractKeywords(pageWords, 5); // Extract the top 5 keywords

    // Extract internal and external links
    const internalLinks = [];
    const externalLinks = [];

    $('a').each((index, element) => {
      try {
        const link = new URL($(element).attr('href'), url);
        if (link.origin === new URL(url).origin) {
          internalLinks.push(link.href);
        } else {
          externalLinks.push(link.href);
        }
      } catch (error) {
        // Handle URL parsing errors
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

    // Check for Google Analytics script
    const isGoogleAnalyticsPresent = html.includes("window.dataLayer = window.dataLayer || []") && html.includes("gtag('config',");
    let googleAnalyticsCode = '';

    if (isGoogleAnalyticsPresent) {
      const startIndex = html.indexOf("window.dataLayer = window.dataLayer || []");
      const endIndex = html.indexOf("gtag('config',", startIndex);

      if (startIndex !== -1 && endIndex !== -1) {
        googleAnalyticsCode = html.substring(startIndex, endIndex);
      }
    }

    // Check for robots.txt
    const isRobotTxtPresent = html.includes('robots.txt');

    // Check for schema markup
    const isSchemaMarkupPresent = $('script[type="application/ld+json"]').length > 0;

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

    // Extract schema markup code
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
      google_analytics_code: googleAnalyticsCode,
      is_robot_txt: isRobotTxtPresent,
      schema_markup: schemaMarkup,
      page: {
        page_size: pageSize,
        page_words: pageWords.length,
        total_para: totalParagraphs
      },
      social_media_links,
      is_https: isHTTPS,
      seo_score: seoScore
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping the website' });
  }
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
    return JSON.parse(schemaElement.html());
  }
  return null;
}

function calculateSeoScore(titleLength, descriptionLength, headings, images, internalLinks, externalLinks, canonicalTag, ogTags, isGoogleAnalyticsPresent, isSchemaMarkupPresent, isHTTPS) {
  // Assign weights to each factor based on importance
  const weights = {
    title: 5,
    description: 3,
    headings: 5,
    images: 3,
    internalLinks: 3,
    externalLinks: 3,
    canonicalTag: 2,
    ogTags: 4,
    isGoogleAnalyticsPresent: 2,
    isSchemaMarkupPresent: 4,
    isHTTPS: 2
    // Add more factors and weights as needed
  };

  // Calculate individual scores for each factor
  const titleScore = titleLength > 0 ? weights.title : 0;
  const descriptionScore = descriptionLength > 0 ? weights.description : 0;
  const headingsScore = calculateHeadingsScore(headings) * weights.headings;
  const imagesScore = images.total > 0 ? weights.images : 0;
  const internalLinksScore = internalLinks.length > 0 ? weights.internalLinks : 0;
  const externalLinksScore = externalLinks.length > 0 ? weights.externalLinks : 0;
  const canonicalTagScore = canonicalTag.is_canonical ? weights.canonicalTag : 0;
  const ogTagsScore = ogTags.is_present ? weights.ogTags : 0;
  const isGoogleAnalyticsScore = isGoogleAnalyticsPresent ? weights.isGoogleAnalyticsPresent : 0;
  const isSchemaMarkupScore = isSchemaMarkupPresent ? weights.isSchemaMarkupPresent : 0;
  const isHTTPSScore = isHTTPS ? weights.isHTTPS : 0;

  // Calculate total SEO score
  const totalScore = titleScore + descriptionScore + headingsScore + imagesScore + internalLinksScore + externalLinksScore +
    canonicalTagScore + ogTagsScore + isGoogleAnalyticsScore + isSchemaMarkupScore + isHTTPSScore;

  return totalScore;
}

// Function to calculate the score for headings
function calculateHeadingsScore(headings) {
  let score = 0;

  for (const level in headings) {
    if (headings[level].is_present) {
      score += headings[level].total;
    }
  }

  return score;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});

