// import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<CandidateSearch></CandidateSearch>}>

          </Route>
          <Route path="/potential-candidates" element={<SavedCandidates></SavedCandidates>}>

          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
