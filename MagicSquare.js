//My attempt of Magic Square

let possibleGrids = stringPermutations("123456789")

/** This is a helper function to print the grid in human readable form.
 * @param {Array} some2dGrid a 2-d array which represents the magic square
 */
function printTheGrid(some2dGrid) {

	console.log("-------------")

	for (let i = 0; i < some2dGrid.length; i++) {
		let row = some2dGrid[i]
		let rowString = ""
		for (let j = 0; j < row.length; j++) {
			rowString += ("| " + row[j]	+ " ")
		}
		console.log(rowString + "|")
		if (i == (some2dGrid.length-1)) {
			console.log("-------------")
		} else {
			console.log("----+---+---")
		}
	}
}

/** This is a helper function stolen from 
 * "https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-136.php"
 * to generate permutations
 * @param {String} str 
 * @returns an array containing all permutations of the string
 */
function stringPermutations(str) {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
      []
    );
};

//Function which generates the random grid
function generateRandomGrid() {

	if(possibleGrids.length == 0){
		possibleGrids = stringPermutations("123456789")	
	}
	let randomNumber = Math.floor(Math.random() * (9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1));

	let splitPermutation = possibleGrids[randomNumber].split("")

	let returnArray = []
	let count = 0
	for (let i = 0; i < 3; i++) {
		let newArray = []
		for (let j = 0; j < 3; j++) {
			newArray.push(Number(splitPermutation[count]))
			count++
		}
		returnArray.push(newArray)
	}

	return returnArray
}

//Function which checks whether the genrated grid is magic square or not
function isMagicSquare(grid) {
    // The sum of rows, columns, and diagonals in a 3x3 magic square must always be 15
    let constantSum = 15;
  
    // Checking the sum of rows and columns
    for (let i = 0; i < 3; i++) {
        let rowSum = 0;
        let colSum = 0;
        for (let j = 0; j < 3; j++) {
            rowSum += grid[i][j];
            colSum += grid[j][i];
        }
        if (rowSum !== constantSum || colSum !== constantSum) {
            return false;
        }
    }
    
    // Checking diagonals sum
    let diag1Sum = grid[0][0] + grid[1][1] + grid[2][2];
    let diag2Sum = grid[0][2] + grid[1][1] + grid[2][0];

	// Additional condition to check the center value
    if (grid[2][2] != 5) {
        return false;
    }

    return diag1Sum === constantSum && diag2Sum === constantSum;
}


function testing(){

	while(true){
		let grid = generateRandomGrid()
		if(isMagicSquare(grid) == true){
			printTheGrid(grid)
			break
		}
	}
}

testing()