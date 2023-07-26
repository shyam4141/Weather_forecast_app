import React from "react";

const DataTable = ({ data }) => {
  return (
    <>
      <div className="row">
        {data.map((item, index) => (
          <div className="col-12 col-md mt-4 data_units">
            <div className="row">
              <div className="col-12 data_units date_header">
                Date : xx\xx\xxxx
              </div>
              <div className="col-12 data_units temp_data"> Temperature</div>

              <div className="col-6 data_units temp_data">Min</div>
              <div className="col-6 data_units temp_data">Max</div>
              <div className="col-6 data_units temp_data">{item.temp_min}</div>
              <div className="col-6 data_units temp_data">{item.temp_max}</div>
              <div className="col-6 data_units">Pressure</div>
              <div className="col-6 data_units">{item.pressure}</div>
              <div className="col-6 data_units">Humidity</div>
              <div className="col-6 data_units">{item.humidity}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataTable;
