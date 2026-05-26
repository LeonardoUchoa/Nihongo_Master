import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import type { ProfileLevel } from '../../lib/supabase';

const levelOptions: Array<{ id: ProfileLevel; label: string }> = [
  { id: 'basic', label: 'Básico' },
  { id: 'intermediate', label: 'Intermediário' },
  { id: 'advanced', label: 'Avançado' },
];

export default function LoginScreen() {
  const navigate = useNavigate();
  const { isConfigured, signIn, signUp, resetPassword, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState<ProfileLevel>('basic');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setFeedback('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        const result = await signUp(email, password, level);

        if (result.needsConfirmation) {
          setFeedback('Cadastro criado. Confira seu email para confirmar a conta antes de entrar.');
          setMode('login');
          return;
        }
      } else {
        await signIn(email, password);
      }

      navigate('/home');
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Não foi possível continuar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setFeedback('');

    if (!email) {
      setError('Informe seu email para receber o link de recuperação.');
      return;
    }

    try {
      await resetPassword(email);
      setFeedback('Enviamos um link de recuperação para o seu email.');
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Não foi possível enviar a recuperação.');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setFeedback('');

    try {
      await signInWithGoogle();
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Não foi possível iniciar o login com Google.');
    }
  };

  return (
    <div className="size-full flex flex-col px-4 pt-12 pb-8" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-5 w-16 h-16 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E63946' }}>
          <span className="text-white text-3xl">日</span>
        </div>
        <h1 className="text-3xl mb-2" style={{ color: '#1A1A2E' }}>
          {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
        </h1>
        <p className="text-gray-600 text-center">
          {mode === 'login' ? 'Entre para continuar seus estudos de japonês' : 'Escolha seu nível e comece seus estudos'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow-sm space-y-5">
        {!isConfigured && (
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env para ativar o login.
          </div>
        )}

        {feedback && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700">
            {feedback}
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm mb-2" style={{ color: '#1A1A2E' }}>
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@email.com"
              required
              className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-base outline-none focus:border-[#E63946] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm" style={{ color: '#1A1A2E' }}>
              Senha
            </label>
            <button type="button" onClick={handleResetPassword} className="text-sm" style={{ color: '#E63946' }}>
              Esqueci
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              minLength={6}
              required
              className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-12 text-base outline-none focus:border-[#E63946] focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <p className="block text-sm mb-2" style={{ color: '#1A1A2E' }}>Nível inicial</p>
            <div className="grid grid-cols-3 gap-2">
              {levelOptions.map((option) => {
                const isActive = option.id === level;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setLevel(option.id)}
                    className="rounded-lg border py-2 text-xs"
                    style={{
                      borderColor: isActive ? '#E63946' : '#E5E7EB',
                      color: isActive ? '#E63946' : '#374151',
                      backgroundColor: isActive ? '#FFF1F2' : '#FFFFFF',
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <label className="flex items-center gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 accent-[#E63946]"
          />
          Manter conectado
        </label>

        <button
          type="submit"
          disabled={isSubmitting || !isConfigured}
          className="w-full h-12 rounded-xl text-white shadow-sm"
          style={{ backgroundColor: isSubmitting || !isConfigured ? '#F3A0A8' : '#E63946' }}
        >
          {isSubmitting ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">ou</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={!isConfigured}
          className="w-full h-12 rounded-xl border border-gray-200 bg-white flex items-center justify-center gap-3 text-gray-700"
        >
          <span className="text-lg">G</span>
          Entrar com Google
        </button>
      </form>

      <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-600 mb-3">
          {mode === 'login' ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
        </p>
        <button
          type="button"
          onClick={() => {
            setMode((current) => current === 'login' ? 'signup' : 'login');
            setError('');
            setFeedback('');
          }}
          className="w-full rounded-lg border border-gray-200 py-3 text-sm"
          style={{ color: '#E63946' }}
        >
          {mode === 'login' ? 'Criar conta' : 'Entrar com minha conta'}
        </button>
      </div>

      <p className="mt-auto pt-6 text-center text-xs text-gray-500">
        Ao continuar, você concorda com os termos de uso do Nihongo Master.
      </p>
    </div>
  );
}
