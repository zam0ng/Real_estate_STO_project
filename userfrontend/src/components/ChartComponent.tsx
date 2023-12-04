

    import { LineChartSmallProps } from "../features/LineChartSmallProps";

    import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title,
    ArcElement, 
    Tooltip, 
    Legend, 
    } from "chart.js";

    import { Line } from "react-chartjs-2";


    import React from 'react'



    const LineChartSmall:React.FC<LineChartSmallProps> = (  {_lineColor, _data, _label}  ) => {
    ChartJS.register(
    CategoryScale, 
    LineElement, 
    PointElement, 
    LinearScale, 
    Title,
    Tooltip, 
    Legend

    );

    
    // const labels = ["Oct 10","17","Nov 3", "10", "17", "24", "Dec 3", "10", "17", "24", ]
    const labels = _label

    const data = {
    labels,

    datasets : [{
        label : '',   // label 이 빈 문자열이면, undefined 로 됨
        // data : [310, 133, 260, 50, 70, 120, 120, 520, 20 , 300], 
        data : _data, 

        // borderColor : 'rgb(250, 146, 142)',   // 선 색깔 = 버튼 색깔 rgb(239 68 100)
        borderColor : _lineColor,   // 선 색깔 = 버튼 색깔 rgb(239 68 100)
        
        borderWidth : 2,   // 선 굵기

        pointBorderWidth : 1,    // point(점) 의 테두리 경계
        pointRadius : 0,   // point(점)의 배경 지름

        pointHoverRadius : 7,
        
        // pointBackgroundColor : 'rgb(250, 146, 142)',    // point(점) 의 배경색      
        pointBackgroundColor : _lineColor,    // point(점) 의 배경색      
        
        pointHoverBackgroundColor : '#201d25',
        //   pointBorderColor : 'rgb(245, 245, 244)',    // 점 위에 hover 안 되도 보이는거

        // 기타 설정
            // hoverBorderColor : 'rgb(206, 167, 165)',
            // hoverBackgroundColor: "rgba(15, 107, 245, 0.4)",  // hover 되었을 때, 점의 배경색 
            // backgroundColor : 'rgba(30,30,30,0.3)',   // 점 위에 hover 되었을 때 

        fill : true,
        tension : 0.3, 
    }
    ]
    }

    const options = {
        responsive : true,
        maintainAspectRatio: false,     //  responsive 설정 | container 가 작아져도, 그에 맞게 그려줌 | 출처 : https://www.chartjs.org/docs/latest/configuration/responsive.html

        // 상단 범례 없애기
        plugins : {
            legend : {
                display : false
            },    
                // 범례 있는 경우
                // legend : {
                //   position : "top" as const,
                // },

            title : {
                display : true
            },

            tooltip : {
                enabled : false,    // 마우스 호버 했을 때, 라벨 안 보이게 하기
                // callbacks: {
                //     label: function(context : any) {
                //         // 'context' 객체는 툴팁과 관련된 다양한 정보를 포함합니다.
                //         // 예: context.dataset.label, context.parsed.y 등
                //         return `${context.parsed.y}`;
                //     }
                // },
                displayColors : false,  
                padding : {
                    top : 3, 
                    right : 3, 
                    bottom : 3, 
                    left : 3, 
                },
                titleFont : {
                    size : 3
                },
                bodyFont : {
                    size : 10
                },
                bodyAlign : "left" as const,   // 'left' 를 문자열 리터럴 타입으로 명시적으로 설정 
                    cornerRadius: 2,  
                
                // mode: 'x',      // x축으로 선 긋기 위해서
                intersect: false,       // x축으로 선 긋기 위해서
        }
        
        },

        // interaction: {
        //     mode: 'index',      // x축으로 선 긋기 위해서
        //     intersect: false,        // x축으로 선 긋기 위해서
        //     },

        scales : {        
            // x 축을 지칭할 때, 공식 문서는 xAxis 라고 나와 있는 경우도 있는데, xAxis 로 하면 안 됨. |]참고 : https://www.chartjs.org/docs/latest/axes/styling.html#grid-line-configuration
            x : {
                display : false,
                grid : {
                // backgroundColor : '#9ef59b',
                // borderColor : '#1714c5',
                // color	 : '#1714c5',
                // tickColor : '#1714c5', 
                display : false // grid 격자 제거 
                }, 
                ticks: {
                    color: '#a6a5a7', // x축 눈금의 글씨 색깔을 빨간색으로 설정
                    display : false,    // 밑에 있는 눈금선 없애기
                },
                title : {
                    display : false
                },
            },
            
            y : {

                display : false,
                grid : {
                // backgroundColor : '#9ef59b',
                // borderColor : '#1714c5',
                // color	 : '#1714c5',
                tickColor : '#1714c5', 
                display : false // grid 격자 제거
                }, 
                ticks: {
                    color: '#a6a5a7', // x축 눈금의 글씨 색깔을 빨간색으로 설정
                    display : false,        // 밑에 있는 눈금선 없애기
                },
                title : {
                    display : false
                },
        }
        
        }
    }

    return (
    <>
        <Line 
            className=" bg-dashboard_card_bg -top-4 "   
            data={data} 
            options={options}
        />
    </>
    )
    }

    export default LineChartSmall