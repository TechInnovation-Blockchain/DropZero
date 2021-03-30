import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tooltip, TablePagination, IconButton } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useStyles } from '../../theme/styles/pages/claim/claimMainStyles';
import {
  Button,
  PageAnimation,
  Dialog,
  DisclaimerDialog,
  Counter,
  ClaimTabs,
} from '../../components';
import FLASH from '../../assets/FLASH.png';
import DAI from '../../assets/DAI.png';
import XIO from '../../assets/blockzerologo.png';
import { trunc } from '../../utils/formattingFunctions';

const tokens = [
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c1f',
    token: 'FLASH',
    img: FLASH,
    amount: 123456789264,
    startDate: Date.now() + 50000,
  },
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c2f',
    token: 'DAI',
    img: DAI,
    amount: 0.144,
  },
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c3f',
    token: 'XIO',
    img: XIO,
    amount: 10000,
  },
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c4f',
    token: 'DAI',
    img: DAI,
    amount: 1.22,
  },
];

const ClaimMain = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    openDis: false,
    page: 0,
    rowsPerPage: 2,
    initial: true,
    activeTab: false,
  });
  const [reverse, setReverse] = useState(false);
  const { account } = useWeb3React();
  const { page, rowsPerPage, openDis, initial, activeTab } = formData;

  const checkSelection = (token, rootHash) => {
    const exists = selected.filter(item => item.token === token && item.rootHash === rootHash)[0];
    return exists;
  };

  const handleSelect = ({ token, startDate, rootHash }) => {
    if (startDate) {
      if (startDate > Date.now()) return;
    }

    const exists = selected.filter(item => item.token === token)[0];
    if (selected.length > 0 && exists) {
      checkSelection(token, rootHash)
        ? setSelected(selected.filter(item => item.rootHash !== rootHash))
        : setSelected([...selected, { token, rootHash }]);
    } else {
      setSelected([{ token, rootHash }]);
    }

    // if (selected.token !== '') {
    //   if (selected.token === token) {
    //     setSelected({ ...selected, rootHashes: [...selected.rootHashes, rootHash] });
    //   } else {
    //     setSelected({ token: '', rootHashes: [] });
    //   }
    // } else {
    //   setSelected({ token, rootHashes: [rootHash] });
    // }

    // if (selected !== value) {
    //   setSelected(value);
    // } else {
    //   setSelected(null);
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    setSelected([]);
    handleClose();
    const walletAddress = localStorage.getItem('userClaim');
    if (!(walletAddress && walletAddress === account)) {
      setFormData({ ...formData, openDis: true });
    }
  };

  const handleDisclaimerClose = () => {
    setFormData({ ...formData, openDis: false });
    localStorage.setItem('userClaim', account);
  };

  useEffect(() => {
    setFormData({ ...formData, initial: false });
  }, []);

  return (
    <PageAnimation in={true} reverse={1}>
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
      {activeTab ? (
        <ClaimTabs />
      ) : (
        <Box className={classes.mainContainer}>
          {tokens.length > 0 ? (
            <>
              <Typography variant='body1' className={classes.heading}>
                Available Tokens
              </Typography>
              <PageAnimation in={page} key={page} reverse={initial ? initial : reverse}>
                <Box className={classes.tokenContainer}>
                  {tokens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(token => (
                    <Box
                      key={token.rootHash}
                      className={`${classes.token} ${
                        checkSelection(token.token, token.rootHash) ? classes.selected : ''
                      }`}
                      // onClick={() => handleSelect(token)}
                    >
                      {/* <Counter date={token.startDate} /> */}
                      <Grid container alignItems='center' spacing={1} className={classes.grid}>
                        <Grid item xs={9} className={classes.tokenInfo}>
                          <img src={token.img} alt={token.token} />
                          <Box style={{ textAlign: 'left' }}>
                            <Typography variant='body2'>{token.token}</Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={3} className={classes.tokenDetail}>
                          <Tooltip title={token.amount}>
                            <Typography variant='body2'>{trunc(token.amount)}</Typography>
                          </Tooltip>
                          <IconButton
                            size='small'
                            style={{ padding: 0 }}
                            onClick={() => setFormData({ ...formData, activeTab: true })}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
              </PageAnimation>
            </>
          ) : (
            <Typography className={classes.secondaryText} variant='body2'>
              No Tokens Available
            </Typography>
          )}

          {/* {tokens.length > 0 ? (
          <Button disabled={selected.length <= 0} onClick={() => setOpen(true)}>
            <span>Claim</span>
          </Button>
        ) : null} */}

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
      )}
    </PageAnimation>
  );
};

export default ClaimMain;
