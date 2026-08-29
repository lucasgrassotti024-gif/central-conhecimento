import React from 'react'
import { ArrowRight, Edit3, Trash2, Presentation, Video, FileText } from 'lucide-react'
import { Theme } from '../types/theme'

interface AdminThemeCardProps {
  theme: Theme
  onAccess: (themeId: string) => void
  onEdit: (themeId: string) => void
  onDelete: (theme: Theme) => void
}

export const AdminThemeCard: React.FC<AdminThemeCardProps> = ({
  theme,
  onAccess,
  onEdit,
  onDelete
}) => {
  return (
    <div
      className="theme-card admin-card"
      style={{
        '--card-accent': theme.accent_color
      } as React.CSSProperties}
    >
      <div className="theme-card-top">
        <div className="theme-emoji-badge">
          {theme.icon_emoji}
        </div>
        <div className="theme-meta-indicators">
          {theme.presentation_url && (
            <span className="material-pill" title="Apresentação cadastrada">
              <Presentation size={13} /> Slides
            </span>
          )}
          {theme.video_url && (
            <span className="material-pill" title="Videoaula cadastrada">
              <Video size={13} /> Vídeo
            </span>
          )}
          {theme.ebook_url && (
            <span className="material-pill" title="E-book/PDF cadastrado">
              <FileText size={13} /> PDF
            </span>
          )}
        </div>
      </div>

      <div className="theme-card-content">
        <h3 className="theme-title">{theme.title}</h3>
        <p className="theme-description">{theme.description}</p>
      </div>

      {/* Ações Administrativas: ACESSAR, EDITAR, EXCLUIR */}
      <div className="admin-card-actions">
        <button
          type="button"
          className="btn-admin-action access"
          onClick={() => onAccess(theme.id)}
          title="Acessar e gerenciar conteúdos deste tema"
        >
          <span>ACESSAR</span>
          <ArrowRight size={15} />
        </button>

        <button
          type="button"
          className="btn-admin-action edit"
          onClick={() => onEdit(theme.id)}
          title="Editar informações do tema"
        >
          <Edit3 size={15} />
          <span>EDITAR</span>
        </button>

        <button
          type="button"
          className="btn-admin-action delete"
          onClick={() => onDelete(theme)}
          title="Excluir tema"
        >
          <Trash2 size={15} />
          <span>EXCLUIR</span>
        </button>
      </div>
    </div>
  )
}
