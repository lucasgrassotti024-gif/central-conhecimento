# Regras do Projeto — Central de Conhecimento / Curso Nick

> **Documento Oficial de Diretrizes Arquiteturais, Estrutura de Dados e Regras de Desenvolvimento**

---

## 1. Visão Geral do Sistema

O projeto é estruturado em **dois sites independentes** conectados a uma única fonte de dados no **Supabase (PostgreSQL)**.

```
                 ┌─────────────────────────┐
                 │        SUPABASE         │
                 │  (PostgreSQL Database)  │
                 └────────────┬────────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
   ┌───────────────────────┐     ┌───────────────────────┐
   │    SITE DO USUÁRIO    │     │  SITE ADMINISTRATIVO  │
   │  (Interface Pública)  │     │   (Painel de Gestão)  │
   │      [CONSULTA]       │     │   [CRIA/EDITA/EXCLUI] │
   └───────────────────────┘     └───────────────────────┘
```

### O Princípio Fundamental (Axioma)
* **O Admin gerencia:** Cadastra, edita e exclui temas e links.
* **O Supabase armazena:** Única fonte oficial da verdade (*Single Source of Truth*).
* **O Usuário consome:** Consulta estrita de dados, sem permissões de modificação.

---

## 2. Stack Tecnológica Definida

* **Linguagem & Tipagem:** TypeScript / TSX
* **Frontend:** React + Vite
* **Banco de Dados & Backend:** Supabase (PostgreSQL) — *Sem uso de Firebase*
* **Estilização:** CSS moderno com design system estruturado e responsivo
* **Versionamento:** Git / GitHub

---

## 3. Escopo dos Dois Sites

### 3.1. Site do Usuário (Público / Read-Only)
* Visualização da lista de temas disponíveis.
* Acesso ao conteúdo do tema cadastrado.
* Acesso a links de Apresentação (Slides), Videoaula e E-book (PDF).
* Exibição elegante de "Conteúdo em breve / Indisponível" caso algum link ainda não tenha sido cadastrado.
* **Restrição estrita:** Não pode criar, editar ou apagar registros.

### 3.2. Site Administrativo (Admin / Full Control)
* Listagem completa dos temas.
* Criação de novos temas com título, descrição, emoji e cor.
* Edição de temas e atualização instantânea de links de materiais.
* Exclusão de temas.
* Gerenciamento de links (Apresentação, Videoaula, E-book).

---

## 4. Estrutura de Dados do Tema

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `UUID / int` | Identificador único no Supabase |
| `title` | `string` | Nome oficial do tema |
| `description` | `string` | Resumo explicativo do conteúdo |
| `icon_emoji` | `string` | Emoji ou ícone representativo |
| `accent_color` | `string` | Cor de destaque visual no catálogo |
| `presentation_url` | `string (nullable)` | Link da apresentação (Google Slides / Canva) |
| `video_url` | `string (nullable)` | Link da videoaula gravada |
| `ebook_url` | `string (nullable)` | Link da apostila / PDF |
| `created_at` | `timestamp` | Data de criação |
| `updated_at` | `timestamp` | Data da última alteração |

---

## 5. Regras de Desenvolvimento Mandatórias

1. **Supabase como fonte única:** O Site do Usuário nunca deve conter dados mockados estáticos ou cópias independentes em produção.
2. **Sem localStorage para dados de negócio:** Nenhum tema deve ser gravado em cache descontrolado no navegador.
3. **Tratamento gracioso de ausência de conteúdo:** Se um tema não tem videoaula cadastrada, o botão deve indicar status indisponível/em breve sem quebrar nem gerar links `404` ou `#`.
4. **Tipagem rigorosa:** Uso estrito de interfaces e types em TypeScript para garantir consistência.
5. **Evolução por etapas:** Seguir estritamente o planejamento sem antecipar módulos desnecessários.

---

## 6. Decisões Técnicas Registradas (Pendentes para as Próximas Etapas)

1. **[Pendente] Arquitetura de Repositórios:** Definir Monorepo com workspaces (ex: `apps/user` e `apps/admin`) vs Dois repositórios Git distintos.
2. **[Pendente] Autenticação Admin & RLS:** Definir políticas de Row Level Security no Supabase para isolar escrita apenas a usuários autenticados no Admin.
3. **[Pendente] Domínios e Deploy:** Definir URLs oficiais de publicação de ambos os sites na Vercel/Netlify.
