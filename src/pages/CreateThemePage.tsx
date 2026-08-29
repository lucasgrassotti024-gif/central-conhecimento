import React, { useState } from 'react'
import { ArrowLeft, Save, X, Sparkles } from 'lucide-react'
import { themeService } from '../services/themeService'

interface CreateThemePageProps {
  onBack: () => void
  onSuccess: (newThemeId: string) => void
}

const PRESET_COLORS = [
  '#3b82f6', // Azul
  '#8b5cf6', // Roxo
  '#06b6d4', // Ciano
  '#10b981', // Verde
  '#f59e0b', // Âmbar
  '#ec4899', // Rosa
  '#6366f1'  // Índigo
]

const PRESET_EMOJIS = ['📦', '🛡️', '📊', '🚚', '📄', '💼', '🌐', '⚖️', '💡', '🚀']

export const CreateThemePage: React.FC<CreateThemePageProps> = ({
  onBack,
  onSuccess
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [iconEmoji, setIconEmoji] = useState('📦')
  const [accentColor, setAccentColor] = useState('#3b82f6')
  const [isSaving, setIsSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

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
      const created = await themeService.createTheme({
        title: title.trim(),
        description: description.trim(),
        icon_emoji: iconEmoji,
        accent_color: accentColor,
        presentation_url: null,
        video_url: null,
        ebook_url: null
      })

      onSuccess(created.id)
    } catch (err) {
      console.error('[CreateThemePage] Erro ao cadastrar tema no Supabase:', err)
      setErrorMsg('Falha ao salvar tema no banco de dados. Verifique a conexão com o Supabase.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="form-page-container">
      <div className="page-nav-bar">
        <button type="button" className="btn-back" onClick={onBack} disabled={isSaving}>
          <ArrowLeft size={18} />
          <span>Voltar ao Painel Admin</span>
        </button>
      </div>

      <div className="form-card-wrapper">
        <div className="form-card-header">
          <div className="form-icon-box">
            <Sparkles size={22} />
          </div>
          <div>
            <h2>Adicionar Novo Tema</h2>
            <p>Preencha as informações para persistir este tema no banco de dados</p>
          </div>
        </div>

        {errorMsg && (
          <div className="form-error-banner">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="theme-editor-form">
          {/* Título */}
          <div className="form-group">
            <label htmlFor="theme-title" className="form-label">
              Título do Tema *
            </label>
            <input
              id="theme-title"
              type="text"
              className="form-input"
              placeholder="Ex: Seguros e Garantias Operacionais"
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
            <label htmlFor="theme-desc" className="form-label">
              Descrição Detalhada *
            </label>
            <textarea
              id="theme-desc"
              className="form-textarea"
              rows={3}
              placeholder="Explique resumidamente o objetivo e conteúdo deste tema para o estudante..."
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
                placeholder="Ou digite outro emoji personalizado..."
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
            <span className="preview-label">Pré-visualização do Cartão:</span>
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
                  {description || 'A descrição detalhada inserida no formulário aparecerá aqui.'}
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
              <span>{isSaving ? 'Salvando no Banco...' : 'Salvar Novo Tema'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
