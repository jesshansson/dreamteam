interface PaginationProps {
  totalPages: number; // Totalt antal sidor
  currentPage: number; // Den aktuella sidan som användaren är på
  setCurrentPage: (page: number) => void; // Funktion för att byta sida
}

export function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {
  const pageNumbers = [];

  // Skapa en array med sidnummer som vi kan visa
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav>
        <ul className="pagination">
          {/* Gå till föregående sida */}
          <li>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1} // Inaktivera om vi är på första sidan
            >
              Previous
            </button>
          </li>

          {/* Visa alla sidnummer */}
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            </li>
          ))}

          {/* Gå till nästa sida */}
          <li>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages} // Inaktivera om vi är på sista sidan
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
