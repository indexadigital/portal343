import { render, screen } from '@testing-library/react'
import SectionNews from '@/components/section-news'

const mockPosts = {
  edges: [
    {
      node: {
        title: 'Post 1',
        slug: 'post-1',
        categories: { nodes: [{ name: 'Geral', slug: 'geral' }] },
        featuredImage: {
          node: {
            sourceUrl: 'https://cdn.portal343.com/img1.jpg',
            mediaDetails: { sizes: [] },
          },
        },
        extras: { subtitulo: 'Sub 1', chapeu: '' },
      },
    },
    {
      node: {
        title: 'Post 2',
        slug: 'post-2',
        categories: { nodes: [{ name: 'Geral', slug: 'geral' }] },
        featuredImage: {
          node: {
            sourceUrl: 'https://cdn.portal343.com/img2.jpg',
            mediaDetails: { sizes: [] },
          },
        },
        extras: { subtitulo: 'Sub 2', chapeu: '' },
      },
    },
  ],
}

describe('SectionNews', () => {
  it('deve renderizar o título da seção com link', () => {
    render(<SectionNews posts={mockPosts} title="Geral" slug="geral" />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()

    const link = heading.querySelector('a')
    expect(link).toHaveAttribute('href', '/geral')
    expect(link).toHaveTextContent('Geral')
  })

  it('deve renderizar todos os posts', () => {
    render(<SectionNews posts={mockPosts} title="Geral" slug="geral" />)

    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.getByText('Post 2')).toBeInTheDocument()
  })

  it('deve renderizar link "VEJA MAIS" com href correto', () => {
    render(<SectionNews posts={mockPosts} title="Geral" slug="geral" />)

    const moreLink = screen.getByText(/VEJA MAIS/i).closest('a')
    expect(moreLink).toHaveAttribute('href', '/geral')
  })

  it('deve renderizar sem erros quando posts é undefined', () => {
    render(<SectionNews posts={undefined} title="Geral" slug="geral" />)

    expect(screen.getByText('Geral')).toBeInTheDocument()
    expect(screen.queryByText('Post 1')).not.toBeInTheDocument()
  })

  it('deve renderizar sem erros quando posts.edges é vazio', () => {
    render(<SectionNews posts={{ edges: [] }} title="Política" slug="politica" />)

    expect(screen.getByText('Política')).toBeInTheDocument()
  })
})
