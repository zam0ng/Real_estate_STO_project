import InfoIcon from "@/app/_components/_ui/InfoIcon";

export default function Backdropfilter() {
  return (
    <>

      {/* 사진 넣기 1 : URL 로 넣기 (이미지 주소 복사해서, 그냥 가져왔음) */}
        {/* <div className=" w-96 h-96 bg-[url('https://images.unsplash.com/photo-1699031153161-b719847e2607?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D')] "></div> */}

      {/* 사진 넣기 2 : tailwind.config.js 에서 hero_pattern 로 설정한 파일 가져오기 */}
        {/* <div className="bg-hero_pattern w-37.9rem h-37.9rem bg-no-repeat bg-center bg-cover"  >  </div> */}
        
        
      {/* 1. 뒤에 색깔이 있는 div | 이게, 앞으로 비춰줘서 나오게 될 것 */}
      <div className="bg-pattern_2 w-37.9rem h-37.9rem bg-no-repeat bg-center bg-cover flex items-center	justify-center rounded-lg "  >  
        
        
        {/* 2. backdrop-filter 들어가는 부분 중 포인트 👇👇
            - [relative] 
                - 이건 딱히 핵심은 아님 
            
            - [배경색] backdrop_test
                - 색깔 : 살짝 연한 하얀색을 줬음. 완전히 하얀색은 아님. 
                - opacity : 80% ⭐⭐⭐ 이걸 하니까, 느낌이 남 
            
            - [boxShadow] backdrop_test: '0 10px 15px rgba(0, 0, 0, 0.2)' | 이렇게 살짝 연한 shadow 를 줌 | ⭐⭐ 입체감이 생김 ⭐⭐ | 
                - 첫 번째 인자 = 그림자의 가로 방향 오프셋 
                - 두 번째 인자 = 그림자의 세로 방향 오프셋 
                - 세 번째 인자 = 그림자가 '퍼지는 정도' | '클 수록, 부드럽게 퍼짐' 
                - 네 번재 인자 = rgab (rgb 색상 + opacity)
                
            - [blur 강도] 핵심 ⭐⭐ 
                - backdrop_test : '33px' 로 줬어! 
            
            -[overlay]
                - bg-blend-overlay : ⭐⭐⭐ 이걸 줬음 ⭐⭐⭐ 
                
            -[글자색] rgba(0,0,0, 0.8)
                - 이게 배경색이 아님! 주의! 

          */}

        <div className="relative  bg-backdrop_test/[.08] shadow-backdrop_test_bg w-36.75rem  h-36.75rem  backdrop-blur-backdrop_test bg-blend-overlay flex items-center	justify-center rounded-lg"  >  
        
        
          {/* 3. 안에 있는 content 의 '배경' 
            - [boxShadow]
                - [설정] box-shadow : 0 10px 15px rgb(0 0 0 / 10%) | ⭐ 제일 뒷 배경보다, 살짝 연한 그림자

            - [배경색]
                - 완전 하얀색에서 50% opacity 를 줌 ⭐⭐⭐ 
          */}
            <div className="bg-white/[0.5] shadow-backdrop_test_contentBG w-40 flex items-center	justify-center rounded-lg" >

              {/* 4. 안에 있는 'content' */}
                <span className=""> <InfoIcon /> </span>
                <span className="ml-2">text 진행중</span> 


            </div>
        </div>
      </div>
    </>
  );
}
