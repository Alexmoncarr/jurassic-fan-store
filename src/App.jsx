import { HashRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Store from './pages/Store'
import Articles from './pages/Articles'
import ArticlePage from './pages/ArticlePage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/articulos" element={<Articles />} />
          <Route path="/articulos/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </HelmetProvider>
  )
}
