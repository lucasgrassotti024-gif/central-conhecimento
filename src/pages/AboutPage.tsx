import React from 'react'
import {
  ArrowLeft,
  BookOpen,
  Target,
  Search,
  TrendingUp,
  Presentation,
  Video,
  FileText,
  Sparkles,
  Shield,
  Compass,
  UserCheck
} from 'lucide-react'
import heroImg from '../assets/hero-logistics.jpg'

interface AboutPageProps {
  onBackToHome: () => void
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome }) => {
  return (
    <div className="about-page-container">
      {/* Botão Superior de Navegação */}
      <div className="page-nav-bar">
        <button type="button" className="btn-back" onClick={onBackToHome}>
          <ArrowLeft size={16} />
          <span>Voltar para a Central</span>
        </button>
      </div>

      {/* 1. HERO SECTION INSTITUCIONAL */}
      <section className="about-hero">
        <div className="about-hero-grid">
          <div className="about-hero-text">
            <div className="hero-pill-badge">
              <Sparkles size={14} className="pill-icon" />
              <span>PLATAFORMA DE CONHECIMENTO</span>
            </div>

            <h1 className="about-hero-title">
              Conheça a <span className="highlight-gold">Central de Conhecimento</span>
            </h1>

            <p className="about-hero-subtitle">
              Um espaço criado para reunir, organizar e compartilhar conhecimento técnico e especializado.
            </p>
          </div>

          <div className="about-hero-media">
            <div className="hero-image-frame">
              <img
                src={heroImg}
                alt="Central de Conhecimento NGS - Logística e Seguros"
                className="hero-main-img"
              />
              <div className="hero-image-overlay"></div>
              <div className="hero-accent-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O QUE É A CENTRAL? */}
      <section className="about-section concept-section">
        <div className="about-card-banner">
          <div className="concept-icon-box">
            <Compass size={28} />
          </div>
          <div className="concept-content">
            <h2 className="about-section-heading">O que é a Central de Conhecimento?</h2>
            <p className="concept-text">
              A <strong>Central de Conhecimento</strong> é um espaço desenvolvido para reunir conteúdos, materiais e informações de forma organizada e acessível.
            </p>
            <p className="concept-text">
              A proposta é facilitar o acesso ao conhecimento e concentrar, em um único lugar, materiais relacionados às áreas de estudo e atuação profissional.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OBJETIVOS */}
      <section className="about-section objectives-section">
        <div className="section-title-header">
          <div className="section-icon-box">
            <Target size={20} />
          </div>
          <div>
            <h2 className="themes-heading">Nossos Objetivos</h2>
            <p className="themes-subheading">Pilares fundamentais da plataforma de estudos</p>
          </div>
        </div>

        <div className="about-objectives-grid">
          <div className="objective-card">
            <div className="objective-icon-box">
              <BookOpen size={22} />
            </div>
            <h3>Compartilhar conhecimento</h3>
            <p>Facilitar o acesso a conteúdos e materiais de estudo de forma estruturada.</p>
          </div>

          <div className="objective-card">
            <div className="objective-icon-box">
              <Target size={22} />
            </div>
            <h3>Facilitar o aprendizado</h3>
            <p>Organizar informações de forma clara, didática e prática para consulta.</p>
          </div>

          <div className="objective-card">
            <div className="objective-icon-box">
              <Search size={22} />
            </div>
            <h3>Centralizar materiais</h3>
            <p>Reunir diferentes tipos de conteúdos e mídias em um único ambiente integrado.</p>
          </div>

          <div className="objective-card">
            <div className="objective-icon-box">
              <TrendingUp size={22} />
            </div>
            <h3>Desenvolvimento profissional</h3>
            <p>Contribuir ativamente para o aprimoramento contínuo dos conhecimentos técnicos.</p>
          </div>
        </div>
      </section>

      {/* 4. SOBRE NICHOLAS */}
      <section className="about-section author-profile-section">
        <div className="author-card-wrapper">
          <div className="author-avatar-column">
            <div className="author-avatar-frame">
              <div className="author-avatar-placeholder">
                <UserCheck size={52} />
                <span>Foto Profissional</span>
              </div>
            </div>
          </div>

          <div className="author-bio-column">
            <div className="author-badge">
              <Shield size={14} />
              <span>PERFIL PROFISSIONAL</span>
            </div>
            <h2 className="author-heading">Quem é Nicholas Grassotti Spolavori?</h2>
            <h3 className="author-subheading">
              Nicholas Grassotti Spolavori • <span className="gold-text">Analista de Sinistros</span>
            </h3>

            <p className="author-description">
              Nicholas Grassotti Spolavori atua como Analista de Sinistros, com foco no universo de seguros e na análise de situações relacionadas a sinistros e transporte.
            </p>

            <p className="author-description">
              A Central de Conhecimento representa uma iniciativa de organização e compartilhamento de materiais, buscando transformar conhecimento e experiência em conteúdos que possam ser consultados e utilizados no desenvolvimento profissional.
            </p>
          </div>
        </div>
      </section>

      {/* 5. O QUE VOCÊ ENCONTRA AQUI */}
      <section className="about-section content-types-section">
        <div className="section-title-header">
          <div className="section-icon-box">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="themes-heading">O que você encontra aqui</h2>
            <p className="themes-subheading">Formatos integrados disponíveis para consulta</p>
          </div>
        </div>

        <div className="contents-grid">
          <div className="content-card informative">
            <div className="content-card-header">
              <div
                className="content-icon-box"
                style={{
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: 'rgb(139, 92, 246)',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}
              >
                <Presentation size={26} />
              </div>
              <span className="status-badge available">Material Visual</span>
            </div>
            <div className="content-card-body">
              <h3 className="content-title">APRESENTAÇÕES</h3>
              <p className="content-desc">
                Materiais visuais e slides explicativos organizados para facilitar o estudo e a fixação de conceitos.
              </p>
            </div>
          </div>

          <div className="content-card informative">
            <div className="content-card-header">
              <div
                className="content-icon-box"
                style={{
                  background: 'rgba(236, 72, 153, 0.15)',
                  color: 'rgb(236, 72, 153)',
                  border: '1px solid rgba(236, 72, 153, 0.3)'
                }}
              >
                <Video size={26} />
              </div>
              <span className="status-badge available">Material Audiovisual</span>
            </div>
            <div className="content-card-body">
              <h3 className="content-title">VIDEOAULAS</h3>
              <p className="content-desc">
                Conteúdos gravados em vídeo com explicações dinâmicas para complementar e acelerar o aprendizado.
              </p>
            </div>
          </div>

          <div className="content-card informative">
            <div className="content-card-header">
              <div
                className="content-icon-box"
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'rgb(16, 185, 129)',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                <FileText size={26} />
              </div>
              <span className="status-badge available">Material Didático</span>
            </div>
            <div className="content-card-body">
              <h3 className="content-title">E-BOOKS / PDFs</h3>
              <p className="content-desc">
                Apostilas completas, relatórios e documentos de apoio para leitura aprofundada e consulta técnica contínua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROPÓSITO */}
      <section className="about-section purpose-section">
        <div className="purpose-card">
          <div className="purpose-glow-bar"></div>
          <h2 className="purpose-heading">Conhecimento que pode ser compartilhado.</h2>
          <p className="purpose-text">
            A ideia da Central é simples: tornar o conhecimento mais organizado, acessível e fácil de compartilhar.
          </p>
          <p className="purpose-text">
            Mais do que armazenar materiais, a proposta é criar um espaço onde conteúdos possam ser consultados, estudados e utilizados como apoio ao desenvolvimento profissional contínuo.
          </p>
        </div>
      </section>

      {/* 7. FRASE FINAL & CTA */}
      <section className="about-quote-cta">
        <div className="quote-box">
          <p className="quote-text">
            “Conhecimento compartilhado se transforma em conhecimento multiplicado.”
          </p>
          <button type="button" className="btn-access about-cta-btn" onClick={onBackToHome}>
            <ArrowLeft size={16} />
            <span>Voltar para a Central</span>
          </button>
        </div>
      </section>
    </div>
  )
}
