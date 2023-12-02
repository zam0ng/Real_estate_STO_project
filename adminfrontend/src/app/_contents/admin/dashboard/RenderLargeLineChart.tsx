    "use client"


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


    const RenderLargeLineChart = ( {finaldate , finalSum} : { finaldate : string[] , finalSum : number[]} ) => {


    // 최대값과 최소값 계산
    const maxValue = Math.max(...finalSum);
    const minValue = Math.min(...finalSum);


    ChartJS.register(
    CategoryScale, 
    LineElement, 
    PointElement, 
    LinearScale, 
    Title,
    Tooltip, 
    Legend

    );

    const options = {
        responsive : true,

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
            callbacks: {
            label: function(context : any) {
                // 'context' 객체는 툴팁과 관련된 다양한 정보를 포함합니다.
                // 예: context.dataset.label, context.parsed.y 등
                return `$ ${context.parsed.y}`;
            }
            },
            displayColors : false,  
            padding : {
            top : 7, 
            right : 30, 
            bottom : 7, 
            left : 30, 
            },
            titleFont : {
            size : 12
            },
            bodyFont : {
            size : 20
            },
            bodyAlign : "left" as const,   // 'left' 를 문자열 리터럴 타입으로 명시적으로 설정 
            cornerRadius: 32,  
            
            // mode: 'x',      // x축으로 선 긋기 위해서
            intersect: false,       // x축으로 선 긋기 위해서
        }
        
        },

        interaction: {
            // mode: 'x',      // x축으로 선 긋기 위해서
            intersect: true,        // x축으로 선 긋기 위해서
        },

        scales : {        
        // x 축을 지칭할 때, 공식 문서는 xAxis 라고 나와 있는 경우도 있는데, xAxis 로 하면 안 됨. |]참고 : https://www.chartjs.org/docs/latest/axes/styling.html#grid-line-configuration
        x : {
            grid : {
                // backgroundColor : '#9ef59b',
                // borderColor : '#1714c5',
                // color	 : 'rgb(23, 20, 197)',
                // tickColor : '#1714c5', 
                display : false // grid 격자 제거 
            }, 
            ticks: {
                color: '#a6a5a7', // x축 눈금의 글씨 색깔 설정
            },
            
        },
        
        y : {
            min : 0, 
            max : maxValue +1,
            grid : {
                // backgroundColor : '#9ef59b',
                // borderColor : '#1714c5',
                // color	 : '#1714c5',
                tickColor : '#1714c5', 
                display : false // grid 격자 제거
            }, 
            ticks: {
                color: '#a6a5a7', // x축 눈금의 글씨 색깔을 빨간색으로 설정, 
                stepSize: 1, // 각 눈금 사이의 간격을 1로 설정

            },
        }
        }
    }


    const labels = [...finaldate]

        
    const data = {
    labels,

    datasets : [{
        label : '',   // label 이 빈 문자열이면, undefined 로 됨
        // data : [300, 330, 660, 560, 700, 200, 200, 500, 100 , 800], 
        data : [...finalSum], 
        
        borderColor : 'rgb(250, 146, 142)',   // 선 색깔 = 버튼 색깔 rgb(239 68 100)
        borderWidth : 5,   // 선 굵기
        
        pointBorderWidth : 1,    // point(점) 의 테두리 경계
        pointRadius : 2,   // point(점)의 배경 지름
        
        pointHoverRadius : 7,
        pointBackgroundColor : 'rgb(250, 146, 142)',    // point(점) 의 배경색      
        pointHoverBackgroundColor : '#201d25',
    //   pointBorderColor : 'rgb(245, 245, 244)',    // 점 위에 hover 안 되도 보이는거
        
        // 기타 설정
        // hoverBorderColor : 'rgb(206, 167, 165)',
        // hoverBackgroundColor: "rgba(15, 107, 245, 0.4)",  // hover 되었을 때, 점의 배경색 
        // backgroundColor : 'rgba(30,30,30,0.3)',   // 점 위에 hover 되었을 때 
        
        fill : true,
        tension : 0.5, 
    }
    ]
    }

    return (
    <>
    <Line 
        className=" bg-admin_content_bg"  // 배경색 
        data={data} 
        options={options}
    />


    </>
    )
    }

    export default RenderLargeLineChart

