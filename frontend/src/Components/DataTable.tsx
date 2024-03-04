import { useState, useEffect } from "react";

type Data = {
  Code: number;
  Value: string;
};

type PaginationInfo = {
  TotalCount: number;
  PageSize: number;
  CurrentPage: number;
  TotalPages: number;
  HasNext: boolean;
  HasPrevious: boolean;
};

enum pageChange {
  Increment,
  Dicrement,
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
  const [pageNumber, setPageNumber] = useState(1);

  function handlePageChange(change: pageChange) {
    if (change === pageChange.Increment) {
      setPageNumber(pageNumber + 1);
    } else if (change === pageChange.Dicrement) {
      setPageNumber(pageNumber - 1);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7191/entityprocessing?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
  }, [pageNumber]);

  return (
    <div className="container px-5">
      {loading ? (
        <div className="spinnner-border" role="status">
          <span className="visually-hidden">Loading...</span>
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
              <tr key={index + (pageNumber - 1) * pageSize}>
                <td>{index + 1 + (pageNumber - 1) * pageSize}</td>
                <td>{item.Code}</td>
                <td>{item.Value}</td>
              </tr>
            ))}
          </tbody>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                {pageNumber !== 1 ? (
                  <a
                    href="#"
                    onClick={() => handlePageChange(pageChange.Dicrement)}
                  >
                    Previous
                  </a>
                ) : (
                  <a href="#" className="disabled">
                    Previous
                  </a>
                )}
              </li>

              <li className="page-item">
                {pageNumber !== paginationInfo.TotalPages ? (
                  <a
                    href="#"
                    onClick={() => handlePageChange(pageChange.Increment)}
                  >
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
