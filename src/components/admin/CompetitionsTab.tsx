// ✅ CompetitionsTab.tsx с типами для конкурсов
import React, { useEffect, useState } from 'react';

interface Competition {
  id: number;
  title: string;
  dates: string;
  format: string;
  region: string;
  description: string;
  methodology: string;
  amount: string;
  grantorId: number;
  types: string[];
}

interface Grantor {
  id: number;
  name: string;
}

export default function CompetitionsTab() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [grantors, setGrantors] = useState<Grantor[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editing, setEditing] = useState<Competition | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const allTypes = ['Физические лица', 'Юридические лица', 'НКО', 'ИП', 'Субсидии'];

  const emptyForm: Competition = {
    id: Date.now(),
    title: '',
    dates: '',
    format: '',
    region: '',
    description: '',
    methodology: '',
    amount: '',
    grantorId: 0,
    types: [],
  };

  const [form, setForm] = useState<Competition>(emptyForm);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('competitions') || '[]');
    const g = JSON.parse(localStorage.getItem('grantors') || '[]');
    setCompetitions(stored);
    setGrantors(g);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (form.title.trim().length < 3) newErrors.title = 'Минимум 3 символа';
    if (!form.dates) newErrors.dates = 'Дата обязательна';
    if (form.format.trim().length < 3) newErrors.format = 'Минимум 3 символа';
    if (form.region.trim().length < 2) newErrors.region = 'Минимум 2 символа';
    if (form.description.trim().length < 10) newErrors.description = 'Минимум 10 символов';
    if (form.methodology.trim().length < 10) newErrors.methodology = 'Минимум 10 символов';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      newErrors.amount = 'Введите корректную сумму';
    }
    if (form.grantorId === 0) newErrors.grantorId = 'Выберите грантодателя';
    if (form.types.length === 0) newErrors.types = 'Укажите хотя бы один тип';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const isEdit = competitions.some((c) => c.id === form.id);
    const updated = isEdit
      ? competitions.map((c) => (c.id === form.id ? form : c))
      : [...competitions, { ...form, id: Date.now() }];
    localStorage.setItem('competitions', JSON.stringify(updated));
    setCompetitions(updated);
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    if (!confirm('Удалить конкурс?')) return;
    const updated = competitions.filter((c) => c.id !== id);
    localStorage.setItem('competitions', JSON.stringify(updated));
    setCompetitions(updated);
    if (expandedId === id) setExpandedId(null);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowModal(true);
    setErrors({});
  };

  const openEdit = (c: Competition) => {
    setForm(c);
    setEditing(c);
    setShowModal(true);
    setErrors({});
  };

  const placeholders: Record<string, string> = {
    title: 'Напишите название конкурса',
    dates: 'Выберите дату проведения конкурса',
    format: 'Например: онлайн, офлайн, гибридный',
    region: 'Укажите регион проведения',
    description: 'Краткое описание целей и условий конкурса',
    methodology: 'Опишите методические рекомендации, если есть',
    amount: 'Введите сумму финансирования, например: 100000'
  };

  const filtered = competitions.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Создать конкурс
        </button>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600">Конкурсы не найдены</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((c) => (
            <li key={c.id} className="border rounded p-4 bg-white">
              <div className="flex justify-between items-center">
                <strong>{c.title}</strong>
                <div className="flex gap-2">
                  <button
                    onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {expandedId === c.id ? 'Скрыть' : 'Подробнее'}
                  </button>
                  <button
                    onClick={() => openEdit(c)}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              {expandedId === c.id && (
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p><strong>Даты:</strong> {c.dates}</p>
                  <p><strong>Формат:</strong> {c.format}</p>
                  <p><strong>Регион:</strong> {c.region}</p>
                  <p><strong>Сумма:</strong> {c.amount}</p>
                  <p><strong>Типы:</strong> {c.types.join(', ')}</p>
                  <p><strong>Описание:</strong> {c.description}</p>
                  <p><strong>Методология:</strong> {c.methodology}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Модалка */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto p-6 max-w-xl w-full shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? 'Редактировать конкурс' : 'Новый конкурс'}
            </h2>
            <div className="space-y-3">
              {['title', 'dates', 'format', 'region', 'description', 'methodology', 'amount'].map((field) => (
                <div key={field}>
                  {field === 'description' || field === 'methodology' ? (
                    <textarea
                      name={field}
                      value={(form as any)[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      placeholder={placeholders[field]}
                      className="w-full border px-3 py-2 rounded"
                    />
                  ) : (
                    <input
                      type={field === 'dates' ? 'date' : 'text'}
                      name={field}
                      value={(form as any)[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      placeholder={placeholders[field]}
                      className="w-full border px-3 py-2 rounded"
                    />
                  )}
                  {errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>}
                </div>
              ))}

              <div>
                <p className="text-sm font-medium mb-1">Типы:</p>
                <div className="flex flex-wrap gap-4">
                  {allTypes.map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.types.includes(t)}
                        onChange={() => {
                          setForm((prev) => ({
                            ...prev,
                            types: prev.types.includes(t)
                              ? prev.types.filter((x) => x !== t)
                              : [...prev.types, t],
                          }));
                        }}
                      />
                      {t}
                    </label>
                  ))}
                </div>
                {errors.types && <p className="text-sm text-red-600 mt-1">{errors.types}</p>}
              </div>

              <div>
                <select
                  name="grantorId"
                  value={form.grantorId}
                  onChange={(e) => setForm({ ...form, grantorId: +e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value={0}>Выберите грантодателя</option>
                  {grantors.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                {errors.grantorId && <p className="text-sm text-red-600 mt-1">{errors.grantorId}</p>}
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
                  {editing ? 'Сохранить' : 'Создать'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
