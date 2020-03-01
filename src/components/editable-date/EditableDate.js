import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import "./EditableDate.css";
import { dateToString } from "./../../utility/utility";

export const EditableDate = props => {
   const [date, setDate] = React.useState(null);
   const datePickerRef = React.useRef(null);

   React.useEffect(() => {
      let newDate = null;
      if (props.date) {
         try {
            newDate = new Date(props.date);
            if (newDate.toString() === "Invalid Date") newDate = null;
         } catch (error) {
            newDate = null;
         }
      }
      setDate(newDate);
   }, [props.date]);

   const dateChangeHandler = date => {
      setDate(date);
      props.changed(date);
   };

   return (
      <div className="editable-date-container">
         <div
            onClick={() => datePickerRef.current.setFocus()}
            className="editable-date-custom-input"
            style={props.styling}
         >
            {dateToString(date)}
         </div>
         <div className="editable-date-date-picker-wrapper">
            <DatePicker
               selected={date}
               onChange={dateChangeHandler}
               minDate={new Date()}
               dateFormat="dd/MM/yyyy"
               ref={datePickerRef}
            />
         </div>
      </div>
   );
};

EditableDate.propTypes = {
   styling: PropTypes.object,
   changed: PropTypes.func,
   date: PropTypes.any
 }


export default EditableDate;