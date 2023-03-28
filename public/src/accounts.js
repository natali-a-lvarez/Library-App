function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last < accountB.name.last ? -1 : 1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  return books.reduce((total, book) => {
    let hasId = book.borrows.some((borrow) => borrow.id === id);
    if (hasId === true) total++;
    return total;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const id = account.id;

  let result = [];

  result = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === id && !borrow.returned);
  });

  result = result.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    const newObj = {
      ...book,
      author,
    };
    return newObj;
  });

  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
