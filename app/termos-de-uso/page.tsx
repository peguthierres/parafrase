import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso - ParaFrase",
  description: "Termos de uso da plataforma ParaFrase",
}

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-parafrase-dark mb-8">Termos de Uso</h1>

      <div className="prose prose-lg max-w-none text-parafrase-dark/80">
        <p className="text-sm text-parafrase-dark/60 mb-8">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o ParaFrase, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não
            concordar com qualquer parte destes termos, não deve usar nosso serviço.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">2. Descrição do Serviço</h2>
          <p>
            O ParaFrase é uma plataforma digital que permite aos usuários compartilhar, descobrir e interagir com
            citações e frases de diversos autores. Oferecemos funcionalidades de publicação, comentários, curtidas e
            perfis de usuários.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">3. Cadastro e Conta do Usuário</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Você deve fornecer informações precisas e atualizadas durante o cadastro</li>
            <li>É responsável por manter a confidencialidade de sua senha</li>
            <li>Deve ter pelo menos 13 anos para criar uma conta</li>
            <li>É responsável por todas as atividades que ocorrem em sua conta</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">4. Conteúdo do Usuário</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Você mantém os direitos sobre o conteúdo que publica</li>
            <li>Concede ao ParaFrase licença para usar, exibir e distribuir seu conteúdo na plataforma</li>
            <li>É responsável pela veracidade e legalidade do conteúdo publicado</li>
            <li>Não deve publicar conteúdo ofensivo, ilegal ou que viole direitos de terceiros</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">5. Direitos Autorais</h2>
          <p>
            Respeitamos os direitos autorais. As citações publicadas devem ser atribuídas aos seus respectivos autores.
            Caso identifique violação de direitos autorais, entre em contato conosco para remoção do conteúdo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">6. Conduta Proibida</h2>
          <p>É proibido:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Usar a plataforma para fins ilegais</li>
            <li>Publicar conteúdo ofensivo, discriminatório ou que incite violência</li>
            <li>Fazer spam ou enviar mensagens não solicitadas</li>
            <li>Tentar acessar contas de outros usuários</li>
            <li>Interferir no funcionamento da plataforma</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">7. Moderação</h2>
          <p>
            Reservamo-nos o direito de moderar, editar ou remover conteúdo que viole estes termos. Podemos suspender ou
            encerrar contas que não cumpram nossas diretrizes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">8. Limitação de Responsabilidade</h2>
          <p>
            O ParaFrase é fornecido "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. Não
            somos responsáveis por danos diretos ou indiretos decorrentes do uso da plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">9. Alterações nos Termos</h2>
          <p>
            Podemos atualizar estes termos periodicamente. Alterações significativas serão comunicadas aos usuários com
            antecedência razoável.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">10. Lei Aplicável</h2>
          <p>
            Estes termos são regidos pelas leis brasileiras. Disputas serão resolvidas nos tribunais competentes do
            Brasil.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">11. Contato</h2>
          <p>
            Para dúvidas sobre estes termos, entre em contato conosco através do email:
            <a href="mailto:contato@parafrase.com.br" className="text-parafrase-coral hover:underline">
              contato@parafrase.com.br
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
