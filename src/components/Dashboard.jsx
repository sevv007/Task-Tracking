
import React from 'react';

import {
  CheckSquare,
  FileText,
  Clock,
  Target,
  Star,
  Edit3,
  Plus,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
  CheckCircle,
  ClipboardList
} from 'lucide-react';

import {
  getCurrentDate,
  getTodayTasks,
  getOverdueTasks,
  formatTime,
  getPriorityColor,
  getNoteColor
} from '../utils/helpers';

const Dashboard = ({
  todos,
  setTodos,
  notes,
  darkMode,
  onNewTask,
  onNewNote,
  setEditingItem,
  setShowModal,
  setModalType
}) => {

  const { fullDate } = getCurrentDate();

  const todayTasks = getTodayTasks(todos);
  const overdueTasks = getOverdueTasks(todos);

  const activeNotes = notes.filter(n => !n.archived);
  const completedTasks = todos.filter(t => t.completed).length;

  const toggleTaskComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : null,
          updatedAt: new Date()
        }
        : todo
    ));
  };

  const editItem = (item, type) => {
    setEditingItem({ ...item, type });
    setModalType(type);
    setShowModal(true);
  };

  const cardClass = darkMode
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-slate-100';

  const headingClass = darkMode
    ? 'text-white'
    : 'text-slate-800';

  const mutedClass = darkMode
    ? 'text-gray-400'
    : 'text-slate-500';

  const statsCards = [
    {
      title: "Bugünün Görevleri",
      count: todayTasks.length,
      icon: ClipboardList,
      color: 'bg-blue-500',
      light: darkMode ? 'bg-blue-500/10' : 'bg-blue-50',
      text: 'text-blue-500',
      subtitle: 'Bugün için planlandı'
    },
    {
      title: 'Gecikenler',
      count: overdueTasks.length,
      icon: Clock,
      color: 'bg-rose-500',
      light: darkMode ? 'bg-rose-500/10' : 'bg-rose-50',
      text: 'text-rose-500',
      subtitle: 'İlginizi bekliyor'
    },
    {
      title: 'Notlar',
      count: activeNotes.length,
      icon: FileText,
      color: 'bg-violet-500',
      light: darkMode ? 'bg-violet-500/10' : 'bg-violet-50',
      text: 'text-violet-500',
      subtitle: 'Aktif notlar'
    },
    {
      title: 'Tamamlanan',
      count: completedTasks,
      icon: Target,
      color: 'bg-emerald-500',
      light: darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50',
      text: 'text-emerald-500',
      subtitle: 'Tamamlanan tüm görevler'
    }
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">

      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 shadow-xl shadow-indigo-200/30 sm:p-8">

        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 right-40 h-64 w-64 rounded-full bg-purple-300/10 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

          <div className="max-w-xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
              <Sparkles size={14} />
              VERİMLİLİK ALANINIZ
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Hedeflerinizi
              <br />
              düzenleyin ve yönetin.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-indigo-100 sm:text-base">
              Odaklanın, günlük görevlerinizi yönetin ve
              her anı verimli değerlendirin.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-indigo-100">
              <CalendarDays size={16} />
              {fullDate}
            </div>

          </div>

          <div className="flex shrink-0 items-center gap-3">

            <button
              onClick={onNewTask}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-indigo-50 hover:shadow-xl"
            >
              <Plus size={18} />
              Yeni Görev
            </button>

          </div>
        </div>
      </section>


      {/* Statistics Section */}
      <section>

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h3 className={`text-lg font-bold ${headingClass}`}>
              Genel Bakış
            </h3>

            <p className={`mt-1 text-sm ${mutedClass}`}>
              Verimliliğinize genel bakış
            </p>
          </div>

          <div className={`hidden items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium sm:flex ${darkMode
            ? 'bg-gray-800 text-gray-400'
            : 'bg-white text-slate-500'
            }`}>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Canlı genel bakış
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {statsCards.map((stat, index) => {

            const Icon = stat.icon;

            return (
              <div
                key={index}
                className={`group rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${cardClass}`}
              >

                <div className="flex items-start justify-between">

                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.light} ${stat.text}`}>
                    <Icon size={23} strokeWidth={2} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className={`${mutedClass} transition group-hover:-translate-y-1 group-hover:translate-x-1`}
                  />

                </div>

                <div className="mt-5">

                  <p className={`text-sm font-medium ${mutedClass}`}>
                    {stat.title}
                  </p>

                  <div className="mt-1 flex items-end gap-2">

                    <span className={`text-3xl font-bold tracking-tight ${headingClass}`}>
                      {stat.count}
                    </span>

                  </div>

                  <p className={`mt-2 text-xs ${mutedClass}`}>
                    {stat.subtitle}
                  </p>

                </div>

              </div>
            );
          })}

        </div>
      </section>


      {/* Bugünün Görevleri */}
      <section className={`overflow-hidden rounded-2xl border shadow-sm ${cardClass}`}>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5 dark:border-gray-700 sm:p-6">

          <div>
            <div className="flex items-center gap-2">

              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                }`}>
                <CheckSquare size={19} />
              </div>

              <h3 className={`text-lg font-bold ${headingClass}`}>
                Bugünün Görevleri
              </h3>

              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${darkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-slate-100 text-slate-600'
                }`}>
                {todayTasks.length}
              </span>

            </div>

            <p className={`mt-2 text-sm ${mutedClass}`}>
              Keep track of your daily progress.
            </p>
          </div>

          <button
            onClick={onNewTask}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/30 transition hover:bg-indigo-700 hover:shadow-lg"
          >
            <Plus size={17} />
            Görev Ekle
          </button>

        </div>


        <div className="p-5 sm:p-6">

          {todayTasks.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-14 text-center">

              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-slate-50 text-slate-300'
                }`}>
                <CheckSquare size={32} />
              </div>

              <h4 className={`text-base font-semibold ${headingClass}`}>
                Bugün için görev yok
              </h4>

              <p className={`mt-2 text-sm ${mutedClass}`}>
                İlk görevinizi oluşturun ve başlayın.
              </p>

              <button
                onClick={onNewTask}
                className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus size={16} />
                Görev Oluştur
              </button>

            </div>

          ) : (

            <div className="space-y-3">

              {todayTasks.map(task => (

                <div
                  key={task.id}
                  className={`group rounded-xl border p-4 transition duration-200 hover:shadow-md ${darkMode
                    ? 'border-gray-700 bg-gray-750 hover:bg-gray-700'
                    : 'border-slate-100 bg-slate-50/70 hover:border-indigo-100 hover:bg-white'
                    }`}
                >

                  <div className="flex items-start gap-3">

                    <button
                      onClick={() => toggleTaskComplete(task.id)}
                      aria-label={task.completed ? 'Tamamlandı işaretini kaldır' : 'Görevi tamamla'}
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${task.completed
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                        : darkMode
                          ? 'bg-gray-600 text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400'
                          : 'bg-white text-slate-400 shadow-sm hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                    >
                      {task.completed
                        ? <CheckCircle size={19} />
                        : <CheckSquare size={19} />
                      }
                    </button>


                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h4 className={`text-sm font-semibold ${headingClass
                          } ${task.completed ? 'line-through opacity-50' : ''}`}>
                          {task.title}
                        </h4>

                        <span
                          className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`}
                          title={`Öncelik: ${task.priority}`}
                        />

                        {task.starred && (
                          <Star
                            size={15}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        )}

                      </div>

                      {task.description && (

                        <p className={`mt-2 text-sm leading-relaxed ${mutedClass
                          } ${task.completed ? 'line-through opacity-50' : ''}`}>
                          {task.description}
                        </p>

                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-3">

                        <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${darkMode
                          ? 'bg-gray-600 text-gray-200'
                          : 'bg-white text-slate-600'
                          }`}>
                          {task.category}
                        </span>

                        {task.dueTime && (

                          <span className={`flex items-center gap-1.5 text-xs ${mutedClass}`}>
                            <Clock size={13} />
                            {formatTime(task.dueTime)}
                          </span>

                        )}

                      </div>

                    </div>


                    <button
                      onClick={() => editItem(task, 'task')}
                      title="Görevi düzenle"
                      className={`rounded-lg p-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 ${darkMode
                        ? 'text-gray-400 hover:bg-gray-600 hover:text-white'
                        : 'text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                    >
                      <Edit3 size={17} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </section>


      {/* Recent Notes */}
      <section className={`overflow-hidden rounded-2xl border shadow-sm ${cardClass}`}>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5 dark:border-gray-700 sm:p-6">

          <div>
            <div className="flex items-center gap-2">

              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${darkMode ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-50 text-violet-600'
                }`}>
                <FileText size={19} />
              </div>

              <h3 className={`text-lg font-bold ${headingClass}`}>
                Son Notlar
              </h3>

            </div>

            <p className={`mt-2 text-sm ${mutedClass}`}>
              Son düşünceleriniz ve fikirleriniz.
            </p>

          </div>

          <button
            onClick={onNewNote}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700 hover:shadow-lg"
          >
            <Plus size={17} />
            Not Ekle
          </button>

        </div>


        <div className="p-5 sm:p-6">

          {activeNotes.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-14 text-center">

              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-slate-50 text-slate-300'
                }`}>
                <FileText size={32} />
              </div>

              <h4 className={`text-base font-semibold ${headingClass}`}>
                Henüz not yok
              </h4>

              <p className={`mt-2 text-sm ${mutedClass}`}>
                Fikirlerinizi kaydedin ve düzenli tutun.
              </p>

              <button
                onClick={onNewNote}
                className="mt-5 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                <Plus size={16} />
                Not Oluştur
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

              {activeNotes.slice(0, 6).map(note => (

                <div
                  key={note.id}
                  onClick={() => editItem(note, 'note')}
                  className={`group cursor-pointer rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${getNoteColor(note.color)
                    }`}
                >

                  <div className="mb-4 flex items-start justify-between">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 text-slate-600">
                      <FileText size={17} />
                    </div>

                    <div className="flex items-center gap-2">

                      {note.starred && (
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      )}

                      <Edit3
                        size={15}
                        className="text-slate-400 opacity-0 transition group-hover:opacity-100"
                      />

                    </div>

                  </div>


                  <h4 className={`line-clamp-1 text-base font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {note.title}
                  </h4>

                  <p className={`mt-2 line-clamp-3 min-h-[60px] text-sm font-medium leading-relaxed ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                    {note.content}
                  </p>


                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-black/5 pt-4">

                    <span className="max-w-[60%] truncate rounded-lg bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {note.category}
                    </span>

                    <span className="shrink-0 text-xs text-slate-500">
                      {new Date(note.updatedAt).toLocaleDateString('tr-TR')}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default Dashboard;
