import { ChangeEvent } from "react";
import { Data } from "../types/Data";

type DataItemProps = {
  setData: (childData: Partial<Data>, index: number) => void;
  deleteItem: (index: number) => void;
  index: number;
  currentItem: Data;
};

const DataItem = ({
  setData,
  deleteItem,
  index,
  currentItem,
}: DataItemProps) => {
  function handleCodeData(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    if (parseInt(inputValue) >= 0) {
      setData({ code: Number(inputValue) }, index);
    } else {
      setData({ code: 0 }, index);
    }
  }

  function handleDelete() {
    deleteItem(index);
  }

  return (
    <div className="row d-flex justify-content-center pt-4 g-3">
      <div className="col-3">
        <input
          type="number"
          className="form-control"
          placeholder="Code"
          onChange={handleCodeData}
          value={currentItem.code || ""}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control"
          placeholder="Value"
          onChange={(e) => setData({ value: e.target.value }, index)}
          value={currentItem.value || ""}
        />
      </div>
      <div className="col-1">
        <input
          type="button"
          className="btn btn-danger"
          value="X"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default DataItem;
