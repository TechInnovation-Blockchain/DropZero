import { useState, useEffect } from 'react';
import { Box, Typography, TablePagination, CircularProgress } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useStyles } from '../../theme/styles/pages/claim/claimMainStyles';
import { PageAnimation, ClaimTabs, ClaimTokenCard } from '../../components';
import { useClaims } from '../../hooks';
import { VALID_CHAIN } from '../../config/constants';

const ClaimMain = () => {
  const classes = useStyles();
  const { account, chainId } = useWeb3React();
  const {
    availableClaims,
    getAvailableClaimsF,
    setLockAndUnlockClaimsF,
    resetLockAndUnlockClaimsF,
    resetClaimsF,
  } = useClaims();

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

  const calculateTotalClaim = claim => {
    let totalAmount = 0;
    claim.forEach(({ amount }) => {
      totalAmount += Number(amount);
    });
    return totalAmount;
  };

  const handleArrowClick = claims => {
    setFormData({ ...formData, activeTab: true });
    const unlockedClaims = [];
    const lockedClaims = [];
    claims.forEach(claim => {
      if (new Date(claim.startDate).getTime() > Date.now()) {
        lockedClaims.push(claim);
      } else {
        unlockedClaims.push(claim);
      }
    });
    setLockAndUnlockClaimsF({ unlockedClaims, lockedClaims });
  };

  useEffect(() => {
    setFormData({ ...formData, initial: false });
    if (chainId === VALID_CHAIN) {
      getAvailableClaimsF(account);
      resetLockAndUnlockClaimsF();
    } else {
      resetClaimsF();
    }
  }, [account, chainId]);

  return availableClaims ? (
    <PageAnimation in={true} reverse={1}>
      {activeTab ? (
        <ClaimTabs goBack={() => setFormData({ ...formData, activeTab: false })} />
      ) : (
        <Box className={classes.mainContainer}>
          {availableClaims.length > 0 ? (
            <>
              <Typography variant='body1' className={classes.heading}>
                Available Tokens
              </Typography>
              <PageAnimation in={page} key={page} reverse={initial ? initial : reverse}>
                <Box className={classes.tokenContainer}>
                  {availableClaims
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(claim => (
                      <ClaimTokenCard
                        key={claim.address}
                        showArrow
                        token={claim}
                        tokenAddress={claim.address}
                        amount={calculateTotalClaim(claim.data)}
                        onArrowClick={() => handleArrowClick(claim.data)}
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

          {availableClaims.length > rowsPerPage && (
            <TablePagination
              component='div'
              style={{ display: 'flex', justifyContent: 'center' }}
              count={availableClaims.length}
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
  ) : (
    <Box className={classes.progress}>
      <CircularProgress size={50} />
    </Box>
  );
};

export default ClaimMain;
