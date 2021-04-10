import { Snackbar as SnackbarMui, IconButton, Slide } from '@material-ui/core';
import { ClearOutlined, LinkOutlined } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

import { useStyles } from '../theme/styles/components/snackbarStyles';
import { useSnackbar } from '../hooks';
import { ETHERSCAN_TX_BASE_URL } from '../config/constants';

const Snackbar = () => {
  const classes = useStyles();
  const { open, message, severity, transactionHash, hideSnackbarF } = useSnackbar();

  const TransitionUp = props => {
    return <Slide {...props} direction='up' />;
  };

  return (
    <SnackbarMui
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={hideSnackbarF}
      TransitionComponent={TransitionUp}
      action={
        <IconButton size='small' aria-label='close' color='inherit' onClick={hideSnackbarF}>
          <ClearOutlined fontSize='small' />
        </IconButton>
      }
    >
      <Alert onClose={hideSnackbarF} severity={severity} className={classes.snackbarStyles}>
        {message}
        {transactionHash && (
          <a
            className={classes.etherscan}
            href={ETHERSCAN_TX_BASE_URL + transactionHash}
            target='_blank'
          >
            <LinkOutlined /> <span>View on etherscan</span>
          </a>
        )}
      </Alert>
    </SnackbarMui>
  );
};

export default Snackbar;
