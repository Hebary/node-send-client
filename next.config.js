/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
      backendURL : 'https://node-sendhttps-dashboard-render-com.onrender.com/',
      frontURL : 'https://next-send.netlify.app'  
  }
}

module.exports = nextConfig