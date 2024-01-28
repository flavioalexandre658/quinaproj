module.exports = {
    content: ['./public/**/*.html', './src/**/*.vue'],
    defaultExtractor: (content) => {
      const contentWithoutStyleBlocks = content.replace(
        /<style[^]+?<\/style>/gi,
        ''
      );
      return (
        contentWithoutStyleBlocks.match(
          /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
        ) || []
      );
    },
  };
  