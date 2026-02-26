import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  usePostsByCategory,
  useAllPosts,
  usePost,
  useDestaques,
  useCategory,
} from '@/lib/hooks/use-posts'

// Mock do fetch global — simula a WordPress GraphQL API
const mockGraphQLResponse = (data: any) => {
  ;(global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ data }),
  })
}

const mockPost = {
  databaseId: 1,
  title: 'Post de Teste',
  slug: 'post-de-teste',
  excerpt: '<p>Resumo do post de teste</p>',
  date: '2024-01-15T10:00:00',
  modified: '2024-01-15T12:00:00',
  content: '<p>Conteúdo do post de teste</p>',
  featuredImage: {
    node: {
      sourceUrl: 'https://cdn.portal343.com/image.jpg',
      mediaDetails: {
        sizes: [{ name: 'FEATURED_1', sourceUrl: 'https://cdn.portal343.com/image-featured-1.jpg' }],
      },
    },
  },
  author: {
    node: { name: 'Autor Teste', firstName: 'Autor', lastName: 'Teste', avatar: { url: '' } },
  },
  categories: { nodes: [{ name: 'Política', slug: 'politica' }] },
  tags: { nodes: [{ name: 'Tag1', slug: 'tag1' }] },
  extras: { subtitulo: 'Subtítulo do post de teste', chapeu: 'Chapéu do post' },
}

const mockPostEdge = { node: mockPost }

beforeEach(() => {
  jest.restoreAllMocks()
})

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('usePostsByCategory', () => {
  it('deve retornar posts da categoria', async () => {
    mockGraphQLResponse({ posts: { edges: [mockPostEdge] } })

    const { result } = renderHook(
      () => usePostsByCategory('politica', 3),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.edges).toHaveLength(1)
    expect(result.current.data?.edges[0].node.slug).toBe('post-de-teste')
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})

describe('useAllPosts', () => {
  it('deve retornar todos os posts', async () => {
    mockGraphQLResponse({ posts: { edges: [mockPostEdge] } })

    const { result } = renderHook(
      () => useAllPosts(6),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.edges).toHaveLength(1)
  })

  it('deve passar notIn para excluir posts', async () => {
    mockGraphQLResponse({ posts: { edges: [] } })

    const { result } = renderHook(
      () => useAllPosts(6, [1, 2, 3]),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)
    expect(body.query).toContain('notIn: [1,2,3]')
  })
})

describe('usePost', () => {
  it('deve retornar um post por slug', async () => {
    mockGraphQLResponse({ postBy: mockPost })

    const { result } = renderHook(
      () => usePost('post-de-teste'),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.title).toBe('Post de Teste')
    expect(result.current.data?.content).toBe('<p>Conteúdo do post de teste</p>')
    expect(result.current.data?.extras?.subtitulo).toBe('Subtítulo do post de teste')
  })

  it('não deve buscar quando slug está vazio', () => {
    mockGraphQLResponse({ postBy: null })

    const { result } = renderHook(
      () => usePost(''),
      { wrapper: createWrapper() }
    )

    expect(result.current.fetchStatus).toBe('idle')
    expect(global.fetch).not.toHaveBeenCalled()
  })
})

describe('useDestaques', () => {
  it('deve retornar os destaques', async () => {
    mockGraphQLResponse({
      destaques: {
        listaDeDestaques: {
          destaque1: mockPost,
          destaque2: { ...mockPost, databaseId: 2, title: 'Destaque 2' },
          destaque3: { ...mockPost, databaseId: 3, title: 'Destaque 3' },
          destaque4: { ...mockPost, databaseId: 4, title: 'Destaque 4' },
        },
      },
    })

    const { result } = renderHook(
      () => useDestaques(),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const destaques = result.current.data?.listaDeDestaques
    expect(destaques?.destaque1?.title).toBe('Post de Teste')
    expect(destaques?.destaque2?.title).toBe('Destaque 2')
    expect(destaques?.destaque3?.title).toBe('Destaque 3')
    expect(destaques?.destaque4?.title).toBe('Destaque 4')
  })
})

describe('useCategory', () => {
  it('deve retornar dados da categoria', async () => {
    mockGraphQLResponse({ category: { name: 'Política', slug: 'politica', categoryId: 10 } })

    const { result } = renderHook(
      () => useCategory('politica'),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.name).toBe('Política')
    expect(result.current.data?.slug).toBe('politica')
  })

  it('não deve buscar quando slug está vazio', () => {
    const { result } = renderHook(
      () => useCategory(''),
      { wrapper: createWrapper() }
    )

    expect(result.current.fetchStatus).toBe('idle')
  })
})
