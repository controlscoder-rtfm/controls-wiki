const { withContentlayer } = require(‘next-contentlayer’);

/** @type {import(‘next’).NextConfig} */
const nextConfig = {
reactStrictMode: true,
swcMinify: true,
experimental: {
appDir: false, // Set to true if you want to use app directory
},
async headers() {
return [
{
source: ’/(.*)’,
headers: [
{
key: ‘X-Frame-Options’,
value: ‘DENY’,
},
{
key: ‘X-Content-Type-Options’,
value: ‘nosniff’,
},
{
key: ‘Referrer-Policy’,
value: ‘strict-origin-when-cross-origin’,
},
],
},
];
},
};

module.exports = withContentlayer(nextConfig);
