import { Metadata } from 'next'
import Featured from '@/components/featured'
import Banner from '@/components/banner'
import SectionNews from '@/components/section-news'
import { getPostsByCategory, getDestaques } from '@/lib/api'
import { CMS_TITLE } from '@/lib/constants'

export const metadata: Metadata = {
  title: CMS_TITLE,
}

export default async function HomePage() {
  const featured = await getDestaques()
  const featured_ids = [
    featured?.listaDeDestaques?.destaque1?.databaseId,
    featured?.listaDeDestaques?.destaque2?.databaseId,
    featured?.listaDeDestaques?.destaque3?.databaseId,
    featured?.listaDeDestaques?.destaque4?.databaseId,
  ]
  const postsPolitica = await getPostsByCategory('politica', 3, featured_ids)
  const postsGeral = await getPostsByCategory('geral', 3, featured_ids)

  return (
    <>
      <Banner content={`<img src="/assets/img/banner_book_cores.jpg" />`} link="https://www.instagram.com/book_cores" />
      <Featured posts={featured?.listaDeDestaques} />
      <Banner content={`<img src="/assets/img/banner_indexa.png" width="976" />`} link="https://indexa.digital" />
      <SectionNews posts={postsGeral} title="Geral" slug="geral" />
      <SectionNews posts={postsPolitica} title="Política" slug="politica" />
    </>
  )
}
