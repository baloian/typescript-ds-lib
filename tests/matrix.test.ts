import { Matrix } from '../lib/matrix';

describe('Matrix', () => {
  let matrix: Matrix<number>;

  beforeEach(() => {
    matrix = new Matrix<number>(3, 3);
  });

  describe('constructor', () => {
    it('should create an empty matrix of specified dimensions', () => {
      expect(matrix.rows()).toBe(3);
      expect(matrix.columns()).toBe(3);
      expect(matrix.isEmpty()).toBe(false);
    });

    it('should create a matrix with zero dimensions', () => {
      const emptyMatrix = new Matrix<number>(0, 0);
      expect(emptyMatrix.isEmpty()).toBe(true);
      expect(emptyMatrix.size()).toBe(0);
    });
  });

  describe('get/set operations', () => {
    it('should set and get values correctly', () => {
      matrix.set(0, 0, 1);
      matrix.set(1, 1, 2);
      matrix.set(2, 2, 3);

      expect(matrix.get(0, 0)).toBe(1);
      expect(matrix.get(1, 1)).toBe(2);
      expect(matrix.get(2, 2)).toBe(3);
    });

    it('should return undefined for out of bounds access', () => {
      expect(matrix.get(-1, 0)).toBeUndefined();
      expect(matrix.get(0, -1)).toBeUndefined();
      expect(matrix.get(3, 0)).toBeUndefined();
      expect(matrix.get(0, 3)).toBeUndefined();
    });

    it('should ignore out of bounds set operations', () => {
      matrix.set(-1, 0, 1);
      matrix.set(0, -1, 1);
      matrix.set(3, 0, 1);
      matrix.set(0, 3, 1);
      expect(matrix.toArray()).toEqual([
        [undefined, undefined, undefined],
        [undefined, undefined, undefined], 
        [undefined, undefined, undefined]
      ]);
    });
  });

  describe('matrix operations', () => {
    it('should fill matrix with a value', () => {
      matrix.fill(5);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(matrix.get(i, j)).toBe(5);
        }
      }
    });

    it('should clear matrix', () => {
      matrix.fill(5);
      matrix.clear();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(matrix.get(i, j)).toBeUndefined();
        }
      }
    });

    it('should transpose matrix correctly', () => {
      matrix.set(0, 1, 1);
      matrix.set(1, 0, 2);
      const transposed = matrix.transpose();
      expect(transposed.get(1, 0)).toBe(1);
      expect(transposed.get(0, 1)).toBe(2);
    });

    it('should add matrices correctly', () => {
      const other = new Matrix<number>(3, 3);
      matrix.fill(1);
      other.fill(2);
      const result = matrix.add(other);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(result.get(i, j)).toBe(3);
        }
      }
    });

    it('should throw error when adding matrices of different dimensions', () => {
      const other = new Matrix<number>(2, 3);
      matrix.fill(1);
      other.fill(2);
      expect(() => matrix.add(other)).toThrow('Matrix dimensions must match for addition');
    });

    it('should subtract matrices correctly', () => {
      const other = new Matrix<number>(3, 3);
      matrix.fill(3);
      other.fill(1);
      const result = matrix.subtract(other);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(result.get(i, j)).toBe(2);
        }
      }
    });

    it('should throw error when subtracting matrices of different dimensions', () => {
      const other = new Matrix<number>(2, 3);
      matrix.fill(1);
      other.fill(2);
      expect(() => matrix.subtract(other)).toThrow('Matrix dimensions must match for subtraction');
    });

    it('should multiply matrices correctly', () => {
      const other = new Matrix<number>(3, 3);
      matrix.fill(2);
      other.fill(3);
      const result = matrix.multiply(other);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(result.get(i, j)).toBe(18); // 2 * 3 * 3 (dot product)
        }
      }
    });

    it('should throw error when multiplying incompatible matrices', () => {
      const other = new Matrix<number>(2, 3);
      matrix.fill(1);
      other.fill(2);
      expect(() => matrix.multiply(other)).toThrow('Matrix dimensions must be compatible for multiplication');
    });

    it('should multiply by scalar correctly', () => {
      matrix.fill(2);
      const result = matrix.scalarMultiply(3);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(result.get(i, j)).toBe(6);
        }
      }
    });
  });

  describe('utility operations', () => {
    it('should map values correctly', () => {
      matrix.fill(1);
      const result = matrix.map((value) => value * 2);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(result.get(i, j)).toBe(2);
        }
      }
    });

    it('should execute forEach correctly', () => {
      matrix.fill(1);
      let sum = 0;
      matrix.forEach((value) => {
        sum += value;
      });
      expect(sum).toBe(9);
    });

    it('should get/set rows correctly', () => {
      matrix.setRow(0, [1, 2, 3]);
      expect(matrix.getRow(0)).toEqual([1, 2, 3]);
    });

    it('should ignore invalid row operations', () => {
      matrix.setRow(-1, [1, 2, 3]);
      matrix.setRow(3, [1, 2, 3]);
      matrix.setRow(0, [1, 2]); // Wrong length
      expect(matrix.getRow(-1)).toEqual([]);
      expect(matrix.getRow(3)).toEqual([]);
    });

    it('should get/set columns correctly', () => {
      matrix.setColumn(0, [1, 2, 3]);
      expect(matrix.getColumn(0)).toEqual([1, 2, 3]);
    });

    it('should ignore invalid column operations', () => {
      matrix.setColumn(-1, [1, 2, 3]);
      matrix.setColumn(3, [1, 2, 3]);
      expect(matrix.getColumn(-1)).toEqual([]);
      expect(matrix.getColumn(3)).toEqual([]);
    });

    it('should convert to array correctly', () => {
      matrix.fill(1);
      const arr = matrix.toArray();
      expect(arr).toEqual([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]);
    });

    it('should clone matrix correctly', () => {
      matrix.fill(1);
      const clone = matrix.clone();
      expect(clone.toArray()).toEqual(matrix.toArray());
      
      // Verify deep copy
      matrix.set(0, 0, 2);
      expect(clone.get(0, 0)).toBe(1);
    });

    it('should calculate size correctly', () => {
      expect(matrix.size()).toBe(9);
      const matrix2 = new Matrix<number>(2, 4);
      expect(matrix2.size()).toBe(8);
    });

    it('should check if matrix is square', () => {
      expect(matrix.isSquare()).toBe(true);
      const rectMatrix = new Matrix<number>(2, 3);
      expect(rectMatrix.isSquare()).toBe(false);
    });

    it('should check if matrix is symmetric', () => {
      matrix.set(0, 1, 2);
      matrix.set(1, 0, 2);
      matrix.set(0, 2, 3);
      matrix.set(2, 0, 3);
      matrix.set(1, 2, 4);
      matrix.set(2, 1, 4);
      expect(matrix.isSymmetric()).toBe(true);

      matrix.set(0, 1, 5); // Make asymmetric
      expect(matrix.isSymmetric()).toBe(false);
    });

    it('should swap rows correctly', () => {
      matrix.setRow(0, [1, 2, 3]);
      matrix.setRow(1, [4, 5, 6]);
      matrix.swapRows(0, 1);
      expect(matrix.getRow(0)).toEqual([4, 5, 6]);
      expect(matrix.getRow(1)).toEqual([1, 2, 3]);
    });

    it('should swap columns correctly', () => {
      matrix.setColumn(0, [1, 2, 3]);
      matrix.setColumn(1, [4, 5, 6]);
      matrix.swapColumns(0, 1);
      expect(matrix.getColumn(0)).toEqual([4, 5, 6]);
      expect(matrix.getColumn(1)).toEqual([1, 2, 3]);
    });

    it('should extract submatrix correctly', () => {
      matrix.fill(1);
      matrix.set(0, 0, 2);
      matrix.set(0, 1, 3);
      matrix.set(1, 0, 4);
      matrix.set(1, 1, 5);
      const sub = matrix.submatrix(0, 0, 1, 1);
      expect(sub.rows()).toBe(2);
      expect(sub.columns()).toBe(2);
      expect(sub.get(0, 0)).toBe(2);
      expect(sub.get(0, 1)).toBe(3);
      expect(sub.get(1, 0)).toBe(4);
      expect(sub.get(1, 1)).toBe(5);
    });

    it('should insert matrix correctly', () => {
      const small = new Matrix<number>(2, 2);
      small.fill(5);
      matrix.fill(1);
      matrix.insertMatrix(small, 0, 0);
      expect(matrix.get(0, 0)).toBe(5);
      expect(matrix.get(0, 1)).toBe(5);
      expect(matrix.get(1, 0)).toBe(5);
      expect(matrix.get(1, 1)).toBe(5);
      expect(matrix.get(2, 2)).toBe(1);
    });

    it('should get/set diagonal correctly', () => {
      matrix.setDiagonal([1, 2, 3]);
      expect(matrix.getDiagonal()).toEqual([1, 2, 3]);
    });

    it('should calculate trace correctly', () => {
      matrix.setDiagonal([1, 2, 3]);
      expect(matrix.trace()).toBe(6);
    });

    it('should check equality correctly', () => {
      const other = new Matrix<number>(3, 3);
      matrix.fill(1);
      other.fill(1);
      expect(matrix.equals(other)).toBe(true);

      other.set(0, 0, 2);
      expect(matrix.equals(other)).toBe(false);

      const different = new Matrix<number>(2, 3);
      expect(matrix.equals(different)).toBe(false);
    });

    it('should resize matrix correctly', () => {
      matrix.fill(1);
      matrix.resize(2, 4);
      expect(matrix.rows()).toBe(2);
      expect(matrix.columns()).toBe(4);
      expect(matrix.get(0, 0)).toBe(1);
      expect(matrix.get(0, 3)).toBeUndefined();
    });
  });
});
