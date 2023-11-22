/** @type {import('next').NextConfig} */

// 실행환경 확인
const isDev = process.env.NODE_ENV === 'development';
console.log("isDev??" , isDev)


// 3. isDev 상태값에 따른 경로 요청 : 정상 작동 🔵
const nextConfig = {
  images: {
    remotePatterns: isDev ? [
      {
        protocol: 'http',
        hostname: 'localhost', // 개발(development) 환경 URL | npm run dev 실행시 
        
      }
    ] : [
      {
        protocol: 'https',
        hostname: 'bs.admin.bouncesto.site', // 배포(production) 환경 URL | npm run build, npm run start 실행시 
    }
    ],
  },
};

module.exports = nextConfig;



// // 4.env.local 과 .env.production 을 별도로 운영하는 경우 -> 📛 next.config.js 오류 발생
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost', // 개발(development) 환경 URL | npm run dev 실행시 
//       }, 
//       {
//         protocol: 'https',
//         hostname: 'bs.admin.bouncesto.site', // 배포(production) 환경 URL | npm run build, npm run start 실행시 

//       }
//     ]
//   },
// };


// 1. domains : 정상 작동
  // module.exports = {
  //     reactStrictMode: true,

  //     images: {
  //       domains: ["localhost", "*"]
  //     }
  //   }


// 2. remotePatterns : 정상 작동
  // module.exports = {
  //     images: {
  //       remotePatterns: [
  //         {
  //           protocol: 'http',
  //           hostname: 'localhost',
  //         },
  //       ],
  //     },
  //   }

  

