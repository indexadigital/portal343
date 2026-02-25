import { Metadata } from 'next'
import Link from 'next/link'
import Banner from '@/components/banner'
import PostCardList from '@/components/post-card-list'
import { getAllPosts, getCategory, getPostsByCategory } from '@/lib/api'
import { CMS_NAME, CMS_URL } from '@/lib/constants'

const OTHER_CATEGORIES = [
  { name: 'Últimas', slug: 'ultimas' },
  { name: 'Todas', slug: 'todas' },
  { name: 'Últimas notícias', slug: 'noticias' },
]

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params
  const otherCategory = OTHER_CATEGORIES.find((item) => item.slug === categorySlug)
  const category = otherCategory || (await getCategory(categorySlug))

  const title = `${category?.name} | ${CMS_NAME}`
  const description = `Últimas notícias sobre ${category?.name} | ${CMS_NAME}`
  const canonical = `${CMS_URL}/${category?.slug}`

  return {
    title: category?.name,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title,
      description,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params
  const otherCategory = OTHER_CATEGORIES.find((item) => item.slug === categorySlug)

  const posts = otherCategory
    ? await getAllPosts(6, [])
    : await getPostsByCategory(categorySlug, 6, [])

  const category = otherCategory || (await getCategory(categorySlug))

  return (
    <>
      <Banner content={`<img src="/assets/img/banner_lumie2.png" />`} link="https://www.instagram.com/lumieassessoria/" />
      <section>
        <div className="container">
          <section className="pb-2 sections">
            <h2 className="featured-1-title featured-2-title blue">
              <Link href={'/' + category?.slug}>{category?.name}</Link>
            </h2>
          </section>
          <div className="row">
            <PostCardList posts={posts} />
          </div>
        </div>
      </section>
    </>
  )
}
