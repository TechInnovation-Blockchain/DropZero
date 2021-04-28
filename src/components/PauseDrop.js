import { Fragment, useState } from 'react';
import { Switch } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import Dialog from './Dialog';
import { useDropDashboard, useJWT } from '../hooks';
import { pauseDrop, unpauseDrop } from '../contracts/functions/dropFactoryFunctions';

const PauseDrop = ({ value, tokenAddress, merkleRoot, dropId, disabled }) => {
  const { pauseDropF } = useDropDashboard();
  const { account } = useWeb3React();
  const { jwt } = useJWT();

  const [formData, setFormData] = useState({
    check: value,
    open: false,
    msg: '',
  });
  const { check, open, msg } = formData;

  const handleChange = () => {
    if (check) {
      setFormData({
        ...formData,
        open: true,
        msg: 'Please confirm you want to unpause all the claims',
      });
    } else {
      setFormData({
        ...formData,
        open: true,
        msg: 'Please confirm you want to pause all the claims',
      });
    }
  };

  const handlePause = async () => {
    setFormData({ ...formData, open: false });
    await pauseDrop(dropId, tokenAddress, account, merkleRoot, jwt, () => {
      pauseDropF(dropId, true);
      setFormData({ ...formData, open: false, check: true });
    });
  };

  const handleUnPause = async () => {
    setFormData({ ...formData, open: false });
    await unpauseDrop(dropId, tokenAddress, account, merkleRoot, jwt, () => {
      pauseDropF(dropId, false);
      setFormData({ ...formData, open: false, check: false });
    });
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        text={msg}
        btnText='Confirm'
        handleClose={() => setFormData({ ...formData, open: false })}
        btnOnClick={check ? handleUnPause : handlePause}
      />
      <Switch disabled={disabled} checked={check} onChange={handleChange} color='primary' />
    </Fragment>
  );
};

export default PauseDrop;
