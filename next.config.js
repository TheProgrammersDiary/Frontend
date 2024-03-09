module.exports = {
    blogUrl: process.env.NEXT_PUBLIC_blog_url || "https://localhost:8080",
    postUrl: process.env.NEXT_PUBLIC_post_url || "https://localhost:8081",
    logging: {
        fetches: {
          fullUrl: true,
        },
      },
};