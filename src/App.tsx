import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { ThemePage } from './pages/ThemePage'
import { AboutPage } from './pages/AboutPage'
import { AdminHomePage } from './pages/AdminHomePage'
import { AdminThemePage } from './pages/AdminThemePage'
import { CreateThemePage } from './pages/CreateThemePage'
import { EditThemePage } from './pages/EditThemePage'
import { LoginPage } from './pages/LoginPage'
import { authService } from './services/authService'

export default function App() {
  // Estado da Sessão com Supabase Auth
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true)

  // Estado do Roteamento
  const [currentRoute, setCurrentRoute] = useState<{
    site: 'user' | 'admin' | 'login' | 'about'
    themeId: string | null
    adminAction: 'create' | 'edit' | null
  }>(() => {
    const params = new URLSearchParams(window.location.search)
    const isAbout = params.get('sobre') === 'true'
    const isLogin = params.get('login') === 'true'
    const isAdmin = params.get('admin') === 'true'
    const themeId = params.get('tema')
    const action = params.get('action')

    return {
      site: isAbout ? 'about' : isLogin ? 'login' : isAdmin ? 'admin' : 'user',
      themeId,
      adminAction: action === 'create' || action === 'edit' ? action : null
    }
  })

  // Helper de Navegação por URL
  const navigateTo = useCallback(
    async (params: {
      site: 'user' | 'admin' | 'login' | 'about'
      themeId?: string | null
      adminAction?: 'create' | 'edit' | null
    }) => {
      const url = new URL(window.location.href)
      url.search = '' // Limpa query anterior

      // Proteção de rota assíncrona consultando a sessão real do Supabase
      if (params.site === 'admin') {
        const session = await authService.getSession()
        const authed = Boolean(session)
        setIsAuthenticated(authed)

        if (!authed) {
          url.searchParams.set('login', 'true')
          window.history.pushState({}, '', url.toString())
          setCurrentRoute({ site: 'login', themeId: null, adminAction: null })
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
      }

      if (params.site === 'about') url.searchParams.set('sobre', 'true')
      if (params.site === 'admin') url.searchParams.set('admin', 'true')
      if (params.site === 'login') url.searchParams.set('login', 'true')
      if (params.themeId) url.searchParams.set('tema', params.themeId)
      if (params.adminAction) url.searchParams.set('action', params.adminAction)

      window.history.pushState({}, '', url.toString())
      setCurrentRoute({
        site: params.site,
        themeId: params.themeId || null,
        adminAction: params.adminAction || null
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    []
  )

  // Checa a sessão inicial do Supabase Auth e registra listener
  useEffect(() => {
    authService.getSession().then((session) => {
      const authed = Boolean(session)
      setIsAuthenticated(authed)
      setIsCheckingSession(false)

      const params = new URLSearchParams(window.location.search)
      if (params.get('admin') === 'true' && !authed) {
        navigateTo({ site: 'login' })
      }
    })

    const { data: authListener } = authService.onAuthStateChange((session) => {
      const authed = Boolean(session)
      setIsAuthenticated(authed)
      if (!authed && currentRoute.site === 'admin') {
        navigateTo({ site: 'login' })
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [navigateTo, currentRoute.site])

  // Sincronização com o histórico do navegador (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const isAbout = params.get('sobre') === 'true'
      const isLogin = params.get('login') === 'true'
      const isAdmin = params.get('admin') === 'true'
      const themeId = params.get('tema')
      const action = params.get('action')

      authService.getSession().then((session) => {
        const authed = Boolean(session)
        setIsAuthenticated(authed)

        if (isAdmin && !authed) {
          setCurrentRoute({ site: 'login', themeId: null, adminAction: null })
          return
        }

        setCurrentRoute({
          site: isAbout ? 'about' : isLogin ? 'login' : isAdmin ? 'admin' : 'user',
          themeId,
          adminAction: action === 'create' || action === 'edit' ? action : null
        })
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Ação de Sucesso no Login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    navigateTo({ site: 'user' })
  }

  // Ação de Logout
  const handleLogout = async () => {
    await authService.logout()
    setIsAuthenticated(false)
    navigateTo({ site: 'user' })
  }

  if (isCheckingSession) {
    return (
      <div className="app-container">
        <div className="state-feedback-card loading" style={{ marginTop: '20vh' }}>
          <div className="spinner-orbit"></div>
          <p>Inicializando sessão da Central de Conhecimento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      {/* Fundo Ambiente Profissional */}
      <div className="bg-ambient">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>

      {/* Header Unificado */}
      <Header
        isAuthenticated={isAuthenticated}
        currentSite={currentRoute.site}
        onNavigateHome={() => navigateTo({ site: 'user' })}
        onNavigateAbout={() => navigateTo({ site: 'about' })}
        onNavigateLogin={() => navigateTo({ site: 'login' })}
        onNavigateAdmin={() => navigateTo({ site: 'admin' })}
        onNavigateUserSite={() => navigateTo({ site: 'user' })}
        onLogout={handleLogout}
      />

      {/* Roteador Principal */}
      <main className="main-content">
        {currentRoute.site === 'login' ? (
          // ================= TELA DE LOGIN =================
          <LoginPage
            onBackToUserSite={() => navigateTo({ site: 'user' })}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : currentRoute.site === 'about' ? (
          // ================= PÁGINA INSTITUCIONAL SOBRE =================
          <AboutPage
            onBackToHome={() => navigateTo({ site: 'user' })}
          />
        ) : currentRoute.site === 'admin' ? (
          // ================= ÁREA ADMINISTRATIVA =================
          currentRoute.adminAction === 'create' ? (
            <CreateThemePage
              onBack={() => navigateTo({ site: 'admin' })}
              onSuccess={(newId) => navigateTo({ site: 'admin', themeId: newId })}
            />
          ) : currentRoute.adminAction === 'edit' && currentRoute.themeId ? (
            <EditThemePage
              themeId={currentRoute.themeId}
              onBack={() => navigateTo({ site: 'admin' })}
              onSuccess={() => navigateTo({ site: 'admin' })}
            />
          ) : currentRoute.themeId ? (
            <AdminThemePage
              themeId={currentRoute.themeId}
              onBack={() => navigateTo({ site: 'admin' })}
              onEditThemeInfo={(id) => navigateTo({ site: 'admin', themeId: id, adminAction: 'edit' })}
            />
          ) : (
            <AdminHomePage
              onAccessTheme={(id) => navigateTo({ site: 'admin', themeId: id })}
              onAddTheme={() => navigateTo({ site: 'admin', adminAction: 'create' })}
              onEditTheme={(id) => navigateTo({ site: 'admin', themeId: id, adminAction: 'edit' })}
            />
          )
        ) : (
          // ================= SITE DO USUÁRIO =================
          currentRoute.themeId ? (
            <ThemePage
              themeId={currentRoute.themeId}
              onBack={() => navigateTo({ site: 'user' })}
            />
          ) : (
            <HomePage
              onSelectTheme={(id) => navigateTo({ site: 'user', themeId: id })}
            />
          )
        )}
      </main>

      {/* Rodapé da Plataforma com Identidade NGS */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand-box">
            <div className="footer-ngs-badge">
              <span className="footer-ngs-text">NGS</span>
              <span className="footer-ngs-truck">🚚</span>
              <span className="footer-ngs-plane">✈</span>
            </div>
            <div className="footer-desc-group">
              <p className="footer-title">
                {currentRoute.site === 'admin'
                  ? 'Central de Conhecimento • Painel Administrativo'
                  : currentRoute.site === 'login'
                  ? 'Central de Conhecimento • Autenticação de Acesso'
                  : 'Plataforma de Estudos & Consultoria Técnica'}
              </p>
              <p className="footer-subtitle">
                Desenvolvida por <strong className="gold-author">Nicholas G. Spolavori</strong> • Analista de Sinistros
              </p>
              <p className="footer-dev-credit">
                Site desenvolvido por Lucas Grassotti Spolavori
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
