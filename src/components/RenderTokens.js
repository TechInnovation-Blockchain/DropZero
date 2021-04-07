import { Fragment, useState, useEffect } from 'react';
import { Box, TablePagination, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useWeb3React } from '@web3-react/core';

import PageAnimation from './PageAnimation';
import ClaimTokenCard from './ClaimTokenCard';
import Dialog from './Dialog';
import DisclaimerDialog from './DIsclaimerDialog';
import Button from './Button';
import { useStyles } from '../theme/styles/components/renderTokensStyles';

const RenderTokens = ({ tokens, goBack, unlocked }) => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const [formData, setFormData] = useState({
    initial: unlocked,
    openDis: false,
    check: false,
    page: 0,
    rowsPerPage: 2,
  });
  const [reverse, setReverse] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const { page, rowsPerPage, openDis, initial, check } = formData;

  const handleChangePage = (event, newPage) => {
    if (page > newPage) {
      setReverse(true);
    } else {
      setReverse(false);
    }
    setFormData({ ...formData, page: newPage });
  };

  const handleChangeRowsPerPage = event => {
    setFormData({ ...formData, page: 0, rowsPerPage: +event.target.value });
  };

  const handleConfirm = () => {
    handleClose();
    const walletAddress = localStorage.getItem('userClaim');
    if (!(walletAddress && walletAddress === account)) {
      setFormData({ ...formData, openDis: true });
    }
  };

  const handleDisclaimerClose = () => {
    setFormData({ ...formData, openDis: false, opem: false });
    if (check) {
      localStorage.setItem('userClaim', account);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkSelection = token => {
    const exists = selected.filter(item => item._id === token._id)[0];
    return exists;
  };

  const handleSelect = token => {
    const exists = checkSelection(token);
    if (exists) {
      setSelected(selected.filter(item => item._id !== token._id));
    } else {
      setSelected([...selected, token]);
    }
  };

  useEffect(() => {
    if (unlocked) {
      setFormData({ ...formData, initial: false });
    }
  }, []);

  return (
    <Fragment>
      <Dialog
        open={open}
        handleClose={handleClose}
        text='You will claim 100.00 Flash tokens to your connected wallet'
        btnText='Claim'
        btnOnClick={handleConfirm}
      />
      <DisclaimerDialog
        open={openDis}
        heading='Disclaimer'
        handleClose={() => setFormData({ ...formData, openDis: false })}
        btnOnClick={handleDisclaimerClose}
        check={check}
        handleChange={() => setFormData({ ...formData, check: !check })}
        type='claim'
      />

      <PageAnimation in={page} key={page} reverse={initial ? initial : reverse}>
        <Box className={classes.tokenContainer}>
          {tokens.length > 0 ? (
            tokens
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(token => (
                <ClaimTokenCard
                  className={`${classes.token} ${checkSelection(token) ? classes.selected : ''}`}
                  key={token._id}
                  token={token}
                  tokenAddress={token.tokenAddress}
                  amount={token.amount}
                  onClick={() => handleSelect(token)}
                />
              ))
          ) : (
            <Typography className={classes.secondaryText} variant='body2'>
              No Tokens Available
            </Typography>
          )}
        </Box>
      </PageAnimation>

      <Box className={classes.bottomSec}>
        <Box className={classes.btnWrapper}>
          <Button onClick={goBack}>
            <ArrowBackIcon />
            <span>Back</span>
          </Button>
          {unlocked && (
            <Button onClick={() => setOpen(true)}>
              <span>{selected.length > 0 ? 'Claim' : 'Claim All'}</span>
            </Button>
          )}
        </Box>

        {tokens.length > 2 && (
          <TablePagination
            component='div'
            style={{ display: 'flex', justifyContent: 'center' }}
            count={tokens.length}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage=''
            rowsPerPageOptions={[]}
          />
        )}
      </Box>
    </Fragment>
  );
};

export default RenderTokens;
