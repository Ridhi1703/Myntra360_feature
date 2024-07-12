

import dotenv from 'dotenv';
dotenv.config();
/** @type {import('next').NextConfig} */
// next.config.js or server.js


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
    reactStrictMode: true,
    serverRuntimeConfig: {
      // Will only be available on the server side
      mySecret: 'secret',
      secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      staticFolder: '/static',
    },
    webpack: (config) => {
      config.externals.push({
        'sharp': 'commonjs sharp',
        'canvas': 'commonjs canvas'
      })
      return config
    },
  }

  export default nextConfig;