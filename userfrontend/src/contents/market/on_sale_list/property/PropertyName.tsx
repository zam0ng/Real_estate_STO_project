import React from 'react';

interface NameProps {
  name: string;
}

const PropertyName: React.FC<NameProps> = ({name}) => {
  return (
    <div className='w-full h-2/3 flex justify-start items-center text-base pl-3'>
      {name}
    </div>
  )
}

export default PropertyName;