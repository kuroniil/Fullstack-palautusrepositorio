import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS_WITH_GENRE, ME } from "../queries";
import { useEffect, useState } from "react";

const Recommendations = (props) => {
  const [books, setBooks] = useState([]);
  const user = useQuery(ME)?.data?.me;
  const filteredBooks = useQuery(ALL_BOOKS_WITH_GENRE, {
    variables: { genre: user?.favoriteGenre },
    skip: !user?.favoriteGenre,
  })?.data;

  useEffect(() => {
    if (user) {
      setBooks(filteredBooks?.allBooks);
    }
  }, [filteredBooks, user]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{user?.favoriteGenre}</b>
      </p>
      {books.map((b) => (
        <p key={b.id}>{b.title}</p>
      ))}
    </div>
  );
};

export default Recommendations;
