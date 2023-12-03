import React from 'react';

interface DescriptionProps {
  description: string;
}

const PropertyDescription: React.FC<DescriptionProps> = ({description}) => {
  return (
    <div className='w-[120%] h-1/3 flex justify-start items-center text-xs-sm pl-3'>
      {description}
    </div>
  )
}

export default PropertyDescription;