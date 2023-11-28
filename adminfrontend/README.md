# admin 프론트 실행하기 전 필수 셋팅 할 것 
```
1. '.env.production' 파일 만들기 | npm run build 실행시 실행될 도메인 
- 경로 : 'adminfrontend\.env.production' 
- 코드 : NEXT_PUBLIC_PROD_URL = https://api.bouncesto.site

2. 'env.local' 파일 만들기 | npm run dev 실행시 실행될 도메인 
- 경로 : adminfrontend\.env.local
- 코드 : NEXT_PUBLIC_API_URL = http://localhost:8080
```