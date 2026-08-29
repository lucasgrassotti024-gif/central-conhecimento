import React from 'react'
import { BookOpen, Shield, LogIn, LogOut, ArrowLeft } from 'lucide-react'

interface HeaderProps {
  isAuthenticated: boolean
  currentSite: 'user' | 'admin' | 'login'
  onNavigateHome: () => void
  onNavigateLogin: () => void
  onNavigateAdmin: () => void
  onNavigateUserSite: () => void
  onLogout: () => void
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  currentSite,
  onNavigateHome,
  onNavigateLogin,
  onNavigateAdmin,
  onNavigateUserSite,
  onLogout
}) => {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo / Marca */}
        <div
          className="brand-logo"
          onClick={currentSite === 'admin' ? onNavigateAdmin : onNavigateHome}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          title="Ir para a página inicial"
        >
          <div className={`brand-icon ${currentSite === 'admin' ? 'admin-icon' : ''}`}>
            <BookOpen size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Central de Conhecimento</span>
            <span className={`brand-badge ${currentSite === 'admin' ? 'admin-badge' : ''}`}>
              {currentSite === 'admin' ? 'ADMIN' : 'PRO'}
            </span>
          </div>
        </div>

        {/* Ações de Navegação e Autenticação */}
        <nav className="header-nav">
          {/* ESTADO 1: TELA DE LOGIN ATIVA */}
          {currentSite === 'login' && (
            <button
              type="button"
              className="btn-header-action outline"
              onClick={onNavigateUserSite}
              title="Voltar para a Central de Conhecimento"
            >
              <ArrowLeft size={15} />
              <span>Voltar ao Site</span>
            </button>
          )}

          {/* ESTADO 2: VISITANTE NÃO AUTENTICADO NO SITE DO USUÁRIO */}
          {currentSite === 'user' && !isAuthenticated && (
            <button
              type="button"
              className="btn-header-login"
              onClick={onNavigateLogin}
              title="Acessar com credenciais administrativas"
            >
              <LogIn size={15} />
              <span>Entrar</span>
            </button>
          )}

          {/* ESTADO 3: ADMINISTRADOR AUTENTICADO NO SITE DO USUÁRIO */}
          {currentSite === 'user' && isAuthenticated && (
            <div className="header-auth-group">
              <button
                type="button"
                className="btn-header-admin-active"
                onClick={onNavigateAdmin}
                title="Acessar Área Administrativa"
              >
                <Shield size={14} />
                <span>Área Administrativa</span>
              </button>

              <button
                type="button"
                className="btn-header-logout"
                onClick={onLogout}
                title="Encerrar sessão administrativa"
              >
                <LogOut size={14} />
                <span>Sair</span>
              </button>
            </div>
          )}

          {/* ESTADO 4: ADMINISTRADOR NA ÁREA ADMIN */}
          {currentSite === 'admin' && (
            <div className="header-auth-group">
              <button
                type="button"
                className="btn-header-action outline"
                onClick={onNavigateUserSite}
                title="Visualizar Site do Usuário"
              >
                <ArrowLeft size={15} />
                <span>Voltar ao Site</span>
              </button>

              <button
                type="button"
                className="btn-header-logout"
                onClick={onLogout}
                title="Encerrar sessão administrativa"
              >
                <LogOut size={14} />
                <span>Sair</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
