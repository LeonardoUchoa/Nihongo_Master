import { useNavigate } from 'react-router';
import { ArrowLeft, Bookmark, Play } from 'lucide-react';

export default function KanjiStudyScreen() {
  const navigate = useNavigate();

  return (
    <div className="size-full flex flex-col" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2">
          <ArrowLeft size={24} style={{ color: '#1A1A2E' }} />
        </button>
        <h1 className="text-lg" style={{ color: '#1A1A2E' }}>Kanji do Dia</h1>
        <button className="p-2 -mr-2">
          <Bookmark size={24} style={{ color: '#1A1A2E' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Kanji card */}
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="text-[120px] mb-4" style={{ color: '#1A1A2E' }}>山</div>
          <div className="text-xl text-gray-700 mb-2">やま (yama) • さん (san)</div>
          <div className="inline-block px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#E6F7FF', color: '#1890FF' }}>
            Montanha / Mountain
          </div>
        </div>

        {/* Mnemonic */}
        <div>
          <h3 className="text-base mb-2 flex items-center gap-2" style={{ color: '#1A1A2E' }}>
            <span>🧠</span>
            <span>Mnemônico</span>
          </h3>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p className="text-sm text-gray-700">
              Imagine três picos de uma montanha. O kanji 山 tem exatamente 3 linhas que formam picos!
            </p>
          </div>
        </div>

        {/* Audio */}
        <div>
          <h3 className="text-base mb-2 flex items-center gap-2" style={{ color: '#1A1A2E' }}>
            <span>🔊</span>
            <span>Áudio</span>
          </h3>
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E63946' }}>
              <Play size={20} fill="white" color="white" />
            </button>
            <div className="flex-1 flex items-center gap-1 h-8">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    height: `${20 + Math.random() * 60}%`,
                    backgroundColor: '#E63946',
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Examples */}
        <div>
          <h3 className="text-base mb-2 flex items-center gap-2" style={{ color: '#1A1A2E' }}>
            <span>📝</span>
            <span>Exemplos</span>
          </h3>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            <div>
              <p className="text-base mb-1" style={{ color: '#1A1A2E' }}>山が高い。</p>
              <p className="text-sm text-gray-600">A montanha é alta.</p>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-base mb-1" style={{ color: '#1A1A2E' }}>富士山は美しい。</p>
              <p className="text-sm text-gray-600">O Monte Fuji é lindo.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="bg-white px-4 py-4 shadow-lg">
        <p className="text-xs text-center text-gray-500 mb-3">Próxima revisão: em 3 dias</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/home')}
            className="flex-1 py-3 rounded-xl border-2 text-base"
            style={{ borderColor: '#E63946', color: '#E63946' }}
          >
            Difícil 😓
          </button>
          <button
            onClick={() => navigate('/home')}
            className="flex-1 py-3 rounded-xl text-base text-white"
            style={{ backgroundColor: '#2DC653' }}
          >
            Fácil 😊
          </button>
        </div>
      </div>
    </div>
  );
}
