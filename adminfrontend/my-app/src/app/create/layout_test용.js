export default function Layout (props) {

    return (
        <form>

            <p> create 폴더 안에, layout.js 가 있으면, layout.js 안의 children 에 꽂힘! </p>
            {props.children} 

        </form>

    )

}