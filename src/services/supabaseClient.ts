import { createClient } from '@supabase/supabase-js'

// No Vite, as variáveis devem ter prefixo VITE_. Suportamos também NEXT_PUBLIC_ por conveniência.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  ''

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ''

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('sua-url-do-projeto') &&
  !supabaseAnonKey.includes('sua-chave-anon')
)

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontradas no arquivo .env.'
  )
}

/**
 * Cliente Oficial do Supabase conectado ao PostgreSQL
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
)
