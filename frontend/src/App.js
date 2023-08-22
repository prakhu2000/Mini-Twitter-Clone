import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Components/Login";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { is_Authenticated } from "./controllers/userRoutes";
import { useEffect } from "react";
import People from "./pages/People";
import Profile from "./pages/Profile";
import Register from "./Components/Register";

export default function App() {
  return (
    <BrowserRouter>
    <main className="flex min-h-screen max-w-7xl mx-auto">
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/find">
          <People/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
        </Route>
      </Switch>
      </main>
    </BrowserRouter>
  );
}
