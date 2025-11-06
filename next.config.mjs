/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Match all Unity build files with .br extension
        source: '/unity/:path*.br',
        headers: [
          {
            key: 'Content-Encoding',
            value: 'br',
          },
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
          },
        ],
      },
      {
        // Specifically handle the loader.js file
        source: '/unity/unity.loader.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
