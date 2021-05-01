import React, { useContext } from "react";
import Header from "./components/layout/Header";
import List from "./components/operations/List";
import AddForm from "./components/operations/AddForm";
import EditForm from "./components/operations/EditForm";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

import { CRMContext, CRMProvider } from "./context/CRMContext";

// Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [auth, setAuth] = useContext(CRMContext);

  return (
    <Router>
      <div>
        <CRMProvider value={[auth, setAuth]}>
          <Header />
          <div className="container">
            <main>
              <Switch>
                <Route exact path="/" component={List} />
                <Route exact path="/addForm" component={AddForm} />
                <Route exact path="/editForm/:id" component={EditForm} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/sign-up" component={SignUp} />
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </div>
    </Router>
  );
}

export default App;
