import { http, HttpResponse } from 'msw'

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
        sizes: [
          { name: 'FEATURED_1', sourceUrl: 'https://cdn.portal343.com/image-featured-1.jpg' },
          { name: 'FEATURED_3', sourceUrl: 'https://cdn.portal343.com/image-featured-3.jpg' },
        ],
      },
    },
  },
  author: {
    node: {
      name: 'Autor Teste',
      firstName: 'Autor',
      lastName: 'Teste',
      avatar: { url: 'https://cdn.portal343.com/avatar.jpg' },
    },
  },
  categories: {
    nodes: [{ name: 'Política', slug: 'politica' }],
  },
  tags: {
    nodes: [{ name: 'Tag1', slug: 'tag1' }],
  },
  extras: {
    subtitulo: 'Subtítulo do post de teste',
    chapeu: 'Chapéu do post',
  },
}

const mockPostEdge = {
  node: {
    databaseId: mockPost.databaseId,
    title: mockPost.title,
    slug: mockPost.slug,
    excerpt: mockPost.excerpt,
    extras: mockPost.extras,
    featuredImage: mockPost.featuredImage,
    categories: mockPost.categories,
  },
}

const mockDestaques = {
  listaDeDestaques: {
    destaque1: mockPost,
    destaque2: { ...mockPost, databaseId: 2, slug: 'destaque-2', title: 'Destaque 2' },
    destaque3: { ...mockPost, databaseId: 3, slug: 'destaque-3', title: 'Destaque 3' },
    destaque4: { ...mockPost, databaseId: 4, slug: 'destaque-4', title: 'Destaque 4' },
  },
}

const mockCategory = {
  name: 'Política',
  slug: 'politica',
  categoryId: 10,
}

export const handlers = [
  http.post('*/graphql', async ({ request }) => {
    const body = (await request.json()) as { query: string; variables?: Record<string, any> }
    const query = body.query

    if (query.includes('getDestaques')) {
      return HttpResponse.json({
        data: { destaques: mockDestaques },
      })
    }

    if (query.includes('getPostsByCategory')) {
      return HttpResponse.json({
        data: {
          posts: {
            edges: [mockPostEdge, { ...mockPostEdge, node: { ...mockPostEdge.node, databaseId: 5, slug: 'outro-post' } }],
          },
        },
      })
    }

    if (query.includes('GetPosts')) {
      return HttpResponse.json({
        data: {
          posts: {
            edges: [mockPostEdge],
          },
        },
      })
    }

    if (query.includes('GetPost')) {
      return HttpResponse.json({
        data: { postBy: mockPost },
      })
    }

    if (query.includes('getCategory')) {
      return HttpResponse.json({
        data: { category: mockCategory },
      })
    }

    return HttpResponse.json({ data: null })
  }),
]

export { mockPost, mockPostEdge, mockDestaques, mockCategory }
