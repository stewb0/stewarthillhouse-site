module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  
  // Watch for changes
  eleventyConfig.addWatchTarget("src/data/");
  eleventyConfig.addWatchTarget("src/blog/posts/");
  
  // Add limit filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  // Create blog collection from markdown files
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md")
      .filter(item => {
        // Exclude template files and files starting with underscore
        const filename = item.inputPath.split('/').pop();
        return !filename.startsWith('_');
      })
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
  });
  
  // Ignore template files from being processed as pages
  eleventyConfig.ignores.add("src/blog/posts/_template.md");
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "data"
    }
  };
};
