import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostBody from '@/components/post-body'
import PostHeader from '@/components/post-header'
import Banner from '@/components/banner'
import CardList from '@/components/card-list'
import Card from '@/components/card'
import { getAllPosts, getPost } from '@/lib/api'
import { CMS_NAME, CMS_URL } from '@/lib/constants'
import { imageFeaturedSource, subtitle, permalink } from '@/lib/utils'

type Props = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return {}

  const canonical = CMS_URL + permalink(post)

  return {
    title: `${post.title} | ${CMS_NAME}`,
    description: subtitle(post),
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: post.title,
      description: subtitle(post),
      images: [{ url: imageFeaturedSource(post) }],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post?.slug) {
    notFound()
  }

  const ultimas = await getAllPosts(5, [post.databaseId])
  const ultimasIds =
    ultimas?.edges?.map((p: any) => p?.node?.databaseId).filter(Boolean) || []
  ultimasIds.push(post.databaseId)
  const posts = await getAllPosts(3, ultimasIds)

  const canonical = CMS_URL + permalink(post)

  return (
    <>
      <Banner content={`<img src="/assets/img/banner_book_cores.jpg" />`} link="https://www.instagram.com/book_cores" />
      <section>
        <div className="container">
          <PostHeader post={post} />

          <div className="row">
            <div className="col col-12 col-lg-8">
              <article>
                <PostBody content={post.content} />

                <div className="sections mt-5">
                  <h2 className="featured-1-title featured-2-title blue">
                    <a href="#">VEJA TAMBÉM</a>
                  </h2>

                  {posts?.edges?.map((post: any, index: number) => (
                    <CardList key={index} post={post?.node} classImg="featured-4" />
                  ))}

                  <Link
                    className="button-featured blue d-flex align-items-center normal"
                    href="/noticias"
                  >
                    MAIS NOTÍCIAS<span className="mx-1" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 384 512"
                    >
                      <path
                        d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                        fill="#fff"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            </div>
            <div className="col col-12 col-lg-4 px-5">
              <div className="mb-3">
                <Banner content={`<img src="/assets/img/banner4.png" width="300" />`} />
              </div>
              <div className="sections px-3 pt-4">
                <h2 className="featured-1-title featured-2-title blue">
                  <Link href="/noticias" title="Últimas">
                    ÚLTIMAS
                  </Link>
                </h2>
                {ultimas?.edges?.map((post: any, index: number) => (
                  <div key={index} className="mb-3">
                    <Card post={post?.node} classImg="featured-4" classTitle="featured-3-title" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
