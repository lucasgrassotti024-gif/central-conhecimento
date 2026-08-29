import React from 'react'
import { ArrowRight, FileText, Video, Presentation } from 'lucide-react'
import { Theme } from '../types/theme'

interface ThemeCardProps {
  theme: Theme
  onSelect?: (theme: Theme) => void
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onSelect }) => {
  return (
    <div
      className="theme-card"
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
            <span className="material-pill" title="Apresentação disponível">
              <Presentation size={13} /> Slides
            </span>
          )}
          {theme.video_url && (
            <span className="material-pill" title="Videoaula disponível">
              <Video size={13} /> Vídeo
            </span>
          )}
          {theme.ebook_url && (
            <span className="material-pill" title="E-book/PDF disponível">
              <FileText size={13} /> PDF
            </span>
          )}
        </div>
      </div>

      <div className="theme-card-content">
        <h3 className="theme-title">{theme.title}</h3>
        <p className="theme-description">{theme.description}</p>
      </div>

      <div className="theme-card-footer">
        <button
          type="button"
          className="btn-access"
          onClick={() => onSelect && onSelect(theme)}
          aria-label={`Acessar tema ${theme.title}`}
        >
          <span>ACESSAR</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
