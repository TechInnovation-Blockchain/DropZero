import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  accordian: {
    margin: theme.spacing(2, 0),
    "& .MuiIconButton-edgeEnd": {
      position: "absolute",
      right: 10,
      color: theme.palette.text.primary,
    },
    background: theme.palette.background.secondary,
    boxShadow: "none",
    "& svg": {
      color: theme.palette.text.secondary,
    },
    "@media(max-width:330px)": {
      "& .MuiAccordionDetails-root": {
        padding: "8px 5px 16px",
      },
    },
  },
  accordianHeader: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      minWidth: "80px",
      textAlign: "center",
      margin: theme.spacing(0, 0.5),
      textTransform: "uppercase",
      color: theme.palette.text.primary,
    },
  },
  accordianContentWrapper: {
    width: "100%",
    "& p": {
      color: theme.palette.text.primary,
    },
  },
  accordianContent: {
    height: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    "& p": {
      width: "50%",
    },
    "& p:last-child": {
      textAlign: "right",
    },
  },
  btnWrapper: {
    display: "flex",
    width: "100%",
  },
  updateBtnWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0px 0px",
    minHeight: "40px",
  },
  accordionBtn: {
    fontSize: "14px",
    width: "48%",
    margin: "8px auto",
    display: "flex",
    padding: "6px 0",
    "@media(max-width:550px)": {
      width: "48%",
      "& span": {
        fontSize: "12px",
      },
    },
  },
  btnLoading: {
    "& button": {
      padding: theme.spacing(1, 0),
      "& div": {
        marginRight: "5px",
      },
    },
    "& span": {
      fontSize: "12px !important",
      "@media(max-width:550px)": {
        margin: 0,
      },
    },
  },
  etherscan: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    fontSize: "12px",
    "& svg": {
      marginRight: "4px",
      marginBottom: "2px",
      color: theme.palette.primary.main,
    },
  },
  paused: {
    width: "10px",
    height: "10px",
    backgroundColor: "#f6c343 !important",
    borderRadius: "50%",
    position: "absolute",
    top: "4px",
    marginLeft: "5px",
  },
}));
