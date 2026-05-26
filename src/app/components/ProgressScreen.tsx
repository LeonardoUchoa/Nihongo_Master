import { Calendar } from 'lucide-react';
import BottomNav from './BottomNav';

export default function ProgressScreen() {
  const stats = [
    { value: '156', label: 'Kanjis aprendidos' },
    { value: '89%', label: 'Taxa de acerto' },
    { value: '23h', label: 'Tempo total' },
    { value: '340', label: 'XP esta semana' },
  ];

  const achievements = [
    {
      emoji: '🎯',
      title: 'Mira Certeira',
      description: '90% de acerto em 5 sessões',
    },
    {
      emoji: '🗓️',
      title: 'Uma Semana',
      description: '7 dias consecutivos de estudo',
    },
  ];

  // Generate heatmap data for last 4 weeks (28 days)
  const heatmapData = [...Array(28)].map(() => Math.floor(Math.random() * 4));

  const getHeatmapColor = (value: number) => {
    if (value === 0) return '#E5E7EB';
    if (value === 1) return '#A7F3D0';
    if (value === 2) return '#34D399';
    return '#10B981';
  };

  return (
    <div className="size-full flex flex-col" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Header */}
        <div className="bg-white px-4 pt-12 pb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl" style={{ color: '#1A1A2E' }}>Meu Progresso</h1>
            <Calendar size={24} style={{ color: '#1A1A2E' }} />
          </div>
        </div>

        {/* Streak */}
        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-6xl mb-2">🔥 7</div>
            <p className="text-gray-600">dias seguidos</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="px-4 pb-6">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-3xl mb-1" style={{ color: '#E63946' }}>{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div className="px-4 pb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-base mb-3" style={{ color: '#1A1A2E' }}>Atividade de estudo</h3>
            <div className="grid grid-cols-7 gap-1">
              {heatmapData.map((value, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded"
                  style={{ backgroundColor: getHeatmapColor(value) }}
                />
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-3">
              <span className="text-xs text-gray-500">Menos</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: getHeatmapColor(i) }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">Mais</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="px-4 pb-6">
          <h3 className="text-lg mb-4" style={{ color: '#1A1A2E' }}>Conquistas recentes</h3>
          <div className="space-y-3">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                <div className="text-4xl">{achievement.emoji}</div>
                <div>
                  <h4 className="text-base mb-1" style={{ color: '#1A1A2E' }}>{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="progress" />
    </div>
  );
}
