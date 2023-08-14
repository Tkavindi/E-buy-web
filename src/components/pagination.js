import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function PaginationRounded({ setPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (event, value) => {
    setCurrentPage(value);
    setPage(value);
  };

  return (
    <div style={{ zIndex: 999, display: "flex", justifyContent: "center", marginTop: "20px" }}>
      {/* Create space above the pagination */}
      <div style={{ justifyItems: "center",textAlign:"center", bottom: 0, left: "50%", transform: "translateX(-50%)" }}>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handleChange}
          style={{
            color: "#ff0707",
            border: "1px solid rgb(255 0 0 / 50 %)",
            backgroundColor: "rgb(255 0 0 / 12 %)",
            
          }}
        />
      </div>
    </div>
  );
}
