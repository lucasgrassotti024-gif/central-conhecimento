import React from 'react'
import { ExternalLink, Clock, LucideIcon } from 'lucide-react'

interface ContentCardProps {
  type: 'presentation' | 'video' | 'ebook'
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  url?: string | null
  actionLabel: string
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  url,
  actionLabel
}) => {
  const isAvailable = Boolean(url && url.trim() !== '')

  return (
    <div className={`content-card ${!isAvailable ? 'unavailable' : ''}`}>
      <div className="content-card-header">
        <div
          className="content-icon-box"
          style={{
            background: `rgba(${iconColor}, 0.15)`,
            color: `rgb(${iconColor})`,
            border: `1px solid rgba(${iconColor}, 0.3)`
          }}
        >
          <Icon size={26} />
        </div>

        <div className="content-badge-status">
          {isAvailable ? (
            <span className="status-badge available">Disponível</span>
          ) : (
            <span className="status-badge pending">
              <Clock size={12} /> Em breve
            </span>
          )}
        </div>
      </div>

      <div className="content-card-body">
        <h3 className="content-title">{title}</h3>
        <p className="content-desc">{description}</p>
      </div>

      <div className="content-card-footer">
        {isAvailable ? (
          <a
            href={url!}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-content-access"
          >
            <span>{actionLabel}</span>
            <ExternalLink size={16} />
          </a>
        ) : (
          <div className="content-unavailable-box">
            <span>Conteúdo ainda não disponível</span>
          </div>
        )}
      </div>
    </div>
  )
}
