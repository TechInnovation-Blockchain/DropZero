import { Fragment, useState, useEffect } from 'react';
import { Box, TablePagination } from '@material-ui/core';
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
    page: 0,
    rowsPerPage: 2,
  });
  const [reverse, setReverse] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const { page, rowsPerPage, openDis, initial } = formData;

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
    localStorage.setItem('userClaim', account);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkSelection = token => {
    const exists = selected.filter(item => item.rootHash === token.rootHash)[0];
    return exists;
  };

  const handleSelect = token => {
    const exists = checkSelection(token);
    if (exists) {
      setSelected(selected.filter(item => item.rootHash !== token.rootHash));
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
      />

      <PageAnimation in={page} key={page} reverse={initial ? initial : reverse}>
        <Box style={{ height: '160px' }}>
          {tokens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(token => (
            <ClaimTokenCard
              className={`${classes.token} ${checkSelection(token) ? classes.selected : ''}`}
              key={token.rootHash}
              {...token}
              onClick={() => handleSelect(token)}
            />
          ))}
        </Box>
      </PageAnimation>

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
    </Fragment>
  );
};

export default RenderTokens;
