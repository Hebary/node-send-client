/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
      backendURL : 'https://node-sendreact.herokuapp.com',
      frontURL : 'https://nodesend-client-dusky.vercel.app'  
  }
}

module.exports = nextConfig
