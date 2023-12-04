import React ,{useState, useEffect} from 'react'
import BackBtn from '../components/BackBtn'
import axios from 'axios';
import { serverurl } from '../components/serverurl';
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';


const Deposit : React.FC= () => {
  const [depositValue , setDepositValue] = useState("");
  const Navigate = useNavigate();

  const cookies = new Cookies();
  const isCookie = cookies.get("accessToken");

  const depositBtn = async()=>{
    const year = new Date().getFullYear().toString();
    const month = Number(new Date().getMonth().toString().padStart(2,'0'))+1;
    const date = new Date().getDate().toString().padStart(2,'0');
    const hours = new Date().getHours().toString();
    const minutes = new Date().getMinutes().toString().padStart(2,'0');
    const milliseconds = new Date().getSeconds().toString().padStart(2,'0');
    const yymmdd = year+month+date;
    const hhmmss = Number(hours+minutes+milliseconds)-10;
    const yymmddhhmmss = year+month+date+hours+minutes+milliseconds;
    
    console.log(depositValue);

    //  ⭐ 내 연동계좌에서 출금해서 사이트 입금하기
    const data = await axios.post('https://developers.nonghyup.com/DrawingTransfer.nh',{	
      "Header":{
        "ApiNm":"DrawingTransfer",
        "Tsymd": yymmdd,
        "Trtm": hhmmss,
        "Iscd": "002193",
        "FintechApsno": "001",
        "ApiSvcCd":"DrawingTransferA",
        "IsTuno":yymmddhhmmss, 
        "AccessToken": "045e089e1be3653656f81e1c686b54314287fe8300a31a82fca18d5834783b75"
      },
      "FinAcno":"00820100021930000000000017565",
      "Tram":depositValue,
      "DractOtlt":"3020000009631",
      // "MractOtlt":"테스트"
    })
    
    // console.log(data);

    // db에 입금처리
    const depositResult = await axios.post(`${serverurl}/mypage/deposit_balance`,{
      price : depositValue,
      token : isCookie,
    })
    // console.log(depositResult);
    setDepositValue("");

    if(depositResult.data == "입금 완료"){

      alert("입금이 완료되었습니다.");
      Navigate("/mypage");
    }

  }
  return (
    <div className='relative w-screen h-screen'>
      <div>
        <div className='flex items-center'>
          <BackBtn/>
          <div className='text-blue-800'>KRW 입금하기</div>
        </div>
        <div className='w-11/12 m-auto mb-2'>입금금액</div>

        <div className='m-auto w-11/12 h-16 flex relative'>
          <input onChange ={(e :any)=>{setDepositValue(e.target.value)}} className='border-2 w-full h-12 absolute pr-12 pl-2'></input>
          <span className='top-3 right-2 absolute text-stone-400'>KRW</span>
        </div>
      </div>

      <hr className='mb-4' />
      <div className='w-11/12 m-auto'>
        <div>입금 전 꼭 알아두세요 !</div>
        <div className='w-full flex'>
          <div className='-mt-1'>-</div>
          <div className='text-xs text-stone-500'>입금 실행시, 연계된 계좌에서  신청한 금액만큼 자동 이체됩니다.</div>
        </div>
        <div className='w-full flex'>
          <div className='-mt-1'>-</div>
          <div className='text-xs text-stone-500'>입금 가능금액은 연계된 계좌의 출금가능금액과 동일하며, 연계 계좌의 이체한도 범위 등을 벗어나는 경우 입금이 정상적으로 진행되지 않을수 있습니다.</div>
        </div>
        <div className='w-full flex'>
          <div className='-mt-1'>-</div>
          <div className='text-xs text-stone-500'>은행 점검시간(매일 23:50~00:10)에는 입금 서비스 이용이 원활하지 않을 수 있습니다.</div>
        </div>
        <div className='w-full flex'>
          <div className='-mt-1'>-</div>
          <div className='text-xs text-stone-500'>VPN 환경을 활용하여 접속한 경우 출금 이용이 보류되거나 제한될 수 있습니다.</div>
        </div>
        <div className='w-full flex'>
          <div className='-mt-1'>-</div>
          <div className='text-xs text-stone-500'>네트워크 환경에 따른 입금 반영 지연이 발생할 수 있습니다.</div>
        </div>
      </div>

      <div onClick={depositBtn} className='absolute bottom-0 w-full h-12 text-center leading-10 text-white bg-blue-800'>
        입금신청
      </div>
    </div>
  )
}

export default Deposit