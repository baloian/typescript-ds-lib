import { BaseCollection } from './base-collection';


export interface Matrix<T> {
  // Basic operations
  get(row: number, col: number): T | undefined;
  set(row: number, col: number, value: T): void;
  rows(): number;
  columns(): number;

  // Bulk operations
  fill(value: T): void;
  resize(rows: number, cols: number): void;

  isSquare(): boolean;
  isSymmetric(): boolean;

  // Row/Column operations
  getRow(row: number): T[];
  getColumn(col: number): T[];
  setRow(row: number, values: T[]): void;
  setColumn(col: number, values: T[]): void;
  swapRows(row1: number, row2: number): void;
  swapColumns(col1: number, col2: number): void;

  // Matrix transformations
  transpose(): Matrix<T>;
  add(other: Matrix<T>): Matrix<T>;
  subtract(other: Matrix<T>): Matrix<T>;
  multiply(other: Matrix<T>): Matrix<T>;
  scalarMultiply(scalar: number): Matrix<T>;

  // Element-wise operations
  map(fn: (value: T, row: number, col: number) => T): Matrix<T>;
  forEach(fn: (value: T, row: number, col: number) => void): void;

  // Utility methods
  clone(): Matrix<T>;
  toArray(): T[][];
  equals(other: Matrix<T>): boolean;

  // Submatrix operations
  submatrix(startRow: number, startCol: number, endRow: number, endCol: number): Matrix<T>;
  insertMatrix(other: Matrix<T>, startRow: number, startCol: number): void;

  // Diagonal operations
  getDiagonal(): T[];
  setDiagonal(values: T[]): void;
  trace(): T;
}


export class Matrix<T> extends BaseCollection<T> implements Matrix<T> {
  private data: T[][];
  private numRows: number;
  private numCols: number;

  constructor(rows: number, cols: number) {
    super();
    this.numRows = rows;
    this.numCols = cols;
    this.data = Array(rows).fill(null).map(() => Array(cols).fill(undefined));
  }

  /**
   * Gets the value at the specified position. The value at [row,col] or undefined if out of bounds.
   */
  get(row: number, col: number): T | undefined {
    if (!this.isValidPosition(row, col)) return undefined;
    return this.data[row][col];
  }

  /**
   * Sets a value at the specified position.
   */
  set(row: number, col: number, value: T): void {
    if (!this.isValidPosition(row, col)) return;
    this.data[row][col] = value;
  }

  /**
   * Returns the number of rows in the matrix.
   */
  rows(): number {
    return this.numRows;
  }

  /**
   * Returns the number of columns in the matrix.
   */
  columns(): number {
    return this.numCols;
  }

  /**
   * Fills the entire matrix with a value.
   */
  fill(value: T): void {
    this.data = Array(this.numRows).fill(null).map(() => Array(this.numCols).fill(value));
  }

  /**
   * Clears the matrix by setting all elements to undefined.
   */
  clear(): void {
    this.data = Array(this.numRows).fill(null).map(() => Array(this.numCols).fill(undefined));
  }

  /**
   * Checks if the matrix is empty (has zero dimensions).
   */
  isEmpty(): boolean {
    return this.numRows === 0 || this.numCols === 0;
  }

  /**
   * Returns the total number of elements in the matrix.
   */
  size(): number {
    return this.numRows * this.numCols;
  }

  /**
   * Checks if the matrix is square (same number of rows and columns).
   */
  isSquare(): boolean {
    return this.numRows === this.numCols;
  }

  /**
   * Checks if the matrix is symmetric (equal to its transpose).
   */
  isSymmetric(): boolean {
    if (!this.isSquare()) return false;
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < i; j++) {
        if (this.data[i][j] !== this.data[j][i]) return false;
      }
    }
    return true;
  }

  /**
   * Creates a new matrix that is the transpose of this matrix.
   */
  transpose(): Matrix<T> {
    const result = new Matrix<T>(this.numCols, this.numRows);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        result.set(j, i, this.data[i][j]);
      }
    }
    return result;
  }

  /**
   * Adds another matrix to this one.
   */
  add(other: Matrix<T>): Matrix<T> {
    if (this.numRows !== other.rows() || this.numCols !== other.columns()) {
      throw new Error('Matrix dimensions must match for addition');
    }
    const result = new Matrix<T>(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        const sum = (this.data[i][j] as any) + (other.get(i, j) as any);
        result.set(i, j, sum as T);
      }
    }
    return result;
  }

  /**
   * Subtracts another matrix from this one.
   */
  subtract(other: Matrix<T>): Matrix<T> {
    if (this.numRows !== other.rows() || this.numCols !== other.columns()) {
      throw new Error('Matrix dimensions must match for subtraction');
    }
    const result = new Matrix<T>(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        const diff = (this.data[i][j] as any) - (other.get(i, j) as any);
        result.set(i, j, diff as T);
      }
    }
    return result;
  }

  /**
   * Multiplies this matrix with another matrix.
   */
  multiply(other: Matrix<T>): Matrix<T> {
    if (this.numCols !== other.rows()) {
      throw new Error('Matrix dimensions must be compatible for multiplication');
    }
    const result = new Matrix<T>(this.numRows, other.columns());
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < other.columns(); j++) {
        let sum: any = 0;
        for (let k = 0; k < this.numCols; k++) {
          sum += (this.data[i][k] as any) * (other.get(k, j) as any);
        }
        result.set(i, j, sum as T);
      }
    }
    return result;
  }

  /**
   * Multiplies the matrix by a scalar value.
   */
  scalarMultiply(scalar: number): Matrix<T> {
    const result = new Matrix<T>(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        const product = (this.data[i][j] as any) * scalar;
        result.set(i, j, product as T);
      }
    }
    return result;
  }

  /**
   * Applies a function to each element and returns a new matrix.
   */
  map(fn: (value: T, row: number, col: number) => T): Matrix<T> {
    const result = new Matrix<T>(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        result.set(i, j, fn(this.data[i][j], i, j));
      }
    }
    return result;
  }

  /**
   * Executes a function for each element in the matrix.
   */
  forEach(fn: (value: T, row: number, col: number) => void): void {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        fn(this.data[i][j], i, j);
      }
    }
  }

  /**
   * Creates a deep copy of this matrix.
   */
  clone(): Matrix<T> {
    const result = new Matrix<T>(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        result.set(i, j, this.data[i][j]);
      }
    }
    return result;
  }

  /**
   * Converts the matrix to a 2D array.
   */
  toArray(): T[][] {
    return this.data.map(row => [...row]);
  }

  /**
   * Checks if this matrix equals another matrix.
   */
  equals(other: Matrix<T>): boolean {
    if (this.numRows !== other.rows() || this.numCols !== other.columns()) {
      return false;
    }
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (this.data[i][j] !== other.get(i, j)) return false;
      }
    }
    return true;
  }

  /**
   * Gets a copy of the specified row.
   */
  getRow(row: number): T[] {
    if (row < 0 || row >= this.numRows) {
      return [];
    }
    return [...this.data[row]];
  }

  /**
   * Gets a copy of the specified column.
   */
  getColumn(col: number): T[] {
    if (col < 0 || col >= this.numCols) {
      return [];
    }
    return this.data.map(row => row[col]);
  }

  /**
   * Sets values for an entire row.
   */
  setRow(row: number, values: T[]): void {
    if (row < 0 || row >= this.numRows || values.length !== this.numCols) {
      return;
    }
    this.data[row] = [...values];
  }

  /**
   * Sets values for an entire column.
   */
  setColumn(col: number, values: T[]): void {
    if (col < 0 || col >= this.numCols || values.length !== this.numRows) {
      return;
    }
    for (let i = 0; i < this.numRows; i++) {
      this.data[i][col] = values[i];
    }
  }

  /**
   * Swaps two rows in the matrix.
   */
  swapRows(row1: number, row2: number): void {
    if (!this.isValidPosition(row1, 0) || !this.isValidPosition(row2, 0)) return;
    [this.data[row1], this.data[row2]] = [this.data[row2], this.data[row1]];
  }

  /**
   * Swaps two columns in the matrix.
   */
  swapColumns(col1: number, col2: number): void {
    if (!this.isValidPosition(0, col1) || !this.isValidPosition(0, col2)) return;
    for (let i = 0; i < this.numRows; i++) {
      [this.data[i][col1], this.data[i][col2]] = [this.data[i][col2], this.data[i][col1]];
    }
  }

  /**
   * Extracts a submatrix from this matrix.
   */
  submatrix(startRow: number, startCol: number, endRow: number, endCol: number): Matrix<T> {
    if (!this.isValidPosition(startRow, startCol) || !this.isValidPosition(endRow, endCol)) {
      throw new Error('Invalid submatrix bounds');
    }
    const rows = endRow - startRow + 1;
    const cols = endCol - startCol + 1;
    const result = new Matrix<T>(rows, cols);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        result.set(i, j, this.data[startRow + i][startCol + j]);
      }
    }
    return result;
  }

  /**
   * Inserts another matrix into this matrix at the specified position.
   */
  insertMatrix(other: Matrix<T>, startRow: number, startCol: number): void {
    if (!this.isValidPosition(startRow, startCol)) return;
    const maxRows = Math.min(other.rows(), this.numRows - startRow);
    const maxCols = Math.min(other.columns(), this.numCols - startCol);
    for (let i = 0; i < maxRows; i++) {
      for (let j = 0; j < maxCols; j++) {
        this.data[startRow + i][startCol + j] = other.get(i, j)!;
      }
    }
  }

  /**
   * Gets the diagonal elements of the matrix.
   */
  getDiagonal(): T[] {
    const size = Math.min(this.numRows, this.numCols);
    const result: T[] = [];
    for (let i = 0; i < size; i++) {
      result.push(this.data[i][i]);
    }
    return result;
  }

  /**
   * Sets the diagonal elements of the matrix.
   */
  setDiagonal(values: T[]): void {
    const size = Math.min(this.numRows, this.numCols, values.length);
    for (let i = 0; i < size; i++) {
      this.data[i][i] = values[i];
    }
  }

  /**
   * Calculates the trace (sum of diagonal elements) of the matrix.
   */
  trace(): T {
    if (!this.isSquare() || this.isEmpty()) {
      throw new Error('Trace is only defined for non-empty square matrices');
    }
    return this.getDiagonal().reduce((sum: any, val: any) => sum + val);
  }

  /**
   * Resizes the matrix to new dimensions, preserving existing values where possible.
   */
  resize(rows: number, cols: number): void {
    const newData: T[][] = Array(rows).fill(null).map(() => Array(cols).fill(undefined));
    const minRows = Math.min(rows, this.numRows);
    const minCols = Math.min(cols, this.numCols);
    for (let i = 0; i < minRows; i++) {
      for (let j = 0; j < minCols; j++) {
        newData[i][j] = this.data[i][j];
      }
    }
    this.data = newData;
    this.numRows = rows;
    this.numCols = cols;
  }

  private isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.numRows && col >= 0 && col < this.numCols;
  }
}
