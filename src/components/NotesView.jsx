
import React from 'react';
import {
  Search,
  Plus,
  FileText,
  Star,
  Archive,
  Trash2,
  MoreVertical,
  ChevronDown,
  Tag,
  CalendarDays,
  StickyNote,
  Sparkles,
} from 'lucide-react';

import { getFilteredNotes, getNoteColor } from '../utils/helpers';

const NotesView = ({
  notes = [],
  setNotes,
  darkMode,
  searchTerm,
  setSearchTerm,
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  setEditingItem,
  setShowModal,
  setModalType,
}) => {
  const filteredNotes = getFilteredNotes(
    notes,
    filterBy,
    searchTerm,
    sortBy
  );

  const toggleStarred = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, starred: !note.starred, updatedAt: new Date() }
          : note
      )
    );
  };

  const archiveItem = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, archived: !note.archived, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteItem = (id) => {
    const confirmed = window.confirm(
      'Bu notu silmek istediğinizden emin misiniz?'
    );

    if (!confirmed) return;

    setNotes(notes.filter((note) => note.id !== id));
  };

  const editItem = (note) => {
    setEditingItem({ ...note, type: 'note' });
    setModalType('note');
    setShowModal(true);
  };

  const handleNewNote = () => {
    setModalType('note');
    setEditingItem(null);
    setShowModal(true);
  };

  const cardClass = darkMode
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-100';

  const mutedText = darkMode
    ? 'text-gray-400'
    : 'text-gray-500';

  const inputClass = `w-full py-3 rounded-xl border outline-none
    transition-all duration-200 focus:ring-2 focus:ring-[#c96378]/30
    focus:border-[#c96378] ${darkMode
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
    }`;

  const getDate = (date) => {
    if (!date) return 'Tarih yok';

    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCategoryStyle = (category) => {
    const styles = {
      Personal: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
      Work: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      Ideas: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      Journal: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      Learning: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    };

    return styles[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className={`mx-auto w-full max-w-7xl min-h-full p-4 md:p-6 lg:p-8 space-y-6 ${darkMode ? 'text-white' : 'text-gray-800'
      }`}>

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 mb-1">
            <StickyNote className="w-6 h-6 text-[#c96378]" />
            <h1 className="text-2xl font-bold tracking-tight">
              Notlarım
            </h1>
          </div>

          <p className={`text-sm ${mutedText}`}>
            Düşüncelerinizi, fikirlerinizi ve önemli bilgileri düzenleyin.
          </p>
        </div>

        <button
          onClick={handleNewNote}
          className="flex items-center justify-center gap-2 px-5 py-3
            rounded-xl bg-gradient-to-r from-blue-700 to-cyan-500
            text-white font-semibold shadow-md shadow-blue-500/20
            hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Yeni Not
        </button>

      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className={`rounded-2xl border p-5 shadow-sm ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${mutedText}`}>
                Toplam Not
              </p>
              <h3 className="text-3xl font-bold mt-2">
                {notes.filter((note) => !note.archived).length}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#c96378]" />
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-5 shadow-sm ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${mutedText}`}>
                Yıldızlı Notlar
              </p>
              <h3 className="text-3xl font-bold mt-2">
                {notes.filter((note) => note.starred && !note.archived).length}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-5 shadow-sm ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${mutedText}`}>
                Arşivlenmiş Notlar
              </p>
              <h3 className="text-3xl font-bold mt-2">
                {notes.filter((note) => note.archived).length}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Archive className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

      </div>

      {/* SEARCH AND FILTER */}
      <div className={`rounded-2xl border p-5 md:p-6 shadow-sm ${cardClass}`}>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-bold">
              Tüm Notlar
            </h2>
            <p className={`text-sm mt-1 ${mutedText}`}>
              {filteredNotes.length} not bulundu
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-[#c96378]" />
            <span className={mutedText}>
              Fikirleriniz için kişisel alanınız
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_190px_210px] gap-3">

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Notlarınızda arayın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${inputClass} pl-12 pr-4`}
            />
          </div>

          {/* FILTER */}
          <div className="relative">
            <select
              id="note-filter"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className={`${inputClass} appearance-none px-4 pr-10 cursor-pointer`}
            >
              <option value="" disabled hidden>
                Filtrele...
              </option>
              <option value="all">Tüm Notlar</option>
              <option value="starred">Yıldızlı</option>
              <option value="archived">Arşivlenmiş</option>
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* SORT */}
          <div className="relative">
            <select
              id="note-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`${inputClass} appearance-none px-4 pr-10 cursor-pointer`}
            >
              <option value="" disabled hidden>
                Sırala...
              </option>
              <option value="created">Son oluşturulan</option>
              <option value="updated">Son güncellenen</option>
              <option value="title">Alfabetik</option>
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* NOTES GRID */}
      {filteredNotes.length === 0 ? (

        <div className={`rounded-2xl border p-12 text-center shadow-sm ${cardClass}`}>
          <div className="w-20 h-20 rounded-3xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-5">
            <FileText className="w-9 h-9 text-[#c96378]" />
          </div>

          <h3 className="text-lg font-bold mb-2">
            Not bulunamadı
          </h3>

          <p className={`text-sm mb-5 ${mutedText}`}>
            {searchTerm
              ? 'Farklı bir anahtar kelimeyle aramayı deneyin.'
              : 'İlk notunuzu oluşturun ve fikirlerinizi düzenli tutun.'}
          </p>

          {!searchTerm && (
            <button
              onClick={handleNewNote}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-[#a33353] to-[#c96378]
                text-white text-sm font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              İlk Notu Oluştur
            </button>
          )}
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">

          {filteredNotes.map((note) => (

            <div
              key={note.id}
              onClick={() => editItem(note)}
              className={`group relative min-h-[230px] p-5 rounded-2xl
                border cursor-pointer transition-all duration-200
                hover:-translate-y-1 hover:shadow-lg ${getNoteColor(note.color)
                }`}
            >

              {/* CARD TOP */}
              <div className="flex items-start justify-between gap-3 mb-4">

                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/60 dark:bg-gray-800/50 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60">
                      {{ Personal: 'Kişisel', Work: 'İş', Ideas: 'Fikirler', Journal: 'Günlük', Learning: 'Öğrenme' }[note.category] || note.category || 'Not'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">

                  {note.starred && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}

                  {/* MORE MENU */}
                  <details className="relative" onClick={(e) => e.stopPropagation()}>
                    <summary
                      className="list-none cursor-pointer p-2 rounded-lg opacity-70 hover:opacity-100
                        hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      aria-label="Diğer not seçeneklerini aç veya kapat"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </summary>

                    <div className={`absolute right-0 top-full w-48
                      rounded-xl shadow-xl border z-20 ${darkMode
                        ? 'bg-gray-800 border-gray-700 text-gray-200'
                        : 'bg-white border-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="p-2">

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStarred(note.id);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-rose-50 hover:text-[#a33353] dark:hover:bg-gray-700 transition-colors"
                        >
                          <Star className="w-4 h-4" />
                          {note.starred ? 'Yıldızı Kaldır' : 'Favorilere Ekle'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            archiveItem(note.id);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-rose-50 hover:text-[#a33353] dark:hover:bg-gray-700 transition-colors"
                        >
                          <Archive className="w-4 h-4" />
                          {note.archived ? 'Arşivden Çıkar' : 'Arşivle'}
                        </button>

                        <div className={`my-1 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'
                          }`} />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(note.id);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Sil
                        </button>

                      </div>
                    </div>
                  </details>
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-bold leading-snug line-clamp-2 mb-3">
                {note.title || 'Başlıksız Not'}
              </h3>

              {/* CONTENT */}
              <p className="text-sm leading-relaxed line-clamp-4 opacity-75 mb-5 whitespace-pre-wrap">
                {note.content}
              </p>

              {/* CARD FOOTER */}
              <div className="absolute bottom-0 left-5 right-5 py-4 border-t border-current/10 flex items-center justify-between gap-2">

                <span className="flex items-center gap-1.5 text-xs opacity-70 min-w-0">
                  <Tag className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">
                    {{ Personal: 'Kişisel', Work: 'İş', Ideas: 'Fikirler', Journal: 'Günlük', Learning: 'Öğrenme' }[note.category] || note.category}
                  </span>
                </span>

                <span className="flex items-center gap-1.5 text-xs opacity-60 flex-shrink-0">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {getDate(note.updatedAt)}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default NotesView;
