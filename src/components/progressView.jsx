import React from 'react';
import { BarChart3, CheckCircle2, ListTodo, Target, TrendingUp } from 'lucide-react';

const ProgressView = ({ todos = [], darkMode }) => {
    const activeTasks = todos.filter((task) => !task.completed && !task.archived);
    const completedTasks = todos.filter((task) => task.completed && !task.archived);
    const totalTasks = activeTasks.length + completedTasks.length;
    const completionRate = totalTasks ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

    const today = new Date();
    const days = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (6 - index));
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const count = completedTasks.filter((task) => {
            // Eski görevlerde completedAt yoksa updatedAt yaklaşık tamamlanma tarihi olarak kullanılır.
            const sourceDate = task.completedAt || task.updatedAt;
            if (!sourceDate) return false;
            const completedDate = new Date(sourceDate);
            return `${completedDate.getFullYear()}-${completedDate.getMonth()}-${completedDate.getDate()}` === dateKey;
        }).length;
        return {
            date,
            count,
            label: date.toLocaleDateString('tr-TR', { weekday: 'short' }),
            dateLabel: date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
        };
    });

    const maxCount = Math.max(...days.map((day) => day.count), 1);
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white';
    const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
    const heading = darkMode ? 'text-white' : 'text-slate-900';

    const stats = [
        { label: 'Tamamlanan görev', value: completedTasks.length, icon: CheckCircle2, color: 'text-emerald-500', tint: darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50' },
        { label: 'Devam eden görev', value: activeTasks.length, icon: ListTodo, color: 'text-blue-500', tint: darkMode ? 'bg-blue-500/10' : 'bg-blue-50' },
        { label: 'Tamamlanma oranı', value: `%${completionRate}`, icon: Target, color: 'text-violet-500', tint: darkMode ? 'bg-violet-500/10' : 'bg-violet-50' },
    ];

    return (
        <main className={`mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 ${heading}`}>
            <header>
                <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                    <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${muted}`}>İstatistikler</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Görev İlerlemesi</h1>
                <p className={`mt-1 text-sm ${muted}`}>Tamamladığınız görevleri ve ilerleme durumunuzu takip edin.</p>
            </header>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map(({ label, value, icon: Icon, color, tint }) => (
                    <article key={label} className={`rounded-2xl border p-5 shadow-sm ${card}`}>
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className={`text-sm ${muted}`}>{label}</p>
                                <p className="mt-2 text-3xl font-bold">{value}</p>
                            </div>
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tint} ${color}`}>
                                <Icon className="h-6 w-6" />
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            <section className={`rounded-3xl border p-5 shadow-sm sm:p-7 ${card}`}>
                <div className="mb-7 flex items-start gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                        <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Son 7 Günlük İlerleme</h2>
                        <p className={`mt-1 text-sm ${muted}`}>Günlere göre tamamlanan görev sayısı</p>
                    </div>
                </div>

                <div className="grid h-64 grid-cols-7 gap-2 border-b border-dashed border-slate-200 pb-3 sm:gap-4 dark:border-slate-700">
                    {days.map((day) => {
                        const height = day.count ? Math.max((day.count / maxCount) * 100, 8) : 3;
                        return (
                            <div key={day.date.toISOString()} className="flex min-w-0 flex-col items-center justify-end gap-2">
                                <span className={`text-xs font-semibold ${muted}`}>{day.count || ''}</span>
                                <div className="flex h-40 w-full items-end">
                                    <div
                                        role="img"
                                        aria-label={`${day.dateLabel}: ${day.count} görev tamamlandı`}
                                        title={`${day.dateLabel}: ${day.count} görev tamamlandı`}
                                        className={`w-full rounded-t-lg transition-all ${day.count ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
                                        style={{ height: `${height}%` }}
                                    />
                                </div>
                                <span className={`text-[11px] capitalize ${muted}`}>{day.label}</span>
                                <span className={`text-[10px] ${muted}`}>{day.dateLabel}</span>
                            </div>
                        );
                    })}
                </div>
                {completedTasks.length === 0 && (
                    <p className={`mt-5 text-center text-sm ${muted}`}>Henüz tamamlanan görev yok. Bir görevi tamamladığınızda ilerlemeniz burada görünecek.</p>
                )}
            </section>
        </main>
    );
};

export default ProgressView;
