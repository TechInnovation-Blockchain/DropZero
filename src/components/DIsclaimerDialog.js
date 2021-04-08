import { Fragment } from 'react';
import {
  Dialog as DialogMui,
  Typography,
  DialogContent,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
} from '@material-ui/core';

import { useStyles } from '../theme/styles/components/disclaimerStyles';

const Disclaimer = ({
  open,
  handleClose,
  heading,
  check,
  handleChange,
  btnOnClick,
  disableBackdrop,
  type,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <DialogMui
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        // disableBackdropClick={disableBackdrop}
        // disableEscapeKeyDown={disableBackdrop}
      >
        <DialogContent className={classes.innerContainer}>
          <Typography variant='body2' className={classes.heading}>
            {heading}
          </Typography>

          {type === 'claim' ? (
            <Typography variant='body2' className={classes.content}>
              <span className={classes.colored}> Claim at your own risk</span> <br /> <br />
              Dropzero by Blockzero Labs is a permissionless protocol. Anyone can drop claimable
              tokens, including fake versions of existing tokens that claim to represent original
              projects. Exercise care when interacting with projects and their airdrops.
              <br />
              <br />
              You are responsible for any transaction fees.
              <br />
              <br />
              All queries relating to claimable tokens are to be directed to the project, not
              Blockzero Labs.
            </Typography>
          ) : (
            type === 'drop' && (
              <Typography variant='body2' className={classes.content}>
                Thank you for using Dropzero by Blockzero Labs. This permissionless protocol
                simplifies token airdrops for both projects (droppers) and users (claimers).
                <br />
                <br />
                <span className={classes.colored}>1) </span> You are responsible for the accuracy of
                all data uploaded <br /> <br />
                <span className={classes.colored}>2) </span> Airdrops can be made by anyone, even if
                they are not owners of the Token Address
                <br />
                <br />
                <span className={classes.colored}>3) </span> Any queries relating to airdrops are to
                be directed to the project, not Blockzero Labs
                <br />
                <br />
                <span className={classes.colored}>4) </span> Any communications to users, including
                pausing, stopping and withdrawing airdrops will be owned and managed by the project
                <br />
                <br />
                <span className={classes.colored}>5) </span> YAll airdrops through Dropzero are
                on-chain and Blockzero Labs do not own or manage any airdrop data or mainnet
                performance
              </Typography>
            )
          )}

          {type === 'claim' && (
            <Box className={classes.checkboxWrapper}>
              <FormControlLabel
                className={classes.checkbox}
                control={<Checkbox checked={check} onChange={handleChange} color='primary' />}
                label="Don't ask again"
              />
            </Box>
          )}

          <Button color='primary' onClick={btnOnClick} style={{ marginTop: '10px' }}>
            I Understand
          </Button>
        </DialogContent>
      </DialogMui>
    </Fragment>
  );
};

export default Disclaimer;
