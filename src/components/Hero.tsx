import React from 'react'
import { GraduationCap, Zap, ShieldCheck, BarChart3 } from 'lucide-react'
import heroImg from '../assets/hero-logistics.jpg'

export const Hero: React.FC = () => {
  return (
    <section className="home-hero-corporate">
      <div className="hero-grid-split">
        {/* Coluna Esquerda: Conteúdo Institucional */}
        <div className="hero-text-column">
          <div className="hero-pill-badge">
            <GraduationCap size={15} className="pill-icon" />
            <span>PLATAFORMA DE ESTUDOS E CAPACITAÇÃO</span>
          </div>

          <h1 className="home-hero-title">
            Meu conhecimento <span className="highlight-gold">compartilhado.</span>
          </h1>

          <p className="home-hero-description">
            Este portal tem como objetivo compartilhar conhecimentos, estudos e experiências adquiridos ao longo da minha trajetória profissional, abordando temas e conteúdos relacionados ao amplo universo dos seguros.
          </p>

          {/* 3 Pilares com Micro-ícones */}
          <div className="hero-features-list">
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Zap size={15} />
              </div>
              <div className="feature-text">
                <strong>Acesso rápido</strong>
                <span>ao conhecimento</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-circle">
                <ShieldCheck size={15} />
              </div>
              <div className="feature-text">
                <strong>Conteúdos especializados</strong>
                <span>para sinistros e seguros</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-circle">
                <BarChart3 size={15} />
              </div>
              <div className="feature-text">
                <strong>Material atualizado</strong>
                <span>e confiável</span>
              </div>
            </div>
          </div>

          {/* Assinatura Estilizada Nicholas G. Spolavori */}
          <div className="hero-author-signature">
            <div className="signature-handwritten">Nicholas G. Spolavori</div>
            <div className="signature-info">
              <span className="author-name">NICHOLAS G. SPOLAVORI</span>
              <span className="author-role">ANALISTA DE SINISTROS</span>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Imagem de Logística e Transporte de Cargas */}
        <div className="hero-media-column">
          <div className="hero-image-frame">
            <img
              src={heroImg}
              alt="Operações de Logística, Transporte de Cargas e Sinistros"
              className="hero-main-img"
              loading="eager"
            />
            <div className="hero-image-overlay"></div>
            <div className="hero-accent-glow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
