
// 투표 관련

    // RenderVotesProps 
        export interface RenderVotesProps {
        voteListData: VoteProps[];
        }

        export interface VoteProps {
        title: string;
        description: string;
        id: number;
        author?: string;
        }


// 매물 관련
    // RenderSubscriptionsProps
        // props 에 subscriptionData 이 데이터가 들어간다.  
        export interface RenderSubscriptionsProps {
            subscriptionData : SubscriptionData[];
        }

        // 청약 데이터는 아래의 형식을 띈다. | '실제 값' 을 보면서, '해당 값의 타입' 을 적으면 된다.
        export interface SubscriptionData {
            id : string | number;
            mainpurpose : string;
            use_district : string;
            floors : string | number;
            plottage : string;
            total_ground_area : string | number;
        }
        

// 블랙리스트 관련
    // RenderBlackListProps
        // props 에 subscriptionData 이 데이터가 들어간다.  
        export interface RenderBlackListProps {
            blacklistData : BlackListData[];
        }

        // 청약 데이터는 아래의 형식을 띈다. | '실제 값' 을 보면서, '해당 값의 타입' 을 적으면 된다.
        export interface BlackListData {
            id : string | number;
            isInBlackList : string;
            description : string;

        }



// 공지(공시) 관련
    // RenderNoticesProps
        // props 에 noticesListData 이 데이터가 들어간다. | noticesListData 의 타입은 NoticesListData 
        export interface RenderNoticesProps {
            noticesListData : NoticesListData[];
        }

        // 청약 데이터는 아래의 형식을 띈다. | '실제 값' 을 보면서, '해당 값의 타입' 을 적으면 된다.
        export interface NoticesListData {
            id : string | number;
            title : string;
            description : string;

        }


// 테이블 제목 
    export interface TableTitleProps {
        title : string
    } 

