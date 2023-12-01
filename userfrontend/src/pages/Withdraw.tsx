import React ,{useState, useEffect} from 'react'
import BackBtn from '../components/BackBtn'
import axios from 'axios';
import { serverurl } from '../components/serverurl';
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";


const Withdraw : React.FC= () => {
  const [withdraw , setwithdraw] = useState("");
  const Navigate = useNavigate();

  const cookies = new Cookies();
  const isCookie = cookies.get("accessToken");
  const [email,setEmail] = useState<any>(null);
  const [balance,setBalance] = useState<any>(null);

  const confirmLoginStatus = async (isCookie: string): Promise<string> => {
    const response = await axios.post(`${serverurl}/mypage`, {
      token: isCookie,
    },{withCredentials: true, headers: {'Content-Type': 'application/json'}});
    return response.data;
  };

  const { data, error, isLoading, isError } = useQuery<string>({
    queryKey: ["mypageLoginCheck"],
    queryFn: () => confirmLoginStatus(isCookie),
  });

  useEffect(()=>{
    setEmail(data);
  },[data])

  useEffect(()=>{
    getBalance(withdraw,email);

  },[email])

  const getBalance = async (price : string, email : string) : Promise<any> =>{
    const data :any = await axios.get(`${serverurl}/mypage/user_info`,{
        params : {
            user_email : email,
            price : price,
        }
    })
    console.log(data);
    setBalance(data.data.balance);
    }


  const withdrawBtn = async()=>{
    const year = new Date().getFullYear().toString();
    const month = Number(new Date().getMonth().toString().padStart(2,'0'))+1;
    const date = new Date().getDate().toString().padStart(2,'0');
    const hours = new Date().getHours().toString();
    const minutes = new Date().getMinutes().toString().padStart(2,'0');
    const milliseconds = new Date().getSeconds().toString().padStart(2,'0');
    const yymmdd = year+month+date;
    const hhmmss = Number(hours+minutes+milliseconds)-10;
    const yymmddhhmmss = year+month+date+hours+minutes+milliseconds;
    
    console.log(yymmdd);
    console.log(hhmmss);
    console.log(withdraw);

    //  ⭐ 사이트 db에서 출금해서 연동계좌 입금하기
    const data = await axios.post('https://developers.nonghyup.com/ReceivedTransferAccountNumber.nh',
    {
        "Header":{
            "ApiNm":"ReceivedTransferAccountNumber",
            "Tsymd":yymmdd,
            "Trtm":hhmmss,
            "Iscd":"002193",
            "FintechApsno":"001",
            "ApiSvcCd":"ReceivedTransferA",
            "IsTuno":yymmddhhmmss,
            "AccessToken":
            "045e089e1be3653656f81e1c686b54314287fe8300a31a82fca18d5834783b75"
        },
        "Bncd":"011",
        "Acno":"3020000009631",
        "Tram":withdraw,
        // "DractOtlt":"테스트",
        // "MractOtlt":"테스트" 
      }
    )
    
    console.log(data);

    // db에 출금처리
    const withdrawResult = await axios.post(`${serverurl}/mypage/withdrawal`,{
      price : withdraw,
      token : isCookie,
    })
    console.log(withdrawResult);
    setwithdraw("");

    if(withdrawResult.data == "출금 완료"){

      alert("출금이 완료되었습니다.");
      Navigate("/mypage");
    }

  }
  return (
    <div className='relative w-screen h-screen'>
      <div>
        <div className='flex items-center'>
          <BackBtn/>
          <div className='text-blue-800'>KRW 출금하기</div>
        </div>

        <div className='flex justify-between w-11/12 m-auto mb-2 '>
            <div className=''>
                출금가능
            </div>
            <div>
                {balance?.toLocaleString()} KRW
            </div>
        </div>
        <hr className='mb-4' />

        <div className='w-11/12 m-auto mb-2'>출금금액</div>

        <div className='m-auto w-11/12 h-16 flex relative'>
          <input onChange ={(e :any)=>{setwithdraw(e.target.value)}} className='border-2 w-full h-12 absolute pr-12 pl-2'></input>
          <span className='top-3 right-2 absolute text-stone-400'>KRW</span>
        </div>
      </div>

      <hr className='mb-4' />

      <div className='w-11/12 m-auto mb-2 text-center'>
        ⭐수수료 무료이벤트⭐
      </div>


      <div onClick={withdrawBtn} className='absolute bottom-0 w-full h-12 text-center leading-10 text-white bg-blue-800'>
        출금신청
      </div>
    </div>
  )
}

export default Withdraw