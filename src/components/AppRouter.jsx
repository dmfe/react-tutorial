import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import {AuthContext} from "../context";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import {publicRoutes, privateRoutes} from "../router/routes";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)

  if (isLoading) {
    return <Loader />
  }

  return (
    isAuth
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            element={route.component}
          />
        )}
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Posts />} />
        <Route path="*" element={<Error />} />
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            element={route.component}
          />
        )}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
  );
};

export default AppRouter;

