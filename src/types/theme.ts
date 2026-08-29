/**
 * Modelo de dados do Tema utilizado na aplicação
 */
export interface Theme {
  id: string
  title: string
  description: string
  icon_emoji: string
  accent_color: string
  presentation_url?: string | null
  video_url?: string | null
  ebook_url?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Modelo relacional exato da tabela 'temas' no Supabase / PostgreSQL
 */
export interface SupabaseTemaRow {
  id: string
  titulo: string
  descricao: string
  emoji: string
  cor: string
  apresentacao: string | null
  video: string | null
  ebook: string | null
  created_at: string
  updated_at: string
}

/**
 * Mapeia uma linha da tabela Supabase para o modelo de domínio Theme
 */
export function mapSupabaseToTheme(row: SupabaseTemaRow): Theme {
  return {
    id: row.id,
    title: row.titulo,
    description: row.descricao,
    icon_emoji: row.emoji,
    accent_color: row.cor,
    presentation_url: row.apresentacao,
    video_url: row.video,
    ebook_url: row.ebook,
    created_at: row.created_at,
    updated_at: row.updated_at
  }
}

/**
 * Mapeia os dados do modelo Theme para o formato de inserção/atualização da tabela Supabase
 */
export function mapThemeToSupabaseInsert(
  data: Partial<Theme>
): Partial<Omit<SupabaseTemaRow, 'id' | 'created_at' | 'updated_at'>> {
  const payload: Partial<Omit<SupabaseTemaRow, 'id' | 'created_at' | 'updated_at'>> = {}

  if (data.title !== undefined) payload.titulo = data.title
  if (data.description !== undefined) payload.descricao = data.description
  if (data.icon_emoji !== undefined) payload.emoji = data.icon_emoji
  if (data.accent_color !== undefined) payload.cor = data.accent_color
  if (data.presentation_url !== undefined) payload.apresentacao = data.presentation_url
  if (data.video_url !== undefined) payload.video = data.video_url
  if (data.ebook_url !== undefined) payload.ebook = data.ebook_url

  return payload
}
