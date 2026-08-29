import React, { useEffect, useState } from 'react'
import { ArrowLeft, Presentation, Video, BookOpen, AlertCircle, Edit3, RefreshCw } from 'lucide-react'
import { Theme } from '../types/theme'
import { themeService } from '../services/themeService'
import { AdminContentCard } from '../components/AdminContentCard'

interface AdminThemePageProps {
  themeId: string
  onBack: () => void
  onEditThemeInfo: (themeId: string) => void
}

export const AdminThemePage: React.FC<AdminThemePageProps> = ({
  themeId,
  onBack,
  onEditThemeInfo
}) => {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null)

  const loadTheme = () => {
    setLoading(true)
    setErrorMessage(null)
    themeService
      .getThemeById(themeId)
      .then((data) => {
        setTheme(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(`[AdminThemePage] Erro ao carregar tema ${themeId}:`, err)
        setErrorMessage('Erro ao carregar os dados deste tema no Supabase.')
        setLoading(false)
      })
  }

  useEffect(() => {
    loadTheme()
  }, [themeId])

  const handleUpdateLink = async (
    field: 'presentation_url' | 'video_url' | 'ebook_url',
    newUrl: string | null
  ) => {
    if (!theme) return
    try {
      const updated = await themeService.updateTheme(theme.id, { [field]: newUrl })
      if (updated) {
        setTheme(updated)
        setFeedbackNotice('Link atualizado com sucesso no Supabase.')
        setTimeout(() => setFeedbackNotice(null), 3000)
      }
    } catch (err) {
      console.error('[AdminThemePage] Erro ao atualizar link do tema:', err)
      setFeedbackNotice('Falha ao persistir o link no Supabase.')
      setTimeout(() => setFeedbackNotice(null), 3500)
    }
  }

  if (loading) {
    return (
      <div className="theme-page-container">
        <button type="button" className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Voltar para Gestão de Temas</span>
        </button>
        <div className="state-feedback-card loading">
          <div className="spinner-orbit"></div>
          <p>Carregando informações do tema do Supabase...</p>
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="theme-page-container">
        <button type="button" className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Voltar para Gestão de Temas</span>
        </button>
        <div className="state-feedback-card error">
          <AlertCircle size={36} color="#f87171" />
          <h3>Erro ao Consultar</h3>
          <p>{errorMessage}</p>
          <button type="button" className="btn-retry" onClick={loadTheme}>
            <RefreshCw size={16} />
            <span>Tentar novamente</span>
          </button>
        </div>
      </div>
    )
  }

  if (!theme) {
    return (
      <div className="theme-page-container">
        <button type="button" className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Voltar para Gestão de Temas</span>
        </button>
        <div className="state-feedback-card empty">
          <AlertCircle size={40} color="#f59e0b" />
          <h3>Tema não encontrado</h3>
          <p>O identificador informado não existe na base de dados do Supabase.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="theme-page-container admin-theme-page">
      {/* Botão de Retorno ao Painel Admin */}
      <div className="page-nav-bar-split">
        <button type="button" className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Voltar para Painel Admin</span>
        </button>

        <button
          type="button"
          className="btn-edit-theme-header"
          onClick={() => onEditThemeInfo(theme.id)}
        >
          <Edit3 size={15} />
          <span>Editar Dados do Tema</span>
        </button>
      </div>

      {/* Feedback Alert */}
      {feedbackNotice && (
        <div className="feedback-alert-bar success">
          <span>{feedbackNotice}</span>
          <button type="button" onClick={() => setFeedbackNotice(null)}>✕</button>
        </div>
      )}

      {/* Header do Tema Selecionado no Admin */}
      <section
        className="theme-detail-header"
        style={{
          '--theme-accent': theme.accent_color
        } as React.CSSProperties}
      >
        <div className="theme-detail-top">
          <div className="theme-detail-emoji">{theme.icon_emoji}</div>
          <div className="theme-detail-info">
            <div className="admin-status-indicator">
              <span className="live-badge">Modo Administrador • Supabase Sincronizado</span>
            </div>
            <h1 className="theme-detail-title">{theme.title}</h1>
            <p className="theme-detail-description">{theme.description}</p>
          </div>
        </div>
      </section>

      {/* Seção de Gerenciamento de Conteúdos */}
      <section className="contents-section">
        <div className="contents-section-title">
          <h2>Gerenciamento de Conteúdos</h2>
          <p>Adicione, atualize ou remova os links de materiais deste tema no banco de dados</p>
        </div>

        <div className="contents-grid">
          {/* 1. Apresentação */}
          <AdminContentCard
            type="presentation"
            title="Apresentação"
            description="Slides explicativos (Google Slides, Canva ou PDF hospedado)."
            icon={Presentation}
            iconColor="139, 92, 246"
            url={theme.presentation_url}
            onSaveUrl={(newUrl) => handleUpdateLink('presentation_url', newUrl)}
          />

          {/* 2. Videoaula */}
          <AdminContentCard
            type="video"
            title="Videoaula"
            description="Link de streaming da aula gravada (YouTube, Vimeo, etc.)."
            icon={Video}
            iconColor="236, 72, 153"
            url={theme.video_url}
            onSaveUrl={(newUrl) => handleUpdateLink('video_url', newUrl)}
          />

          {/* 3. E-book / PDF */}
          <AdminContentCard
            type="ebook"
            title="E-book"
            description="Apostila didática ou documento complementar em PDF."
            icon={BookOpen}
            iconColor="16, 185, 129"
            url={theme.ebook_url}
            onSaveUrl={(newUrl) => handleUpdateLink('ebook_url', newUrl)}
          />
        </div>
      </section>
    </div>
  )
}
