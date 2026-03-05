import React from "react";
import { useParams } from "react-router-dom";

function FilterResultsPage({ type }) {
  const params = useParams();
  const value = params[type];

  return (
    <div>
      FilterResultsPage — {type}: {value}
    </div>
  );
}

export default FilterResultsPage;
