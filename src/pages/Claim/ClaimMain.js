import { useState, useEffect } from 'react';
import { Box, Typography, TablePagination, CircularProgress } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useStyles } from '../../theme/styles/pages/claim/claimMainStyles';
import { PageAnimation, ClaimTabs, ClaimTokenCard, AquaAccordian } from '../../components';
import { useClaims, useJWT, useAquaClaims, useClaimsDashboard } from '../../hooks';
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
  const { jwt } = useJWT();
  const { aquaClaims, getAquaClaimsF } = useAquaClaims();
  const { claimsHistory } = useClaimsDashboard();

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

  //Temp Fix starts
  const calculateTotalClaim = claim => {
    let uniqueClaims = [];
    let totalAmount = 0;
    claim.forEach(claim => {
      if (!checkItemExist(uniqueClaims, claim.csvId.merkleRoot)) {
        totalAmount += Number(claim.amount);
        uniqueClaims.push(claim);
      }
    });
    return totalAmount;
  };

  const filterAC = calims => {
    let uniqueClaims = [];
    calims.forEach(claim => {
      if (!checkItemExist(uniqueClaims, claim.csvId.merkleRoot)) {
        uniqueClaims.push(claim);
      }
    });
    return uniqueClaims.length > 0;
  };

  const checkItemExist = (arr, itemMR) => {
    const exists = arr.filter(arr => arr.csvId.merkleRoot === itemMR)[0];
    if (!exists && claimsHistory) {
      const historyExists = claimsHistory.filter(his => his.csvId.merkleRoot === itemMR)[0];
      return historyExists ? true : false;
    } else {
      return exists;
    }
  };

  const handleArrowClick = claims => {
    setFormData({ ...formData, activeTab: true });
    const unlockedClaims = [];
    const lockedClaims = [];
    claims.forEach(claim => {
      if (new Date(claim.startDate).getTime() > Date.now()) {
        !checkItemExist(lockedClaims, claim.csvId.merkleRoot) && lockedClaims.push(claim);
      } else {
        !checkItemExist(unlockedClaims, claim.csvId.merkleRoot) && unlockedClaims.push(claim);
      }
    });
    setLockAndUnlockClaimsF({ unlockedClaims, lockedClaims });
  };

  //Temp Fix ends

  useEffect(() => {
    setFormData({ ...formData, initial: false });
    if (chainId === VALID_CHAIN && jwt) {
      //getAquaClaimsF(account);
      getAquaClaimsF('');
      getAvailableClaimsF(jwt);
      resetLockAndUnlockClaimsF();
    } else {
      resetClaimsF();
    }
  }, [account, chainId, jwt]);

  const claimCount = () => {
    let start;
    let end;
    if (aquaClaims && aquaClaims.hasOwnProperty('aqua')) {
      if (page === 0) {
        start = 0;
      } else {
        start = page * rowsPerPage - 1;
      }
      end = page * rowsPerPage + rowsPerPage - 1;
    } else {
      start = page * rowsPerPage;
      end = page * rowsPerPage + rowsPerPage;
    }
    return [start, end];
  };

  const totalClaimsCount = () => {
    if (aquaClaims && aquaClaims.hasOwnProperty('aqua')) {
      return availableClaims.filter(ac => filterAC(ac.data)).length + 1;
    } else {
      return availableClaims.filter(ac => filterAC(ac.data)).length;
    }
  };

  return availableClaims && aquaClaims ? (
    <PageAnimation in={true} reverse={1}>
      {activeTab ? (
        <ClaimTabs goBack={() => setFormData({ ...formData, activeTab: false })} />
      ) : (
        <Box className={classes.mainContainer}>
          {availableClaims.filter(ac => filterAC(ac.data)).length > 0 ||
          aquaClaims.hasOwnProperty('aqua') ? (
            <>
              <Typography variant='body1' className={classes.heading}>
                Available Tokens
              </Typography>
              <PageAnimation in={page} key={page} reverse={initial ? initial : reverse}>
                <Box className={classes.tokenContainer}>
                  {page === 0 && aquaClaims.hasOwnProperty('aqua') && (
                    <AquaAccordian data={aquaClaims} />
                  )}
                  {availableClaims
                    .filter(ac => filterAC(ac.data))
                    .slice(claimCount()[0], claimCount()[1])
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

          {totalClaimsCount() > rowsPerPage && (
            <TablePagination
              component='div'
              style={{ display: 'flex', justifyContent: 'center' }}
              // count={aquaClaims ? availableClaims.length + 1 : availableClaims.length}
              count={totalClaimsCount()}
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
