import React from 'react';

interface NameProps {
  name: string;
}

const PropertyName: React.FC<NameProps> = ({name}) => {
  return (
    <div>PropertyName</div>
  )
}

export default PropertyName;