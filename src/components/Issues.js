import React from 'react';
import '../App.css';
import { useState, useEffect } from 'react';
import { useStateValue } from '../context/repoContext'
import axios from 'axios';

function Issues() {
  const [issues, setIssues] = useState({ issues: [] });
  const [state, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const { repo } = state;

  useEffect(() => {
    async function getIssues() {
      let response = await axios(`https://api.github.com/repos/reactjs/${repo.name}/issues`);
      setIssues(response.data);
      setIsLoading(false);
    }  
    getIssues();
  }, []);

  return (
    <React.Fragment>
      <ul className="wrapper">
        {isLoading ? 'Yükleniyor...' : issues.map(issue => (
          <li className="list-item" key={issue.id}>
            {issue.title}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Issues;
