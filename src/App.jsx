import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

// APOLLO CLIENT
import { gql } from "@apollo/client";

function App({ client }) {
  const [val , setVal] = useState([])
  const [count, setCount] = useState(0);

  useEffect(() => {
    client
      .query({
        query: gql`
          query QueryPersons {
            persontCount
            allPerson {
              id
              name
            }
            findPerson(name: "Kimberly Thomas") {
              id
              name
            }
          }
        `,
      })
      .then((result) => setVal(result.data.allPerson));
      
  }, []);

  console.log(val)
  return (
    <div className="App">
      <h4>All person</h4>
      {
        val.map(person => (
          <div key={person.id}>
            <h5>{person.id}</h5>
            <p>{person.name}</p>
          </div>
        ) )
      }
      
    </div>
  );
}

export default App;
