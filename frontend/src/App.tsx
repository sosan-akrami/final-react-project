import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import University from './pages/University';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/university' element={<University />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
