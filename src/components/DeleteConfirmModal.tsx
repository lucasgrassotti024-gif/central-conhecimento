import React from 'react'
import { AlertTriangle, Trash2, X } from 'lucide-react'
import { Theme } from '../types/theme'

interface DeleteConfirmModalProps {
  theme: Theme | null
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  theme,
  isOpen,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !theme) return null

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-box delete">
            <AlertTriangle size={24} />
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <h3>Excluir este tema?</h3>
          <p>
            Esta ação removerá o tema <strong>"{theme.title}"</strong> e todos os vínculos de conteúdos do sistema.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn-modal delete"
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            <span>Excluir</span>
          </button>
        </div>
      </div>
    </div>
  )
}
