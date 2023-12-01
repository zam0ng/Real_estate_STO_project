import React from 'react'
import Details from './Details';

const PropertyDetail: React.FC = () => {
  const propertyDetail: string[] = [
    "연 5% 고정 임대 수익 & 5년 장기 계약",
    "전주 여행 중심지에 위치한 로컬 호텔",
    "시세 대비 낮은 공모가, 매각차익 기대"
  ];

  const propertyDetailIcon: React.ReactNode[] = [
    (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 1V23" stroke="#17B899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#17B899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),
    (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M14.0175 3.36148C13.6754 2.96909 13.2692 2.65782 12.8222 2.44545C12.3752 2.23309 11.896 2.12378 11.4121 2.12378C10.9282 2.12378 10.4491 2.23309 10.002 2.44545C9.55501 2.65782 9.14885 2.96909 8.80676 3.36148L8.09682 4.17544L7.38688 3.36148C6.6959 2.56926 5.75872 2.12419 4.78153 2.12419C3.80433 2.12419 2.86716 2.56926 2.17617 3.36148C1.48519 4.15371 1.097 5.22819 1.097 6.34857C1.097 7.46894 1.48519 8.54343 2.17617 9.33565L2.88611 10.1496L8.09682 16.1238L13.3075 10.1496L14.0175 9.33565C14.3597 8.94345 14.6312 8.47778 14.8164 7.96524C15.0017 7.45271 15.097 6.90335 15.097 6.34857C15.097 5.79378 15.0017 5.24442 14.8164 4.73189C14.6312 4.21935 14.3597 3.75368 14.0175 3.36148Z" fill="#F37291"/>
    </svg>),
    (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M12 20.8334V10.4167" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 20.8334V4.16675" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 20.8334V16.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>)
  ];

  return (
    <div className='w-full h-72 flex flex-col items-center justify-evenly'>
      <div className='w-full h-[20%] ml-14 flex justify-start items-center font-bold text-xl'>
        건물 알아보기
      </div>
      <div className='w-5/6 h-[70%] flex flex-col items-center justify-evenly bg-[#EDF0F4] rounded-xl shadow-innerneu2 text-sm '>
        {propertyDetail.map((item,index)=>(
          <Details key={index} detail={item} icon={propertyDetailIcon[index]} />
        ))}
      </div>
    </div>
  )
}

export default PropertyDetail;