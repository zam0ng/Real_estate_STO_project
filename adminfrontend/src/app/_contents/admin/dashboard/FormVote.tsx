"use client";

import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";
import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormSectionVoteInfo from "./FormSectionVoteInfo";
import getVoteableEstateData from "@/app/api/getVoteableEstateData";
import postFetchEstateForm from "@/app/api/postFetchEstateForm";
import postFetchVoteInfoVoteTable from "@/app/api/postFetchVoteInfoVoteTable";
import postFetchVoteInfoCATable from "@/app/api/postFetchVoteInfoCATable";
import getOwnerList from "@/app/api/getTokenCA";
import getAmountList from "@/app/api/getAmountList";
import getVotableUsers from "@/app/api/getVotableUsers";

// import addVote from "@/app/_utils/addVote";
import useWeb3 from "@/app/_utils/web3.hook";
import voteContractInfo from "../abi/Voting.json";
import getTokenCA from "@/app/api/getTokenCA";

interface VoteableEstate {
  id: number;
  address: string;
  real_estate_name: string;
  cy_type: string;
  symbol: string;
}


export default function FormVote({
  voteableEstateData,
}: {
  voteableEstateData: string[];
}) {
  const router = useRouter();

  const { user, web3 } = useWeb3();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const [contract, setContract] = useState<any>(null);


  // 컨트랙트 불러오기
  useEffect(() => {
    if (web3 !== null) {
      if (contract) return;

      const tokenContract = new web3.eth.Contract(voteContractInfo.votingABI);

      setContract(tokenContract);
    }
  }, [web3 , contract]);
  

  // deploy function - 투표 등록 (배포)
  const addVote = async (
    tokenCA: string,
    ownerList: string[],
    amountList: number[],
    selectedProperty: string,
    voteDescription: string
  ) => {
    const accounts = await web3?.eth.getAccounts();
    console.log(accounts);
    if (accounts) {
      if (accounts.length === 0) {
        console.log("No account found");
      }
    }

    if (contract) {
      contract
        .deploy({
          data: voteContractInfo.votingBytecode,
          arguments: [
            // 1. property token CA : tokenCA  |
            // ✅ 1) axios.get(`${serverurl}/vote/token_contract_address 여기에, 2) '선택된 매물 이름' 넣고 3) CA 받아온것
            // 👉 이건 우선 애초에 있는걸로 해보자.
            tokenCA,

            // 2. owner list : ownerList
            // ✅ 1) (`${serverurl}/vote/vote_wallets` 여기에 2) '선택된 매물'을 넣고 3) 해당 매물을 갖고 있는 사람들의 지갑 주소 가져온 것
            // 🔵 우선, 데이터는 받음
            ownerList,

            // 3. amount list : amountList
            // ✅ 1) (`${serverurl}/vote/vote_amounts 여기에 '매물 이름'을 넣으면 2) 해당 매물을 소유한 사람들, 각각이 소유한 양이 나온 것 임
            amountList,

            // 4. property name : input
            // 🔵 선택된 매물 이름 | name = real_estate_name 안에 있는 값
            selectedProperty,

            // 5. vote description / title : input
            // 🔵 기재한 투표 주제 | vote_title
            voteDescription,

            // 6. start date in seconds (.getTime() / 1000) : input
            // 🔵 기재한 투표 시작일 | ⭐⭐ data타입 = getTime() / 1000
            startDate,

            // 7. end date in seconds (.getTime() / 1000) : input
            // 🔵 기재한 투표 마감일 | ⭐⭐ data타입 = getTime() / 1000
            endDate,
          ],
        })
        .send({
          from: accounts && accounts[0],
          gas: "3000000",
          gasPrice: web3?.utils.toWei("1", "gwei"),
        })
        .on("transactionHash", (hash: string) => {
          console.log("Transaction Hash : ", hash);
        })
        .on("confirmation", (confirmationNumber: number, receipt: string) => {
          // console.log("Confimation Number : ", confirmationNumber);
          // console.log("Receipt : ", receipt);
        })
        .on("receipt", (receipt: string) => {
          console.log("Receipt : ", receipt);
        })
        .then(async (newInstance: any) => {
          console.log(`CA : ${newInstance.options.address}`);
          await postFetchVoteInfoCATable( newInstance.options.address ,selectedProperty); // CA 테이블 저장 🟠 
          await postFetchVoteInfoVoteTable(selectedProperty , voteDescription , startDate, endDate , newInstance.options.address ); // 투표 테이블 저장 🔵 
        })
        .catch((error: string) => {
          console.error("Error while deploying : ", error);
        });
    }
  };

  
  const postVoteForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴
    console.log(typeof startDate); // number
    const finalStartDate = startDate.toString(); // form 안으로 들어가려면, string 타입 불가피
    const finalEndDate = endDate.toString();

    formData.append("voteStartDate", finalStartDate); // 타임스탬프 추가 | form 데이터로 전송시, toString 필요
    formData.append("voteEndDate", finalEndDate);
      
    const tempCA = await getTokenCA(selectedValue); // vote_contract_address
    console.log(tempCA);
    const tokenCA = tempCA[0].address
    console.log(tokenCA);
    
    const ownerList = await getVotableUsers(selectedValue); // vote_wallets
    const amountList = await getAmountList(selectedValue); // vote_amounts

    const selectedProperty = formData.get("real_estate_name") as string | null;
    const voteDescription = formData.get("notice_title") as string | null;  
    // console.log(" startDate, voteDescription, selectedProperty, tokenCA, endDate , amountList");
    // console.log( startDate, voteDescription, selectedProperty, tokenCA, endDate , amountList);
  
    
    if (
      tokenCA &&
      ownerList &&
      amountList &&
      selectedProperty &&
      voteDescription
      ) {
        await addVote(
          tokenCA,
          ownerList,
          amountList,
          selectedProperty,
          voteDescription
          );
        }
        
        const realEstateName = formData.get('real_estate_name') as string;
        const voteTitle = formData.get('notice_title') as string;
        const voteStartDate = formData.get('voteStartDate') as string;
        const voteEndDate = formData.get('voteEndDate') as string;

        
        
        router.refresh();

        const path = `/admin/dashboard`;
        const domain = process.env.NEXT_PUBLIC_LOCAL_CLIENT || process.env.NEXT_PUBLIC_PRODDUCTION_CLIENT;
        const url = `${domain}${path}`
        router.replace(`${url}`);
        
        // router.replace(`http://localhost:3000/admin/real_estates`);  // keep

      };
      
      return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
      <form encType="multipart/form-data" onSubmit={postVoteForm}>
        {/* 여기부터 디자인 👇👇👇 */}

        {/* 사이즈 잡기 */}
        <div className="w-screen h-full rounded-lg ">
          {/* 불투명 레이어 */}
          <div className="flex justify-center w-full h-screen overflow-hidden rounded-lg bg-blend-overlay backdrop-blur-backdrop_test bg-backdrop_test/[.3] shadow-backdrop_test_bg">
            <div className="relative flex justify-center h-[93%] my-8 overflow-x-hidden overflow-y-auto rounded-lg bg-admin_modal_mainBG w-admin_modal modal-custom-scrollbar">
              {/* wrapper */}
              <div className="my-8 w-40rem mx-7 h-37.9rem ">
                <h1 className="text-3xl font-bold tracking-tighter text-center w-40rem text-adminLayout_menubar_name">
                  투표 등록
                </h1>

                {/* 임시 취소 */}
                <Link
                  className="absolute right-1 top-2"
                  href={"/admin/dashboard"}
                >
                  ❎
                </Link>

                {/* 구분선 */}
                <div className="mt-8 h-line bg-admin_modal_line"></div>

                {/* info 안내 문구 */}
                <MessageBoxInfo />

                <div className="">
                  <FormSectionVoteInfo
                    title="투표 상세 등록"
                    desc="발행 매물에 대한 투표 상세 등록"
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    
                    voteTarget={voteableEstateData}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                  />
                </div>

                <div className="flex items-center justify-end h-28 ">
                  <BtnCancel />

                  <BtnCreate />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
