import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS_WITH_GENRE, ME } from "../queries";

const Recommendations = (props) => {
  const user = useQuery(ME)?.data?.me;

  const filteredBooks = useQuery(ALL_BOOKS_WITH_GENRE, {
    variables: { genre: user?.data?.me.favoriteGenre || "" },
  })?.data;

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{user?.favoriteGenre}</b>
      </p>
      {filteredBooks.allBooks.map((b) => (
        <p key={b.id}>{b.title}</p>
      ))}
    </div>
  );
};

export default Recommendations;
