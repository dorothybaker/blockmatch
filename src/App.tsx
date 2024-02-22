import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { moveBelow, updateBoard } from "./store";
import { createBoard } from "./utils/createBoard";
import Board from "./components/Board";
import {
  isColumnOfFour,
  isColumnOfThree,
  isRowOfFour,
  isRowOfThree,
} from "./utils/moveCheckLogic";
import {
  formularForColumnOfFour,
  formularForColumnOfThree,
  generateInvalidMoves,
} from "./utils/formulas";

const App = () => {
  const dispatch = useAppDispatch();

  const board = useAppSelector(({ candyCrush: { board } }) => board);
  const boardSize = useAppSelector(
    ({ candyCrush: { boardSize } }) => boardSize
  );

  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)));
  }, [dispatch, boardSize]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];
      isColumnOfFour(newBoard, boardSize, formularForColumnOfFour(boardSize));
      isColumnOfThree(newBoard, boardSize, formularForColumnOfThree(boardSize));
      isRowOfFour(newBoard, boardSize, generateInvalidMoves(boardSize, true));
      isRowOfThree(newBoard, boardSize, generateInvalidMoves(boardSize));
      dispatch(updateBoard(newBoard));
      dispatch(moveBelow());
    }, 150);

    return () => clearInterval(timeout);
  }, [board, boardSize, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 overflow-y-auto">
      <Board />
    </div>
  );
};

export default App;
