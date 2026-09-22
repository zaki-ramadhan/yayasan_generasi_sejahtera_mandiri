export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/donatur/", "/api/user/"],
      },
    ],
  };
}
