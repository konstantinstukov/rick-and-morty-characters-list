import './App.css';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import { Routes, Route } from 'react-router';
import Characters from './pages/Characters/Characters.tsx';
import { NoMatch } from './pages/NoMatch.tsx';
import { CharacterDetail } from './pages/CharacterDetail/CharacterDetail.tsx';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
