import React from 'react';
import BackBtn from '../components/BackBtn';

const WhyDifferentPrices: React.FC = () => {
  return (
    <div className='w-screen h-screen'>
        <BackBtn />
        <div className='w-full h-80 flex justify-center items-center mt-12'>
            <div className='relative w-full h-80 bg-blue-600'>
                <div className='absolute top-16 left-24 w-32 h-44 -rotate-12 rounded-xl bg-slate-400 shadow-lg'></div>
                <div className='absolute top-20 left-36 w-32 h-44 rotate-[20deg] rounded-xl bg-slate-200 shadow-lg'></div>
            </div>
        </div>
        <div className='w-full h-32 flex flex-col text-justify pl-5 pr-5'>
            <div className='w-full h-[60%] text-xl flex justify-start items-center font-semibold'>
                SOU와 실부동산의 가치가 다르다구요?
            </div>
            <div className='w-full h-[40%] text-sm'>
                2023.11.28
            </div>
        </div>
        <div className='w-full h-80 flex flex-col text-justify mt-10 pl-5 pr-5'>
            <div className='w-full h-[10%] text-xl flex justify-start items-center font-semibold'>
                SOU가격과 건물가치
            </div>
            <div className='w-full h-[30%] mb-5'>
                SOU(전자자산증권)는 소유에서 건물을 거래하기 위한 디지털 수단이에요. 증권의 성격을 가지고 있어 실물 부동산 거래와는 다르게 비교적 쉽게 거래할 수 있습니다.
            </div>
            <div className='w-full h-[30%] mb-5'>
                이런 특성 때문에 금리가 상승하거나 경제가 둔화되는 경우 SOU 가격이 떨어질 수 있으며, 매수세와 매도세의 차이에 따라서 가격 벼동이 생길 수 있어요.
            </div>
            <div className='w-full h-[30%]'>
                그러나 <span className='font-bold'>건물가치는 하루에도 수차례 변동하는 SOU가격 상승 또는 하락과는 상관없이 건물의 입지와 임대료를 기반으로 한 수익률, 상업용 부동산 시장의 경기 등을 총체적으로 고려해야 합니다.</span>
            </div>
        </div>
        <div className='w-full h-128 flex flex-col justify-evenly text-justify mt-10 pl-5 pr-5'>
            <div className='w-full h-[10%] text-xl flex justify-start items-center font-semibold'>
                건물가치는 어떻게 산정되나요?
            </div>
            <div className='w-full h-[28%]'>
                꾸준한 지가 및 시세 상승, 주변 지역 개발 호재, 유동인구 밀집도, 임대료를 기반으로 한 수익률 등 건물가치에 영향을 주는 요소는 많습니다. 소유 부동산 전문가들은 이 중에서 
                <span className='font-bold ml-1'>1) 감정평가 가격 2) 주변 건물 호가</span> 
                를 반영해 건물가치를 산정했어요.
            </div>
            <div className='w-full h-[32%]'>
                상장 건물이 매각되는 경우에는 매각으로 발생한 대금(원금 + 매각 차익) 을 SOU 투자자들에게 지분대로 배분하게 돼요. 따라서 일시적으로 SOU 가격이 하락하더라도 
                <span className='font-bold ml-1'>보유 건물이 매각되는 경우에는 SOU의 시세와는 관계없이 건물가치와 동일한 금액을 소유한 지분 비율대로 돌려받게 됩니다.</span>
            </div>
            <div className='w-full h-[30%]'>
                매각까지 고려한 소유주님의 의사결정에 도움이 되고자 소유에서는 SOU 가격과는 별도로 실제 건물가치 정보를 주기적으로 제공하고 있어요.
            </div>
        </div>
    </div>
  )
}

export default WhyDifferentPrices;