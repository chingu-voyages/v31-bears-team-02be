import * as React from "react";
import { Switch, Route } from "react-router-dom";
// Using a 'routes' file as single source of truth for route strings
import { HOME, USERHOME } from "../../config/routes";
// Wrapper components to handle redirects and access to routes that need auth
import { PrivateRoute, PublicRoute } from "../routes";
import TopNavBar from "../TopNavBar";
import HomePage from "../HomePage";
// 404 page
import NotFound from "../NotFound";
import Modal from "../Modal/Modal";
import "./App.css";
import Footer from "../Footer/Footer";
import Game from "../Game/Game";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="App">
      <TopNavBar
        onLogin={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <Switch>
        <PublicRoute
          exact
          path={HOME}
          component={HomePage}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          exact
          path={USERHOME}
          component={HomePage}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/game" component={Game} />
        <PrivateRoute
          path="*"
          component={NotFound}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
      <Footer />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <h2>Sign up</h2>
      </Modal>
    </div>
  );
}

export default App;
