import { useState, useEffect } from 'react';
import { Box, Typography, TablePagination } from '@material-ui/core';

import { useStyles } from '../../theme/styles/pages/claim/claimMainStyles';
import { PageAnimation, ClaimTabs, ClaimTokenCard } from '../../components';
import FLASH from '../../assets/FLASH.png';
import DAI from '../../assets/DAI.png';
import XIO from '../../assets/blockzerologo.png';

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
  const [formData, setFormData] = useState({
    page: 0,
    rowsPerPage: 3,
    initial: true,
    activeTab: false,
  });
  const [reverse, setReverse] = useState(false);
  const { page, rowsPerPage, initial, activeTab } = formData;

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

  useEffect(() => {
    setFormData({ ...formData, initial: false });
  }, []);

  return (
    <PageAnimation in={true} reverse={1}>
      {activeTab ? (
        <ClaimTabs goBack={() => setFormData({ ...formData, activeTab: false })} />
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
                    <ClaimTokenCard
                      showArrow
                      onArrowClick={() => setFormData({ ...formData, activeTab: true })}
                      {...token}
                    />
                  ))}
                </Box>
              </PageAnimation>
            </>
          ) : (
            <Typography className={classes.secondaryText} variant='body2'>
              No Tokens Available
            </Typography>
          )}

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
