import React from 'react'
interface TradeData {
    [key: string]: {
        ten_date: string[];
        ten_amount: number[];
    };
    }


const calcDayTradeSum = (marketTradesDuringDays : TradeData[]) => {


    // 각 매물당 거래량 더해서, 10개로 만들기
    const tradeAmountArr = marketTradesDuringDays.map((item : TradeData) => {
        return Object.values(item)[0].ten_amount
    })
    // console.log("tradeAmountArr" , tradeAmountArr)

    const sumArrays = (arr1: number[], arr2: number[]): number[] => {
        return arr1.map((num, index) => num + (arr2[index] || 0));
    };

    const sumBeforeReverse = tradeAmountArr.slice(1).reduce((acc : number[], curr : number[]) => sumArrays(acc, curr), tradeAmountArr[0]);
    const finalSum = sumBeforeReverse.reverse()

    // console.log("finalSum🌴" , finalSum)



// 10일 추출해서 x 축에 넣기 : 어떤 매물을 선택하건, 날짜는 동일하게 들어가 있음. 
    const tenDates = marketTradesDuringDays.flatMap((item : TradeData)=> {
        return Object.values(item)[0].ten_date;
    });
    // const tenDates = marketTradesDuringDays[0]['문래공차']['ten_date']
    // console.log("tenDays | 오늘 부터 10일전 까지의 거래 🤸‍♂️" , tenDates)
        /*    tenDays = [
                '2023-11-24', '2023-11-23',
                '2023-11-22', '2023-11-21',
                '2023-11-20', '2023-11-19',
                '2023-11-18', '2023-11-17',
                '2023-11-16', '2023-11-15'
            ]
        */
    
    const uniqueDates : string[] = Array.from(new Set(tenDates));     // 중복제거
    // console.log("uniqueDates" , uniqueDates)
        /*
            '2023-11-24', '2023-11-23',
            '2023-11-22', '2023-11-21',
            '2023-11-20', '2023-11-19',
            '2023-11-18', '2023-11-17',
            '2023-11-16', '2023-11-15'
        */    
    
    const monthArr = uniqueDates.map( (item: string) => {
        return item.split('-')[1]
    })

    const tempDayArr = uniqueDates.map((item:string) => {
        return item.split('-')[2]
    })

    const dayArr = tempDayArr.sort((a, b) => a.localeCompare(b));   // 오름차순 정렬
    // console.log(dayArr , "dayArr")

    const monthNames : { [key : string] : string } = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
        '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
        '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    };    

    const finaldate = monthArr.map( (month : string, index : number) => {
        if(index == 0){
            return `${monthNames[month]} ${dayArr[index]}`
        }
        return dayArr[index]
    } )

    // console.log("finaldate🤟🤟" , finaldate)
    /*
        finaldate🤟🤟 [
        'Nov 24', '23',
        '22',     '21',
        '20',     '19',
        '18',     '17',
        '16',     '15'
        ]
    */

    return {
            finaldate : finaldate , 
            finalSum : finalSum
        }



}

export default calcDayTradeSum