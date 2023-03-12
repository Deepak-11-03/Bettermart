/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
//   devIndicators: {
//     buildActivity: false
// }
httpAgentOptions: {
  keepAlive: false,
},
publicRuntimeConfig: {
  BASE_URL: 'https://better-mart.netlify.app',
},
images: {
  domains: ['res.cloudinary.com'],
},

}


module.exports = nextConfig