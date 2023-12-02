import React from 'react';
// bg-[#EDF0F4]

const PopupInfo: React.FC = () => {
  return (
    <div className='w-full h-auto rounded-lg p-3 absolute -top-40 left-0 text-xs bg-white shadow-neu2 text-gray-500'>
        <span className='w-full h-2 flex justify-center items-center'>--- <span className='text-orange-500 ml-1'> MetaMask</span>에서 토큰 불러오기 ---</span> <br/>
        매물 이름을 누르시면 해당 매물과 관련된 토큰의 CA가 복사됩니다. <br/>
        복사한 CA를 MetaMask의 '토큰'탭에서 '토큰 불러오기'를 누른 후, <br/>
        '토큰 컨트랙트 주소'칸에 입력하시면 토큰을 불러올 수 있습니다.
    </div>
  )
}

export default PopupInfo;