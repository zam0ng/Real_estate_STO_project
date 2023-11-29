
interface IPublicOfferingItem {
    subscription_name: string;
    subscription_order_totalprice: string;
    subscription_totalprice: string;
  }

const calcRatio = ( publicOfferingData : IPublicOfferingItem[]) => {

    let ratio = 0;
    let totalOrderSum = 0;
    let totalPriceSum = 0; 

    if (publicOfferingData){
        const totalOrderArr = publicOfferingData.map((item: IPublicOfferingItem) =>
        Number(item.subscription_order_totalprice)
      );
      const totalPriceArr = publicOfferingData.map((item: IPublicOfferingItem) =>
        Number(item.subscription_totalprice)
      );
    
      const totalOrderSum = totalOrderArr.reduce(
        (sum: number, current: number) => sum + current,
        0
      );
      const totalPriceSum = totalPriceArr.reduce(
        (sum: number, current: number) => sum + current,
        0
      );
      console.log(totalPriceSum, totalOrderSum, "totalOrderSum");
    
      const ratio = totalOrderSum / totalPriceSum;
      console.log(ratio, "ratio👉");

    }
        return { 
            ratio, 
            totalOrderSum,
            totalPriceSum,
        }
    

}

export default calcRatio