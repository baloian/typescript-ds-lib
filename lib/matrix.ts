import { MatrixTy } from '../types';

/**
 * A generic matrix implementation that supports basic matrix operations.
 */
export class Matrix<T> implements MatrixTy<T> {
  private data: T[][]; // The 2D array storing matrix elements
  private numRows: number; // Number of rows in the matrix
  private numCols: number; // Number of columns in the matrix

  /**
   * Creates a new matrix with the specified dimensions.
   */
  constructor(rows: number, cols: number) {
    this.numRows = rows;
    this.numCols = cols;
    this.data = Array(rows).fill(null).map(() => Array(cols).fill(undefined));
  }

  /**
   * Gets the value at the specified position. The value at [row,col] or undefined if out of bounds.
   */
  get(row: number, col: number): T | undefined {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numCols) {
      return undefined;
    }
    return this.data[row][col];
  }

  /**
   * Sets a value at the specified position.
   */
  set(row: number, col: number, value: T): void {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numCols) {
      return;
    }
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
  empty(): boolean {
    return this.numRows === 0 || this.numCols === 0;
  }

  /**
   * Returns the total number of elements in the matrix.
   */
  size(): number {
    return this.numRows * this.numCols;
  }

  /**
   * Creates a new matrix that is the transpose of this matrix.
   */
  transpose(): MatrixTy<T> {
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
  add(other: MatrixTy<T>): MatrixTy<T> {
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
  subtract(other: MatrixTy<T>): MatrixTy<T> {
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
  multiply(other: MatrixTy<T>): MatrixTy<T> {
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
   * Applies a function to each element and returns a new matrix.
   */
  map(fn: (value: T, row: number, col: number) => T): MatrixTy<T> {
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
  clone(): MatrixTy<T> {
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
}
