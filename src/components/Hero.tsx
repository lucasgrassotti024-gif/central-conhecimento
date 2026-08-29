import React from 'react'
import { Sparkles, Compass } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="home-hero">
      <div className="hero-pill-badge">
        <Sparkles size={14} />
        <span>Plataforma de Capacitação & Conteúdo Especializado</span>
      </div>

      <h1 className="home-hero-title">
        Central de <span className="highlight-text">Conhecimento</span>
      </h1>

      <p className="home-hero-description">
        Reunimos conteúdos profissionais e materiais didáticos organizados por temas estratégicos para facilitar seu aprendizado contínuo, consulta rápida e domínio técnico.
      </p>

      <div className="hero-stats-row">
        <div className="stat-badge">
          <Compass size={16} />
          <span>Acesso Rápido a Apresentações, Videoaulas e E-books</span>
        </div>
      </div>
    </section>
  )
}
