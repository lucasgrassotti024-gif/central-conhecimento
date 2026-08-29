import React, { useEffect, useState } from 'react'
import { LayoutGrid, Layers, Plus, AlertCircle, RefreshCw } from 'lucide-react'
import { AdminThemeCard } from '../components/AdminThemeCard'
import { DeleteConfirmModal } from '../components/DeleteConfirmModal'
import { Theme } from '../types/theme'
import { themeService } from '../services/themeService'

interface AdminHomePageProps {
  onAccessTheme: (themeId: string) => void
  onAddTheme: () => void
  onEditTheme: (themeId: string) => void
}

export const AdminHomePage: React.FC<AdminHomePageProps> = ({
  onAccessTheme,
  onAddTheme,
  onEditTheme
}) => {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [themeToDelete, setThemeToDelete] = useState<Theme | null>(null)
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null)

  const loadThemes = () => {
    setLoading(true)
    setErrorMessage(null)
    themeService
      .getThemes()
      .then((data) => {
        setThemes(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('[AdminHomePage] Erro ao carregar temas no Admin:', err)
        setErrorMessage('Erro ao consultar banco de dados. Verifique a conexão com o Supabase.')
        setLoading(false)
      })
  }

  useEffect(() => {
    loadThemes()
  }, [])

  const handleDeleteConfirm = async () => {
    if (!themeToDelete) return
    try {
      await themeService.deleteTheme(themeToDelete.id)
      setFeedbackNotice(`Tema "${themeToDelete.title}" removido com sucesso do banco de dados.`)
      setThemeToDelete(null)
      loadThemes()
      setTimeout(() => setFeedbackNotice(null), 4000)
    } catch (err) {
      console.error('[AdminHomePage] Erro ao excluir tema:', err)
      setErrorMessage('Falha ao excluir tema do Supabase. Verifique suas permissões de RLS.')
    }
  }

  return (
    <div className="admin-home-container">
      {/* Hero Admin Header */}
      <section className="home-hero admin-hero">
        <div className="hero-pill-badge admin-badge-pill">
          <span>Painel Administrativo • Gestão Supabase</span>
        </div>

        <h1 className="home-hero-title">
          Gerenciamento de <span className="highlight-text">Temas & Conteúdos</span>
        </h1>

        <p className="home-hero-description">
          Cadastre novos tópicos de estudo, altere metadados e atualize os links das apresentações, videoaulas e e-books sincronizados diretamente no banco de dados.
        </p>
      </section>

      {/* Feedback Alert */}
      {feedbackNotice && (
        <div className="feedback-alert-bar success">
          <span>{feedbackNotice}</span>
          <button type="button" onClick={() => setFeedbackNotice(null)}>✕</button>
        </div>
      )}

      {/* Seção Temas disponíveis com Botão + Adicionar Novo Tema */}
      <section className="themes-section">
        <div className="section-title-wrapper admin-title-wrapper">
          <div className="section-title-header">
            <div className="section-icon-box">
              <LayoutGrid size={20} />
            </div>
            <div>
              <h2 className="themes-heading">Temas disponíveis</h2>
              <p className="themes-subheading">
                Gerencie os registros da tabela oficial no Supabase
              </p>
            </div>
          </div>

          <div className="admin-header-actions">
            {!loading && !errorMessage && (
              <div className="themes-count-badge">
                <Layers size={14} />
                <span>{themes.length} temas cadastrados</span>
              </div>
            )}

            <button
              type="button"
              className="btn-primary-add"
              onClick={onAddTheme}
            >
              <Plus size={18} />
              <span>+ Adicionar novo tema</span>
            </button>
          </div>
        </div>

        {/* Estado: Carregando */}
        {loading && (
          <div className="state-feedback-card loading">
            <div className="spinner-orbit"></div>
            <p>Carregando temas do Supabase...</p>
          </div>
        )}

        {/* Estado: Erro */}
        {!loading && errorMessage && (
          <div className="state-feedback-card error">
            <AlertCircle size={36} color="#f87171" />
            <h3>Falha de Comunicação</h3>
            <p>{errorMessage}</p>
            <button type="button" className="btn-retry" onClick={loadThemes}>
              <RefreshCw size={16} />
              <span>Tentar novamente</span>
            </button>
          </div>
        )}

        {/* Estado: Vazio */}
        {!loading && !errorMessage && themes.length === 0 && (
          <div className="state-feedback-card empty">
            <Layers size={40} color="#64748b" />
            <h3>Nenhum tema cadastrado no banco</h3>
            <p>Clique no botão acima para adicionar o primeiro tema da Central de Conhecimento.</p>
          </div>
        )}

        {/* Grid de Cards dos Temas com Controles Administrativos */}
        {!loading && !errorMessage && themes.length > 0 && (
          <div className="themes-grid">
            {themes.map((theme) => (
              <AdminThemeCard
                key={theme.id}
                theme={theme}
                onAccess={onAccessTheme}
                onEdit={onEditTheme}
                onDelete={(t) => setThemeToDelete(t)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal de Exclusão */}
      <DeleteConfirmModal
        theme={themeToDelete}
        isOpen={Boolean(themeToDelete)}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setThemeToDelete(null)}
      />
    </div>
  )
}
