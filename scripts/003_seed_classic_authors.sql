-- Insert classic authors with their categories
INSERT INTO public.authors (name, bio, birth_date, death_date, nationality, category, is_classic) VALUES
-- Filósofos
('Aristóteles', 'Filósofo grego, discípulo de Platão e tutor de Alexandre, o Grande. Suas obras abrangem diversos campos do conhecimento.', '384-01-01 BC', '322-01-01 BC', 'Grega', 'filosofo', true),
('Platão', 'Filósofo grego, discípulo de Sócrates e fundador da Academia de Atenas. Autor de diálogos filosóficos fundamentais.', '428-01-01 BC', '348-01-01 BC', 'Grega', 'filosofo', true),
('Sócrates', 'Filósofo grego considerado um dos fundadores da filosofia ocidental. Conhecido pelo método socrático de questionamento.', '470-01-01 BC', '399-01-01 BC', 'Grega', 'filosofo', true),
('Confúcio', 'Filósofo chinês cujos ensinamentos influenciaram profundamente a cultura chinesa e asiática.', '551-01-01 BC', '479-01-01 BC', 'Chinesa', 'filosofo', true),
('Immanuel Kant', 'Filósofo alemão do Iluminismo, autor da Crítica da Razão Pura e defensor do imperativo categórico.', '1724-04-22', '1804-02-12', 'Alemã', 'filosofo', true),

-- Poetas
('William Shakespeare', 'Dramaturgo e poeta inglês, considerado o maior escritor da língua inglesa e o mais influente dramaturgo do mundo.', '1564-04-26', '1616-04-23', 'Inglesa', 'poeta', true),
('Fernando Pessoa', 'Poeta português, um dos maiores nomes da literatura lusófona, conhecido por seus heterônimos.', '1888-06-13', '1935-11-30', 'Portuguesa', 'poeta', true),
('Carlos Drummond de Andrade', 'Poeta brasileiro, considerado um dos maiores poetas da literatura brasileira.', '1902-10-31', '1987-08-17', 'Brasileira', 'poeta', true),
('Pablo Neruda', 'Poeta chileno, ganhador do Prêmio Nobel de Literatura em 1971.', '1904-07-12', '1973-09-23', 'Chilena', 'poeta', true),
('Rumi', 'Poeta persa do século XIII, místico sufi cujos versos transcendem fronteiras culturais e religiosas.', '1207-09-30', '1273-12-17', 'Persa', 'poeta', true),

-- Escritores
('Machado de Assis', 'Escritor brasileiro, considerado o maior nome da literatura brasileira e um dos maiores da literatura mundial.', '1839-06-21', '1908-09-29', 'Brasileira', 'escritor', true),
('Clarice Lispector', 'Escritora brasileira de origem ucraniana, uma das principais figuras da literatura brasileira do século XX.', '1920-12-10', '1977-12-09', 'Brasileira', 'escritor', true),
('Gabriel García Márquez', 'Escritor colombiano, ganhador do Prêmio Nobel de Literatura, pioneiro do realismo mágico.', '1927-03-06', '2014-04-17', 'Colombiana', 'escritor', true),
('Virginia Woolf', 'Escritora britânica, figura central do modernismo literário e do movimento feminista.', '1882-01-25', '1941-03-28', 'Britânica', 'escritor', true),

-- Sociólogos
('Max Weber', 'Sociólogo alemão, um dos fundadores da sociologia moderna.', '1864-04-21', '1920-06-14', 'Alemã', 'sociologo', true),
('Émile Durkheim', 'Sociólogo francês, considerado um dos pais da sociologia.', '1858-04-15', '1917-11-15', 'Francesa', 'sociologo', true),

-- Políticos/Líderes
('Nelson Mandela', 'Líder sul-africano, ativista anti-apartheid e ex-presidente da África do Sul.', '1918-07-18', '2013-12-05', 'Sul-africana', 'politico', true),
('Mahatma Gandhi', 'Líder pacifista indiano, pioneiro da resistência não-violenta.', '1869-10-02', '1948-01-30', 'Indiana', 'politico', true),

-- Cientistas
('Albert Einstein', 'Físico teórico alemão, desenvolveu a teoria da relatividade.', '1879-03-14', '1955-04-18', 'Alemã', 'cientista', true),
('Marie Curie', 'Física e química polonesa, primeira mulher a ganhar um Prêmio Nobel.', '1867-11-07', '1934-07-04', 'Polonesa', 'cientista', true);
