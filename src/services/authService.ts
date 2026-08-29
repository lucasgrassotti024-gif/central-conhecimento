import { supabase, isSupabaseConfigured } from './supabaseClient'
import { User, Session } from '@supabase/supabase-js'

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: User | null
  session?: Session | null
  error?: string
}

/**
 * AuthService Oficial
 * Gerencia o ciclo de vida da sessão utilizando exclusivamente o Supabase Auth.
 * Nenhuma credencial fixa ou autenticação fictícia é permitida.
 */
export const authService = {
  /**
   * Realiza login autenticado via Supabase Auth
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      return {
        success: false,
        error: 'Preencha todos os campos obrigatórios.'
      }
    }

    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Supabase não configurado no arquivo .env.'
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email.trim(),
        password: credentials.password.trim()
      })

      if (error) {
        console.error('[authService] Erro Supabase Auth:', error.message)
        let customMessage = error.message
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          customMessage = 'E-mail ou senha incorretos no Supabase Auth.'
        } else if (error.message.toLowerCase().includes('email not confirmed')) {
          customMessage = 'E-mail ainda não confirmado no Supabase.'
        }
        return {
          success: false,
          error: customMessage
        }
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      }
    } catch (err) {
      console.error('[authService] Exceção na comunicação com Supabase Auth:', err)
      return {
        success: false,
        error: 'Falha na comunicação com o servidor de autenticação.'
      }
    }
  },

  /**
   * Encerra a sessão ativa no Supabase Auth
   */
  async logout(): Promise<void> {
    if (!isSupabaseConfigured) return

    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('[authService] Erro ao encerrar sessão:', err)
    }
  },

  /**
   * Recupera a sessão atual diretamente do cliente Supabase
   */
  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured) return null

    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('[authService] Erro ao recuperar sessão:', error.message)
        return null
      }
      return data.session
    } catch (err) {
      console.error('[authService] Falha ao verificar sessão no Supabase:', err)
      return null
    }
  },

  /**
   * Registra listener para ouvir mudanças em tempo real no estado da autenticação
   */
  onAuthStateChange(callback: (session: Session | null) => void) {
    if (!isSupabaseConfigured) {
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      }
    }

    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session)
    })
  }
}
