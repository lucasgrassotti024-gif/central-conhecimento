import React, { useEffect, useState } from 'react'
import { ArrowLeft, Presentation, Video, BookOpen, AlertCircle, RefreshCw } from 'lucide-react'
import { Theme } from '../types/theme'
import { themeService } from '../services/themeService'
import { ContentCard } from '../components/ContentCard'

interface ThemePageProps {
  themeId: string
  onBack: () => void
}

export const ThemePage: React.FC<ThemePageProps> = ({ themeId, onBack }) => {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchTheme = () => {
    setLoading(true)
    setErrorMessage(null)
    themeService
      .getThemeById(themeId)
      .then((data) => {
        setTheme(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(`[ThemePage] Erro ao carregar tema ${themeId}:`, err)
        setErrorMessage('Ocorreu um erro ao consultar as informações deste tema no banco de dados.')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTheme()
  }, [themeId])

  if (loading) {
    return (
      <div className="theme-page-container">
        <button type="button" className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Voltar para Temas</span>
        </button>
        <div className="state-feedback-card loading">
          <div className="spinner-orbit"></div>
          <p>Carregando informações do tema...</p>
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="theme-page-container">
        <button type="button" className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Voltar para Temas</span>
        </button>
        <div className="state-feedback-card error">
          <AlertCircle size={36} color="#f87171" />
          <h3>Erro de Carregamento</h3>
          <p>{errorMessage}</p>
          <button type="button" className="btn-retry" onClick={fetchTheme}>
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
          <span>Voltar para Temas</span>
        </button>
        <div className="state-feedback-card empty">
          <AlertCircle size={40} color="#f59e0b" />
          <h3>Tema não encontrado</h3>
          <p>O identificador informado não corresponde a nenhum tema registrado no catálogo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="theme-page-container">
      {/* Botão de Retorno à Home */}
      <div className="page-nav-bar">
        <button type="button" className="btn-back" onClick={onBack} aria-label="Voltar para a lista de temas">
          <ArrowLeft size={18} />
          <span>Voltar para Temas</span>
        </button>
      </div>

      {/* Header do Tema Selecionado */}
      <section
        className="theme-detail-header"
        style={{
          '--theme-accent': theme.accent_color
        } as React.CSSProperties}
      >
        <div className="theme-detail-top">
          <div className="theme-detail-emoji">{theme.icon_emoji}</div>
          <div className="theme-detail-info">
            <h1 className="theme-detail-title">{theme.title}</h1>
            <p className="theme-detail-description">{theme.description}</p>
          </div>
        </div>
      </section>

      {/* Seção de Conteúdos do Tema */}
      <section className="contents-section">
        <div className="contents-section-title">
          <h2>Conteúdos disponíveis</h2>
          <p>Selecione o material que deseja visualizar</p>
        </div>

        <div className="contents-grid">
          {/* 1. Apresentação */}
          <ContentCard
            type="presentation"
            title="Apresentação"
            description="Slides explicativos e material visual para acompanhamento da matéria."
            icon={Presentation}
            iconColor="139, 92, 246"
            url={theme.presentation_url}
            actionLabel="Acessar Apresentação"
          />

          {/* 2. Videoaula */}
          <ContentCard
            type="video"
            title="Videoaula"
            description="Aula gravada com explicação didática e estudo de casos práticos."
            icon={Video}
            iconColor="236, 72, 153"
            url={theme.video_url}
            actionLabel="Assistir à Videoaula"
          />

          {/* 3. E-book / PDF */}
          <ContentCard
            type="ebook"
            title="E-book"
            description="Apostila e documento de apoio para leitura aprofundada."
            icon={BookOpen}
            iconColor="16, 185, 129"
            url={theme.ebook_url}
            actionLabel="Acessar E-book"
          />
        </div>
      </section>
    </div>
  )
}
