import './App.css';
import teamData from "./resources/data.json"

function App() {
  console.log(teamData[0])
  return (
    <div className="App">
      <h1>
Card Pairs Game
      </h1>

      {teamData.map((member)=>{
        return <div>
          <p>{member.name}</p>
        <img src={member.image_url} alt={member.name}></img>
        </div>
      })}
      
    </div>
  );
}

export default App;
