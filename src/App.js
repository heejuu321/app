import logo from './logo.svg';
import './App.css';
import ItemSearchFilter from './page/ItemSearchFilter-text';
import ImagePreviewPage from './page/ImagePreviewPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import configurationStore from './store/configurationStore';
import ImageSearchPage from './page/ImageSearchPage';

function App() {
  const initValues = useMemo(() => ({ searchKeyword: '' }), []);
  const store = configurationStore();
  
  return (
    <Provider store={store}>
      <div className="App">
<Router>
  <Routes>
    <Route path="/" element={<ImagePreviewPage />} />
    <Route path="/search" element={<ImageSearchPage />} />
  </Routes>
</Router>
      </div>
    </Provider>
  );
}
export default App;
