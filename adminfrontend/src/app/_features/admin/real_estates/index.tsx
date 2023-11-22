// DB 에서 받은 데이터 ROW 당 타입
export interface TableRow {
  item: EstateDataItem;
}

// DB 에서 받은 데이터 ROW 하나 당 타입
export interface EstateDataItem {
  id: number;
  subscription_img_1: string;
  subscription_name: string;
  subscription_description: string;
  subscription_status: string;
  achievement_rate : number;
  subscription_totalprice: number;
  subscription_start_date: string;
  subscription_end_date: string;
  subscription_result_date: string;
}

// 테이블 속성 타입
export interface TableColumnNameProps {
  columnName: string;
}

// 테이블 ROW > 이미지 & 이름 타입
export interface ImageNameProps {
  id : number
  imageURL: string;
  name: string;
}

// 테이블 ROW > 설명
export interface DescriptionProps {
  desc: string;
  id : number;
}

// 테이블 ROW > status
export interface StatusProps {
  id : number;
  status: string;
}

// 테이블 ROW > ProgressProps
export interface ProgressProps {
  progress: string | number ;
  id : number;
}

// 테이블 ROW > TotalpriceProps
export interface TotalpriceProps {
  totalPrice: number;
  id : number;
}

// 테이블 ROW > CurrentResultPrpos
export interface CurrentResultProps {
  current: number;
  id : number;
}

// 테이블 ROW > DurationProps
export interface DurationProps {
  startDate: string;
  endDate: string;
  id : number;
}

// 테이블 ROW > ResultDateProps
export interface ResultDateProps { 
  resultDate : string
  id : number;
}

// 테이블 ROW > ActionButton
export interface ActionButton {
    text : string
  }

export interface EnableButtonParam {
    text : string
  }
  
export interface DisableButton {
    text : string
  }




// rea_estate 상세 
export interface getEstateDetailProps {
        id: string | string[];
  }

// rea_estate 상세 | props가 { params: { id: string } } 형태의 객체라고 가정
export interface ReadProps {
  params: {
      id: string;
  };
}


export interface RenderEstateDetailModalProps { 
  detailData : EstateDetailData
}


export interface EstateDetailData {
  name: string;
  address: string;
  floors: string;
  purpose: string;
  mainpurpose: string;
  area: string;
  all_area: string;
  build_area: string;
  floor_area: string;
  completion: string;
  stock_type: string;
  publisher: string;
  order_amount: string;
  offering_price: string;
  totalprice: string;
  totalsupply: string;
  start_date: string;
  end_date: string;
  building_date: string;
  description: string;
  result_date: string;
  trading_start_date: string;
  status: string;
}


export interface DetailData {
  id: number;
  subscription_name: string;
  subscription_address: string;
  floors: string;
  purpose: string;
  main_purpose: string;
  area: number;
  all_area: number;
  build_area: number;
  floor_area: number;
  completion: string; // or Date
  subscription_img_1: string;


  
  subscription_totalprice: string;
  subscription_totalsupply: number;
  subscription_description: string;
  subscription_start_date: string; // or Date
  subscription_end_date: string; // or Date
  subscription_result_date: string; // or Date
  subscription_building_date: string; // or Date
  subscription_trading_start_date: string; // or Date
  subscription_order_amount: number;
  subscription_offering_price: string;
  subscription_status: string;
  stock_type: string;
  publisher: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  subscription_id: number | null;
}

