
import React, { useState } from 'react';
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Featured from '../components/featured'
import Layout from '../components/layout'
import { getPostsByCategory, getDestaques } from '../lib/api'
import { CMS_TITLE } from '../lib/constants'
import Banner from '../components/banner';
import SectionNews from '../components/section-news';

export default function Index({ featured, postsPolitica, postsGeral }) {

  return (
    <Layout>
      <Head>
        <title>{`${CMS_TITLE}`}</title>
      </Head>
      <Banner content={`<img src="/assets/img/banner_lumie.png" />`} link="https://www.instagram.com/lumieassessoria/" />
      <Featured 
        posts={featured?.listaDeDestaques}
      />
      <Banner content={`<img src="/assets/img/banner_indexa.png" width="976" />`} link="https://indexa.digital"/>
      <SectionNews posts={postsGeral} title="Geral" slug="geral" />
      <SectionNews posts={postsPolitica} title="Política" slug="politica" />
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const featured      = await getDestaques()
  const featured_ids  = [featured?.listaDeDestaques?.destaque1?.databaseId, featured?.listaDeDestaques?.destaque2?.databaseId, featured?.listaDeDestaques?.destaque3?.databaseId, featured?.listaDeDestaques?.destaque4?.databaseId]
  const postsPolitica = await getPostsByCategory('politica', 3, featured_ids)
  const postsGeral    = await getPostsByCategory('geral', 3, featured_ids)

  return {
    props: { featured, postsPolitica, postsGeral }
  }
}
