import React from 'react';
import '../App.css';
import Repos from './Repos';
import RepoDetail from './RepoDetail';
import Issues from './Issues';
import PullRequests from './PullRequests';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { StateProvider } from '../context/repoContext'
import { repoReducer } from '../reducer/repoReducer';

function App() {
  return (
    <StateProvider reducer={repoReducer}>
      <div className="container">
        <Router>
          <Switch>
            <Route path="/repo/:repoName/pull-requests" component={PullRequests}></Route>
            <Route path="/repo/:repoName/issues" component={Issues}></Route>
            <Route path="/repo/:repoName" component={RepoDetail}></Route>
            <Route path="/">
              <Repos />
            </Route>
          </Switch>
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;
