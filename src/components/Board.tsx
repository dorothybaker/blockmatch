import { useAppSelector } from "../store/hooks";
import Tile from "./Tile";

const Board = () => {
  const board = useAppSelector(({ candyCrush: { board } }) => board);
  const boardSize = useAppSelector(
    ({ candyCrush: { boardSize } }) => boardSize
  );

  return (
    <div
      className="flex flex-wrap rounded-lg mx-auto"
      style={{ width: `${3 * boardSize}rem` }}
    >
      {board.map((candy: string, id: number) => (
        <Tile candy={candy} key={id} candyId={id} />
      ))}
    </div>
  );
};

export default Board;
