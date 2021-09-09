import { Box, Typography } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { Button } from "../../components";
import { useStyles } from "../../theme/styles/pages/drop/dropMainContentStyles";
import { useDropInputs } from "../../hooks";
import { DATE_FORMAT } from "../../config/constants";

const DropDates = () => {
  const classes = useStyles();
  const { startDate, endDate, updatingDrop, saveFieldsF, changeTabF } =
    useDropInputs();

  const handleDateTimeChange = (date, key) => {
    saveFieldsF({ [key]: date });
  };

  const handleNextClick = () => {
    if (startDate) {
      const _startDate = new Date(startDate);
      _startDate.setHours(0, 0, 0, 0);
      saveFieldsF({ startDate: _startDate.toISOString() });
    }

    if (endDate) {
      const _endDate = new Date(endDate);
      _endDate.setHours(23, 59, 59, 999);
      saveFieldsF({ endDate: _endDate.toISOString() });
    }

    changeTabF("uploadCSV");
  };

  const setStartMaxDate = (date) => {
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() - 1);
    return tempDate;
  };

  const setEndMinDate = (date) => {
    let tempDate;
    if (date && date != "Invalid Date") {
      tempDate = new Date(date);
      tempDate.setDate(tempDate.getDate() + 1);
    } else {
      tempDate = new Date(Date.now());
      tempDate.setDate(tempDate.getDate() + 1);
    }
    return tempDate;
  };

  const handleKeyDown = (e, key) => {
    if (e.keyCode === 8) {
      saveFieldsF({ [key]: null });
    } else {
      e.preventDefault();
    }
  };

  return (
    <Box className={classes.mainContainer}>
      <Typography
        variant="body2"
        className={classes.para}
        style={{
          width: "100%",
          fontSize: "13px",
          wordSpacing: "0px",
          letterSpacing: "1px",
        }}
      >
        Enter Start and End dates for token claims
      </Typography>

      <KeyboardDatePicker
        className={`${classes.datePicker} ${updatingDrop && classes.hide}`}
        placeholder="Start Date"
        value={startDate}
        format={DATE_FORMAT}
        onChange={(date) => handleDateTimeChange(date, "startDate")}
        InputProps={{ disableUnderline: true }}
        disablePast
        autoComplete="off"
        // minDate={updatingDrop && startDate ? startDate : undefined}
        maxDate={endDate ? setStartMaxDate(endDate) : undefined}
        onKeyDown={(e) => handleKeyDown(e, "startDate")}
        disabled={updatingDrop}
        //rifmFormatter={str => str}
      />

      <KeyboardDatePicker
        className={`${classes.datePicker} ${updatingDrop && classes.hide}`}
        placeholder="End Date"
        value={endDate}
        format={DATE_FORMAT}
        onChange={(date) => handleDateTimeChange(date, "endDate")}
        InputProps={{ disableUnderline: true }}
        disablePast
        autoComplete="off"
        minDate={startDate ? setEndMinDate(startDate) : setEndMinDate()}
        onKeyDown={(e) => handleKeyDown(e, "endDate")}
        disabled={updatingDrop}
      />

      <Box className={classes.btnContainer}>
        <Button onClick={() => changeTabF("token")}>
          <ArrowBackIcon />
          <span>Back</span>
        </Button>
        <Button
          disabled={
            startDate != "Invalid Date" && endDate != "Invalid Date"
              ? false
              : true
          }
          onClick={handleNextClick}
        >
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DropDates;
