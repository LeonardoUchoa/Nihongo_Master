import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();

  const levels = [
    {
      id: 'basic',
      emoji: '🌱',
      title: 'Básico',
      description: 'Hiragana, Katakana e vocabulário essencial',
      color: '#2DC653',
    },
    {
      id: 'intermediate',
      emoji: '📚',
      title: 'Intermediário',
      description: 'Kanji N4-N3 e gramática',
      color: '#3B82F6',
    },
    {
      id: 'advanced',
      emoji: '⚡',
      title: 'Avançado',
      description: 'Kanji N2-N1 e leitura avançada',
      color: '#A855F7',
    },
  ];

  return (
    <div className="size-full flex flex-col items-center px-4 pt-16 pb-8" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Logo */}
      <div className="mb-8 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E63946' }}>
        <span className="text-white text-3xl">日</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl mb-2" style={{ color: '#1A1A2E' }}>Bem-vindo!</h1>
      <p className="text-gray-600 mb-12">Escolha seu nível para começar</p>

      {/* Level cards */}
      <div className="w-full max-w-md space-y-4 mb-auto">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => navigate('/home')}
            className="w-full bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl flex-shrink-0">{level.emoji}</div>
            <div className="flex-1 text-left">
              <h3 className="text-lg mb-1" style={{ color: level.color }}>{level.title}</h3>
              <p className="text-sm text-gray-600">{level.description}</p>
            </div>
            <ChevronRight className="text-gray-400 flex-shrink-0" size={24} />
          </button>
        ))}
      </div>

      {/* Login link */}
      <p className="text-gray-600 text-sm mt-8">
        Já tenho conta? <span className="underline cursor-pointer" style={{ color: '#E63946' }}>Entrar</span>
      </p>
    </div>
  );
}
