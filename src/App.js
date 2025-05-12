import logo from './logo.svg';
import './App.css';
import ItemSearchFilter from './page/ItemSearchFilter-text';
import ImagePreviewPage from './page/ImagePreviewPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import configurationStore from './store/configurationStore';

function App() {
  const initValues = useMemo(() => ({ searchKeyword: '' }), []);
  const store = configurationStore();
  
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          {/* <ItemSearchFilter initValues={initValues} /> */}
          <ImagePreviewPage />
        </Router>
      </div>
    </Provider>
  );
}
export default App;
