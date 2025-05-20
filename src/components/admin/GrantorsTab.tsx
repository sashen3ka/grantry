import React, { useEffect, useState } from 'react';


interface Grantor {
  id: number;
  name: string;
  description: string;
  website?: string;
  vk?: string;
  telegram?: string;
}

interface Competition {
  id: number;
  title: string;
  grantorId: number;
}

export default function GrantorsTab() {
  const [grantors, setGrantors] = useState<Grantor[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editing, setEditing] = useState<Grantor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emptyForm: Grantor = {
    id: Date.now(),
    name: '',
    description: '',
    website: '',
    vk: '',
    telegram: '',
  };

  const [form, setForm] = useState<Grantor>(emptyForm);

  useEffect(() => {
    // Читаем из localStorage
    const storedRaw = localStorage.getItem('grantors');
    const stored: Grantor[] = storedRaw ? JSON.parse(storedRaw) : [];

    // Оставляем только первые вхождения по каждому id
    const uniqueGrantors = stored.filter((g, i, arr) =>
      arr.findIndex(x => x.id === g.id) === i
    );

    setGrantors(uniqueGrantors);
  }, []);


  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (form.name.trim().length < 3) newErrors.name = 'Укажите название (минимум 3 символа)';
    if (form.description.trim().length < 10) newErrors.description = 'Описание слишком короткое';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const isEdit = grantors.some((g) => g.id === form.id);
    const updated = isEdit
      ? grantors.map((g) => (g.id === form.id ? form : g))
      : [...grantors, { ...form, id: Date.now() }];
    localStorage.setItem('grantors', JSON.stringify(updated));
    setGrantors(updated);
    setForm(emptyForm);
    setEditing(null);
    setShowModal(false);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    if (!confirm('Удалить грантодателя?')) return;
    const updated = grantors.filter((g) => g.id !== id);
    localStorage.setItem('grantors', JSON.stringify(updated));
    setGrantors(updated);
  };

  const openEdit = (g: Grantor) => {
    setForm(g);
    setEditing(g);
    setShowModal(true);
    setErrors({});
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowModal(true);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Добавить грантодателя
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Список грантодателей</h2>
        {grantors.length === 0 ? (
          <p className="text-gray-600">Пока нет грантодателей</p>
        ) : (
          <ul className="space-y-4">
            {grantors.map((g) => (
              <li key={g.id} className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{g.name}</h3>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setExpandedId(expandedId === g.id ? null : g.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {expandedId === g.id ? 'Скрыть' : 'Подробнее'}
                    </button>
                    <button
                      onClick={() => openEdit(g)}
                      className="text-sm text-green-600 hover:underline"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                {expandedId === g.id && (
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Описание:</strong> {g.description}</p>
                    <p><strong>Сайт:</strong> {g.website || '—'}</p>
                    <p><strong>VK:</strong> {g.vk || '—'}</p>
                    <p><strong>Telegram:</strong> {g.telegram || '—'}</p>
                    <div>
                      <h4 className="font-medium">Конкурсы:</h4>
                      <ul className="list-disc list-inside text-sm">
                        {competitions.filter((c) => c.grantorId === g.id).map((c) => (
                          <li key={c.id}>{c.title}</li>
                        ))}
                        {competitions.filter((c) => c.grantorId === g.id).length === 0 && (
                          <p className="text-gray-500">Нет конкурсов</p>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? 'Редактировать грантодателя' : 'Новый грантодатель'}
            </h2>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Наименование организации"
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Описание деятельности и целей"
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="Сайт (https://...)"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="vk"
                  value={form.vk}
                  onChange={(e) => setForm({ ...form, vk: e.target.value })}
                  placeholder="Ссылка на VK"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="telegram"
                  value={form.telegram}
                  onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                  placeholder="Ссылка на Telegram"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editing ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
