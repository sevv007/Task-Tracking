
import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  CalendarDays,
  Clock,
  Tag,
  Flag,
  AlignLeft,
  Check,
  Sparkles,
  ListTodo
} from 'lucide-react';

const TaskModal = ({
  todos,
  setTodos,
  darkMode,
  editingItem,
  onClose,
  categories
}) => {
  const initialForm = {
    title: '',
    description: '',
    category: 'Work',
    priority: 'medium',
    dueDate: '',
    dueTime: '',
    completed: false,
    tags: [],
    starred: false,
    archived: false
  };

  const [taskForm, setTaskForm] = useState(initialForm);

  useEffect(() => {
    if (editingItem) {
      setTaskForm({
        title: editingItem.title || '',
        description: editingItem.description || '',
        category: editingItem.category || 'Work',
        priority: editingItem.priority || 'medium',
        dueDate: editingItem.dueDate || '',
        dueTime: editingItem.dueTime || '',
        completed: editingItem.completed || false,
        tags: editingItem.tags || [],
        starred: editingItem.starred || false,
        archived: editingItem.archived || false
      });
    } else {
      setTaskForm(initialForm);
    }
  }, [editingItem]);

  const updateField = (field, value) => {
    setTaskForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: editingItem ? editingItem.id : Date.now(),
      ...taskForm,
      createdAt: editingItem ? editingItem.createdAt : new Date(),
      updatedAt: new Date()
    };

    if (editingItem) {
      setTodos(todos.map(todo =>
        todo.id === editingItem.id ? newTask : todo
      ));
    } else {
      setTodos([...todos, newTask]);
    }

    onClose();
  };

  const priorities = [
    {
      value: 'low',
      label: 'Düşük',
      color: 'text-emerald-500',
      active: darkMode
        ? 'bg-emerald-500/15 border-emerald-500'
        : 'bg-emerald-50 border-emerald-400'
    },
    {
      value: 'medium',
      label: 'Orta',
      color: 'text-amber-500',
      active: darkMode
        ? 'bg-amber-500/15 border-amber-500'
        : 'bg-amber-50 border-amber-400'
    },
    {
      value: 'high',
      label: 'Yüksek',
      color: 'text-rose-500',
      active: darkMode
        ? 'bg-rose-500/15 border-rose-500'
        : 'bg-rose-50 border-rose-400'
    }
  ];

  const inputClass = `
    w-full rounded-xl border px-4 py-3
    text-sm outline-none transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
    ${darkMode
      ? 'bg-gray-700/70 border-gray-600 text-white placeholder-gray-400'
      : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'
    }
  `;

  const labelClass = `
    flex items-center gap-2 mb-2
    text-sm font-semibold
    ${darkMode ? 'text-gray-300' : 'text-gray-700'}
  `;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative flex flex-col w-full max-w-lg
          max-h-[92vh] overflow-hidden rounded-3xl
          shadow-2xl border
          ${darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
          }
        `}
      >

        {/* Header */}
        <div className={`
          flex items-center justify-between px-6 py-5
          border-b
          ${darkMode ? 'border-gray-700' : 'border-gray-100'}
        `}>
          <div className="flex items-center gap-3">

            <div className="
              flex items-center justify-center
              w-11 h-11 rounded-2xl
              bg-gradient-to-br from-blue-700 to-cyan-500
              text-white shadow-md shadow-blue-500/20
            ">
              {editingItem
                ? <ListTodo size={21} />
                : <Sparkles size={21} />
              }
            </div>

            <div>
              <h2 className={`
                text-lg font-bold
                ${darkMode ? 'text-white' : 'text-gray-800'}
              `}>
                {editingItem ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}
              </h2>

              <p className={`
                text-xs mt-0.5
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}
              `}>
                {editingItem
                  ? 'Görev bilgilerinizi güncelleyin'
                  : 'İşlerinizi düzenleyin ve verimli kalın.'
                }
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Pencereyi kapat"
            className={`
              p-2.5 rounded-xl transition-colors
              ${darkMode
                ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
              }
            `}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col min-h-0"
        >
          <div className="overflow-y-auto px-6 py-6 space-y-5">

            {/* Title */}
            <div>
              <label className={labelClass}>
                Görev Başlığı
                <span className="text-blue-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Yapılması gereken nedir?"
                value={taskForm.title}
                onChange={(e) => updateField('title', e.target.value)}
                className={inputClass}
                required
                autoFocus
              />
            </div>

            {/* Açıklama */}
            <div>
              <label className={labelClass}>
                <AlignLeft size={15} />
                Açıklama
              </label>

              <textarea
                placeholder="Görevinizle ilgili ayrıntıları ekleyin..."
                value={taskForm.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Kategori */}
            <div>
              <label className={labelClass}>
                <Tag size={15} />
                Kategori
              </label>

              <select
                value={taskForm.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={inputClass}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {{ Personal: 'Kişisel', Work: 'İş', Ideas: 'Fikirler', Journal: 'Günlük', Learning: 'Öğrenme' }[cat.name] || cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Öncelik */}
            <div>
              <label className={labelClass}>
                <Flag size={15} />
                Öncelik
              </label>

              <div className="grid grid-cols-3 gap-3">
                {priorities.map(priority => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => updateField('priority', priority.value)}
                    className={`
                      flex items-center justify-center gap-2
                      py-3 px-2 rounded-xl border
                      text-sm font-semibold transition-all
                      ${taskForm.priority === priority.value
                        ? priority.active
                        : darkMode
                          ? 'bg-gray-700/50 border-gray-600 text-gray-400 hover:border-gray-500'
                          : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                      }
                    `}
                  >
                    <span className={priority.color}>●</span>
                    {priority.label}

                    {taskForm.priority === priority.value && (
                      <Check size={14} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>
                  <CalendarDays size={15} />
                  Bitiş Tarihi
                </label>

                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => updateField('dueDate', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Clock size={15} />
                  Bitiş Saati
                </label>

                <input
                  type="time"
                  value={taskForm.dueTime}
                  onChange={(e) => updateField('dueTime', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Starred */}
            <button
              type="button"
              onClick={() => updateField('starred', !taskForm.starred)}
              className={`
                w-full flex items-center justify-between
                p-4 rounded-xl border transition-all
                ${taskForm.starred
                  ? darkMode
                    ? 'bg-amber-500/10 border-amber-500/40'
                    : 'bg-amber-50 border-amber-200'
                  : darkMode
                    ? 'bg-gray-700/40 border-gray-600 hover:border-gray-500'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  flex items-center justify-center
                  w-9 h-9 rounded-xl
                  ${taskForm.starred
                    ? 'bg-amber-400/20 text-amber-500'
                    : darkMode
                      ? 'bg-gray-600 text-gray-400'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  <Star
                    size={18}
                    fill={taskForm.starred ? 'currentColor' : 'none'}
                  />
                </div>

                <div className="text-left">
                  <p className={`
                    text-sm font-semibold
                    ${darkMode ? 'text-gray-200' : 'text-gray-800'}
                  `}>
                    Önemli Görev
                  </p>
                  <p className={`
                    text-xs mt-0.5
                    ${darkMode ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    Bu görevi yıldızlı listenize ekleyin
                  </p>
                </div>
              </div>

              <div className={`
                w-5 h-5 rounded-full border flex items-center justify-center
                ${taskForm.starred
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : darkMode
                    ? 'border-gray-500'
                    : 'border-gray-300'
                }
              `}>
                {taskForm.starred && <Check size={12} />}
              </div>
            </button>

          </div>

          {/* Footer */}
          <div className={`
            flex gap-3 px-6 py-5 border-t
            ${darkMode
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-100 bg-gray-50/80'
            }
          `}>
            <button
              type="button"
              onClick={onClose}
              className={`
                flex-1 py-3 rounded-xl font-semibold text-sm
                transition-all
                ${darkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              İptal
            </button>

            <button
              type="submit"
              className="
                flex-1 flex items-center justify-center gap-2
                py-3 rounded-xl text-white text-sm font-semibold
                bg-gradient-to-r from-blue-700 to-cyan-500
                hover:from-blue-800 hover:to-cyan-600
                shadow-lg shadow-blue-500/20
                hover:shadow-xl hover:-translate-y-0.5
                transition-all duration-200
              "
            >
              <Check size={17} />
              {editingItem ? 'Görevi Güncelle' : 'Görev Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
