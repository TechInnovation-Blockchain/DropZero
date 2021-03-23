import { useState, Fragment } from 'react';
import { Box, TablePagination } from '@material-ui/core';
import { Accordion, PageAnimation } from '../../components';

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
  const [formData, setFormData] = useState({
    page: 0,
    rowsPerPage: 3,
    reverse: false,
  });
  const { page, rowsPerPage, reverse } = formData;
  const [expanded, setExpanded] = useState(false);

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
    <Fragment>
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
    </Fragment>
  );
};

export default DropDashboard;
