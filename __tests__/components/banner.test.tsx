import { render, screen } from '@testing-library/react'
import Banner from '@/components/banner'

describe('Banner', () => {
  it('deve renderizar o conteúdo HTML do banner', () => {
    render(<Banner content='<img src="/test.png" alt="test" />' link="https://example.com" />)

    const img = screen.getByAltText('test')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.png')
  })

  it('deve renderizar link com href e target corretos', () => {
    render(<Banner content='<span>Banner</span>' link="https://example.com" target="_self" />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_self')
  })

  it('deve usar valores padrão quando props não fornecidas', () => {
    render(<Banner />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '#')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
