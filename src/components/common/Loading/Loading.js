import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = ({ progressSize }) => {
  return (
    <div className="loading">
      <CircularProgress
        className="progress"
        size={progressSize ? progressSize : 30}
      />
    </div>
  );
};

Loading.propTypes = {
  progressSize: PropTypes.number,
  overrides: PropTypes.object,
};

export default Loading;
