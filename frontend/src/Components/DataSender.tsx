import { useCallback, useState } from "react";
import DataItem from "./DataItem";
import { Data } from "../types/Data";

const processing = async (data: Data[], onError?: () => void) => {
  const filteredData = data.filter((i) => i.code != null || i.value !== null);

  if (filteredData.length !== data.length) {
    alert("Неверный данные!");
    onError?.();
  } else {
    await fetch("https://localhost:7191/entityprocessing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        filteredData.map((i) => ({ [(i.code || "")?.toString()]: i.value }))
      ),
    });
  }
};

function DataSender() {
  const defaultItem = { code: null, value: null };
  const [collectedData, setCollectedData] = useState<Data[]>([defaultItem]);
  const [isLoading, setIsLoading] = useState(false);

  const createNewComponent = () => {
    collectedData.push({ ...defaultItem });
    setCollectedData([...collectedData]);
  };

  const handleInputData = useCallback(
    (childData: Partial<Data>, index: number) => {
      collectedData[index] = { ...collectedData[index], ...childData };
      setCollectedData([...collectedData]);
    },
    []
  );

  return (
    <>
      <div className="container-fluid">
        <form>
          {[...Array(collectedData.length).keys()].map((_, i) => {
            return (
              <DataItem
                setData={handleInputData}
                index={i}
                key={i}
                currentItem={collectedData[i]}
                deleteItem={(index) => {
                  collectedData.splice(index, 1);
                  setCollectedData([...collectedData]);
                }}
              />
            );
          })}
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
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    await processing(collectedData);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                Отправить
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container-fluid justify-content-center">
        {isLoading && <div className="spinner-border" role="statis"></div>}
      </div>
    </>
  );
}

export default DataSender;
