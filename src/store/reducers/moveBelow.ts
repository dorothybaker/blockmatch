import { candies } from "../../utils/candyData";
import { formularForMoveBelow } from "../../utils/formulas";
import { Draft } from "immer";

export const moveBelowReducer = (
  state: Draft<{
    board: string[];
    boardSize: number;
    squareBeingReplaced: Element | undefined;
    squareBeingDragged: Element | undefined;
  }>
) => {
  const newBoard: string[] = [...state.board];
  const { boardSize } = state;
  let boardChanges: boolean = false;
  const formulaForMove: number = formularForMoveBelow(boardSize);
  for (let i = 0; i <= formulaForMove; i++) {
    const firstRow = Array(boardSize)
      .fill(0)
      .map((_value: number, index: number) => index);

    const isFirstRow = firstRow.includes(i);

    if (isFirstRow && newBoard[i] === "") {
      let randomNumber = Math.floor(Math.random() * candies.length);
      newBoard[i] = candies[randomNumber];
      boardChanges = true;
    }

    if (newBoard[i + boardSize] === "") {
      newBoard[i + boardSize] = newBoard[i];
      newBoard[i] = "";
      boardChanges = true;
    }
    if (boardChanges) state.board = newBoard;
  }
};
