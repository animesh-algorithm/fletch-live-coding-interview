const nextConfig = {
  outputFileTracingIncludes: {
    "/api/flight-listing": ["./prisma/flights.db"],
  },
};

export default nextConfig;
