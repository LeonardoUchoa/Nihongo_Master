import { Home, BookOpen, RefreshCw, TrendingUp, User } from 'lucide-react';
import { useNavigate } from 'react-router';

interface BottomNavProps {
  active: 'home' | 'lessons' | 'review' | 'progress' | 'profile';
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/home' },
    { id: 'lessons', label: 'Lições', icon: BookOpen, path: '/home' },
    { id: 'review', label: 'Revisão', icon: RefreshCw, path: '/kanji-study' },
    { id: 'progress', label: 'Progresso', icon: TrendingUp, path: '/progress' },
    { id: 'profile', label: 'Perfil', icon: User, path: '/home' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-1 px-3"
            >
              <Icon
                size={24}
                style={{ color: isActive ? '#E63946' : '#9CA3AF' }}
              />
              <span
                className="text-xs"
                style={{ color: isActive ? '#E63946' : '#9CA3AF' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
