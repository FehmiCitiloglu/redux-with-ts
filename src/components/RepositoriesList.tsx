import { useState } from "react";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "./../hooks/useTypedSelector";

const RepositoriesList: React.FC = (props) => {
  const [term, setTerm] = useState("");
  const { data, error, loading } = useTypedSelector(
    (state: any) => state.repositories
  );

  const { searchRepositories } = useActions();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchRepositories(term);
    setTerm("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm((prevState) => (prevState = e.target.value))}
        />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error &&
        !loading &&
        data.map((name: any) => <div key={name}>{name}</div>)}
    </div>
  );
};

export default RepositoriesList;
