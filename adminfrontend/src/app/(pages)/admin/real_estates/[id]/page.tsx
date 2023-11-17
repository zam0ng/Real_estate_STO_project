

// props가 { params: { id: string } } 형태의 객체라고 가정
interface ReadProps {
    params : {
    id : string;
    }
}


export default async function ReadEstateItem(props : ReadProps) {
    // 사용자와 상호작용이 없으므로, 서버 컴포넌트로 만들면 됨.
    const resp = await fetch(`http:localhost:9999/topics/${props.params.id}`, {
    cache: "no-store",
    });

    const topic = await resp.json();

    return (
    <>
        <h2> Read 임!!! </h2>

        <p> topic의 title 가져오기 : {topic.title} </p>
        <p> topic의 body 가져오기 : {topic.body} </p>

        <p>
        이곳은 몇 편의 글이 생겨날지 모르는 곳. <br></br>
        그래서, 미리 만들어 둘 수 없음. <br></br>
        그래서, 만드는 순간! id 값이 정해지는 '동적 라우팅' 을 하려는 곳{" "}
        <br></br>
        {/* 사용된 매개변수 뽑기 */}이 글의 parameter : {props.params.id}
        </p>
    </>
    );
}
