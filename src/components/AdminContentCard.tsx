import React, { useState } from 'react'
import { ExternalLink, Edit3, Plus, Check, X, LucideIcon, Link as LinkIcon } from 'lucide-react'

interface AdminContentCardProps {
  type: 'presentation' | 'video' | 'ebook'
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  url?: string | null
  onSaveUrl: (newUrl: string | null) => void
}

/**
 * Função utilitária para resumir visualmente uma URL
 * Ex: https://www.youtube.com/watch?v=abc... -> youtube.com/...
 * Ex: https://drive.google.com/file/d/xyz/view -> drive.google.com/...
 */
function formatDisplayUrl(urlStr: string): string {
  try {
    const urlObj = new URL(urlStr)
    const host = urlObj.hostname.replace(/^www\./, '')
    const pathname = urlObj.pathname === '/' ? '' : urlObj.pathname
    if (!pathname && !urlObj.search) {
      return host
    }
    return `${host}/...`
  } catch {
    // Se não for uma URL válida com protocolo, limpa e trunca
    const cleaned = urlStr.replace(/^https?:\/\//, '').replace(/^www\./, '')
    return cleaned.length > 22 ? `${cleaned.slice(0, 22)}...` : cleaned
  }
}

export const AdminContentCard: React.FC<AdminContentCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  url,
  onSaveUrl
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputUrl, setInputUrl] = useState(url || '')
  const hasUrl = Boolean(url && url.trim() !== '')

  const handleSave = () => {
    const trimmed = inputUrl.trim()
    onSaveUrl(trimmed === '' ? null : trimmed)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setInputUrl(url || '')
    setIsEditing(false)
  }

  return (
    <div className={`content-card admin-content-card ${!hasUrl ? 'empty-content' : ''}`}>
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
          {hasUrl ? (
            <span className="status-badge available">Cadastrado</span>
          ) : (
            <span className="status-badge pending">Não cadastrado</span>
          )}
        </div>
      </div>

      <div className="content-card-body">
        <h3 className="content-title">{title}</h3>
        <p className="content-desc">{description}</p>

        {/* Exibição do Link ou Formulário de Edição */}
        {isEditing ? (
          <div className="admin-url-edit-box">
            <label htmlFor={`input-${title}`} className="input-label">
              Link de acesso do conteúdo:
            </label>
            <input
              id={`input-${title}`}
              type="url"
              className="admin-input"
              placeholder="https://exemplo.com/material"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              autoFocus
            />
            <div className="admin-inline-actions">
              <button
                type="button"
                className="btn-inline-save"
                onClick={handleSave}
              >
                <Check size={14} /> Salvar Link
              </button>
              <button
                type="button"
                className="btn-inline-cancel"
                onClick={handleCancel}
              >
                <X size={14} /> Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="admin-current-link-box">
            <span className="link-label">Link Atual:</span>
            {hasUrl ? (
              <a
                href={url!}
                target="_blank"
                rel="noopener noreferrer"
                className="current-link-text"
                title={url!}
              >
                <LinkIcon size={13} className="link-inline-icon" />
                <span className="truncate-link">{formatDisplayUrl(url!)}</span>
                <ExternalLink size={12} className="link-external-icon" />
              </a>
            ) : (
              <span className="empty-link-notice">Nenhum link vinculado</span>
            )}
          </div>
        )}
      </div>

      {/* Rodapé com Ações Administrativas */}
      {!isEditing && (
        <div className="content-card-footer">
          {hasUrl ? (
            <div className="admin-content-footer-btns">
              <a
                href={url!}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-test-link"
                title="Testar abertura do link cadastrado"
              >
                <ExternalLink size={14} />
                <span>Testar Link</span>
              </a>
              <button
                type="button"
                className="btn-edit-content"
                onClick={() => {
                  setInputUrl(url || '')
                  setIsEditing(true)
                }}
              >
                <Edit3 size={14} />
                <span>EDITAR</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-add-content"
              onClick={() => {
                setInputUrl('')
                setIsEditing(true)
              }}
            >
              <Plus size={15} />
              <span>+ Adicionar Link</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
