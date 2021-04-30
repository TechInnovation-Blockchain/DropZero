import { useState, useEffect } from 'react';
import { Box, TablePagination, CircularProgress, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useStyles } from '../../theme/styles/pages/claim/claimStyles';
import { useClaimsDashboard, useJWT } from '../../hooks';
import { Accordion, PageAnimation } from '../../components';
import { VALID_CHAIN } from '../../config/constants';

const ClaimDashboard = () => {
  const classes = useStyles();
  const { account, chainId } = useWeb3React();
  const { claimsHistory, getClaimsHistoryF, resetClaimsHistoryF } = useClaimsDashboard();
  const { jwt } = useJWT();

  const [formData, setFormData] = useState({
    page: 0,
    rowsPerPage: 3,
  });
  const [reverse, setReverse] = useState(false);
  const [expanded, setExpanded] = useState('');
  const { page, rowsPerPage } = formData;

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
    if (chainId === VALID_CHAIN && jwt) {
      getClaimsHistoryF(jwt);
    } else {
      resetClaimsHistoryF();
    }
  }, [account, chainId, jwt]);

  return claimsHistory ? (
    <Box style={{ paddingBottom: '20px' }}>
      <PageAnimation in={page} key={page} reverse={reverse}>
        <Box>
          {claimsHistory.length > 0 ? (
            claimsHistory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(token => (
                <Accordion
                  key={token._id}
                  data={token}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  claim
                />
              ))
          ) : (
            <Box className={classes.noData}>
              <Typography variant='body2'>No Tokens Available</Typography>
            </Box>
          )}
        </Box>
      </PageAnimation>
      {claimsHistory.length > 3 && (
        <TablePagination
          component='div'
          style={{ display: 'flex', justifyContent: 'center' }}
          count={claimsHistory.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage=''
          rowsPerPageOptions={[]}
        />
      )}
    </Box>
  ) : (
    <Box className={classes.noData}>
      <CircularProgress size={50} />
    </Box>
  );
};

export default ClaimDashboard;
