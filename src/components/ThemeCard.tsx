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
        '--card-accent': theme.accent_color || '#f59e0b'
      } as React.CSSProperties}
    >
      <div className="theme-card-top">
        <div className="theme-emoji-badge">
          {theme.icon_emoji ? (
            <span className="theme-icon-display">{theme.icon_emoji}</span>
          ) : (
            <span className="theme-icon-folder">📁</span>
          )}
        </div>
        <div className="theme-meta-indicators">
          <span className={`material-pill ${theme.presentation_url ? 'active' : 'inactive'}`} title="Apresentação (Slides)">
            <Presentation size={13} /> Slides
          </span>
          <span className={`material-pill ${theme.video_url ? 'active' : 'inactive'}`} title="Videoaula">
            <Video size={13} /> Vídeo
          </span>
          <span className={`material-pill ${theme.ebook_url ? 'active' : 'inactive'}`} title="E-book / PDF">
            <FileText size={13} /> PDF
          </span>
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
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
