import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries.js";
import { useState } from "react";

const Authors = (props) => {
  const [authorToUpdate, setAuthorToUpdate] = useState("");
  const [updatedBorn, setUpdatedBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const authors =
    useQuery(ALL_AUTHORS, { pollInterval: 2000 })?.data?.allAuthors || [];

  if (!props.show) {
    return null;
  }

  const handleUpdateAuthor = (event) => {
    event.preventDefault();
    editAuthor({
      variables: { name: authorToUpdate, setBornTo: updatedBorn },
    });
    setAuthorToUpdate("");
    setUpdatedBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleUpdateAuthor}>
        <h2>Set birthyear</h2>
        name:
        <select
          defaultValue="DEFAULT"
          onChange={({ target }) => setAuthorToUpdate(target.value)}
        >
          <option value="DEFAULT" disabled key={-1}>
            Choose author
          </option>
          {authors.map((a, i) => (
            <option key={i}>{a.name}</option>
          ))}
        </select>
        <br />
        born:
        <input
          type="number"
          onChange={({ target }) => setUpdatedBorn(parseInt(target.value))}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
