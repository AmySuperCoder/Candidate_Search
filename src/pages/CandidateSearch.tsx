import { useState, useEffect } from 'react';
// import { searchGithub, searchGithubUser } from '../api/API';

import { searchGithub } from '../api/API';


const CandidateSearch = () => {
  const [candidate, setCandidate]=useState({avatar_url: "", login: "",  });
  useEffect(() => {
    
    const searchCandidates = async() => {
      try{
    let allUsers=await searchGithub()
    return setCandidate(allUsers[0])
  } catch(error) {
    console.log(error)
  }
    }
    searchCandidates()
    
  }, [])
  console.log(candidate)
  return (<div><h1>CandidateSearch</h1>
    <section>
      <img src={candidate.avatar_url}></img>
      <p>Username: {candidate.login}</p>
      
      
    </section>
    </div>
  );
};

export default CandidateSearch;


// name, username, location, avatar, email, html_url, and company