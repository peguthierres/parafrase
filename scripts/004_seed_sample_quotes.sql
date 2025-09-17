-- Insert sample quotes for the classic authors
INSERT INTO public.quotes (content, author_id, is_approved, is_featured) VALUES
-- Aristóteles
('A excelência não é um ato, mas um hábito.', (SELECT id FROM public.authors WHERE name = 'Aristóteles'), true, true),
('Somos aquilo que fazemos repetidamente. Excelência, então, não é um modo de agir, mas um hábito.', (SELECT id FROM public.authors WHERE name = 'Aristóteles'), true, false),

-- Platão
('A necessidade é a mãe da invenção.', (SELECT id FROM public.authors WHERE name = 'Platão'), true, true),
('O preço que os bons pagam pela indiferença aos assuntos públicos é serem governados pelos maus.', (SELECT id FROM public.authors WHERE name = 'Platão'), true, false),

-- Sócrates
('Só sei que nada sei.', (SELECT id FROM public.authors WHERE name = 'Sócrates'), true, true),
('Uma vida sem reflexão não vale a pena ser vivida.', (SELECT id FROM public.authors WHERE name = 'Sócrates'), true, false),

-- Confúcio
('Não importa o quão devagar você vá, desde que você não pare.', (SELECT id FROM public.authors WHERE name = 'Confúcio'), true, true),
('O homem superior é modesto em seu discurso, mas excede em suas ações.', (SELECT id FROM public.authors WHERE name = 'Confúcio'), true, false),

-- Shakespeare
('Ser ou não ser, eis a questão.', (SELECT id FROM public.authors WHERE name = 'William Shakespeare'), true, true),
('Somos feitos da mesma matéria que os sonhos.', (SELECT id FROM public.authors WHERE name = 'William Shakespeare'), true, false),

-- Fernando Pessoa
('Tudo vale a pena se a alma não é pequena.', (SELECT id FROM public.authors WHERE name = 'Fernando Pessoa'), true, true),
('O poeta é um fingidor. Finge tão completamente que chega a fingir que é dor a dor que deveras sente.', (SELECT id FROM public.authors WHERE name = 'Fernando Pessoa'), true, false),

-- Drummond
('No meio do caminho tinha uma pedra.', (SELECT id FROM public.authors WHERE name = 'Carlos Drummond de Andrade'), true, true),
('As coisas findas, muito mais que lindas, essas ficarão.', (SELECT id FROM public.authors WHERE name = 'Carlos Drummond de Andrade'), true, false),

-- Einstein
('A imaginação é mais importante que o conhecimento.', (SELECT id FROM public.authors WHERE name = 'Albert Einstein'), true, true),
('Insanidade é fazer sempre a mesma coisa e esperar resultados diferentes.', (SELECT id FROM public.authors WHERE name = 'Albert Einstein'), true, false),

-- Gandhi
('Seja a mudança que você quer ver no mundo.', (SELECT id FROM public.authors WHERE name = 'Mahatma Gandhi'), true, true),
('A força não provém da capacidade física. Provém de uma vontade indomável.', (SELECT id FROM public.authors WHERE name = 'Mahatma Gandhi'), true, false),

-- Mandela
('A educação é a arma mais poderosa que você pode usar para mudar o mundo.', (SELECT id FROM public.authors WHERE name = 'Nelson Mandela'), true, true),
('Não há nada como voltar a um lugar que permanece inalterado para descobrir o quanto você mudou.', (SELECT id FROM public.authors WHERE name = 'Nelson Mandela'), true, false);
