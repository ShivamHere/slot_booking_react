import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TimezoneSelect from "react-timezone-select";
import "../App.css";
import moment from "moment-timezone";
import axios from "axios";

function Welcome() {
    const baseURL = "http://localhost:3001/v1/freeSlots";
    const obj = {
        abbrev: "IST",
        altName: "India Standard Time",
        label: "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi",
        offset: 5.5,
        value: "Asia/Kolkata"
    }


  const [selectedTimezone, setSelectedTimezone] = useState(obj);
  moment.tz.setDefault(
    selectedTimezone && Object.keys(selectedTimezone).length
      ? selectedTimezone.value
      : moment.tz.guess()
  );
  let date = moment().toDate();
  const [startDate, setStartDate] = useState(date);
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios({
        method: 'post',
        url: baseURL,
        data: {
            Date: moment(startDate).tz(selectedTimezone.value).format("YYYY-MM-DD"),
            Timezone : selectedTimezone.value
        }
      }).then(function (response) {
        setPost(response.Data);
      })
  }, [startDate, selectedTimezone]);

  return (
    <div className="row">
      <div>
        <h3>Pick Date and Time</h3>
        <DatePicker
          selected={moment(startDate).tz(selectedTimezone.value).toDate()}
          onChange={(date) => setStartDate(moment(date).tz(selectedTimezone.value).toDate())}
        />
        <p></p>
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
      </div>
      <div>
        <h3>
          <span className="notbold"> Available Starting times for</span>{" "}
          {moment(startDate).format("ddd, MMM DD, YYYY")}
        </h3>
        <div className="col-1">
            <strong>AM</strong>
        </div>
        <div className="col-2">
            <strong>PM</strong>
        </div>

      </div>
    </div>
  );
}
export default Welcome;
