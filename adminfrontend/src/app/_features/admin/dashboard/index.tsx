// 모달의 on/off 상태값을 갖고 있는 searchParams 에 대한 타입
export type SearchParamsProps = {
  searchParams: Record<string, string> | null | undefined;
};

// inputForm 에서 데이터를 받는 type
export interface InputFormItemProps {
  _title: string;
  _type: string;
  _name: string;
  _placeholder: string;
  _step?: string;
}
export interface InputFormItemPropsTitle {
  _title: string;
  _type: string;
  _name: string;
  _placeholder: string;
  _step?: string;
}

// inputForm 에서 데이터를 받는 type
export interface InputFormDateItemProps {
  _title: string;
  _type: string;
  // _name : string;
  _placeholder: string;
  _step?: string;
  setDate: Function;
}

export interface RenderItemProps {
  title: string;
  desc: string | number | undefined | null;
}

// small graph chart type
export interface LineChartSmallProps {
  _lineColor: string;
  _data: number[];
  _label: string[];
}

// blacklist 유저 타입
export interface IblackListUser {
  user_profile_img: string;
  user_email: string;
  slice: Function;
}

// 공모가격
export interface IPublicOfferingItem {
  subscription_name: string;
  subscription_order_totalprice: string;
  subscription_totalprice: string;
}

export interface ITransactionData {
  subscription_img_1: string;
  real_estate_name: string;
  trade_price: number;
  createdAt: string;
  slice: Function;
}

export interface DataFormParams {
    realEstateName: string;
    voteTitle: string;
    voteStartDate: string;
    voteEndDate: string;
}
