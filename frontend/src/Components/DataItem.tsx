import { memo, useEffect, useState } from "react";

type Data = {
  Code: number;
  Value: string;
};

type DataItemProps = {
  myKey: number;
  setData: (childData: Data) => void;
  collectData: boolean;
};

const DataItem = memo((props: DataItemProps) => {
  const [code, setCode] = useState(0);
  const [value, setValue] = useState("abc123");

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(Number(e.target.value));
  };

  const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  useEffect(() => {
    if (props.collectData) {
      props.setData({ Code: code, Value: value });
    }
  }, [props, code, value]);

  return (
    <div
      className="row d-flex justify-content-center pt-4 g-3"
      key={props.myKey}
    >
      <div className="col-3">
        <input
          type="text"
          className="form-control"
          placeholder="Code"
          onChange={handleCodeInput}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control"
          placeholder="Value"
          onChange={handleValueInput}
        />
      </div>
    </div>
  );
});

export default DataItem;
