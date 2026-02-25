import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <div className="container py-5 text-center">
        <h1 className="featured-1-title mb-3">
          <span style={{ fontSize: '4rem', fontWeight: 800 }}>404</span>
        </h1>
        <p style={{ fontSize: '1.3rem' }}>Página não encontrada</p>
        <Link
          href="/"
          className="button-featured blue d-inline-flex align-items-center mt-3"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </section>
  )
}
