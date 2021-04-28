import { Fragment, useState, useEffect } from 'react';
import { Box, TablePagination, Typography, Tooltip } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useWeb3React } from '@web3-react/core';
import { utils } from 'ethers';

import PageAnimation from './PageAnimation';
import ClaimTokenCard from './ClaimTokenCard';
import Dialog from './Dialog';
import DisclaimerDialog from './DIsclaimerDialog';
import Button from './Button';
import { useStyles } from '../theme/styles/components/renderTokensStyles';
import { trunc } from '../utils/formattingFunctions';
import { logMessage } from '../utils/log';
import { getName, getDecimal } from '../contracts/functions/erc20Functions';
import { multipleClaims, singleClaim } from '../contracts/functions/dropFactoryFunctions';
import { useClaims, useLoading, useClaimsDashboard, useJWT } from '../hooks';
import { INDEX_FEE } from '../config/constants';

const RenderTokens = ({ tokens, goBack, unlocked }) => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const { removeClaimF } = useClaims();
  const {
    loading: { dapp },
  } = useLoading();
  const { getClaimsHistoryF } = useClaimsDashboard();
  const { jwt } = useJWT();

  const [formData, setFormData] = useState({
    open: false,
    openDis: false,
    check: false,
    page: 0,
    rowsPerPage: 2,
    totalAmountWithIndexFee: 0,
    totalAmount: 0,
    tokenName: '',
    sendContractData: {},
  });
  const [reverse, setReverse] = useState(false);
  const [selected, setSelected] = useState([]);
  const [initial, setInitial] = useState(unlocked);
  const {
    page,
    rowsPerPage,
    open,
    openDis,
    check,
    totalAmount,
    tokenName,
    sendContractData,
  } = formData;

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

  const handleConfirm = async () => {
    const walletAddress = localStorage.getItem('userClaim');
    setFormData({ ...formData, open: false });
    if (!(walletAddress && walletAddress === account)) {
      setFormData({ ...formData, open: false, openDis: true });
      return;
    }

    if (sendContractData.amounts?.length > 1) {
      await multipleClaims(sendContractData, jwt, () => {
        removeClaimF(sendContractData.id, sendContractData.tokenAddress);
        setSelected([]);
        getClaimsHistoryF(jwt);
      });
    } else {
      await singleClaim(sendContractData, jwt, () => {
        removeClaimF(sendContractData.id, sendContractData.tokenAddress);
        setSelected([]);
        getClaimsHistoryF(jwt);
      });
    }
  };

  const handleDisclaimerClose = async () => {
    setFormData({ ...formData, openDis: false });
    if (check) {
      localStorage.setItem('userClaim', account);
    }

    if (sendContractData.amounts?.length > 1) {
      await multipleClaims(sendContractData, jwt, () => {
        removeClaimF(sendContractData.id, sendContractData.tokenAddress);
        setSelected([]);
        getClaimsHistoryF(jwt);
      });
    } else {
      await singleClaim(sendContractData, jwt, () => {
        removeClaimF(sendContractData.id, sendContractData.tokenAddress);
        setSelected([]);
        getClaimsHistoryF(jwt);
      });
    }
  };

  const checkSelection = token => {
    const exists = selected.filter(item => item._id === token._id)[0];
    return exists;
  };

  const handleSelect = token => {
    const exists = checkSelection(token);
    if (exists) {
      setSelected(selected.filter(item => item._id !== token._id));
    } else {
      setSelected([...selected, token]);
    }
  };

  const filterDataForContract = async tokens => {
    let amount = 0;
    const decimal = await getDecimal(tokens[0].tokenAddress);

    const data = {
      tokenAddress: tokens[0].tokenAddress,
      walletAddress: account,
      id: [],
      indexs: [],
      amounts: [],
      merkleRoots: [],
      merkleProofs: [],
    };

    tokens.forEach(async token => {
      amount += Number(token.amount) - Number(token.amount) * INDEX_FEE;
      data['id'] = [...data['id'], token._id];
      data['indexs'] = [...data['indexs'], token.index];
      data['amounts'] = [
        ...data['amounts'],
        utils.parseUnits(token.amount.toString(), decimal).toString(),
      ];
      data['merkleRoots'] = [...data['merkleRoots'], token.csvId.merkleRoot];
      data['merkleProofs'] = [...data['merkleProofs'], token.proof];
    });
    logMessage('Claim', data);
    setFormData({
      ...formData,
      totalAmount: amount,
      open: true,
      sendContractData: data,
    });
  };

  const handleClaimClick = () => {
    filterDataForContract(selected.length > 0 ? selected : tokens);
  };

  const fetchAPI = async () => {
    const name = await getName(tokens[0].tokenAddress);
    setFormData({ ...formData, tokenName: name });
  };

  useEffect(() => {
    if (unlocked) {
      setInitial(false);
    }

    if (tokens.length > 0) {
      fetchAPI();
    }
  }, []);

  return (
    <Fragment>
      <Dialog
        open={open}
        handleClose={() => setFormData({ ...formData, open: false })}
        btnText='Claim'
        btnOnClick={handleConfirm}
        renderContent={
          <Typography variant='body2'>
            You will claim{' '}
            <Tooltip title={totalAmount}>
              <Typography variant='body2' component='span'>
                {trunc(totalAmount)}
              </Typography>
            </Tooltip>
            {` ${tokenName} tokens to your connected wallet`}
          </Typography>
        }
      />
      <DisclaimerDialog
        open={openDis}
        heading='Disclaimer'
        handleClose={() => setFormData({ ...formData, openDis: false, open: false })}
        btnOnClick={handleDisclaimerClose}
        check={check}
        handleChange={() => setFormData({ ...formData, check: !check })}
        type='claim'
      />

      <PageAnimation in={page} key={page} reverse={initial ? initial : reverse}>
        <Box className={classes.tokenContainer}>
          {tokens.length > 0 ? (
            tokens
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(token => (
                <ClaimTokenCard
                  className={`${classes.token} ${checkSelection(token) ? classes.selected : ''}`}
                  key={token._id}
                  token={token}
                  tokenAddress={token.tokenAddress}
                  amount={token.amount}
                  onClick={() => handleSelect(token)}
                />
              ))
          ) : (
            <Typography className={classes.secondaryText} variant='body2'>
              No Tokens Available
            </Typography>
          )}
        </Box>
      </PageAnimation>

      <Box className={`${classes.bottomSec} ${dapp === 'claim' ? classes.loadingBtn : ''}`}>
        <Box className={classes.btnWrapper}>
          <Button onClick={goBack}>
            <ArrowBackIcon />
            <span>Back</span>
          </Button>
          {unlocked && (
            <Button
              loading={dapp === 'claim'}
              disabled={tokens.length === 0}
              onClick={handleClaimClick}
            >
              <span>{selected.length > 0 ? 'Claim' : 'Claim All'}</span>
            </Button>
          )}
        </Box>

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
    </Fragment>
  );
};

export default RenderTokens;
