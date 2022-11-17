import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import {
  cleanPage, fetchPage, PageViewer, ReactBricksContext, types
} from 'react-bricks/frontend'

import ErrorNoHomePage from '../components/errorNoHomePage'
import ErrorNoKeys from '../components/errorNoKeys'
import Layout from '../components/layout'
import config from '../react-bricks/config'

interface HomeProps {
  page: types.Page
  error: string
}

const Home: React.FC<HomeProps> = ({ page, error }) => {
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useContext(ReactBricksContext)

  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  return (
    <Layout>
      {pageOk && (
        <>
          <Head>
            <title>Hatus Albertassi</title>
            <meta name="description" content={page.meta.description} />
          </Head>
          <PageViewer page={pageOk} />
        </>
      )}
      {error === 'NOKEYS' && <ErrorNoKeys />}
      {error === 'NOPAGE' && <ErrorNoHomePage />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!config.apiKey) {
    return { props: { error: 'NOKEYS' } }
  }
  try {
    const page = await fetchPage('home', config.apiKey, context.locale)
    return { props: { page } }
  } catch {
    return { props: { error: 'NOPAGE' } }
  }
}

export default Home
