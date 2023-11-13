import React from 'react';

interface DescriptionProps {
  description: string;
}

const PropertyDescription: React.FC<DescriptionProps> = ({description}) => {
  return (
    <div>PropertyReturnValue</div>
  )
}

export default PropertyDescription;