import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ALL_BOOKS_WITH_GENRE } from "../queries";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const genresSetRef = useRef(false);

  const books = selectedGenre
    ? useQuery(ALL_BOOKS_WITH_GENRE, {
        variables: {
          genre: selectedGenre,
        },
        pollInterval: 300,
      })?.data?.allBooks || []
    : useQuery(ALL_BOOKS, { pollInterval: 2000 })?.data?.allBooks || [];

  useEffect(() => {
    const updatedGenres = [];
    if (books.length > 0 && !genresSetRef.current) {
      genresSetRef.current = true;
      for (const book of books) {
        for (const genre of book.genres) {
          if (!updatedGenres.includes(genre)) {
            updatedGenres.push(genre);
          }
        }
      }
      setGenres(updatedGenres);
    }
  }, [books]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          style={{ background: selectedGenre === "" ? "lightblue" : "" }}
          onClick={() => setSelectedGenre("")}
        >
          all
        </button>
        {genres.map((genre, i) => (
          <button
            style={{ background: selectedGenre === genre ? "lightblue" : "" }}
            onClick={() => setSelectedGenre(genre)}
            key={i}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
