import ReactPhoneInput from "react-phone-input-2";
import { duration } from "../helper/config";
import moment from "moment-timezone";
import { useState } from "react";
import axios from "axios";

export default function SubmitPage(props) {
  const { date, offset, slot, timeZone } = props;
  const [post, setPost] = useState(null);
  const baseURL = "http://localhost:3001/v1/bookSlot";
  function handleSubmit() {
      let dateTime = moment(date).format("YYYY-MM-DD ") + moment(slot, ["h:mm A"]).format("HH:mm");
      let dateTimeUtc = moment.tz(dateTime, "YYYY-MM-DD HH:mm", timeZone).utc();
    axios({
      method: "post",
      url: baseURL,
      data: {
        DateTime: dateTimeUtc,
        Duration: duration,
      },
    })
      .then(function (response) {
        setPost(response.data);
      })
      .catch(() => setPost(null));
  }
  if(post && Object.keys(post).length){
      console.log(post)
      props.onSubmit();
  }
  return (
    <div className="form">
      <br />
      <strong style={{ marginRight: "150px" }}>
        {slot} {offset} - {duration} Minutes
      </strong>
      <strong>{moment(date).format("ddd, MMM DD, YYYY")}</strong>
      <form className="form-group required">
        <label>First Name </label>
        <br />
        <input type="text" name="fname" required />
        <br />
        <br />

        <label>Last Name</label>
        <br />
        <input type="text" name="lname" required />
        <br />
        <br />

        <label>Phone</label>
        <br />
        <ReactPhoneInput
          className="phone"
          inputExtraProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
          defaultCountry={"us"}
        />
        <br />

        <label>Email</label>
        <br />
        <input type="text" name="email" required />
        <br />
        <br />

        <button
          className="btn btn-lg btn-primary"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
