/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
      backendURL : 'https://node-send-reactjs.herokuapp.com',
      frontURL : 'https://next-send.netlify.app'  
  }
}

module.exports = nextConfig
