import { dragDrop, dragEnd, dragStart } from "../store";
import { useAppDispatch } from "../store/hooks";

const Tile = ({ candy, candyId }: { candy: string; candyId: number }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="h-11 w-11 m-0.5 flex justify-center items-center rounded-md select-none"
      style={{
        boxShadow: "inset 4px 4px 9px #062525, inset -4px -4px 9px #aaaab7bb",
      }}
    >
      {candy && (
        <img
          src={candy}
          alt="candy"
          className="h-9 w-9"
          candy-id={candyId}
          draggable={true}
          onDragStart={(e) => dispatch(dragStart(e.target))}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={(e) => dispatch(dragDrop(e.target))}
          onDragEnd={() => dispatch(dragEnd())}
        />
      )}
    </div>
  );
};

export default Tile;
