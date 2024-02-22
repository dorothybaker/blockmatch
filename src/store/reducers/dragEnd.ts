import {
  formularForColumnOfFour,
  formularForColumnOfThree,
  generateInvalidMoves,
} from "../../utils/formulas";
import {
  isColumnOfFour,
  isColumnOfThree,
  isRowOfFour,
  isRowOfThree,
} from "../../utils/moveCheckLogic";
import { Draft } from "immer";

export const dragEndReducer = (
  state: Draft<{
    board: string[];
    boardSize: number;
    squareBeingReplaced: Element | undefined;
    squareBeingDragged: Element | undefined;
  }>
) => {
  const newBoard = [...state.board];
  let { boardSize, squareBeingDragged, squareBeingReplaced } = state;
  const squareBeingDraggedId: number = parseInt(
    squareBeingDragged?.getAttribute("candy-id") as string
  );
  const squareBeingReplacedId: number = parseInt(
    squareBeingReplaced?.getAttribute("candy-id") as string
  );

  newBoard[squareBeingReplacedId] = squareBeingDragged?.getAttribute(
    "src"
  ) as string;
  newBoard[squareBeingDraggedId] = squareBeingReplaced?.getAttribute(
    "src"
  ) as string;

  const validMoves: number[] = [
    squareBeingDraggedId - 1,
    squareBeingDraggedId - boardSize,
    squareBeingDraggedId + 1,
    squareBeingDraggedId + boardSize,
  ];

  const validMove: boolean = validMoves.includes(squareBeingReplacedId);

  const isAColumnOfFour: boolean | undefined = isColumnOfFour(
    newBoard,
    boardSize,
    formularForColumnOfFour(boardSize)
  );

  const isARowOfFour: boolean | undefined = isRowOfFour(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize, true)
  );

  const isAColumnOfThree: boolean | undefined = isColumnOfThree(
    newBoard,
    boardSize,
    formularForColumnOfThree(boardSize)
  );

  const isARowOfThree: boolean | undefined = isRowOfThree(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize)
  );

  if (
    squareBeingReplacedId &&
    validMove &&
    (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
  ) {
    squareBeingDragged = undefined;
    squareBeingReplaced = undefined;
  } else {
    newBoard[squareBeingReplacedId] = squareBeingReplaced?.getAttribute(
      "src"
    ) as string;
    newBoard[squareBeingDraggedId] = squareBeingDragged?.getAttribute(
      "src"
    ) as string;
  }
  state.board = newBoard;
};
