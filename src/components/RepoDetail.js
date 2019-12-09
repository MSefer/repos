import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { NavLink } from "react-router-dom";
import { useStateValue } from '../context/repoContext'

function RepoDetail({ match }) {
  const { params: { repoName } } = match;
  const [repo, setRepo] = useState({ repo: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    async function getRepo() {
      let response = await axios(`https://api.github.com/repos/reactjs/${repoName}`);
      setRepo(response.data);
      setIsLoading(false);

      // Change repo state
      dispatch({type:'changeRepo',payload:response.data});
    }  
    getRepo();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? "Yükleniyoooo" : <div className="wrapper">
        <h2>{repo.full_name}</h2>
        <p>Watch: {repo.subscribers_count}</p>
        <p>Star: {repo.stargazers_count}</p>
        <p>Forks: {repo.forks}</p>
        <NavLink to={`/repo/${repo.name}/issues`}>Issues</NavLink><br />
        <NavLink to={`/repo/${repo.name}/pull-requests`}>Pull Requests</NavLink>
      </div>
      }
    </React.Fragment> 
  );
}

export default RepoDetail;
