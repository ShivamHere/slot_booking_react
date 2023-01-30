import { useState } from "react";
import Welcome from "./components/welcome.jsx";
import SubmitPage from "./components/submitPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";

function App() {
  const [bookData, setBookData] = useState({});
  return (
    <div>
      {bookData && Object.keys(bookData).length ? (
        <SubmitPage
          date={bookData.date}
          slot={bookData.slot}
          offset={bookData.timeZone.label.split(" ")[0]}
          timeZone={bookData.timeZone.value}
          onSubmit={() => setBookData({})}
        />
      ) : (
        <Welcome
          onDateSelect={(date, slot, timeZone) =>
            setBookData({ date, slot, timeZone })
          }
        />
      )}
    </div>
  );
}

export default App;
