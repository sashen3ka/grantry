import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { grantors } from '../data/grantors';

const GrantorProfile = () => {
  const { id } = useParams();
  const [grantor, setGrantor] = useState<any>(null);

  useEffect(() => {
    const found = grantors.find((g) => g.id === Number(id));
    setGrantor(found);
  }, [id]);

  if (!grantor) return <div className="p-6">Грантодатель не найден</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{grantor.name}</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Тип финансирования</h2>
        <p>{Array.isArray(grantor.type) ? grantor.type.join(', ') : grantor.type}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Описание</h2>
        <p>{grantor.description}</p>
      </div>
    </div>
  );
};

export default GrantorProfile;
