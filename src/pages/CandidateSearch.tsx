import { useState, useEffect } from 'react';
// import { searchGithub, searchGithubUser } from '../api/API';

import { searchGithub, searchGithubUser } from '../api/API';


const CandidateSearch = () => {
  const [candidates, setCandidates]=useState<any>([]);
  const [shownCandidate, setShownCandidate]=useState<any>({})
  const [candidateNum, setCandidateNum] = useState(0)
  const [candidateError, setCandidateError] = useState("")

  useEffect(() => {
    
    const searchCandidates = async() => {
      try{
    let allUsers=await searchGithub()
    if (allUsers.length) {
      const initialCandidate = await searchGithubUser(allUsers[0].id)
      console.log("initialCandidate", initialCandidate)
      if (initialCandidate?.id ) {
        setShownCandidate(initialCandidate)
        setCandidateError("")
      } else {
        setCandidateError("ERROR")
      }
      
    }
    setCandidates(allUsers)
  } catch(error) {
    console.log(error)
    setCandidateError("ERROR")
  }
    }
    searchCandidates()
    
  }, [])

  useEffect(() => {
    const getCandidate = async() => {
      try {
        const currentCandidate = await searchGithubUser(candidates[candidateNum].id)
        console.log(candidateNum)
      console.log("currentCandidate", currentCandidate)
      if (currentCandidate?.id) {
        setShownCandidate(currentCandidate)
        setCandidateError("")
      } else {
        setCandidateError("ERROR")
      }
      
      } catch (error) {
        console.log("Unable to retrieve candidates at this time.")
        setCandidateError("ERROR")
      }
    }
    if (candidates.length && candidateNum < candidates.length) {
      getCandidate()
    }
  },[candidateNum])
  
  const handleDiscardCandidate = () => {
setCandidateNum(candidateNum+1)

  }

  const handleAcceptCandidate = () => {
    const savedCandidates = localStorage.getItem("candidates")
    if (savedCandidates) {
      const savedCandidatesJson = JSON.parse(savedCandidates)
      savedCandidatesJson.push(shownCandidate)
      const saveCandidatesString = JSON.stringify(savedCandidatesJson)
      localStorage.setItem("candidates", saveCandidatesString)
    } else {
      const candidateString = JSON.stringify([shownCandidate])
      localStorage.setItem("candidates", candidateString)
    }

    setCandidateNum(candidateNum+1)
  }

  const handleNextCandidate = () => {
    setCandidateNum(candidateNum+1)
  }

  return (<div><h1>CandidateSearch</h1>
  {candidateError && 
<div>
  <p>Error displaying candidate</p>
  <button onClick={handleNextCandidate}>Next Candidate</button>
</div>  
}
   {shownCandidate?.id && !candidateError && (candidateNum <= candidates.length) &&
   <>
    <section>
    <img src={shownCandidate.avatar_url}></img>
    <p>Username: {shownCandidate.login}</p>
    <p>Name: {shownCandidate.name || "No name given"}</p>
    <p>Location: {shownCandidate.location || "No location given"}</p>
    <p>Email: {shownCandidate.email || "No email given"}</p>
    <a href={shownCandidate.url}>Link</a>
    <p>Company: {shownCandidate.company || "No company given"}</p>
    
    
  </section>
  <div>
    <button onClick={handleDiscardCandidate}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="icon-button">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg>

    </button>
    <button onClick={handleAcceptCandidate}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="icon-button">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>




    </button>
    </div></>
   }
   {candidateNum > candidates.length && 
    <div>
      <p>There are no more candidates to display.</p>
    </div>
   }
    </div>
  );
};

export default CandidateSearch;


// name, username, location, avatar, email, html_url, and company