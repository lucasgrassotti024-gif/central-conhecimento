import {
  Theme,
  SupabaseTemaRow,
  mapSupabaseToTheme,
  mapThemeToSupabaseInsert
} from '../types/theme'
import { supabase, isSupabaseConfigured } from './supabaseClient'

/**
 * ThemeService Oficial
 * Realiza 100% das operações de consulta e mutação diretamente no Supabase (PostgreSQL).
 * Nenhum dado fictício, array estático ou fallback local é utilizado.
 */
export const themeService = {
  /**
   * Consulta todos os registros da tabela 'temas' ordenados por data de criação
   */
  async getThemes(): Promise<Theme[]> {
    if (!isSupabaseConfigured) {
      throw new Error(
        'Supabase não configurado. Por favor, crie o arquivo .env com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
      )
    }

    const { data, error } = await supabase
      .from('temas')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[themeService] Erro ao consultar temas no Supabase:', error.message)
      throw new Error(error.message)
    }

    return ((data || []) as SupabaseTemaRow[]).map(mapSupabaseToTheme)
  },

  /**
   * Consulta um tema por ID único (UUID) na tabela 'temas'
   */
  async getThemeById(id: string): Promise<Theme | null> {
    if (!isSupabaseConfigured) {
      throw new Error(
        'Supabase não configurado. Por favor, crie o arquivo .env com as credenciais do Supabase.'
      )
    }

    const { data, error } = await supabase
      .from('temas')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error(`[themeService] Erro ao consultar tema ${id}:`, error.message)
      throw new Error(error.message)
    }

    if (!data) {
      return null
    }

    return mapSupabaseToTheme(data as SupabaseTemaRow)
  },

  /**
   * Insere um novo registro na tabela 'temas' do Supabase (INSERT)
   */
  async createTheme(
    themeData: Omit<Theme, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Theme> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado para gravação de dados.')
    }

    const payload = mapThemeToSupabaseInsert(themeData)

    const { data, error } = await supabase
      .from('temas')
      .insert([payload])
      .select()
      .single()

    if (error) {
      console.error('[themeService] Erro ao inserir tema no Supabase:', error.message)
      throw new Error(error.message)
    }

    return mapSupabaseToTheme(data as SupabaseTemaRow)
  },

  /**
   * Atualiza os campos ou links de um tema específico (UPDATE)
   */
  async updateTheme(id: string, themeData: Partial<Theme>): Promise<Theme | null> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado para atualização de dados.')
    }

    const payload = mapThemeToSupabaseInsert(themeData)

    const { data, error } = await supabase
      .from('temas')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error(`[themeService] Erro ao atualizar tema ${id} no Supabase:`, error.message)
      throw new Error(error.message)
    }

    return mapSupabaseToTheme(data as SupabaseTemaRow)
  },

  /**
   * Remove permanentemente o registro da tabela 'temas' (DELETE)
   */
  async deleteTheme(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado para exclusão de dados.')
    }

    const { error } = await supabase
      .from('temas')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(`[themeService] Erro ao excluir tema ${id} no Supabase:`, error.message)
      throw new Error(error.message)
    }

    return true
  }
}
