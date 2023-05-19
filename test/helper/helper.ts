export function sortSeats(seats: string[]): string[] {
  // Custom sorting function
  function compareSeats(a: string, b: string): number {
    const rowA = a.charAt(0); // Extract the row letter
    const rowB = b.charAt(0);

    if (rowA < rowB) {
      return -1; // rowA comes before rowB
    } else if (rowA > rowB) {
      return 1; // rowA comes after rowB
    } else {
      // Rows are equal, compare the seat number
      const seatNumA = parseInt(a.substring(1));
      const seatNumB = parseInt(b.substring(1));
      return seatNumA - seatNumB;
    }
  }

  return seats.sort(compareSeats);
}
