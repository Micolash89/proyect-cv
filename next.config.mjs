/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
  };
  
  export default nextConfig;
//   module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',
//     eslint: {
//       ignoreDuringBuilds: true,
//     },
//     images: { unoptimized: true },
//   };
  
//   export default nextConfig;