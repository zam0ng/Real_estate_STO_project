import { SubDetail } from "../../../features/SubDetail";
import Slider from "../../../components/Slider";

type DetailPicturesType = {
  detail: SubDetail;
};

export default function DetailPictures({ detail }: DetailPicturesType) {
  let slides = [];

  for (let i = 1; i <= 5; i++) {
    const key = `subscription_img_${i}` as keyof SubDetail;
    const imgUrl = detail[key];
    if (imgUrl) {
      slides.push({ url: imgUrl });
    }
  }

  // const slides = [
  //     {url : images/sliderdummy/dummy1.jpg},
  //     {url : images/sliderdummy/dummy2.jpg},
  //     {url : images/sliderdummy/dummy3.jpg},
  // ]

  return (
    <>
      <div className=" w-screen h-1/5 ">
        <div className=" h-12 w-4/5 ml-3 ">
          <div className=" h-12 font-extrabold text-3xl pt-2 ml-2 border-b-4 ">
            {detail.subscription_name}
          </div>
          <div className="text-sm font-semibold ml-3 mt-1">
            {detail.subscription_description}
          </div>
        </div>
        <div className="  pt-10">
          <Slider width="w-[screen]" slides={slides} />
        </div>
      </div>
    </>
  );
}
