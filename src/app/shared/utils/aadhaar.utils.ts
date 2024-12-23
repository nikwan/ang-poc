class Verhoeff {
    // Multiplication Table (D5 group operation)
    private static d: number[][] = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];
  
    // Permutation Table
    private static p: number[][] = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];
  
    // Inverse Table
    private static inv: number[] = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
  
    /**
     * Validate Aadhaar number using the Verhoeff algorithm
     * @param aadhaarNumber - The Aadhaar number to validate (string format)
     * @returns boolean - True if valid, False if invalid
     */
    public static validate(aadhaarNumber: string): boolean {
      if (!/^\d{12}$/.test(aadhaarNumber)) {
        return false; // Aadhaar number must be 12 digits
      }
  
      let c = 0;
      const len = aadhaarNumber.length;
  
      // Process the Aadhaar number from right to left
      for (let i = 0; i < len; i++) {
        c = this.d[c][this.p[(i % 8)][parseInt(aadhaarNumber.charAt(len - i - 1))]];
      }
  
      return c === 0; // Aadhaar number is valid if checksum is 0
    }
  }
  
  /**
   * Function to validate Aadhaar number
   * @param aadhaarNumber - The Aadhaar number to validate
   * @returns boolean - True if valid, False if invalid
   */
  export function isValidAadhaar(aadhaarNumber: string): boolean {
    return Verhoeff.validate(aadhaarNumber);
  }
  