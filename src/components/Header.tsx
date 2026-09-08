import React from 'react'
import { Shield, LogOut, ArrowLeft, User, Info } from 'lucide-react'

interface HeaderProps {
  isAuthenticated: boolean
  currentSite: 'user' | 'admin' | 'login' | 'about'
  onNavigateHome: () => void
  onNavigateAbout: () => void
  onNavigateLogin: () => void
  onNavigateAdmin: () => void
  onNavigateUserSite: () => void
  onLogout: () => void
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  currentSite,
  onNavigateHome,
  onNavigateAbout,
  onNavigateLogin,
  onNavigateAdmin,
  onNavigateUserSite,
  onLogout
}) => {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo / Marca NGS */}
        <div
          className="brand-logo"
          onClick={currentSite === 'admin' ? onNavigateAdmin : onNavigateHome}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          title="Ir para a página inicial"
        >
          {/* Símbolo NGS estilizado */}
          <div className="ngs-brand-symbol">
            <span className="ngs-acronym">NGS</span>
            <span className="ngs-flight-icon">✈</span>
          </div>

          <div className="brand-text">
            <span className="brand-name">Plataforma de Estudos & Capacitação</span>
            <span className={`brand-badge ${currentSite === 'admin' ? 'admin-badge' : 'pro-badge'}`}>
              {currentSite === 'admin' ? 'ADMIN' : 'PRO'}
            </span>
          </div>
        </div>

        {/* Ações de Navegação e Autenticação */}
        <nav className="header-nav">
          {/* LINK / BOTÃO INSTITUCIONAL "SOBRE" NO SITE PÚBLICO */}
          {(currentSite === 'user' || currentSite === 'about') && (
            <button
              type="button"
              className={`btn-header-nav-link ${currentSite === 'about' ? 'active' : ''}`}
              onClick={currentSite === 'about' ? onNavigateHome : onNavigateAbout}
              title={currentSite === 'about' ? 'Voltar para Temas' : 'Conhecer sobre a Central'}
            >
              <Info size={14} />
              <span>{currentSite === 'about' ? 'Temas' : 'Sobre'}</span>
            </button>
          )}

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

          {/* ESTADO 2: VISITANTE NÃO AUTENTICADO NO SITE DO USUÁRIO OU SOBRE */}
          {(currentSite === 'user' || currentSite === 'about') && !isAuthenticated && (
            <button
              type="button"
              className="btn-header-login"
              onClick={onNavigateLogin}
              title="Acessar Área Administrativa com credenciais"
            >
              <User size={15} />
              <span>Área Administrativa</span>
            </button>
          )}

          {/* ESTADO 3: ADMINISTRADOR AUTENTICADO NO SITE DO USUÁRIO OU SOBRE */}
          {(currentSite === 'user' || currentSite === 'about') && isAuthenticated && (
            <div className="header-auth-group">
              <button
                type="button"
                className="btn-header-admin-active"
                onClick={onNavigateAdmin}
                title="Acessar Painel Administrativo"
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
