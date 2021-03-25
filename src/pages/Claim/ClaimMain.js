import { useState } from 'react';
import { Box, Typography, Grid, Tooltip, TablePagination } from '@material-ui/core';

import { useStyles } from '../../theme/styles/pages/claim/claimMainStyles';
import { Button, PageAnimation, Dialog } from '../../components';
import FLASH from '../../assets/FLASH.png';
import DAI from '../../assets/DAI.png';
import XIO from '../../assets/blockzerologo.png';
import { trunc } from '../../utils/formattingFunctions';

const tokens = [
  {
    name: 'FLASH',
    img: FLASH,
    width: '20px',
    amount: 123456789264,
  },
  {
    name: 'DAI',
    img: DAI,
    width: '30px',
    amount: 0.144,
  },
  {
    name: 'XIO',
    img: XIO,
    width: '40px',
    amount: 10000,
  },
];

const ClaimMain = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    page: 0,
    rowsPerPage: 2,
    reverse: false,
  });
  const { page, rowsPerPage, reverse } = formData;

  const handleSelect = value => {
    if (selected !== value) {
      setSelected(value);
    } else {
      setSelected(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    if (page > newPage) {
      setFormData({ ...formData, reverse: true });
    } else {
      setFormData({ ...formData, reverse: false });
    }
    setFormData({ ...formData, page: newPage });
  };

  const handleChangeRowsPerPage = event => {
    setFormData({ ...formData, page: 0, rowsPerPage: +event.target.value });
  };

  return (
    <PageAnimation in={true} reverse={0}>
      <Dialog
        open={open}
        handleClose={handleClose}
        text='You will claim 100.00 Flash tokens to your connected wallet'
        btnText='Claim'
        btnOnClick={handleClose}
      />
      <Box className={classes.mainContainer}>
        {tokens.length > 0 ? (
          <>
            <Typography variant='body1' className={classes.heading}>
              Available Tokens
            </Typography>
            <PageAnimation in={page} key={page} reverse={reverse}>
              <Box className={classes.tokenContainer}>
                {tokens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(token => (
                  <Box
                    key={token.name}
                    className={`${classes.token} ${
                      selected === token.name ? classes.selected : ''
                    }`}
                    onClick={() => handleSelect(token.name)}
                  >
                    {/* <Grid container alignItems='center' spacing={1} className={classes.grid}>
                    <Grid item xs={4} style={{ textAlign: 'right' }}>
                      <Tooltip title={token.amount}>
                        <Typography variant='body2'>{trunc(token.amount)}</Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                      <img src={token.img} alt={token.name} width={token.width} />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'left' }}>
                      <Typography variant='body2'>{token.name}</Typography>
                    </Grid>
                  </Grid> */}

                    <Grid container alignItems='center' spacing={1} className={classes.grid}>
                      <Grid item xs={6} style={{ textAlign: 'left' }}>
                        <img src={token.img} alt={token.name} />
                      </Grid>

                      <Grid item xs={6} style={{ textAlign: 'right' }}>
                        <Tooltip title={token.amount}>
                          <Typography variant='body2'>{trunc(token.amount)}</Typography>
                        </Tooltip>
                        <Typography variant='body2'>{token.name}</Typography>
                        <Typography variant='body2'>21 Mar 2021</Typography>
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

        {tokens.length > 0 ? (
          <Button disabled={!selected} onClick={() => setOpen(true)}>
            <span>Claim</span>
          </Button>
        ) : null}

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
    </PageAnimation>
  );
};

export default ClaimMain;
