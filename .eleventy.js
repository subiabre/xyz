const { DateTime } = require("luxon");
const pluginSEO = require("eleventy-plugin-seo");
const pluginSafeExternalLinks = require("@hirusi/eleventy-plugin-safe-external-links");
const slugify = require("slugify");

/**
* This is the JavaScript code that determines the config for your Eleventy site
*
* You can add lost of customization here to define how the site builds your content
* Try extending it to suit your needs!
*/

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "css",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2"
  ]);
  eleventyConfig.addPassthroughCopy("public");

  const seo = require("./src/seo.json");
  eleventyConfig.addPlugin(pluginSEO, seo);

  eleventyConfig.addPlugin(pluginSafeExternalLinks, {
    pattern: "https{0,1}://",
    noopener: true,
    noreferrer: false,
    files: [
      ".html",
    ],
  });

  // Filters let you modify the content https://www.11ty.dev/docs/filters/
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("htmlDateSlug", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy/LL/dd");
  });

  eleventyConfig.addFilter("slugify", string => {
    return slugify(string, {
      lower: true,
      strict: true
    });
  });

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });

  /* Build the collection of posts to list in the site
     - Read the Next Steps post to learn how to extend this
  */
  eleventyConfig.addCollection("posts", function(collection) {
    
    /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
       - https://www.11ty.dev/docs/collections/
    */
    
    // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
    // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
    const coll = collection
      .getFilteredByTag("posts")
      .sort((a, b) => b.data.date - a.data.date);

    // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426 
    // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i + 1];
      const nextPost = coll[i - 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return coll;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "build"
    }
  };
};
