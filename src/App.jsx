import './categories.styles.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/Navigation.component';
import Authentication from './routes/authentication/authentication.component';

const Shop = () => {
  return (
    <div>
      <h1>happy  shopping</h1>
    </div>
  )

}


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />


      </Route>
    </Routes>
  )
}

export default App;
