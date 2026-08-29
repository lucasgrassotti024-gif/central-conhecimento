-- ==============================================================================
-- CORREÇÃO DE PERMISSÕES POSTGRESQL & RLS: TABELA 'temas'
-- Execute este script no SQL Editor do seu Dashboard Supabase
-- ==============================================================================

-- 1. Conceder permissões básicas de tabela no PostgreSQL para as roles do Supabase
-- (Isso é obrigatório no PostgreSQL antes que as políticas de RLS sejam avaliadas)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.temas TO anon, authenticated, service_role;

-- 2. Garantir que o Row Level Security (RLS) esteja ativado
ALTER TABLE public.temas ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICA DE LEITURA PÚBLICA (SELECT)
-- Permite que qualquer visitante público / anônimo consulte os temas no Site do Usuário
DROP POLICY IF EXISTS "Leitura pública de temas" ON public.temas;
DROP POLICY IF EXISTS "Permitir select para anon e authenticated" ON public.temas;
CREATE POLICY "Leitura pública de temas"
ON public.temas
FOR SELECT
TO public
USING (true);

-- 4. POLÍTICAS DE GESTÃO PARA ADMINISTRADORES AUTENTICADOS (INSERT, UPDATE, DELETE)
-- Somente usuários autenticados via Supabase Auth podem criar, editar ou excluir registros
DROP POLICY IF EXISTS "Inserção de temas por autenticados" ON public.temas;
CREATE POLICY "Inserção de temas por autenticados"
ON public.temas
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Atualização de temas por autenticados" ON public.temas;
CREATE POLICY "Atualização de temas por autenticados"
ON public.temas
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Exclusão de temas por autenticados" ON public.temas;
CREATE POLICY "Exclusão de temas por autenticados"
ON public.temas
FOR DELETE
TO authenticated
USING (true);
