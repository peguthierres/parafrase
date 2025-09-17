import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade - ParaFrase",
  description: "Política de privacidade da plataforma ParaFrase",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-parafrase-dark mb-8">Política de Privacidade</h1>

      <div className="prose prose-lg max-w-none text-parafrase-dark/80">
        <p className="text-sm text-parafrase-dark/60 mb-8">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">1. Introdução</h2>
          <p>
            Esta Política de Privacidade descreve como o ParaFrase coleta, usa e protege suas informações pessoais, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) e demais legislações aplicáveis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">2. Informações que Coletamos</h2>

          <h3 className="text-xl font-medium text-parafrase-dark mb-3">2.1 Informações fornecidas por você:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Nome e email durante o cadastro</li>
            <li>Informações do perfil (biografia, foto, categoria de autor)</li>
            <li>Conteúdo publicado (frases, comentários)</li>
            <li>Comunicações conosco</li>
          </ul>

          <h3 className="text-xl font-medium text-parafrase-dark mb-3">2.2 Informações coletadas automaticamente:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dados de uso da plataforma</li>
            <li>Informações do dispositivo e navegador</li>
            <li>Endereço IP e localização aproximada</li>
            <li>Cookies e tecnologias similares</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">3. Como Usamos suas Informações</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Personalizar sua experiência na plataforma</li>
            <li>Comunicar atualizações e novidades</li>
            <li>Garantir a segurança da plataforma</li>
            <li>Cumprir obrigações legais</li>
            <li>Exibir anúncios relevantes (quando aplicável)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">4. Base Legal para Processamento</h2>
          <p>Processamos seus dados com base em:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Execução de contrato:</strong> Para fornecer os serviços solicitados
            </li>
            <li>
              <strong>Interesse legítimo:</strong> Para melhorar nossos serviços e segurança
            </li>
            <li>
              <strong>Consentimento:</strong> Para comunicações de marketing e cookies não essenciais
            </li>
            <li>
              <strong>Cumprimento legal:</strong> Para atender obrigações legais
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">5. Compartilhamento de Informações</h2>
          <p>Não vendemos suas informações pessoais. Podemos compartilhar dados apenas:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Com provedores de serviços terceirizados (hospedagem, analytics)</li>
            <li>Quando exigido por lei ou autoridades competentes</li>
            <li>Para proteger nossos direitos e segurança</li>
            <li>Com seu consentimento explícito</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">6. Cookies e Tecnologias Similares</h2>
          <p>
            Utilizamos cookies para melhorar sua experiência. Você pode gerenciar preferências de cookies nas
            configurações do seu navegador. Alguns cookies são essenciais para o funcionamento da plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">7. Seus Direitos (LGPD)</h2>
          <p>Você tem direito a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Acesso:</strong> Saber quais dados pessoais processamos
            </li>
            <li>
              <strong>Correção:</strong> Corrigir dados incompletos ou incorretos
            </li>
            <li>
              <strong>Exclusão:</strong> Solicitar a remoção de seus dados
            </li>
            <li>
              <strong>Portabilidade:</strong> Receber seus dados em formato estruturado
            </li>
            <li>
              <strong>Oposição:</strong> Opor-se ao processamento de seus dados
            </li>
            <li>
              <strong>Revogação:</strong> Retirar consentimento a qualquer momento
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">8. Segurança dos Dados</h2>
          <p>
            Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações contra acesso
            não autorizado, alteração, divulgação ou destruição.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">9. Retenção de Dados</h2>
          <p>
            Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política, exceto
            quando um período de retenção mais longo for exigido por lei.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">10. Transferência Internacional</h2>
          <p>
            Seus dados podem ser processados em servidores localizados fora do Brasil. Garantimos que tais
            transferências atendam aos requisitos da LGPD.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">11. Menores de Idade</h2>
          <p>
            Nossos serviços não são direcionados a menores de 13 anos. Se tomarmos conhecimento de que coletamos dados
            de menores sem consentimento parental, tomaremos medidas para excluí-los.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">12. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Alterações significativas serão comunicadas com antecedência
            através da plataforma ou email.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">13. Contato e Encarregado de Dados</h2>
          <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:</p>
          <ul className="list-none space-y-2 mt-4">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacidade@parafrase.com.br" className="text-parafrase-coral hover:underline">
                privacidade@parafrase.com.br
              </a>
            </li>
            <li>
              <strong>Encarregado de Dados:</strong>{" "}
              <a href="mailto:dpo@parafrase.com.br" className="text-parafrase-coral hover:underline">
                dpo@parafrase.com.br
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-parafrase-dark mb-4">
            14. Autoridade Nacional de Proteção de Dados
          </h2>
          <p>
            Você também pode entrar em contato com a ANPD através do site:
            <a
              href="https://www.gov.br/anpd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-parafrase-coral hover:underline"
            >
              www.gov.br/anpd
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
