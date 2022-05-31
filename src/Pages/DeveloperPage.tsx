import { RouteComponentProps } from 'react-router-dom';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import useOnClickOutside from '@/Components/hooks/useOnClickOutside';
import Loader from '@/Components/Loader';
import Header from '@/Components/Header';

import { makeStyles } from '@material-ui/styles';
import useToggle from '@/Components/hooks/useToggle';
import useInput from '@/Components/hooks/useInput';
import {
  changeAdminInfo, clearCompanyInfo,
  clearDeveloperInfo, createAdmin, deleteDeveloper, getCompanyInfo, getCSV, getDeveloperInfo,
} from '@/store/actions/company';
import {
  selectCompanyInfo, selectDeveloperInfo, selectIsLoading, selectIsSuccess,
} from '@/store/selectors/company';
import { selectUserInfo } from '@/store/selectors/user';
import CopyIcon from '@/Components/common/icons/CopyIcon';
import PopConfirm from '@/Components/PopConfirm';
import Popup from '@/Components/Popup';
import CheckCircle from '@/Components/common/icons/CheckCircle';
import Circle from '@/Components/common/icons/Circle';
import InvalidDataPopup from '@/Components/InvalidDataPopup';
import LoaderDots from '@/Components/common/LoaderDots';

interface Props extends RouteComponentProps<{
  developerId:string
  companyId:string
}> {}

const DeveloperPage:FC<Props> = ({ match }) => {
  const { developerId, companyId } = match.params;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useToggle(false);
  const [email, setEmail] = useInput();
  const [name, setName] = useInput();

  const [uploadCsv, setEditCSV] = useState<boolean>(false);
  const [deleteCsv, setDeleteCSV] = useState<boolean>(false);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [downloadCsv, setDownloadCsv] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [modal, setModal] = useState(false);
  const [popup, setPopup] = useState(false);
  const [invalidEmailText, setInvalidEmailText] = useState<string>('Email is invalid');
  const [isChangeSuccess, toggleIsChangeSuccess] = useToggle();

  const developerInfo = useSelector(selectDeveloperInfo);
  const user = useSelector(selectUserInfo);
  const isLoading = useSelector(selectIsLoading);
  const CompanyInfo = useSelector(selectCompanyInfo);
  const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    if (CompanyInfo && developerInfo) {
      CompanyInfo.users.map((userC) => {
        if (userC.email === developerInfo.email) {
          setEditCSV(userC.uploadCsv);
          setDownloadCsv(userC.downloadCsv);
          setDeleteCSV(userC.deleteCsv);
        }
      });
    }
  }, [CompanyInfo, developerInfo]);

  useEffect(() => {
    toggleIsChangeSuccess(isSuccess);
  }, [isSuccess]);

  const changeConfirmBlock = () => {
    setConfirm(!confirm);
  };
  const closeConfirm = () => {
    setConfirm(false);
  };
  const handleCloseModal = () => {
    setInputValue('');
    setModal(false);
  };

  const modalRef = useOnClickOutside(() => {
    setModal(false);
  });

  const confirmDelete = () => {
    dispatch(deleteDeveloper(Number(companyId), Number(developerId)));
    setConfirm(false);
    history.goBack();
  };

  useEffect(() => {
    dispatch(getDeveloperInfo(Number(developerId)));
    return () => { dispatch(clearDeveloperInfo()); };
  }, []);

  useEffect(() => {
    dispatch(getCompanyInfo(Number(companyId)));
    return () => { dispatch(clearCompanyInfo()); };
  }, []);

  function validateEmail(email:string) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  const handleUpdatePermissions = () => {
    if (user) {
      dispatch(changeAdminInfo(Number(companyId),
        uploadCsv,
        downloadCsv,
        deleteCsv,
        Number(developerId)));
    }
  };

  return (
    <>
      {
      !developerInfo || !user
        ? (
          <Loader />
        ) : (
          <div className={classes.root}>
            <div className={classes.error}>

              {
                popup ? <InvalidDataPopup text={invalidEmailText} /> : null
              }
            </div>
            <div style={{ minHeight: '100vh' }}>
              <Header user={user} />
              <div className={classes.wrapper}>
                <div className={classes.managerWrapper}>
                  <div className={classes.managerInfo}>
                    <div className={classes.managerInfoWrapper}>
                      <div className={classes.wrapper_link}>
                        <div className={classes.name_email}>
                          <div className={classes.managerName}>{developerInfo.name}</div>
                          <div className={classes.managerEmail}>{developerInfo.email}</div>
                        </div>
                        <div className={classes.PermWithButton}>
                          {
                            user.role === 'customer' && user.email !== developerInfo.email ? (
                              <div className={classes.SaveWrapp}>
                                <div
                                  className={classes.button}
                                  onClick={handleUpdatePermissions}
                                >
                                  {isLoading ? <LoaderDots /> : 'Save'}
                                </div>
                                <div className={classes.PermWrapp}>
                                  <div
                                    className={classes.Perm__item}
                                    onClick={() => setDownloadCsv(!downloadCsv)}
                                  >
                                    {downloadCsv ? <CheckCircle /> : <Circle />}
                                    <span className={classes.list_item}>Download csv</span>
                                  </div>
                                  <div
                                    className={classes.Perm__item}
                                    onClick={() => setEditCSV(!uploadCsv)}
                                  >
                                    {uploadCsv ? <CheckCircle /> : <Circle />}
                                    <span className={classes.list_item}>Upload csv</span>
                                  </div>
                                  <div
                                    className={classes.Perm__item}
                                    onClick={() => setDeleteCSV(!deleteCsv)}
                                  >
                                    {deleteCsv ? <CheckCircle /> : <Circle />}
                                    <span className={classes.list_item}>Delete csv</span>
                                  </div>
                                </div>
                              </div>
                            ) : null
                          }
                        </div>
                      </div>
                      {
                                  user.role === 'customer' && user.email !== developerInfo.email ? (
                                    <div
                                      className={classes.managerDelete}
                                      onClick={changeConfirmBlock}
                                    >
                                      Delete developer
                                    </div>
                                  ) : null
                                }

                    </div>
                  </div>
                </div>
                <PopConfirm
                  position="admin"
                  text="Are you sure delete this developer?"
                  closeConfirm={closeConfirm}
                  confirm={confirm}
                  confirmDelete={confirmDelete}
                  hide={closeConfirm}
                />
                <Popup
                  isActive={isChangeSuccess}
                  text="Permissions was changed"
                  style={{
                    maxWidth: '520px',
                    width: 'calc(100% - 32px)',
                    position: 'fixed',
                  }}
                  bottom={86}
                  padding={16}
                  autoClose={2000}
                  hide={toggleIsChangeSuccess}
                />
              </div>
            </div>
          </div>
        )
            }
    </>
  );
};
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  Perm__item: {
    display: 'flex',
    alignItems: 'center',
    padding: '7px 10px',
    cursor: 'pointer',
  },
  list_item: {
    fontSize: '11px',
    paddingLeft: '5px',
  },
  PermWrapp: {
    display: 'flex',
    flexDirection: 'column',
  },
  PermWithButton: {
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
  },
  Button: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '38px',
  },
  SaveWrapp: {
    border: '1px solid  #E0E1E2',
  },
  Title: {
    fontSize: '24px',
    lineHeight: '24px',
    color: '#21272E',
    textAlign: 'center',
    marginBottom: '46px',
    marginTop: '24px',
    fontWeight: 500,
  },
  Input: {
    width: '344px',
    height: '50px',
    border: '1px solid #E0E1E2',
    boxSizing: 'border-box',
    borderRadius: '2px',
    padding: '16px',
    outline: 'none',
    marginBottom: '16px',
  },
  XeroContent: {
    width: '344px',
    height: '176px',
    marginTop: '50px',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    right: 22,
    top: 19,
    cursor: 'pointer',
  },
  XeroWrapper: {
    width: '648px',
    height: '550px',
    background: '#FFFFFF',
    borderRadius: '2px',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
  },
  error: {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    height: '30px',
    top: 0,
    width: '100%',
  },

  wrapper_link: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '65px',
  },
  link_wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  name_email: {
    display: 'flex',
    flexDirection: 'column',
  },
  link_block: {
    padding: '12px',
    borderRadius: '2px',
    border: 'solid 1px #e0e1e2',
    backgroundColor: '#fbfbfb',
    maxWidth: '217px',
    overflowX: 'scroll',
    height: '19px',
    marginRight: '12px',
  },
  link: {
    padding: '12px',
    borderRadius: '2px',
    border: 'solid 1px #e0e1e2',
    backgroundColor: '#fbfbfb',
    whiteSpace: 'nowrap',
    overflow: 'scroll',
    width: '217px',
    marginRight: '12px',
    color: '#bfbfc3',
    textAlign: 'center',
  },
  loader: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    '& div': {
      boxSizing: 'border-box',
      display: 'block',
      width: '21px',
      height: '21px',
      margin: '2px',
      border: '2px solid #000',
      borderRadius: '50%',
      animation: '$lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      borderColor: '#FCB440 transparent transparent transparent',
    },
    '&:nth-child(1)': {
      animationDelay: '-0.45s',
    },
    '&:nth-child(2)': {
      animationDelay: '-0.3s',
    },
    '&:nth-child(3)': {
      animationDelay: '-0.15s',
    },
  },
  '@keyframes lds-ring': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: ' rotate(360deg)',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
    padding: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  wrapper: {
    width: '598px',
    background: ' #FFFFFF',
    border: 'solid 1px #e0e1e2',
    padding: '24px',
    position: 'relative',
    height: '150px',
  },
  noCompany: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#97989a',
    marginTop: '12px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  noCompanyModal: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#97989a',
    marginTop: '12px',
    textAlign: 'center',
  },
  managerWrapper: {
    display: 'flex',
  },
  managerInfo: {
    width: '100%',
  },
  managerInfoWrapper: {},
  managerName: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '20px',
    letterSpacing: '0.2px',
    color: ' #252733',
    paddingBottom: '8px',
    marginTop: '8px',
  },
  managerPosition: {
    display: 'flex',
    fontWeight: 600,
    alignItems: 'center',
    paddingBottom: '12px',
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '0.2px',
  },
  managerEmail: {
    display: 'flex',
    fontWeight: 600,
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.2px',
    marginBottom: '16px',
  },
  image: {
    marginRight: '10px',
  },
  managerDelete: {
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '14px',
    letterSpacing: '0.2px',
    color: '#1890FF',
    marginTop: '12px',
    cursor: 'pointer',
    position: 'relative',
    width: '100px',
    whiteSpace: 'nowrap',
  },
  companies: {
    marginTop: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  companiesTitle: {
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '0.2px',
    color: '#21272e',
  },
  addManager: {
    color: '#494c61',
    padding: '8px',
    height: '32px',
    fontSize: '12px',
    borderRadius: '2px',
    backgroundColor: '#fbfbfb',
    border: 'solid 1px #e0e1e2',
    lineHeight: '16px',
    letterSpacing: '0.2px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  plus: {
    fontSize: '24px',
    marginRight: '8px',
    fontWeight: 'lighter',
  },
  arrowBack: {
    position: 'absolute',
    cursor: 'pointer',
    top: 38,
    left: -107,
  },
  confirmDelete: {
    width: '210px',
    height: '74px',
    background: '#FFFFFF',
    borderRadius: '2px',
    padding: '16px',
    position: 'absolute',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    '&::before': {
      content: '""',
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '7px 14px 7px 0',
      borderColor: 'transparent #fff transparent transparent',
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: '5px',
      position: 'absolute',
      top: 45,
      left: -14,
    },
  },
  confirmText: {
    fontSize: '14px',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  closeIcon: {
    cursor: 'pointer',
  },
  reject: {
    width: '34px',
    height: '24px',
    background: '#FFFFFF',
    border: '1px solid #D9D9D9',
    boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.016)',
    borderRadius: '2px',
    fontSize: '14px',
    lineHeight: '22px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.85)',
    cursor: 'pointer',
  },
  confirm: {
    width: '34px',
    height: '24px',
    background: '#FCB440',
    boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)',
    borderRadius: '2px',
    color: '#fff',
    fontSize: '14px',
    lineHeight: '22px',
    textAlign: 'center',
    cursor: 'pointer',
    marginLeft: '8px',
  },
  confirmButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },

  companyWrapper: {
    maxHeight: '281px',
    overflow: 'auto',
  },

  container__modal: {
    minHeight: '100%',
    minWidth: '100%',
    left: '0',
    top: '0',
    background: 'rgba(0, 0, 0, 0.4)',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    background: '#FAFAFA',
    border: '1px solid #E4E5E6',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '24px',
    padding: '0 18px',
    marginBottom: '17px',
    '& input': {
      width: '600px',
      height: '48px',
      outline: 'none',
      border: 'none',
      marginLeft: '18px',
      background: '#FAFAFA',
      boxSizing: 'border-box',
      '&::placeholder': {
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#B4B4B4',
      },
    },
    '& img': {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  success: {
    marginTop: '170px',
    '& button': {
      width: '128px',
      height: '48px',
    },
    '& h3': {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '24px',
      textAlign: 'center',
      color: '#9B9B9D',
      marginTop: '35px',
    },
  },
  emailWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '32px',
    padding: '48px 24px 0 24px',
    backgroundColor: '#f0f1f2',
  },
  email: {
    fontSize: '10px',
  },
  logOut: {
    textTransform: 'uppercase',
    fontSize: '10px',
    color: '#1890ff',
    cursor: 'pointer',
  },
});

export default DeveloperPage;
