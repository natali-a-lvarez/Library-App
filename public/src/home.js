function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    if (book.borrows[0].returned === false) total++;
    return total;
  }, 0);
}

function getMostCommonGenres(books) {
  const result = books.reduce((total, book) => {
    const genre = book.genre;
    const genreObj = total.find((element) => element.name === genre);

    if (!genreObj) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      total.push(newGenreInfo);
    } else {
      genreObj.count++;
    }

    return total;
  }, []);

  result.sort((genreA, genreB) => genreB.count - genreA.count);
  result.splice(5);
  return result;
}

function getMostPopularBooks(books) {
  const result = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });

  const sorted = result.sort((bookA, bookB) => {
    return bookB.count < bookA.count ? -1 : 1;
  });

  const slicedArray = sorted.slice(0, 5);
  return slicedArray;
}

function getMostPopularAuthors(books, authors) {
  const result = authors.map((author) => {
    const fullName = `${author.name.first} ${author.name.last}`;
    const booksByAuthor = books.filter((book) => book.authorId === author.id);
    const borrowsTotal = booksByAuthor.reduce(
      (total, book) => total + book.borrows.length,
      0
    );

    const newAuthor = {
      name: fullName,
      count: borrowsTotal,
    };

    return newAuthor;
  });

  result.sort((authorA, authorB) => authorB.count - authorA.count);
  result.splice(5);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
