import { useState, useEffect } from 'react';
import { Box, TablePagination, CircularProgress, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useStyles } from '../../theme/styles/pages/claim/claimStyles';
import { Accordion, PageAnimation } from '../../components';
import { useDropDashboard } from '../../hooks';

import Aqua from '../../assets/Aqua.png';
import Flash from '../../assets/FLASH.png';

const tokens = [
  {
    name: 'Aqua',
    img: Aqua,
  },
  {
    name: 'Flash',
    img: Flash,
  },
];

const DropDashboard = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const { userDrops, getUserDropsF } = useDropDashboard();

  const [formData, setFormData] = useState({
    page: 0,
    rowsPerPage: 3,
  });
  const [reverse, setReverse] = useState(false);
  const [expanded, setExpanded] = useState(false);
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
    getUserDropsF(account);
  }, []);

  return userDrops ? (
    <Box style={{ paddingBottom: '20px' }}>
      <PageAnimation in={page} key={page} reverse={reverse}>
        <Box style={{ paddingBottom: '20px' }}>
          {tokens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(token => (
            <Accordion
              key={token.name}
              data={token}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </Box>
      </PageAnimation>
      {tokens.length > 3 && (
        <TablePagination
          component='div'
          style={{ display: 'flex', justifyContent: 'center', paddingBottom: '30px' }}
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
  ) : (
    <Box className={classes.noData}>
      <CircularProgress size={50} />
    </Box>
  );
};

export default DropDashboard;
