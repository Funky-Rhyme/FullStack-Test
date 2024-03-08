import { useState, useEffect, useReducer } from "react";
import { Data } from "../types/Data";

type PaginationInfo = {
  TotalCount: number;
  PageSize: number;
  CurrentPage: number;
  TotalPages: number;
  HasNext: boolean;
  HasPrevious: boolean;
};

type State = {
  count: number;
};

enum Action {
  Increment,
  Dicrement,
}

function reducer(state: State, action: Action) {
  switch (action) {
    case Action.Increment: {
      return { ...state, count: state.count + 1 };
    }
    case Action.Dicrement: {
      return { ...state, count: state.count - 1 };
    }
  }
}

function DataTable() {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    TotalCount: 0,
    PageSize: 0,
    CurrentPage: 0,
    TotalPages: 0,
    HasNext: false,
    HasPrevious: false,
  });

  const pageSize = 10;

  const [state, dispatch] = useReducer(reducer, {
    count: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7191/entityprocessing?pageNumber=${state.count}&pageSize=${pageSize}`,
          {
            method: "GET",
          }
        );

        const responseData = await response.json();

        const paginationHeader = response.headers.get("X-Pagination");
        const paginationData = paginationHeader
          ? JSON.parse(paginationHeader)
          : {};

        setPaginationInfo({
          TotalCount: paginationData.TotalCount,
          PageSize: paginationData.PageSize,
          CurrentPage: paginationData.CurrentPage,
          TotalPages: paginationData.TotalPages,
          HasNext: paginationData.HasNext,
          HasPrevious: paginationData.HasPrevious,
        });

        setData(responseData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [state.count]);

  return (
    <div className="container px-5">
      {loading ? (
        <div className="spinnner-border" role="status">
          <span>Loading...</span>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="col-1">#</th>
              <th className="col">Value</th>
              <th className="col">Code</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index + (state.count - 1) * pageSize}>
                <td>{index + 1 + (state.count - 1) * pageSize}</td>
                <td>{item.code}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                {state.count !== 1 ? (
                  <a href="#" onClick={() => dispatch(Action.Dicrement)}>
                    Previous
                  </a>
                ) : (
                  <a href="#" className="disabled">
                    Previous
                  </a>
                )}
              </li>

              <li className="page-item">
                {state.count !== paginationInfo.TotalPages ? (
                  <a href="#" onClick={() => dispatch(Action.Increment)}>
                    Next
                  </a>
                ) : (
                  <a href="#" className="disabled">
                    Next
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </table>
      )}
    </div>
  );
}

export default DataTable;
