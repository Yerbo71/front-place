import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Registration from "./pages/security/Registration.tsx";
import Login from "./pages/security/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProtectedRoute from "./pages/security/ProtectedRoute.tsx";
import CatalogPage from "./pages/CatalogPage.tsx";
import FavouritesPage from "./pages/FavouritesPage.tsx";
import BasketPage from "./pages/BasketPage.tsx";
import MyOrdersPages from "./pages/MyOrdersPages.tsx";

function App() {
  const client = new ApolloClient(
      {
        uri: "http://localhost:8080/graphql",
        cache: new InMemoryCache(),
      }
  );

  const router = createBrowserRouter([
      {
          path: "/",
          element: <Login/>
      },
      {
          path: "/registration",
          element:<Registration/>
      },
      {
          path: "/homePage",
          element:<HomePage/>
      },
      {
          path: "/homePage/catalogPage",
          element:<ProtectedRoute><CatalogPage/></ProtectedRoute>
      },
      {
          path: "/homePage/favouritesPages",
          element:<ProtectedRoute><FavouritesPage/></ProtectedRoute>
      },
      {
          path: "/homePage/basketPage",
          element:<ProtectedRoute><BasketPage/></ProtectedRoute>
      },      {
          path: "/homePage/myOrdersPage",
          element:<ProtectedRoute><MyOrdersPages/></ProtectedRoute>
      },

  ])

  return (
          <ApolloProvider client={client}>
              <RouterProvider router={router}/>
          </ApolloProvider>
  )
}

export default App
