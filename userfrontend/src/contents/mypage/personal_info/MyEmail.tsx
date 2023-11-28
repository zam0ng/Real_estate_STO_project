import React from 'react';

interface UserEmailProps {
  email: string|undefined;
}

const MyEmail: React.FC<UserEmailProps> = ({email}) => {
  return (
    <div className='w-full h-[10%] flex justify-center items-center'>
        {email}
    </div>
  )
}

export default MyEmail;