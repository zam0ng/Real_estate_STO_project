

// 모달의 on/off 상태값을 갖고 있는 searchParams 에 대한 타입 
    export type SearchParamsProps = {
        searchParams: Record<string, string> | null | undefined;
    };


// inputForm 에서 데이터를 받는 type
    export interface InputFormItemProps {
        _title : string;
        _type : string;
        _name : string;
        _placeholder : string;
        _step? : string 
    }

 
// 
    export interface RenderItemProps {
        title : string
        desc : string | number | undefined | null
    }

    