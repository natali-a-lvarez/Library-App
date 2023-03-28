function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter((book) => book.borrows[0].returned === false);
  const returned = books.filter((book) => book.borrows[0].returned === true);
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  let helperFindAccount = require("./accounts");
  const borrows = book.borrows;

  const result = borrows.map((borrow) => {
    const accountInfo = helperFindAccount.findAccountById(accounts, borrow.id);
    const newObj = {
      ...borrow,
      ...accountInfo,
    };

    return newObj;
  });

  result.splice(10);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
