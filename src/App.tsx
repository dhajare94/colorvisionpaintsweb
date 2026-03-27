import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CompletedProjects from './pages/CompletedProjects';
import Contact from './pages/Contact';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
        <Header />
        <main className="flex-1 w-full mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/projects" element={<CompletedProjects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
