


//     // deploy function - 투표 등록 (배포)
// const addVote = async ()=>{
//         const accounts = await web3?.eth.getAccounts();
//         console.log(accounts);
//         if(accounts){
//             if(accounts.length === 0){
//                 console.log("No account found");
//             };
//         };

//         if(contract){
//             contract.deploy({
//                 data : voteContractInfo.votingBytecode,
//                 arguments : [
//                     // 1. property token CA : tokenCA  | 
//                         // ✅ 1) axios.get(`${serverurl}/vote/token_contract_address 여기에, 2) '선택된 매물 이름' 넣고 3) CA 받아온것 
//                         // 👉 이건 우선 애초에 있는걸로 해보자. 
//                     tokenCA,

//                     // 2. owner list : ownerList
//                         // ✅ 1) (`${serverurl}/vote/vote_wallets` 여기에 2) '선택된 매물'을 넣고 3) 해당 매물을 갖고 있는 사람들의 지갑 주소 가져온 것 
//                         // 🔵 우선, 데이터는 받음
//                     ownerList,

//                     // 3. amount list : amountList
//                         // ✅ 1) (`${serverurl}/vote/vote_amounts 여기에 '매물 이름'을 넣으면 2) 해당 매물을 소유한 사람들, 각각이 소유한 양이 나온 것 임 
//                     amountList,

//                     // 4. property name : input
//                         // 🔵 선택된 매물 이름 | name = real_estate_name 안에 있는 값
//                     selectedProperty,

//                     // 5. vote description / title : input
//                         // 🔵 기재한 투표 주제 | vote_title
//                     voteDescription,

//                     // 6. start date in seconds (.getTime() / 1000) : input
//                         // 🔵 기재한 투표 시작일 | ⭐⭐ data타입 = getTime() / 1000
//                     startDate,

//                     // 7. end date in seconds (.getTime() / 1000) : input
//                         // 🔵 기재한 투표 마감일 | ⭐⭐ data타입 = getTime() / 1000
//                     endDate
//                 ]
//             })
//             .send({
//                 from: accounts && accounts[0],
//                 gas: "3000000",
//                 gasPrice: web3?.utils.toWei('1','gwei')
//             })
//             .on("transactionHash", (hash: string)=>{
//                 console.log("Transaction Hash : ",hash)
//             })
//             .on("confirmation",(confirmationNumber: number, receipt: string)=>{
//                 console.log("Confimation Number : ", confirmationNumber);
//                 console.log("Receipt : ",receipt);
//             })
//             .on("receipt", (receipt : string)=>{
//                 console.log("Receipt : ",receipt);
//             })
//             .then((newInstance: any)=>{
//                 console.log(`CA : ${newInstance.options.address}`);
//                 setVoteCA(newInstance.options.address);
//                 mutationVoteTable.mutate(newInstance.options.address);
//                 mutationCAtable.mutate(newInstance.options.address);
//             })
//             .catch((error: string)=>{
//                 console.error("Error while deploying : ",error);
//             })
//         }
//     };


//     export default addVote