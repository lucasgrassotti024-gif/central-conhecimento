import React, { useEffect, useState } from 'react'
import { ArrowLeft, Save, X, Edit3, AlertCircle } from 'lucide-react'
import { themeService } from '../services/themeService'

interface EditThemePageProps {
  themeId: string
  onBack: () => void
  onSuccess: () => void
}

const PRESET_COLORS = [
  '#3b82f6',
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ec4899',
  '#6366f1'
]

const PRESET_EMOJIS = ['📦', '🛡️', '📊', '🚚', '📄', '💼', '🌐', '⚖️', '💡', '🚀']

export const EditThemePage: React.FC<EditThemePageProps> = ({
  themeId,
  onBack,
  onSuccess
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [iconEmoji, setIconEmoji] = useState('📦')
  const [accentColor, setAccentColor] = useState('#3b82f6')
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    themeService
      .getThemeById(themeId)
      .then((theme) => {
        if (theme) {
          setTitle(theme.title)
          setDescription(theme.description)
          setIconEmoji(theme.icon_emoji)
          setAccentColor(theme.accent_color)
        } else {
          setErrorMsg('Tema não localizado no banco de dados.')
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('[EditThemePage] Erro ao carregar tema do Supabase:', err)
        setErrorMsg('Erro ao consultar registro no Supabase.')
        setLoading(false)
      })
  }, [themeId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setErrorMsg('O título do tema é obrigatório.')
      return
    }
    if (!description.trim()) {
      setErrorMsg('A descrição do tema é obrigatória.')
      return
    }

    setIsSaving(true)
    setErrorMsg(null)

    try {
      await themeService.updateTheme(themeId, {
        title: title.trim(),
        description: description.trim(),
        icon_emoji: iconEmoji,
        accent_color: accentColor
      })

      onSuccess()
    } catch (err) {
      console.error('[EditThemePage] Erro ao atualizar tema no Supabase:', err)
      setErrorMsg('Falha ao atualizar informações no Supabase.')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="form-page-container">
        <button type="button" className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Voltar</span>
        </button>
        <div className="state-feedback-card loading">
          <div className="spinner-orbit"></div>
          <p>Carregando dados do tema do Supabase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-page-container">
      <div className="page-nav-bar">
        <button type="button" className="btn-back" onClick={onBack} disabled={isSaving}>
          <ArrowLeft size={18} />
          <span>Voltar</span>
        </button>
      </div>

      <div className="form-card-wrapper">
        <div className="form-card-header">
          <div className="form-icon-box">
            <Edit3 size={22} />
          </div>
          <div>
            <h2>Editar Informações do Tema</h2>
            <p>Atualize os metadados deste registro diretamente no Supabase</p>
          </div>
        </div>

        {errorMsg && (
          <div className="form-error-banner">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="theme-editor-form">
          {/* Título */}
          <div className="form-group">
            <label htmlFor="edit-theme-title" className="form-label">
              Título do Tema *
            </label>
            <input
              id="edit-theme-title"
              type="text"
              className="form-input"
              value={title}
              disabled={isSaving}
              onChange={(e) => {
                setTitle(e.target.value)
                setErrorMsg(null)
              }}
              required
            />
          </div>

          {/* Descrição */}
          <div className="form-group">
            <label htmlFor="edit-theme-desc" className="form-label">
              Descrição Detalhada *
            </label>
            <textarea
              id="edit-theme-desc"
              className="form-textarea"
              rows={3}
              value={description}
              disabled={isSaving}
              onChange={(e) => {
                setDescription(e.target.value)
                setErrorMsg(null)
              }}
              required
            />
          </div>

          {/* Emoji / Ícone */}
          <div className="form-group">
            <label className="form-label">Emoji / Ícone Visual</label>
            <div className="preset-selector">
              {PRESET_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  disabled={isSaving}
                  className={`preset-emoji-btn ${iconEmoji === emoji ? 'selected' : ''}`}
                  onClick={() => setIconEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '0.6rem' }}>
              <input
                type="text"
                className="form-input emoji-custom-input"
                value={iconEmoji}
                disabled={isSaving}
                maxLength={4}
                onChange={(e) => setIconEmoji(e.target.value)}
              />
            </div>
          </div>

          {/* Cor de Destaque */}
          <div className="form-group">
            <label className="form-label">Cor de Identidade Visual</label>
            <div className="preset-colors-row">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  disabled={isSaving}
                  className={`preset-color-dot ${accentColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setAccentColor(color)}
                  aria-label={`Cor ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Preview Visual do Card */}
          <div className="form-preview-section">
            <span className="preview-label">Pré-visualização do Cartão Atualizado:</span>
            <div
              className="theme-card preview-card"
              style={{ '--card-accent': accentColor } as React.CSSProperties}
            >
              <div className="theme-card-top">
                <div className="theme-emoji-badge">{iconEmoji || '📌'}</div>
              </div>
              <div className="theme-card-content">
                <h3 className="theme-title">{title || 'Título do Tema'}</h3>
                <p className="theme-description">
                  {description || 'Descrição do tema'}
                </p>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="form-actions-bar">
            <button
              type="button"
              className="btn-form-cancel"
              onClick={onBack}
              disabled={isSaving}
            >
              <X size={16} />
              <span>Cancelar</span>
            </button>

            <button
              type="submit"
              className="btn-form-save"
              disabled={isSaving}
            >
              <Save size={16} />
              <span>{isSaving ? 'Salvando Alterações...' : 'Salvar Alterações'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
