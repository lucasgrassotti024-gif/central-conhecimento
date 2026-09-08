import React, { useEffect, useState } from 'react'
import { LayoutGrid, Layers, AlertCircle, RefreshCw } from 'lucide-react'
import { Hero } from '../components/Hero'
import { ThemeCard } from '../components/ThemeCard'
import { Theme } from '../types/theme'
import { themeService } from '../services/themeService'

interface HomePageProps {
  onSelectTheme: (themeId: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTheme }) => {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchThemes = () => {
    setLoading(true)
    setErrorMessage(null)
    themeService
      .getThemes()
      .then((data) => {
        setThemes(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('[HomePage] Falha ao carregar temas:', err)
        setErrorMessage('Não foi possível carregar os temas no momento. Verifique a conexão com o banco de dados.')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchThemes()
  }, [])

  return (
    <div className="home-container">
      {/* Hero Section */}
      <Hero />

      {/* Seção Temas Disponíveis */}
      <section className="themes-section">
        <div className="section-title-wrapper">
          <div className="section-title-header">
            <div className="section-icon-box">
              <LayoutGrid size={20} />
            </div>
            <div>
              <h2 className="themes-heading">Temas disponíveis</h2>
              <p className="themes-subheading">
                Explore as trilhas de conhecimento e materiais complementares
              </p>
            </div>
          </div>

          {!loading && !errorMessage && (
            <div className="themes-count-badge">
              <Layers size={14} />
              <span>{themes.length === 1 ? '1 tema cadastrado' : `${themes.length} temas cadastrados`}</span>
            </div>
          )}
        </div>

        {/* Estado: Carregando */}
        {loading && (
          <div className="state-feedback-card loading">
            <div className="spinner-orbit"></div>
            <p>Carregando temas da Central de Conhecimento...</p>
          </div>
        )}

        {/* Estado: Erro */}
        {!loading && errorMessage && (
          <div className="state-feedback-card error">
            <AlertCircle size={36} color="#f87171" />
            <h3>Falha ao carregar catálogo</h3>
            <p>{errorMessage}</p>
            <button type="button" className="btn-retry" onClick={fetchThemes}>
              <RefreshCw size={16} />
              <span>Tentar novamente</span>
            </button>
          </div>
        )}

        {/* Estado: Nenhum tema cadastrado */}
        {!loading && !errorMessage && themes.length === 0 && (
          <div className="state-feedback-card empty">
            <Layers size={40} color="#64748b" />
            <h3>Nenhum tema disponível no momento</h3>
            <p>Os conteúdos serão disponibilizados em breve pelo administrador.</p>
          </div>
        )}

        {/* Grid de Cards dos Temas */}
        {!loading && !errorMessage && themes.length > 0 && (
          <div className="themes-grid">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                onSelect={() => onSelectTheme(theme.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
