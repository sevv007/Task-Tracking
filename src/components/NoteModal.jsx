
import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  FileText,
  Tag,
  Palette,
  Sparkles,
  Check,
} from 'lucide-react';

const noteColors = [
  { name: 'Kırmızı', value: '#a33353' },
  { name: 'Pembe', value: '#c96378' },
  { name: 'Açık Pembe', value: '#e49aaf' },
  { name: 'Çok Açık Pembe', value: '#edbec8' },
];

const categories = [
  'Personal',
  'Work',
  'Ideas',
  'Journal',
  'Learning',
];

const NoteModal = ({
  notes = [],
  setNotes,
  darkMode,
  editingItem,
  onClose,
}) => {
  const [noteForm, setNoteForm] = useState({
    title: '',
    content: '',
    category: 'Personal',
    tags: [],
    reminder: '',
    starred: false,
    archived: false,
    color: noteColors[0].value,
  });

  useEffect(() => {
    if (editingItem) {
      setNoteForm({
        title: editingItem.title || '',
        content: editingItem.content || '',
        category: editingItem.category || 'Personal',
        tags: editingItem.tags || [],
        reminder: editingItem.reminder || '',
        starred: editingItem.starred || false,
        archived: editingItem.archived || false,
        color: editingItem.color || noteColors[0].value,
      });
    } else {
      setNoteForm({
        title: '',
        content: '',
        category: 'Personal',
        tags: [],
        reminder: '',
        starred: false,
        archived: false,
        color: noteColors[0].value,
      });
    }
  }, [editingItem]);

  const handleChange = (field, value) => {
    setNoteForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: editingItem ? editingItem.id : Date.now(),
      ...noteForm,
      createdAt: editingItem ? editingItem.createdAt : new Date(),
      updatedAt: new Date(),
    };

    if (editingItem) {
      setNotes(
        notes.map((note) =>
          note.id === editingItem.id ? newNote : note
        )
      );
    } else {
      setNotes([...notes, newNote]);
    }

    onClose();
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none
    transition-all duration-200 focus:ring-2 focus:ring-blue-500/30
    focus:border-blue-500 ${darkMode
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
      : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'
    }`;

  const labelClass = `block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg max-h-[90vh] overflow-y-auto
          rounded-3xl shadow-2xl border animate-in fade-in zoom-in-95 duration-200 ${darkMode
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-white'
          }`}
      >
        {/* HEADER */}
        <div className={`sticky top-0 z-10 px-6 py-5 border-b ${darkMode
          ? 'bg-gray-900 border-gray-700'
          : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center
                bg-gradient-to-br from-blue-700 to-cyan-500
                shadow-md shadow-blue-500/20">
                <FileText className="w-5 h-5 text-white" />
              </div>

              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                  {editingItem ? 'Notu Düzenle' : 'Yeni Not Oluştur'}
                </h2>

                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                  {editingItem
                    ? 'Notunuzu güncelleyin ve değişiklikleri kaydedin'
                    : 'Düşüncelerinizi ve fikirlerinizi not edin'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={`p-2.5 rounded-xl transition-colors ${darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                }`}
              aria-label="Pencereyi kapat"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* TITLE */}
          <div>
            <label className={labelClass}>
              Not Başlığı
            </label>

            <input
              type="text"
              placeholder="Notunuza bir başlık verin..."
              value={noteForm.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={inputClass}
              required
              autoFocus
            />
          </div>

          {/* CONTENT */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelClass}>
                İçerik
              </label>

              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                {noteForm.content.length} karakter
              </span>
            </div>

            <textarea
              placeholder="Düşüncelerinizi yazmaya başlayın..."
              value={noteForm.content}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={6}
              className={`${inputClass} resize-none leading-relaxed`}
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                Kategori
              </span>
            </label>

            <select
              value={noteForm.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={inputClass}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {{ Personal: 'Kişisel', Work: 'İş', Ideas: 'Fikirler', Journal: 'Günlük', Learning: 'Öğrenme' }[category]}
                </option>
              ))}
            </select>
          </div>

          {/* COLOR SELECTION */}
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-600" />
                Not Rengi
              </span>
            </label>

            <div className={`flex items-center gap-3 p-4 rounded-xl border ${darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gray-50 border-gray-100'
              }`}>
              {noteColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleChange('color', color.value)}
                  title={color.name}
                  aria-label={`${color.name} rengini seç`}
                  className={`w-9 h-9 rounded-full transition-all
                    hover:scale-110 flex items-center justify-center ${noteForm.color === color.value
                      ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                      : ''
                    }`}
                  style={{
                    backgroundColor: color.value,
                    '--tw-ring-offset-color': darkMode ? '#1f2937' : '#f9fafb',
                  }}
                >
                  {noteForm.color === color.value && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </button>
              ))}

              <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                {noteColors.find((c) => c.value === noteForm.color)?.name || 'Özel'}
              </span>
            </div>
          </div>

          {/* STARRED OPTION */}
          <button
            type="button"
            onClick={() => handleChange('starred', !noteForm.starred)}
            className={`w-full flex items-center justify-between p-4
              rounded-xl border transition-all duration-200 ${noteForm.starred
                ? darkMode
                  ? 'bg-yellow-900/20 border-yellow-700/50'
                  : 'bg-yellow-50 border-yellow-200'
                : darkMode
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-gray-50 border-gray-100 hover:border-gray-200'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${noteForm.starred
                ? 'bg-yellow-100 dark:bg-yellow-900/40'
                : darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                <Star className={`w-5 h-5 ${noteForm.starred
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-400'
                  }`} />
              </div>

              <div className="text-left">
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                  Bu nota yıldız ekle
                </p>

                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                  Önemli notlarınıza kolayca ulaşın
                </p>
              </div>
            </div>

            <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${noteForm.starred
              ? 'bg-yellow-500 border-yellow-500'
              : darkMode
                ? 'border-gray-500'
                : 'border-gray-300'
              }`}>
              {noteForm.starred && (
                <Check className="w-3.5 h-3.5 text-white" />
              )}
            </div>
          </button>

          {/* FOOTER */}
          <div className={`flex flex-col-reverse sm:flex-row gap-3 pt-5 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'
            }`}>

            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold
                transition-all duration-200 ${darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              İptal
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl font-semibold
                text-white flex items-center justify-center gap-2
                bg-gradient-to-r from-blue-700 to-cyan-500
                shadow-md shadow-blue-500/20
                hover:shadow-lg hover:-translate-y-0.5
                transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              {editingItem ? 'Notu Güncelle' : 'Not Oluştur'}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
