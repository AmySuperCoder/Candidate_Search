import {useState, useEffect} from 'react'



const SavedCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<any>([])

  useEffect(() => {
    const savedCandidates = localStorage.getItem("candidates")
    if (savedCandidates) {
      const viewSavedCandidates = JSON.parse(savedCandidates) 
      setPotentialCandidates(viewSavedCandidates)

    }
  }, [])
console.log(potentialCandidates)

const handleDiscardCandidate = (candidate: any) => {
  const savedCandidates = localStorage.getItem("candidates")
  if (savedCandidates) {
    const parsedCandidates = JSON.parse(savedCandidates)
    const foundCandidateIndex = parsedCandidates.findIndex((searchCandidate: any) => {
      return searchCandidate.id === candidate.id
    })
    const updatedCandidates = [
      ...parsedCandidates.slice(0, foundCandidateIndex), 
      ...parsedCandidates.slice (foundCandidateIndex +1)
    ]
    const updatedCandidatesString = JSON.stringify(updatedCandidates)
    localStorage.setItem("candidates", updatedCandidatesString)
    setPotentialCandidates(updatedCandidates)

  }
  
    }

const renderCandidates = () => {
  return potentialCandidates.map((candidate: any) => {
    return (
      <div className='candidate-row' key={candidate.id}>
        <div>
          <img className="candidate-avatars" src={candidate.avatar_url} />
        </div>
        <div>
          <p>{candidate.name || "No name given"}</p>
          <p>({candidate.login || "No login given"})</p>
        </div>
        <div>
          <p>{candidate.location || "No location given"}</p>
        </div>
        <div>
          <p>{candidate.email || "No email given"}</p>
        </div>
        <div>
          <p>{candidate.company || "No company given"}</p>
        </div>
        <div>
          <p>{candidate.bio || "No bio given"}</p>
        </div>
        <div>
        <button onClick={() => handleDiscardCandidate(candidate)} className="reject-button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="icon-button">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg>

    </button>
        </div>
      </div>
    )
  })
}

const handleSortCandidates = () => {
  const sortedCandidates = potentialCandidates.toSorted((a: any, b: any)=> {
    return (a.login).localeCompare(b.login)
  })

  setPotentialCandidates(sortedCandidates)
}


const handleFilterCandidates = () => {
  const filteredCandidates = potentialCandidates.filter((candidate: any)=> {
    return candidate.bio
  })

  setPotentialCandidates(filteredCandidates)
}

  return (
    <>
      <h1>Potential Candidates</h1>
      <div className="buttons">
        <button onClick={handleSortCandidates}>Sort</button>
        <button onClick={handleFilterCandidates}>Filter (No bio)</button>
      </div>
<div className="container">
  <div>Image</div>
  <div>Name</div>
  <div>Location</div>
  <div>Email</div>
  <div>Company</div>
  <div>Bio</div>
  <div>Reject</div>
  </div>
 {potentialCandidates.length ? 
  renderCandidates() 
  
  : 
  <div>
    <p>No candidates have been selected</p>
  </div>

}


    </>
  );
};

export default SavedCandidates;

//How to format my grid to work with React
// 
//  const GridComponent = () => {
//   // Example data to populate the grid
//   const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`);

//   return (
//     <div className="container">
//       {items.map((item, index) => (
//         <div key={index}>{item}</div>
//       ))}
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div>
//       <h1>My Grid Layout</h1>
//       <GridComponent />
//     </div>
//   );
// };

// export default App;