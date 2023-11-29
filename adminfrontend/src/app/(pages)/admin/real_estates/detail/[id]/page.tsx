import { SearchParamsProps } from "@/app/_features/admin/dashboard";
import getEstateDetail from "@/app/api/getEstateDetail";
import { ReadProps } from "@/app/_features/admin/real_estates";
import { useRouter } from "next/navigation";

import RenderEstateDetailModal from "@/app/_contents/admin/real_estates/RenderEstateDetailModal";
// // props가 { params: { id: string } } 형태의 객체라고 가정
// interface ReadProps {
// params: {
//     id: string;
// };
// }

// interface getEstateDetailProps {
// params: {
//     id: string;
// };
// }

// const getEstateDetail = async (props: getEstateDetailProps ) => {
//     const path = `admin/subscription/detail/${props.params.id}`;
//     const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
//     const url = `${domain}${path}`

//     try {
//         const resp = await fetch(`${url}` ,{
//             cache: "no-store"
//         });

//         return resp;

//     } catch (error) {
//         console.log(error);
//     }
// };

interface RenderEstateDetailModalProps {
  detailData: EstateDetailData;
}

// 버번2 타입 👇👇
interface EstateDetailData {
  subscription_img: string;
  subscription_name: string;
  subscription_address: string;
  subscription_totalprice: string;
  subscription_totalsupply: number;
  subscription_description: string;
  subscription_start_date: Date;
  subscription_end_date: Date;
  subscription_result_date: Date;
  subscription_building_date: Date;
  subscription_trading_start_date: Date;
  subscription_order_amount: number;
  subscription_offering_price: string;
  subscription_status: string;
  floors: string;
  purpose: string;
  main_purpose: string;
  area: number;
  all_area: number;
  build_area: number;
  floor_area: number;
  completion: Date;
  stock_type: string;
  publisher: string;
  createdAt: Date;
  updatedAt: Date;
  subscription_id: number | null;
}

// 버전 1 타입 👇👇👇
// interface EstateDetailData {
//     name: string;
// address: string;
// floors: string;
// purpose: string;
// mainpurpose: string;
// area: string;
// all_area: string;
// build_area: string;
// floor_area: string;
// completion: string;
// stock_type: string;
// publisher: string;
// order_amount: string;
// offering_price: string;
// totalprice: string;
// totalsupply: string;
// start_date: string;
// end_date: string;
// building_date: string;
// description: string;
// result_date: string;
// trading_start_date: string;
// status: string;
// }

export default async function ReadEstateItem({
  searchParams,
}: SearchParamsProps) {
  // export default async function ReadEstateItem( {searchParams} : SearchParamsProps , params : ReadProps ) {
  // export default async function ReadEstateItem( ) {

  const isEstateDetailModalOpen = searchParams?.estateDetailModal;

  // console.log("isEstateDetailModalOpen" , isEstateDetailModalOpen)
  // console.log("params" , {params})
  // console.log("params" , params.id)/

<<<<<<< HEAD
  // const router = useRouter();
  // console.log("router", router)
  // const { id } = router.query; // 여기에서 id를 추출

  // const resp = await getEstateDetail( params );
  // const detailData = await resp?.json()
=======
        // // console.log("isEstateDetailModalOpen" , isEstateDetailModalOpen)
        // // console.log("params" , {params})
        // // console.log("params" , params.id)/

        // const router = useRouter();
        // // console.log("router", router)
        // const { id } = router.query; // 여기에서 id를 추출
        
>>>>>>> o

  return <>{isEstateDetailModalOpen && <RenderEstateDetailModal />}</>;
}
