import gravatar from 'gravatar';
/*
  /admin/blacklist 경로에서, 'user_email,' 키로 이메일 값이 들어옴
*/

interface BlacklistUserProps {
  user_profile_img : string
}

const BlacklistUser:React.FC<BlacklistUserProps> = ( {user_profile_img} ) => {
  
  return (
    <>
      <div className="rounded-full w-4.5rem h-4.5rem bg-lime-100 overflow-hidden flex items-end		">

        <img 
          src={gravatar.url( 
            user_profile_img,  // 사용자 이메일별로 다른 그림이 그려짐 
            {s:'68px' ,   // 사이즈 조절  
                      d : 'robohash'    // 변경하면 -> 다른 버전으로 그려짐 | 구체적인 버전은 npm 확인해야 함 
                    }
          )}
          alt = "유저 gravatar 이미지"        
        />  
        
      </div>
    </>
  );
};

export default BlacklistUser;
