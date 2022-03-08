import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
  <div className="bg-slate-700 min-h-screen flex flex-col h-full">
    {/* displays navbar above page content */}
    <Layout>
      {/* displays page content */}
      <Component {...pageProps} />
    {/* displays footer below page content */}
    </Layout>
  </div>
  )
}

export default MyApp
