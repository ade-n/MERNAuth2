import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  return (
    <div className="w-full fixed z-20 flex flex-col">
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div
              className={`w-full px-4 py-2 text-white bg-${alert.alertType}-500`}
              key={alert.id}
            >
              <div className="text-center">{alert.msg}</div>
            </div>
          );
        })}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
