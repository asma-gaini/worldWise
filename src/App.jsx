import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";

import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider, useCities } from "./contexts/CitiesContext";

function App() {
  return (
    <CitiesProvider>
      {/* <h1>Hello Router</h1> */}
      {/* bakhshe sabet k tu hame safhe ha hast */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="price" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            {/* masir pishfarz yani masir app k baz mishe ru cities hast  */}
            {/* omadim az navigate estefade kardim ta vaghti bar aval miad ru cities tu url va cties btn ham faal bakhshe
            halat taghir masir dare va replace baes mishe betunim b masir ghabl bargardim */}
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          {/* * shamel hame masir ha gheir masir haye tarif shode mibashad */}
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
