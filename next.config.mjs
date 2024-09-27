/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.unsplash.com', "plus.unsplash.com"],
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/ru', // или '/en', в зависимости от языка по умолчанию
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  