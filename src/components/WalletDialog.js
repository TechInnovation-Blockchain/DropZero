import { useEffect, useState, useCallback } from 'react';
import {
  Dialog as MuiDialog,
  IconButton,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { ClearOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';

import { useStyles } from '../theme/styles/components/walletDialogStyles';
import { setLoading } from '../redux';
import { walletList } from '../utils/web3Connectors';

const WalletDialog = ({ open, setOpen, heading }) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const loading = useSelector(state => state.ui.loading);

  const onChangeSearch = ({ target: { value } }) => {
    setSearch(value.toUpperCase());
  };

  const filteredData = useCallback(() => {
    return walletList.filter(({ name }) => name.toUpperCase().includes(search));
  }, [search, walletList]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MuiDialog open={open} onClose={onClose} PaperProps={{ className: classes.dialogPaper }}>
      <Container maxWidth='xs' className={classes.dialog}>
        <Box className={classes.closeBtnContainer}>
          <Typography variant='body1' className={classes.dialogHeading}>
            {heading}

            <br />
            {/* {web3context ? (
              <span className={classes.secondaryHeading}>{`CONNECTED TO ${addressShorten(
                web3context.account
              )}`}</span>
            ) : null} */}
          </Typography>
          <IconButton size='small' onClick={onClose} className={classes.closeIcon}>
            <ClearOutlined />
          </IconButton>
        </Box>

        <Box className={classes.closeBtnContainer}>
          <TextField
            placeholder='SEARCH'
            className={classes.textField}
            fullWidth
            value={search}
            onChange={onChangeSearch}
            InputProps={{ disableUnderline: true }}
          />
          {search ? (
            <IconButton size='small' onClick={() => setSearch('')} className={classes.clearSearch}>
              <ClearOutlined />
            </IconButton>
          ) : null}
        </Box>

        {}

        {filteredData().length ? (
          <List className={classes.list}>
            {filteredData().map(({ name, connector, connectorType, logo }) => (
              <ListItem
                button
                key={name}
                // onClick={() => {
                //   activate(connector, onClose);
                // }}
                className={
                  // !(web3context?.connector instanceof connectorType)
                  //   ? classes.listItem
                  //   :
                  classes.selectedListItem
                }
              >
                <Typography variant='body1' className={classes.listItemText}>
                  {loading.walletConnection && loading.connector === connector ? (
                    <CircularProgress size={12} color='inherit' className={classes.loadingIcon} />
                  ) : null}
                  <img src={logo} alt={name} srcSet='' width={20} style={{ marginRight: 5 }} />
                  {name}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant='body1' className={classes.secondaryText}>
            NOTHING TO SHOW
          </Typography>
        )}
      </Container>
    </MuiDialog>
  );
};

export default WalletDialog;
