import React from 'react'
import ToDocuments from './ToDocuments';

const PropertyDocuments: React.FC = () => {
  const documentType: string[] = [
    "건물 정보",
    "발행 정보",
    "공간운영사 정보",
    "공적 문서",
    "투자 관련 문서",
    "공시자료"
  ];

  return (
    <div className='w-full h-112 flex flex-col items-center justify-evenly'>
      {documentType.map((item,index)=>(
        <ToDocuments key={index} type={item} />
      ))}
    </div>
  )
}

export default PropertyDocuments;