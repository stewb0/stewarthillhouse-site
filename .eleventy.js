module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  
  // Watch for changes
  eleventyConfig.addWatchTarget("src/data/");
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "data"
    }
  };
};
