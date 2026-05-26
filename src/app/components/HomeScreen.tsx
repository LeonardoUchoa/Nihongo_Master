import { useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';
import BottomNav from './BottomNav';
import { useAuth } from '../auth/AuthContext';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { profile, user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const reviewCards = [
    {
      badge: 'Revisão',
      badgeColor: '#FF9F1C',
      count: '23 cartões pendentes',
      icon: '🔄',
      action: () => navigate('/kanji-study'),
    },
    {
      badge: 'Novo',
      badgeColor: '#2DC653',
      count: '10 kanjis novos',
      icon: '➕',
    },
    {
      badge: 'Áudio',
      badgeColor: '#3B82F6',
      count: 'Praticar pronúncia',
      icon: '🔊',
    },
  ];

  const progress = [
    { name: 'Hiragana', percentage: 80 },
    { name: 'Katakana', percentage: 60 },
    { name: 'Kanji N5', percentage: 40 },
  ];

  return (
    <div className="size-full flex flex-col" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Header */}
        <div className="bg-white px-4 pt-12 pb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
            <div className="flex-1">
              <h2 className="text-xl" style={{ color: '#1A1A2E' }}>Olá, Estudante!</h2>
              {user?.email && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
              {profile?.level && <p className="text-xs text-gray-500">Nível: {profile.level}</p>}
            </div>
            <button onClick={handleSignOut} className="p-2 text-gray-400" aria-label="Sair">
              <LogOut size={20} />
            </button>
            <div className="flex items-center gap-1 text-lg">
              <span>🔥</span>
              <span style={{ color: '#E63946' }}>7 dias</span>
            </div>
          </div>

          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Nível 12</span>
              <span className="text-gray-600">340/500 XP</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '68%', backgroundColor: '#E63946' }} />
            </div>
          </div>
        </div>

        {/* Today's session */}
        <div className="px-4 py-6">
          <h3 className="text-lg mb-4" style={{ color: '#1A1A2E' }}>Sua sessão de hoje</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {reviewCards.map((card, idx) => (
              <button
                key={idx}
                onClick={card.action}
                className="bg-white rounded-xl p-4 min-w-[160px] shadow-sm flex-shrink-0"
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <div className="inline-block px-2 py-1 rounded text-xs text-white mb-2" style={{ backgroundColor: card.badgeColor }}>
                  {card.badge}
                </div>
                <p className="text-sm text-gray-700">{card.count}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Progress by category */}
        <div className="px-4 py-6">
          <h3 className="text-lg mb-4" style={{ color: '#1A1A2E' }}>Progresso por categoria</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
            {progress.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-600">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: '#2DC653' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
