import React from 'react';
import {
  Search,
  Plus,
  List,
  CheckSquare,
  Edit3,
  Star,
  Archive,
  Trash2,
  MoreVertical,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { getFilteredTasks, formatTime, getPriorityColor } from '../utils/helpers';

const TasksView = ({
  todos,
  setTodos,
  darkMode,
  selectedCategory,
  categories = [],
  searchTerm,
  setSearchTerm,
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  setEditingItem,
  setShowModal,
  setModalType,
}) => {
  const selectedCategoryConfig = categories.find((category) => category.name === selectedCategory);

  const filteredTasks = getFilteredTasks(
    todos,
    selectedCategory,
    filterBy,
    searchTerm,
    sortBy
  );

  const toggleTaskComplete = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date() : null, updatedAt: new Date() }
          : todo
      )
    );
  };

  const toggleStarred = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, starred: !todo.starred, updatedAt: new Date() }
          : todo
      )
    );
  };

  const archiveItem = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, archived: !todo.archived, updatedAt: new Date() }
          : todo
      )
    );
  };

  const deleteItem = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const editItem = (task) => {
    setEditingItem({ ...task, type: 'task' });
    setModalType('task');
    setShowModal(true);
  };

  const handleNewTask = () => {
    setModalType('task');
    setEditingItem(null);
    setShowModal(true);
  };

  const isTaskOverdue = (task) => {
    if (!task.dueDate || task.completed) return false;

    const [year, month, day] = task.dueDate.split('-').map(Number);
    const [hours, minutes] = (task.dueTime || '23:59').split(':').map(Number);
    const dueDateTime = new Date(year, month - 1, day, hours, minutes || 0);

    return dueDateTime < new Date();
  };

  const surface = darkMode
    ? 'border-gray-700 bg-gray-800'
    : 'border-slate-100 bg-white';

  const mutedText = darkMode ? 'text-slate-400' : 'text-slate-500';

  const selectClass = `w-full appearance-none rounded-xl border py-3 pl-4 pr-10 text-sm font-medium outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${darkMode
    ? 'border-slate-700 bg-slate-800 text-slate-100'
    : 'border-slate-200 bg-white text-slate-700'
    }`;

  return (
    <main
      className={`min-h-full p-4 sm:p-6 lg:p-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}
    >
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Başlık ve filtreler */}
        <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${selectedCategoryConfig?.color || 'from-indigo-600 via-violet-600 to-purple-700'} p-6 shadow-xl shadow-indigo-200/30 sm:p-8`}>
          <div className="relative z-10 mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-100">
                  Görev alanı
                </span>
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {selectedCategory ? `${{ Personal: 'Kişisel', Work: 'İş', Ideas: 'Fikirler', Journal: 'Günlük', Learning: 'Öğrenme' }[selectedCategory] || selectedCategory} görevleri` : 'Görevlerim'}
              </h1>
              <p className="mt-2 text-sm text-indigo-100">
                {filteredTasks.length} görev görüntüleniyor
              </p>
            </div>

            <button
              onClick={handleNewTask}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              <Plus className="h-5 w-5" />
              Yeni görev
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_190px_190px_auto]">
            <label className="relative block">
              <span className="sr-only">Görevlerde ara</span>
              <Search
                className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${mutedText}`}
              />
              <input
                type="search"
                placeholder="Görevlerde ara..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${darkMode
                  ? 'border-slate-700 bg-slate-800 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-900 focus:bg-white'
                  }`}
              />
            </label>

            <label className="relative">
              <span className="sr-only">Görev filtresi</span>
              <select
                aria-label="Görev filtresi"
                value={filterBy}
                onChange={(event) => setFilterBy(event.target.value)}
                className={selectClass}
              >
                <option value="" disabled hidden>Filtrele</option>
                <option value="all">Tüm görevler</option>
                <option value="pending">Bekleyen</option>
                <option value="completed">Tamamlanan</option>
                <option value="starred">Yıldızlı</option>
                <option value="high">Yüksek öncelik</option>
                <option value="medium">Orta öncelik</option>
                <option value="low">Düşük öncelik</option>
                <option value="archived">Arşivlenen</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </label>

            <label className="relative">
              <span className="sr-only">Sıralama</span>
              <select
                aria-label="Görevleri sırala"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className={selectClass}
              >
                <option value="" disabled hidden>Sırala</option>
                <option value="created">En yeni oluşturulan</option>
                <option value="updated">Son güncellenen</option>
                <option value="due">Teslim tarihine göre</option>
                <option value="priority">Önceliğe göre</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </label>

            <div
              className={`flex items-center justify-center gap-1 rounded-xl border p-1 ${darkMode
                ? 'border-slate-700 bg-slate-800'
                : 'border-slate-200 bg-slate-50'
                }`}
              aria-label="Görünüm seçimi"
            >
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="Liste görünümü"
                aria-pressed={viewMode === 'list'}
                className={`rounded-lg p-2.5 transition ${viewMode === 'list'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : `${mutedText} hover:bg-slate-200/70 dark:hover:bg-slate-700`
                  }`}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Izgara görünümü"
                aria-pressed={viewMode === 'grid'}
                className={`rounded-lg p-2.5 transition ${viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : `${mutedText} hover:bg-slate-200/70 dark:hover:bg-slate-700`
                  }`}
              >
                <span className="grid h-5 w-5 grid-cols-2 gap-1" aria-hidden="true">
                  {[0, 1, 2, 3].map((item) => (
                    <span key={item} className="rounded-sm bg-current" />
                  ))}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Görevler */}
        {filteredTasks.length === 0 ? (
          <section className={`rounded-3xl border px-6 py-16 text-center shadow-sm ${surface}`}>
            <div
              className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-blue-50 text-blue-600'
                }`}
            >
              <CheckSquare className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-semibold">Görev bulunamadı</h2>
            <p className={`mx-auto mt-2 max-w-sm text-sm ${mutedText}`}>
              {searchTerm
                ? 'Arama kelimenizi değiştirmeyi deneyin.'
                : 'Başlamak için ilk görevinizi oluşturun.'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleNewTask}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                İlk görevi oluştur
              </button>
            )}
          </section>
        ) : (
          <section
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
                : 'space-y-3'
            }
          >
            {filteredTasks.map((task) => (
              <article
                key={task.id}
                className={`group rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${darkMode
                  ? 'border-gray-700 bg-gray-800 hover:border-indigo-500/50'
                  : 'border-slate-100 bg-white hover:border-indigo-100'
                  } ${task.completed ? 'opacity-70' : ''}`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleTaskComplete(task.id)}
                      aria-label={task.completed ? 'İşaretini kaldır' : 'Görevi tamamla'}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${task.completed
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-blue-500/15 dark:hover:text-blue-400'
                        }`}
                    >
                      <CheckSquare className="h-5 w-5" />
                    </button>
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${getPriorityColor(task.priority)}`}
                      title={`Öncelik: ${{ high: 'Yüksek', medium: 'Orta', low: 'Düşük' }[task.priority] || task.priority}`}
                    />
                    <span className={`text-xs font-medium capitalize ${mutedText}`}>
                      {{ high: 'Yüksek', medium: 'Orta', low: 'Düşük' }[task.priority] || task.priority} öncelik
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => toggleStarred(task.id)}
                      aria-label={task.starred ? 'Yıldızı kaldır' : 'Yıldız ekle'}
                      className={`rounded-lg p-2 transition hover:bg-amber-50 dark:hover:bg-amber-400/10 ${task.starred ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'
                        }`}
                    >
                      <Star className={`h-4 w-4 ${task.starred ? 'fill-current' : ''}`} />
                    </button>

                    <div className="relative">
                      <details className="relative" onClick={(event) => event.stopPropagation()}>
                        <summary
                          aria-label="Görev seçeneklerini aç veya kapat"
                          className={`list-none cursor-pointer rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 ${mutedText}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </summary>
                        <div
                          className={`absolute right-0 top-full z-20 w-44 rounded-xl border p-1.5 shadow-xl ${darkMode
                            ? 'border-slate-700 bg-slate-800'
                            : 'border-slate-200 bg-white'
                            }`}
                        >
                          <button
                            type="button"
                            onClick={() => editItem(task)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${darkMode
                              ? 'text-slate-200 hover:bg-slate-700'
                              : 'text-slate-700 hover:bg-slate-50'
                              }`}
                          >
                            <Edit3 className="h-4 w-4" />
                            Düzenle
                          </button>
                          <button
                            type="button"
                            onClick={() => archiveItem(task.id)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${darkMode
                              ? 'text-slate-200 hover:bg-slate-700'
                              : 'text-slate-700 hover:bg-slate-50'
                              }`}
                          >
                            <Archive className="h-4 w-4" />
                            {task.archived ? 'Arşivden çıkar' : 'Arşivle'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteItem(task.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            Sil
                          </button>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>

                <h2
                  className={`text-base font-semibold leading-6 ${task.completed ? 'text-slate-400 line-through' : ''
                    }`}
                >
                  {task.title}
                </h2>

                {task.description && (
                  <p
                    className={`mt-2 line-clamp-2 text-sm leading-6 ${task.completed
                      ? 'line-through'
                      : darkMode
                        ? 'text-slate-400'
                        : 'text-slate-600'
                      }`}
                  >
                    {task.description}
                  </p>
                )}

                <div
                  className={`mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${darkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium ${darkMode
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                      {task.category}
                    </span>
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium ${task.priority === 'high'
                        ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                        : task.priority === 'medium'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                        }`}
                    >
                      {{ high: 'Yüksek', medium: 'Orta', low: 'Düşük' }[task.priority] || task.priority}
                    </span>
                  </div>

                  {task.dueDate && (
                    <div
                      className={`flex items-center gap-1.5 text-xs ${isTaskOverdue(task)
                        ? 'text-red-500'
                        : mutedText
                        }`}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                      {task.dueTime && ` · ${formatTime(task.dueTime)}`}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default TasksView;
