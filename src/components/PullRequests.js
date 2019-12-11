import React from 'react';
import '../App.css';
import { useState, useEffect } from 'react';
import { useStateValue } from '../context/repoContext'
import axios from 'axios';

function PullRequests() {
  const [pullRequests, setPullRequests] = useState({ pullRequests: [] });
  const [state, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const { repo } = state;

  useEffect(() => {
    async function getIssues() {
      let response = await axios(`https://api.github.com/repos/reactjs/${repo.name}/pulls`);
      setPullRequests(response.data);
      setIsLoading(false);
    }  
    getIssues();
  }, []);

  return (
    <React.Fragment>
      <ul className="wrapper">
        {isLoading ? 'Yükleniyor...' : pullRequests.map(pullRequest => (
          <li className="list-item" key={pullRequest.id}>
            {pullRequest.title}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default PullRequests;
