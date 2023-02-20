/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
//   devIndicators: {
//     buildActivity: false
// }
httpAgentOptions: {
  keepAlive: false,
},

}



module.exports = {
  serverTimeout: 1000, // Timeout in milliseconds
};


module.exports = nextConfig