import React, { useEffect, useState } from 'react';

interface GrantCompetition {
  id: number;
  title: string;
  dates: string;
  format: string;
  region: string;
  description: string;
  methodology: string;
  amount: string;
  grantorId: number;
}

export default function NewCompetition({
  onSaved,
  editData,
  cancelEdit,
}: {
  onSaved: (list: GrantCompetition[]) => void;
  editData?: GrantCompetition | null;
  cancelEdit?: () => void;
}) {
  const [form, setForm] = useState<GrantCompetition>(editData || {
    id: Date.now(),
    title: '',
    dates: '',
    format: '',
    region: '',
    description: '',
    methodology: '',
    amount: '',
    grantorId: 0,
  });

  const [grantors, setGrantors] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('grantors') || '[]');
    setGrantors(stored);
  }, []);

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'grantorId' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('competitions') || '[]');

    let updated;
    if (editData) {
      updated = existing.map((c: GrantCompetition) =>
        c.id === editData.id ? form : c
      );
    } else {
      updated = [...existing, { ...form, id: Date.now() }];
    }

    localStorage.setItem('competitions', JSON.stringify(updated));
    onSaved(updated);
    setForm({
      id: Date.now(),
      title: '',
      dates: '',
      format: '',
      region: '',
      description: '',
      methodology: '',
      amount: '',
      grantorId: 0,
    });
    cancelEdit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Название" />
      <input type="date" name="dates" value={form.dates} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
      <input name="format" value={form.format} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Формат" />
      <input name="region" value={form.region} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Регион" />
      <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Описание" />
      <textarea name="methodology" value={form.methodology} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Методология" />
      <input name="amount" value={form.amount} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Сумма" />
      <select name="grantorId" value={form.grantorId} onChange={handleChange} className="w-full border px-4 py-2 rounded">
        <option value={0}>Выберите грантодателя</option>
        {grantors.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editData ? 'Сохранить изменения' : 'Создать конкурс'}
        </button>
        {editData && (
          <button type="button" onClick={cancelEdit} className="text-gray-500 underline">
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}