
import React, { useState } from 'react';
import {
  Plus,
  Clock,
  Calendar,
  CheckSquare,
  Bell,
  Edit3,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from 'lucide-react';

import {
  getTodayTasks,
  getUpcomingTasks,
  getOverdueTasks,
  formatTime,
  getPriorityColor,
} from '../utils/helpers';

const CalendarView = ({
  todos = [],
  setTodos,
  darkMode,
  setEditingItem,
  setShowModal,
  setModalType,
}) => {
  const [visibleMonth, setVisibleMonth] = useState(new Date());

  const todayTasks = getTodayTasks(todos);
  const upcomingTasks = getUpcomingTasks(todos);
  const overdueTasks = getOverdueTasks(todos);

  const today = new Date();

  const isToday = (date) =>
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const toggleTaskComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date() : null,
            updatedAt: new Date(),
          }
          : todo
      )
    );
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

  const handleNewTaskOnDate = (date) => {
    setModalType('task');
    setEditingItem({ dueDate: date });
    setShowModal(true);
  };

  const changeMonth = (direction) => {
    setVisibleMonth(
      new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + direction,
        1
      )
    );
  };

  const relativeDue = (date) => {
    const now = new Date();
    const due = new Date(date);

    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const dueStart = new Date(
      due.getFullYear(),
      due.getMonth(),
      due.getDate()
    );

    const diff = Math.round(
      (dueStart - todayStart) / (1000 * 60 * 60 * 24)
    );

    if (diff > 1) return `${diff} gün sonra`;
    if (diff === 1) return 'Yarın';
    if (diff === 0) return 'Bugün';
    return `${Math.abs(diff)} gün gecikmiş`;
  };

  const firstDay = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1
  );

  // Monday-first calendar
  const startOffset = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0
  ).getDate();

  const calendarDays = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthName = visibleMonth.toLocaleDateString('tr-TR', {
    month: 'long',
    year: 'numeric',
  });

  const cardClass = darkMode
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-100';

  const mutedText = darkMode ? 'text-gray-400' : 'text-gray-500';

  const taskCardClass = darkMode
    ? 'bg-gray-750 border-gray-700'
    : 'bg-gray-50 border-gray-100';

  return (
    <div className={`mx-auto w-full max-w-7xl min-h-full p-4 md:p-6 lg:p-8 space-y-6 ${darkMode ? 'text-white' : 'text-gray-800'
      }`}>

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="w-6 h-6 text-[#b34d6a]" />
            <h1 className="text-2xl font-bold tracking-tight">
              Takvim
            </h1>
          </div>

          <p className={`text-sm ${mutedText}`}>
            Programınızı düzenleyin ve görevlerinizi takip edin.
          </p>
        </div>

        <button
          onClick={handleNewTask}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl
          bg-gradient-to-r from-blue-700 to-cyan-500
          text-white font-medium shadow-md shadow-blue-500/20
          hover:shadow-lg hover:-translate-y-0.5
          transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Yeni Görev
        </button>
      </div>

      {/* CALENDAR */}
      <div className={`rounded-2xl border p-5 md:p-6 shadow-sm ${cardClass}`}>

        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div>
            <h2 className="text-xl font-bold">
              {monthName}
            </h2>
            <p className={`text-sm mt-1 ${mutedText}`}>
              Görev oluşturmak için bir tarihe çift tıklayın.
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() => setVisibleMonth(new Date())}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors
                ${darkMode
                  ? 'border-gray-700 hover:bg-gray-700 text-gray-300'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
            >
              Bugün
            </button>

            <button
              onClick={() => changeMonth(-1)}
              className={`p-2 rounded-lg border transition-colors
                ${darkMode
                  ? 'border-gray-700 hover:bg-gray-700'
                  : 'border-gray-200 hover:bg-gray-50'
                }`}
              aria-label="Önceki ay"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => changeMonth(1)}
              className={`p-2 rounded-lg border transition-colors
                ${darkMode
                  ? 'border-gray-700 hover:bg-gray-700'
                  : 'border-gray-200 hover:bg-gray-50'
                }`}
              aria-label="Sonraki ay"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
            <div
              key={day}
              className={`text-center text-xs md:text-sm font-semibold py-3 ${mutedText}`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">

          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="min-h-[75px] md:min-h-[105px]" />;
            }

            const currentDate = new Date(
              visibleMonth.getFullYear(),
              visibleMonth.getMonth(),
              date
            );

            const selectedDateTasks = todos.filter((task) => {
              if (!task.dueDate || task.archived) return false;

              const taskDate = new Date(task.dueDate);

              return (
                taskDate.getDate() === date &&
                taskDate.getMonth() === visibleMonth.getMonth() &&
                taskDate.getFullYear() === visibleMonth.getFullYear()
              );
            });

            const todayDate = isToday(currentDate);

            return (
              <div
                key={date}
                onDoubleClick={() => handleNewTaskOnDate(currentDate)}
                className={`min-h-[75px] md:min-h-[105px] p-1.5 md:p-3 rounded-xl
                  border cursor-pointer transition-all duration-200
                  ${todayDate
                    ? 'bg-rose-50 border-[#c96378] ring-1 ring-[#c96378] dark:bg-rose-900/20 dark:border-rose-500'
                    : darkMode
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-rose-400'
                      : 'bg-white border-gray-100 hover:bg-rose-50/60 hover:border-rose-200'
                  }`}
              >

                <div className="flex justify-between items-center">
                  <span className={`text-xs md:text-sm font-semibold
                    ${todayDate
                      ? 'text-[#a33353] dark:text-rose-300'
                      : darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {date}
                  </span>

                  {todayDate && (
                    <span className="hidden md:inline-block text-[10px] font-semibold text-[#a33353] dark:text-rose-300">
                      BUGÜN
                    </span>
                  )}
                </div>

                <div className="mt-2 space-y-1">
                  {selectedDateTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className={`hidden md:flex items-center gap-1 text-[10px] px-1.5 py-1 rounded-md truncate
                        ${task.completed
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                        }`}
                    >
                      <span className="truncate">
                        {task.title}
                      </span>
                    </div>
                  ))}

                  <div className="flex md:hidden gap-1 flex-wrap">
                    {selectedDateTasks.slice(0, 4).map((task) => (
                      <span
                        key={task.id}
                        className={`w-1.5 h-1.5 rounded-full ${task.completed ? 'bg-green-500' : 'bg-[#c96378]'
                          }`}
                      />
                    ))}
                  </div>

                  {selectedDateTasks.length > 2 && (
                    <p className="hidden md:block text-[10px] text-gray-400">
                      +{selectedDateTasks.length - 2} görev daha
                    </p>
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* Calendar Legend */}
        <div className={`flex flex-wrap items-center gap-5 mt-5 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'
          }`}>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c96378]" />
            <span className={mutedText}>Bekleyen görevler</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className={mutedText}>Tamamlanan görevler</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-300 ring-2 ring-rose-400" />
            <span className={mutedText}>Bugün</span>
          </div>
        </div>

      </div>

      {/* TASK SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className={`rounded-2xl border p-5 shadow-sm ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${mutedText}`}>Bugünün Görevleri</p>
              <h3 className="text-3xl font-bold mt-2">
                {todayTasks.length}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <p className={`text-xs mt-3 ${mutedText}`}>
            Bugün için planlanan görevler
          </p>
        </div>

        <div className={`rounded-2xl border p-5 shadow-sm ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${mutedText}`}>Yaklaşan Görevler</p>
              <h3 className="text-3xl font-bold mt-2">
                {upcomingTasks.length}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
          </div>

          <p className={`text-xs mt-3 ${mutedText}`}>
            Önümüzdeki günler için planlanan görevler
          </p>
        </div>

        <div className={`rounded-2xl border p-5 shadow-sm ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${mutedText}`}>Gecikmiş Görevler</p>
              <h3 className="text-3xl font-bold mt-2">
                {overdueTasks.length}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-100 dark:bg-red-900/30">
              <Bell className="w-6 h-6 text-red-500" />
            </div>
          </div>

          <p className={`text-xs mt-3 ${mutedText}`}>
            İlginizi bekleyen görevler
          </p>
        </div>

      </div>

      {/* TODAY + UPCOMING TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TODAY */}
        <div className={`rounded-2xl border p-5 md:p-6 shadow-sm ${cardClass}`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold">Bugünün Görevleri</h3>
              <p className={`text-xs mt-1 ${mutedText}`}>
                Günlük programınız
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
              {todayTasks.length} görev
            </span>
          </div>

          {todayTasks.length === 0 ? (
            <div className="py-10 text-center">
              <Clock className={`w-10 h-10 mx-auto mb-3 ${mutedText}`} />
              <p className={`text-sm ${mutedText}`}>
                Bugün için planlanmış görev yok
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-sm ${darkMode
                    ? 'bg-gray-750 border-gray-700'
                    : 'bg-gray-50 border-gray-100'
                    }`}
                >
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center transition-colors ${task.completed
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-white text-gray-400 border border-gray-200 hover:text-green-500 dark:bg-gray-700 dark:border-gray-600'
                      }`}
                    aria-label="Görevin tamamlanma durumunu değiştir"
                  >
                    <CheckSquare className="w-4 h-4" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${task.completed ? 'line-through opacity-50' : ''
                      }`}>
                      {task.title}
                    </p>

                    <div className={`flex flex-wrap items-center gap-2 text-xs mt-1 ${mutedText}`}>
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                      <span>
                        {task.dueTime ? formatTime(task.dueTime) : 'Saat belirtilmedi'}
                      </span>

                      {task.category && (
                        <span className="px-2 py-0.5 rounded-md bg-gray-200/70 text-gray-600 dark:bg-gray-600 dark:text-gray-200">
                          {task.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => editItem(task)}
                    className={`p-2 rounded-lg transition-colors ${darkMode
                      ? 'hover:bg-gray-600 text-gray-400'
                      : 'hover:bg-gray-200 text-gray-500'
                      }`}
                    aria-label="Görevi düzenle"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UPCOMING */}
        <div className={`rounded-2xl border p-5 md:p-6 shadow-sm ${cardClass}`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold">Yaklaşan Görevler</h3>
              <p className={`text-xs mt-1 ${mutedText}`}>
                Sırada neler var
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
              {upcomingTasks.length} görev
            </span>
          </div>

          {upcomingTasks.length === 0 ? (
            <div className="py-10 text-center">
              <Calendar className={`w-10 h-10 mx-auto mb-3 ${mutedText}`} />
              <p className={`text-sm ${mutedText}`}>
                Yaklaşan görev yok
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${darkMode
                    ? 'bg-gray-750 border-gray-700'
                    : 'bg-gray-50 border-gray-100'
                    }`}
                >
                  <div className="w-11 h-11 rounded-xl flex flex-col items-center justify-center bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 flex-shrink-0">
                    <span className="text-lg font-bold leading-none">
                      {new Date(task.dueDate).getDate()}
                    </span>
                    <span className="text-[9px] uppercase font-semibold mt-1">
                      {new Date(task.dueDate).toLocaleDateString('tr-TR', { month: 'short' })}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {task.title}
                    </p>
                    <p className={`text-xs mt-1 ${mutedText}`}>
                      {relativeDue(task.dueDate)}
                      {task.dueTime && ` · ${formatTime(task.dueTime)}`}
                    </p>
                  </div>

                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getPriorityColor(task.priority)}`} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* OVERDUE TASKS */}
      {overdueTasks.length > 0 && (
        <div className={`rounded-2xl border p-5 md:p-6 shadow-sm ${darkMode
          ? 'bg-gray-800 border-red-900/50'
          : 'bg-white border-red-100'
          }`}>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-100 dark:bg-red-900/30">
              <Bell className="w-5 h-5 text-red-500" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-500">
                Gecikmiş Görevler
              </h3>
              <p className={`text-xs ${mutedText}`}>
                İlginizi bekleyen görevler
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300">
              {overdueTasks.length}
            </span>
          </div>

          <div className="space-y-3">
            {overdueTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-4 rounded-xl border ${darkMode
                  ? 'bg-red-900/10 border-red-900/30'
                  : 'bg-red-50/70 border-red-100'
                  }`}
              >
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 transition-colors"
                  aria-label="Gecikmiş görevi tamamla"
                >
                  <CheckSquare className="w-4 h-4" />
                </button>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-red-700 dark:text-red-300 truncate">
                    {task.title}
                  </p>

                  <p className="text-xs mt-1 text-red-500 dark:text-red-400">
                    {relativeDue(task.dueDate)}
                    {task.dueTime && ` · ${formatTime(task.dueTime)}`}
                  </p>
                </div>

                <button
                  onClick={() => editItem(task)}
                  className={`p-2 rounded-lg transition-colors ${darkMode
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-red-100 text-gray-500'
                    }`}
                  aria-label="Gecikmiş görevi düzenle"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CalendarView;
