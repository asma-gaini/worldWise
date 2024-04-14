import { lazy } from "react";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider, useCities } from "./contexts/CitiesContext";
import { AuthProvider, useAuth } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

//********in pages haye mast k comment kardim ta ba lazy load bala biarimeshon
// import Product from "./pages/Product";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

//esme khode page ro minevisim va az vijegi lazy react estefade mikonim
//ye callback function mikhaym bara ezafe kardan tabe import poya
//bade tabe import ma b masir ha niaz darim
//bad miyaym tu components tree suspends ezafe mikonim yani baghiye lazy ha ru moalagh negah midarim
// in moalagh negah dashtan ta etefaghi biyofte bara ma inja ba spinner hastesh
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

//hajm bedone lazy ba npm run build
// dist/assets/index-5dd4cb19.js   513.47 kB │ gzip: 147.94 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        {/* <h1>Hello Router</h1> */}
        {/* bakhshe sabet k tu hame safhe ha hast */}
        <BrowserRouter>
          {/* ye fallback props migire */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="price" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  //injor hame masir ha va app layout ru darbar dare va age authenticate nabood mire homePage
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
