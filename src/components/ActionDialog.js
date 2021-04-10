import { Fragment } from 'react';
import {
  Dialog as DialogMui,
  Typography,
  DialogContent,
  CircularProgress,
  Box,
  IconButton,
} from '@material-ui/core';
import {
  CheckCircleOutline,
  CancelOutlined,
  ClearOutlined,
  BlockOutlined,
  LinkOutlined,
} from '@material-ui/icons';

import Button from './Button';
import { useStyles } from '../theme/styles/components/dialogStyles';
import { showModal } from '../redux';

const ActionDialog = ({
  open,
  handleClose = () => {
    showModal({ open: false });
  },
  text,
  variant,
  secondaryText,
  link,
  btnText,
  showCloseBtn,
  btnOnClick = () => {
    showModal({ open: false });
  },
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <DialogMui
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogContent className={classes.innerContainer}>
          {showCloseBtn && (
            <IconButton size='small' className={classes.closeBtn} onClick={handleClose}>
              <ClearOutlined />
            </IconButton>
          )}
          {variant === 'loading' ? (
            <CircularProgress size={80} style={{ marginBottom: 30 }} />
          ) : variant === 'success' ? (
            <CheckCircleOutline className={classes.icon} />
          ) : variant === 'error' ? (
            <CancelOutlined className={classes.icon} />
          ) : variant === 'blocked' ? (
            <BlockOutlined className={classes.icon} />
          ) : null}
          <Typography
            variant='body2'
            className={classes.content}
            style={{ textTransform: 'uppercase', width: '100%' }}
          >
            {text}
          </Typography>

          {secondaryText && (
            <Typography variant='body2' className={classes.secondaryText}>
              {secondaryText}
            </Typography>
          )}

          {link && (
            <a href={link} target='_blank'>
              <Box className={classes.externalLink}>
                <LinkOutlined />
                <Typography varaint='body2'>View on etherscan</Typography>
              </Box>
            </a>
          )}

          {btnText && (
            <Button onClick={btnOnClick} style={{ width: '90%', margin: '10px 0' }}>
              <span>{btnText}</span>
            </Button>
          )}
        </DialogContent>
      </DialogMui>
    </Fragment>
  );
};

export default ActionDialog;
