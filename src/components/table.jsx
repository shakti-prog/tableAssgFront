import { useState, useEffect } from "react";
import SideBar from "./SideBar";

function Table() {
  const [fetchData, setFetchData] = useState(true);
  const [tableData, setTableData] = useState({
    columns: [],
    data: [],
  });

  const [loading, setLoading] = useState(true);
  const [basicSearch, setBasicSearch] = useState({});

  const handleChange = async(column, e) => {
    //for handling input field changes for searching
    let obj = { ...basicSearch };
    obj[column] = e.target.value;
     setBasicSearch(obj);
    await getFilter();
  };

  const getFilter = async (e) => {
    //filter function
    await fetch("http://localhost:5000/basicSearch", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(basicSearch),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (response) => await response.json())
      .then((data) => {
        setLoading(true);
        let newObj = { ...tableData };
        newObj.data = data.data;
        setTableData(newObj);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch("http://localhost:5000/getData", {
      method: "GET",
      mode: "cors",
    })
      .then(async (response) => await response.json())
      .then((data) => {
        let newObj = { ...tableData };
        newObj.columns = data.columns;
        newObj.data = data.data;
        setTableData(newObj);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [fetchData]);

  const handleReset = () => {
    //Rest button
    setBasicSearch({});
    setFetchData(!fetchData);
    const allInput = document.getElementsByName("inputfields");
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].value = "";
    }
  };

  const sortHandler = async (column, order) => {
    //sortHandling
    let num = 1;
    if (order === "DESC") {
      num = -1;
    }
    const obj = {};
    obj[column] = num;
    await fetch("http://localhost:5000/sort", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        "sortingCondition":obj,
        "filteringCondition":basicSearch
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (response) => await response.json())
      .then((data) => {
        setLoading(true);
        let newObj = { ...tableData };
        newObj.data = data.data;
        setTableData(newObj);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  // Table displaying section

  if (loading) {
    return <div>Loading pls wait</div>;
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="flex ">
          <SideBar />
        </div>
        <div className="ml-12 mt-8 "></div>
        <div className="rounded-lg border border-gray-200 shadow-md w-full overflow-y-auto h-screen mt-32 mr-4">
          <div className="flex flex-row">
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150 mt-2 ml-2"
              type="button"
              onClick={getFilter}
            >
              Filter
            </button>
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150 mt-2 ml-2"
              type="button"
              onClick={(e) => handleReset()}
            >
              Reset
            </button>
          </div>
          <table className="overflow-y-auto border-collapse  bg-white text-left text-sm text-gray-500 w-full">
            <thead class="bg-gray-50">
              <tr>
                {tableData.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    class="px-6 py-4 font-medium text-gray-900"
                  >
                    {column}
                    <div className="flex flex-row">
                      <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => sortHandler(column, "ASC")}
                      >
                        Asc
                      </button>
                      <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => sortHandler(column, "DESC")}
                      >
                        Desc
                      </button>
                    </div>
                    <div className="mb-3 pt-0">
                      <input
                        type="text"
                        name="inputfields"
                        placeholder={column}
                        onChange={(e) => handleChange(column, e)}
                        className="px-2 py-1 mt-2 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
              {tableData.data.map((row, i) => (
                <tr className="hover:bg-gray-50" key={i}>
                  {tableData.columns.map((column) => (
                    <td className="px-6 py-4" key={column}>
                      {typeof row[column] == "object"
                        ? JSON.stringify(row[column])
                        : row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
