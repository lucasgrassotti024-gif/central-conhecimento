import React, { useState } from 'react'
import { BookOpen, Lock, Mail, Eye, EyeOff, ArrowLeft, LogIn, AlertCircle } from 'lucide-react'
import { authService } from '../services/authService'

interface LoginPageProps {
  onBackToUserSite: () => void
  onLoginSuccess: () => void
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onBackToUserSite,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const validateEmailFormat = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Validações de formulário
    if (!email.trim()) {
      setErrorMessage('Informe seu e-mail.')
      return
    }

    if (!validateEmailFormat(email.trim())) {
      setErrorMessage('Digite um e-mail válido.')
      return
    }

    if (!password.trim()) {
      setErrorMessage('Informe sua senha.')
      return
    }

    setLoading(true)

    try {
      const response = await authService.login({
        email: email.trim(),
        password: password.trim()
      })

      if (response.success) {
        onLoginSuccess()
      } else {
        setErrorMessage(response.error || 'Credenciais inválidas.')
      }
    } catch {
      setErrorMessage('Ocorreu um erro ao tentar realizar o login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page-container">
      {/* Botão de Retorno Superior */}
      <div className="login-back-nav">
        <button
          type="button"
          className="btn-back"
          onClick={onBackToUserSite}
          disabled={loading}
        >
          <ArrowLeft size={18} />
          <span>Voltar para a Central de Conhecimento</span>
        </button>
      </div>

      {/* Card Central Glassmorphism de Login */}
      <div className="login-card">
        <div className="login-card-header">
          <div className="login-brand-icon">
            <BookOpen size={26} />
          </div>
          <span className="login-brand-title">Central de Conhecimento</span>
          <h1 className="login-heading">Acesso Administrativo</h1>
          <p className="login-subheading">
            Autentique-se com sua conta de administrador no Supabase
          </p>
        </div>

        {/* Banner de Erro */}
        {errorMessage && (
          <div className="login-error-banner" role="alert">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Campo E-mail */}
          <div className="login-field-group">
            <label htmlFor="login-email" className="login-field-label">
              E-mail
            </label>
            <div className="login-input-wrapper">
              <Mail size={18} className="input-leading-icon" />
              <input
                id="login-email"
                type="email"
                className="login-input"
                placeholder="admin@seudominio.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errorMessage) setErrorMessage(null)
                }}
                disabled={loading}
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="login-field-group">
            <label htmlFor="login-password" className="login-field-label">
              Senha
            </label>
            <div className="login-input-wrapper">
              <Lock size={18} className="input-leading-icon" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errorMessage) setErrorMessage(null)
                }}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Botão de Envio com Estados */}
          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner-text">
                <span className="spinner-dot"></span>
                ENTRANDO NO SUPABASE...
              </span>
            ) : (
              <>
                <span>ENTRAR</span>
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        {/* Rodapé Interno do Card */}
        <div className="login-card-footer">
          <button
            type="button"
            className="btn-footer-back-link"
            onClick={onBackToUserSite}
            disabled={loading}
          >
            Voltar para a Central de Conhecimento
          </button>
        </div>
      </div>
    </div>
  )
}
