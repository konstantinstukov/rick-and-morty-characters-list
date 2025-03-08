import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import { Route, Routes } from 'react-router';
import Characters from './pages/Characters.tsx';
import { NoMatch } from './pages/NoMatch.tsx';
import { CharacterDetail } from './pages/CharacterDetail.tsx';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-start">
      <Header />
      <main className="flex grow flex-col max-w-7xl w-full mx-auto">
        <Routes>
          <Route index element={<Characters />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
