import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TimezoneSelect from "react-timezone-select";
import "../App.css";
import moment from "moment-timezone";
import axios from "axios";

function Welcome(props) {
  const baseURL = "http://localhost:3001/v1/freeSlots";
  const obj = {
    abbrev: "IST",
    altName: "India Standard Time",
    label: "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi",
    offset: 5.5,
    value: "Asia/Kolkata",
  };
  const [selectedTimezone, setSelectedTimezone] = useState(obj);
  moment.tz.setDefault(
    selectedTimezone && Object.keys(selectedTimezone).length
      ? selectedTimezone.value
      : moment.tz.guess()
  );
  let date = moment().toDate();
  const [startDate, setStartDate] = useState(date);
  const [selSlot, setSelSlot] = useState(null);
  const [post, setPost] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  useEffect(() => {
    axios({
      method: "post",
      url: baseURL,
      data: {
        Date: moment(startDate).tz(selectedTimezone.value).format("YYYY-MM-DD"),
        Timezone: selectedTimezone.value,
      },
    })
      .then(function (response) {
        setPost(response.data.Data.freeSlots);
      })
      .catch(() => setPost(null));
  }, [startDate, selectedTimezone]);

  function handleClick(e) {
    e.preventDefault();
    setActiveButton(e.target.value);
    setSelSlot(e.target.value);
  }

  return (
    <div className="row">
      <div className="col">
        <h3 style={{ marginTop: "20px" }}>Pick Date and Time</h3>
        <br />
        <DatePicker
          className="cal"
          selected={moment(startDate).tz(selectedTimezone.value).toDate()}
          onChange={(date) =>
            setStartDate(moment(date).tz(selectedTimezone.value).toDate())
          }
          minDate={new Date()}
          inline
        />
        <p></p>
        <TimezoneSelect
          className="bar"
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
        <button
          className="btn btn-primary btn-lg"
          disabled={!activeButton}
          onClick={()=>props.onDateSelect(startDate, selSlot, selectedTimezone)}
        >
          Select Date
        </button>
      </div>
      <div className="col">
        <h3 style={{ marginTop: "20px" }}>
          <span className="notbold"> Available Starting times for</span>{" "}
          {moment(startDate).format("ddd, MMM DD, YYYY")}
        </h3>
        <br />
        <div className="col-1">
          <strong>AM</strong>
          <br />
          {post &&
            post
              .filter((block) => moment(block).format("A") === "AM")
              .map((slot, idx) => (
                <>
                  <br />
                  <button
                    key={idx}
                    className={`btn ${
                      activeButton === moment(slot).format("h:mm A")
                        ? "btn-primary"
                        : "btn-light"
                    }`}
                    onClick={handleClick}
                    value={moment(slot).format("h:mm A")}
                  >
                    {moment(slot).format("h:mm A")}
                  </button>
                  <br />
                </>
              ))}
        </div>
        <div className="col-2">
          <strong>PM</strong>
          <br />
          {post &&
            post
              .filter((block) => moment(block).format("A") === "PM")
              .map((slot, idx) => (
                <>
                  <br />
                  <button
                    key={idx}
                    className={`btn ${
                      activeButton === moment(slot).format("h:mm A")
                        ? "btn-primary"
                        : "btn-light"
                    }`}
                    onClick={handleClick}
                    value={moment(slot).format("h:mm A")}
                  >
                    {moment(slot).format("h:mm A")}
                  </button>
                  <br />
                </>
              ))}
        </div>
      </div>
    </div>
  );
}
export default Welcome;
