require('dotenv').config()

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/assets/**');
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });

  eleventyConfig.addNunjucksFilter('commentsForId', (comments, cardId) => {
    return comments.filter(comment => comment.cardId === cardId);
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
};
