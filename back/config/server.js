module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "d855714143fbffaeb74d44b427b209e2"),
    },
  },
  cron: {
    enabled: true,
  },
});
