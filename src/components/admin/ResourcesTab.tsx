import React, { useEffect, useState } from 'react';

interface Resource {
  id: number;
  title: string;
  content: string;
  link?: string;
}

export default function ResourcesTab() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Resource>({
    id: Date.now(),
    title: '',
    content: '',
    link: '',
  });
  const [editing, setEditing] = useState<Resource | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('resources') || '[]');
    setResources(stored);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const normalizeLink = (url: string) => {
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) return 'https://' + url;
    return url;
  };

  const hasOnlyLetters = (text: string) => {
    return /^[^\d]+$/u.test(text.trim());
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (form.title.trim().length < 5) newErrors.title = 'Заголовок слишком короткий';
    else if (!hasOnlyLetters(form.title)) newErrors.title = 'Заголовок не должен содержать цифры';
    if (form.content.trim().length < 10) newErrors.content = 'Описание слишком короткое';
    else if (!hasOnlyLetters(form.content)) newErrors.content = 'Описание не должно содержать цифры';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const updated = editing
      ? resources.map((r) => (r.id === form.id ? { ...form, link: normalizeLink(form.link || '') } : r))
      : [...resources, { ...form, id: Date.now(), link: normalizeLink(form.link || '') }];
    localStorage.setItem('resources', JSON.stringify(updated));
    setResources(updated);
    setForm({ id: Date.now(), title: '', content: '', link: '' });
    setEditing(null);
    setErrors({});
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Удалить материал?')) return;
    const updated = resources.filter((r) => r.id !== id);
    localStorage.setItem('resources', JSON.stringify(updated));
    setResources(updated);
  };

  const openCreate = () => {
    setForm({ id: Date.now(), title: '', content: '', link: '' });
    setEditing(null);
    setShowModal(true);
    setErrors({});
  };

  const openEdit = (r: Resource) => {
    setForm(r);
    setEditing(r);
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
          Добавить материал
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Полезные материалы</h2>
        {resources.length === 0 ? (
          <p className="text-gray-600">Материалы пока не добавлены</p>
        ) : (
          <ul className="space-y-4">
            {resources.map((r) => (
              <li
                key={r.id}
                className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2 relative z-10"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {expandedId === r.id ? 'Скрыть' : 'Подробнее'}
                    </button>
                    <button
                      onClick={() => openEdit(r)}
                      className="text-sm text-green-600 hover:underline"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                {expandedId === r.id && (
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>{r.content}</p>
                    {r.link && (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm underline"
                      >
                        Перейти по ссылке
                      </a>
                    )}
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
              {editing ? 'Редактировать материал' : 'Новый материал'}
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Заголовок"
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
              </div>
              <div>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Описание или совет"
                  className="w-full border px-3 py-2 rounded h-24"
                />
                {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="Ссылка (необязательно)"
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
                  onClick={handleSubmit}
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
