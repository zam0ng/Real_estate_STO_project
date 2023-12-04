import {Dispatch,SetStateAction} from 'react';

// DB 에서 받은 데이터 ROW 당 타입
export interface TableRow {
  item: EstateDataItem;
}

// DB 에서 받은 데이터 ROW 당 타입
export interface UserTableRow {
  item: UserDataItem;
}

// DB 에서 받은 데이터 ROW 당 타입
export interface TransactionTableRow {
  item: TransactionDataItem;
}

// DB 에서 받은 데이터 ROW 당 타입
export interface TableRowEstate {
  item: EstateDataItem;
  // setLoading : Dispatch<SetStateAction<boolean>>;
}

// DB 에서 받은 데이터 ROW 당 타입
export interface TableRowNotice {
  item: NoticeDataItem;
}

// DB 에서 받은 데이터 ROW 하나 당 타입
export interface EstateDataItem {
  id: number;
  contest_totalprice : string;
  subscription_img_1: string;
  subscription_name: string;
  subscription_description: string;
  subscription_status: string;
  achievement_rate : number;
  subscription_order_amount : number;
  subscription_totalprice: number;
  subscription_start_date: string;
  subscription_end_date: string;
  subscription_result_date: string;
}

// DB 에서 받은 데이터 ROW 하나 당 타입
export interface NoticeDataItem {
  id : number
  real_estate_name : string
  category : string
  notice_title : string
  notice_content : string
  notice_writer : string
  createdAt : string
  updatedAt : string
}

// DB 에서 받은 데이터 ROW 하나 당 타입
export interface UserDataItem {
  id: number;
  user_profile_img: string;
  user_email: string;
  wallet: string;
  
  balance : number, 
  using_balance : number, 
  blacklist : boolean, 
  createdAt : string,
  updatedAt : string,
}


// DB 에서 받은 데이터 ROW 하나 당 타입
export interface TransactionDataItem {
  id : number,
  tx_from : string,
  tx_to : string,
  tx_value : number,
  tx_symbol : string,
  block_num : number,
  transmission : string,
  createdAt : string,
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
// 테이블 ROW > 이미지 & 이름 타입
export interface ImageEmailPrpos {
  id : number
  imageURL: string;
  name: string;
}

// 테이블 ROW > 설명
export interface DescriptionProps {
  desc: string;
  id : number;
}

// 테이블 ROW > 설명
export interface UserDescriptionProps {
  desc: string | number;
  id : number;
}


// 테이블 ROW > status
export interface StatusProps {
  id : number;
  status: string;
}

// 테이블 ROW > status
export interface BlacklistStatusProps {
  id : number;
  status: boolean;
}

// 테이블 ROW > status
export interface UserStatusProps {
  id : number;
  status: boolean;
}

// 테이블 ROW > status
export interface TransactionStatusProps {
  id : number;
  status: string;
}

// 테이블 ROW > ProgressProps
export interface ProgressProps {
  progress: string | number ;
  id : number;
}

// 테이블 ROW > ProgressProps
export interface BalanceProps {
  id : number;
  balance: number ;
}

// 테이블 ROW > TotalpriceProps
export interface TotalpriceProps {
  totalPrice: string;
  id : number;
}

// 테이블 ROW > CurrentResultPrpos
export interface CurrentResultProps {
  current: string;
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
  resultDate : string;
  id : number;
}

// 테이블 ROW > ActionButton
export interface ActionButton {
    text : string
  }

export interface EnableButtonParam {
    text : string
    id : number;
    setLoading : Dispatch<SetStateAction<boolean>>;

  }
  
  export interface EnrollBlacklistButtonParams {
      text : string
      user_email : string
    }

    export interface DisableButton {
    text : string
  }




// real_estate 상세 
export interface getEstateDetailProps {
        id: string | string[];
  }

// real_estate 상세 | props가 { params: { id: string } } 형태의 객체라고 가정
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



