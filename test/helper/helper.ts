export function sortSeats(seats: string[]): string[] {
  // Custom sorting function
  function compareSeats(seat1: string, seat2: string): number {
    const pattern = /^([A-Z]+)(\d+)$/;

    // Extract the alphabetical and numeric parts of each seat string
    const [, letters1, digits1] = seat1.match(pattern)!;
    const [, letters2, digits2] = seat2.match(pattern)!;

    // Compare the alphabetical parts
    const letterComparison = letters1.localeCompare(letters2);
    if (letterComparison !== 0) {
      return letterComparison;
    }

    // Convert the numeric parts to integers
    const number1 = parseInt(digits1, 10);
    const number2 = parseInt(digits2, 10);

    // Compare the numeric parts
    if (number1 !== number2) {
      return number1 - number2;
    }

    // If the full seat codes are the same, maintain their relative order
    return seat1.localeCompare(seat2);
  }

  return seats.sort(compareSeats);
}
