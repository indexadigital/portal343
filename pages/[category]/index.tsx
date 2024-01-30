import { GetServerSideProps } from "next"
import Layout from "../../components/layout"
import Head from 'next/head'
import Banner from "../../components/banner"
import { CMS_NAME, CMS_URL } from "../../lib/constants"
import { getAllPosts, getCategory, getPostsByCategory } from "../../lib/api"
import Link from "next/link"
import React from "react"
import PostCardList from "../../components/post-card-list"
import { NextSeo } from "next-seo"

export default function Index ( { posts, category } ) {

    const canonical = CMS_URL + '/' + category?.slug
    const title = `${category?.name} | ${CMS_NAME}`
    const description = `Últimas notícias sobre ${category?.name} | ${CMS_NAME}` 

    return (
        <Layout>
            <NextSeo
                title={ title }
                description={ description }
                canonical={canonical}
                openGraph={{
                    url: canonical,
                    title: title,
                    description: description
                }}
            />
            <Banner content={`<img src="/assets/img/banner_lumie.png" />`} link="https://www.instagram.com/lumieassessoria/" />
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
        </Layout>
    )

}
export const getServerSideProps: GetServerSideProps = async ( { params } : any ) => {

    const otherCategories = [
        {   
            name: 'Últimas',
            slug: 'ultimas'
        },
        {
            name: 'Todas',
            slug: 'todas'
        },
        {
            name: 'Últimas notícias',
            slug: 'noticias'
        }
    ]
    let checkCategory = false;
    otherCategories.forEach( (item: any) => {
        if( item.slug === params.category ) checkCategory = item;
    })   
    const posts = (checkCategory) ? await getAllPosts(6, []) : await getPostsByCategory(params?.category, 6, [])
    const category = (checkCategory) ? checkCategory : await getCategory(params?.category)
    return {
        props: {
            posts : posts,
            category : category
        }
    }
}
