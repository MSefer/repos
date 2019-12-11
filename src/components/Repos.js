import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { NavLink } from "react-router-dom";
import { useStateValue } from '../context/repoContext';

function Repos() {
  const [repos, setRepos] = useState({ repos: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useStateValue(); 

  useEffect(() => {
    async function getRepos() {
      let response = await axios("https://api.github.com/users/reactjs/repos");

      setRepos(response.data);
      setIsLoading(false);
    }  
  
    getRepos();
  }, []);

  return (
    <React.Fragment>
      <ul className="wrapper">
        {isLoading ? 'Yükleniyor...' : repos.map(repo => (
          <li className="list-item" key={repo.id}>
            <NavLink onClick={() => dispatch({type:'changeRepo',payload:repo})} to={`/repo/${repo.name}`}>{repo.name}</NavLink>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Repos;
