import React from 'react';
import Header from './components/layout/Header';
import List from './components/operations/List';
import AddForm from './components/operations/AddForm';
import EditForm from './components/operations/EditForm';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  return (
    <Router>
      <div>
          <Header />
          <div className="container">
            <main>
              <Switch>
                <Route exact path="/" component={List} />
                <Route exact path="/addForm" component={AddForm} />
                <Route exact path="/editForm/:id" component={EditForm} />
              </Switch>
            </main>
          </div>
      </div>
    </Router>
  );
}

export default App;
