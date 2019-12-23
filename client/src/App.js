import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch ,Redirect} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import 'element-theme-default';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";

const NoMatch = () => {
  return <div>404</div>;
};

function App() {
  document.title="後台"
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          !!localStorage.getItem("token") ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/about" component={About} />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
