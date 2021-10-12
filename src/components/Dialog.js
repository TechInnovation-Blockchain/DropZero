import { Fragment } from "react";
import {
  Dialog as DialogMui,
  Typography,
  DialogContent,
  IconButton,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "../theme/styles/components/dialogStyles";
import Button from "./Button";

const Dialog = ({
  open,
  handleClose,
  text,
  secondaryText,
  errorMsg,
  btnText,
  btnLink,
  linkBtnText,
  btnOnClick,
  renderContent,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <DialogMui
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent className={classes.innerContainer}>
          <IconButton
            size="small"
            onClick={handleClose}
            className={classes.closeBtn}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="body2" className={classes.content}>
            {text}
          </Typography>
          <Box className={classes.renderContent}>{renderContent}</Box>
          {errorMsg ? (
            <Typography variant="body2" className={classes.errorMsg}>
              {errorMsg}
            </Typography>
          ) : (
            <Typography variant="body2" className={classes.secondaryText}>
              {secondaryText}
            </Typography>
          )}
          {btnText && (
            <Button onClick={btnOnClick} disabled={errorMsg ? true : false}>
              <span>{btnText}</span>
            </Button>
          )}
          {linkBtnText && (
            <Button href={btnLink} disabled={errorMsg ? true : false}>
              <span>{linkBtnText}</span>
            </Button>
          )}
        </DialogContent>
      </DialogMui>
    </Fragment>
  );
};

export default Dialog;
