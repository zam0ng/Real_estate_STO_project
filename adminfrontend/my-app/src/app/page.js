import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      hello, web! <br></br>

      <br></br>
      
      {/* 정적 이미지 가져오기 */}
      <h3> 정적 이미지 가져오기 👇   </h3>
      <img src='/RYU_LUCKY.jpg' />  
    
    </>
  )
}
