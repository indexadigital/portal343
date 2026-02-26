import { render, screen } from '@testing-library/react'
import Card from '@/components/card'

const mockPost = {
  title: 'Título do Post',
  slug: 'titulo-do-post',
  categories: { nodes: [{ name: 'Política', slug: 'politica' }] },
  featuredImage: {
    node: {
      sourceUrl: 'https://cdn.portal343.com/image.jpg',
      mediaDetails: {
        sizes: [
          { name: 'featured-3', sourceUrl: 'https://cdn.portal343.com/featured-3.jpg' },
        ],
      },
    },
  },
  extras: { subtitulo: 'Subtítulo do post', chapeu: 'Chapéu' },
}

describe('Card', () => {
  it('deve renderizar o título do post', () => {
    render(<Card post={mockPost} classImg="featured-3" />)

    expect(screen.getByText('Título do Post')).toBeInTheDocument()
  })

  it('deve renderizar o subtítulo do post', () => {
    render(<Card post={mockPost} classImg="featured-3" />)

    expect(screen.getByText('Subtítulo do post')).toBeInTheDocument()
  })

  it('deve renderizar links com permalink correto', () => {
    render(<Card post={mockPost} classImg="featured-3" />)

    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/politica/titulo-do-post')
    })
  })

  it('deve renderizar a imagem com alt text', () => {
    render(<Card post={mockPost} classImg="featured-3" />)

    const img = screen.getByAltText('Título do Post')
    expect(img).toBeInTheDocument()
  })

  it('deve aplicar classImg ao link da imagem', () => {
    render(<Card post={mockPost} classImg="featured-4" />)

    const imageLink = screen.getAllByRole('link')[0]
    expect(imageLink).toHaveClass('featured', 'featured-4')
  })

  it('deve aplicar classTitle ao h3', () => {
    const { container } = render(<Card post={mockPost} classImg="featured-3" classTitle="featured-3-title" />)

    const h3 = container.querySelector('h3')
    expect(h3).toHaveClass('featured-1-title', 'featured-3-title')
  })

  it('deve exibir subtítulo vazio se post não tem extras', () => {
    const postSemExtras = { ...mockPost, extras: { subtitulo: '', chapeu: '' } }
    render(<Card post={postSemExtras} classImg="featured-3" />)

    const subtitle = screen.queryByText('Subtítulo do post')
    expect(subtitle).not.toBeInTheDocument()
  })
})
