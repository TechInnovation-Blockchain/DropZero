import { useState } from 'react';
import { Box } from '@material-ui/core';
import { Accordion } from '../../components';

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
  const [expanded, setExpanded] = useState(false);

  return (
    <Box style={{ paddingBottom: '40px' }}>
      {tokens.map(token => (
        <Accordion key={token.name} data={token} expanded={expanded} setExpanded={setExpanded} />
      ))}
    </Box>
  );
};

export default DropDashboard;
