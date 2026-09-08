-- ==============================================================================
-- ARQUITETURA DE SEGURANÇA POSTGRESQL & RLS: CENTRAL DE CONHECIMENTO (NGS)
-- Execute este script no SQL Editor do seu Dashboard Supabase (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. CONCEDER PERMISSÕES DE SCHEMA
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. PRIVILÉGIOS DE TABELA NO POSTGRESQL POR ROLE:
-- Role 'anon' (Visitantes Públicos não autenticados): APENAS LEITURA (SELECT)
REVOKE ALL ON TABLE public.temas FROM anon;
GRANT SELECT ON TABLE public.temas TO anon;

-- Role 'authenticated' (Usuários logados no Supabase Auth): SELECT, INSERT, UPDATE, DELETE
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.temas TO authenticated;

-- Role 'service_role' (Backend administrativo interno): ACESSO TOTAL
GRANT ALL ON TABLE public.temas TO service_role;

-- 3. ATIVAR ROW LEVEL SECURITY (RLS) OBRIGATÓRIO NA TABELA
ALTER TABLE public.temas ENABLE ROW LEVEL SECURITY;

-- 4. LIMPEZA DE POLÍTICAS ANTERIORES
DROP POLICY IF EXISTS "Leitura pública de temas" ON public.temas;
DROP POLICY IF EXISTS "Permitir select para anon e authenticated" ON public.temas;
DROP POLICY IF EXISTS "Inserção de temas por autenticados" ON public.temas;
DROP POLICY IF EXISTS "Atualização de temas por autenticados" ON public.temas;
DROP POLICY IF EXISTS "Exclusão de temas por autenticados" ON public.temas;
DROP POLICY IF EXISTS "Inserção de temas por administradores" ON public.temas;
DROP POLICY IF EXISTS "Atualização de temas por administradores" ON public.temas;
DROP POLICY IF EXISTS "Exclusão de temas por administradores" ON public.temas;

-- 5. POLÍTICA DE LEITURA PÚBLICA (SELECT)
-- Qualquer usuário (público ou autenticado) pode consultar o catálogo de temas e materiais
CREATE POLICY "Leitura pública de temas"
ON public.temas
FOR SELECT
TO public
USING (true);

-- 6. POLÍTICAS RLS DE ESCRITA: APENAS USUÁRIOS AUTENTICADOS (ADMIN)
-- Bloqueia 100% de inserções por visitantes anônimos
CREATE POLICY "Inserção de temas por administradores"
ON public.temas
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- Bloqueia 100% de atualizações por visitantes anônimos
CREATE POLICY "Atualização de temas por administradores"
ON public.temas
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Bloqueia 100% de exclusões por visitantes anônimos
CREATE POLICY "Exclusão de temas por administradores"
ON public.temas
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);
