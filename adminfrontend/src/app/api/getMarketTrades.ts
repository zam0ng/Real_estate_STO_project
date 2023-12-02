/* 
    [요청 경로]
        - 최근 10일 : /admin/trade_day_list
        - 최근 10주 : /admin/trade_week_list
        - 최근 10개월 : /admin/trade_month_list

- response 타입 : 11월 10일 기준
    [
        {
    문래 공차: {
        ten_date: ["2023-11-09", "2023-11-08", "2023-11-07", "2023-11-06", "2023-11-05",
                            "2023-11-04", "2023-11-03", "2023-11-02", "2023-11-01", "2023-10-31"
                        ],
        ten_amount: [1, 0, 0, 0, 0, 0, 0, 0, 0,0
                        ]
                }
        },
        {
    안국 다우니: {
        ten_date: ["2023-11-09", "2023-11-08", "2023-11-07", "2023-11-06", "2023-11-05",
                            "2023-11-04", "2023-11-03", "2023-11-02", "2023-11-01", "2023-10-31"
                        ],
        ten_amount: [1, 0, 0, 0, 0, 0, 0, 0, 0,0
                        ]
                }
        },
    ]
*/


const getMarketTrades =  async ( criteria : string ) => {
    
    // 변경전 샘플 주소
        // const path = `/admin/trade_day_list`;
        // const path = `/admin/trade_week_list`;
        // const path = `/admin/trade_month_list`;
    
    // 변수화
    const path = `/admin/trade_${criteria}_list`;
    console.log("path🐣🐣" , path)


    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const resp = await fetch(`${url}` ,{ 
            cache: "no-store",
        });

        // 캐싱 하지 않는 경우
            // const resp = await fetch(`${url}` ,{ 
            //     cache: "no-store"
            // });
        if(resp.status == 200){
            return resp.json();
        }
        
    
    } catch (error) {
        console.log(error);
    }

};


export default getMarketTrades