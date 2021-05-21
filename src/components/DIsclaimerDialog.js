import { Fragment } from 'react';
import {
  Dialog as DialogMui,
  Typography,
  DialogContent,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

import { useStyles } from '../theme/styles/components/disclaimerStyles';

const AuditReport =
  'https://github.com/solidified-platform/audits/blob/master/Audit%20Report%20-%20Blockzero%20%5B17.05.2021%5D.pdf';

const Disclaimer = ({ open, handleClose, heading, check, handleChange, btnOnClick, type }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <DialogMui
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle>
          <Typography variant='body2' className={classes.heading}>
            {heading}
          </Typography>
        </DialogTitle>
        <DialogContent>
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
              <br />
              <br />
              The Dropzero protocol has been audited by Solidified. We highly encourage careful use
              during these early days of the dapp. Use at your own discretion.
              <br />
              <br />
              You can view the audit{' '}
              <a href={AuditReport} target='_blank' className={classes.colored} rel='noreferrer'>
                here.
              </a>
            </Typography>
          ) : type === 'drop' ? (
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
              <span className={classes.colored}>5) </span> All airdrops through Dropzero are
              on-chain and Blockzero Labs does not own or manage any airdrop data or mainnet
              performance
              <br />
              <br />
              The Dropzero protocol has been audited by Solidified. We highly encourage careful use
              during these early days of the dapp. Use at your own discretion.
              <br />
              <br />
              You can view the audit{' '}
              <a href={AuditReport} target='_blank' className={classes.colored} rel='noreferrer'>
                here.
              </a>
            </Typography>
          ) : (
            type === 'main' && (
              <Typography
                variant='body2'
                className={classes.content}
                style={{ textAlign: 'center' }}
              >
                Dropzero by Blockzero Labs is a new dapp for permissionless token drops and claims.
                The smart contract and code, available publicly, have been audited by Solidified. In
                these early days of the dapp, we highly encourage careful use at your own
                discretion.
                <br />
                <br />
                You can view the audit{' '}
                <a href={AuditReport} target='_blank' className={classes.colored} rel='noreferrer'>
                  here.
                </a>
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
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={btnOnClick}>
            I Understand
          </Button>
        </DialogActions>
      </DialogMui>
    </Fragment>
  );
};

export default Disclaimer;
