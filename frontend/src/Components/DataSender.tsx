import { useCallback, useEffect, useState } from "react";
import DataItem from "./DataItem";
import { Data } from "../types/Data";

function DataSender() {
  const [count, setCount] = useState(1);
  const [dataTransfer, setDataTransfer] = useState(false);
  const [collectedData, setCollectedData] = useState<Data[]>([]);

  useEffect(() => {
    if (dataTransfer === true && collectedData.length > 0) {
      fetch("https://localhost:7191/entityprocessing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectedData),
      });
    }
  }, [collectedData, dataTransfer]);

  const createNewComponent = () => {
    setCount(count + 1);
  };

  const handleInputData = useCallback(
    (childData: Data) => {
      setCollectedData((prevData) => [...prevData, childData]);
      console.log(collectedData);
    },
    [collectedData]
  );

  const handleDataCollect = () => {
    setDataTransfer(true);
  };

  useEffect(() => {
    if (collectedData.length) {
      setDataTransfer(false);
      setCollectedData([]);
    }
  }, [collectedData, dataTransfer]);

  const components = [];
  for (let i: number = 0; i < count; i++) {
    components.push(
      <DataItem
        myKey={i}
        setData={handleInputData}
        collectData={dataTransfer}
      />
    );
  }

  return (
    <div className="container-fluid">
      <form>
        {components}
        <div className="row justify-content-center pt-3">
          <div className="col-3">
            <button
              type="button"
              onClick={createNewComponent}
              className="btn btn-primary"
            >
              Добавить
            </button>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDataCollect}
            >
              Отправить
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DataSender;
