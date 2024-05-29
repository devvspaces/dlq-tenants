/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
    ];
  }
};

export default nextConfig;
