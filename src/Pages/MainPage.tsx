import React, {
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/hooks/useInput';
import useToggle from '@/components/hooks/useToggle';
import Button from '@/components/common/Button';
import Header from '@/components/Header';
import { makeStyles } from '@material-ui/styles';
import useOnClickOutside from '@/components/hooks/useOnClickOutside';
import { clearCreateCompanyError, createAdmin, getCompanyInfo } from '@/store/actions/company';
import { selectCompanyInfo, selectCreateCompanyError } from '@/store/selectors/company';
import { selectUserInfo } from '@/store/selectors/user';
import { User } from '@/api/main-protected';
import Managers from '@/Components/Managers';
import LoadComponents from '@/Components/LoadComponents';
import InvalidDataPopup from '@/Components/InvalidDataPopup';

interface Props extends RouteComponentProps<{
  companyId:string
  companyName: string
}> {}

const MainPage:React.FC<Props> = ({ match }) => {
  const { companyId, companyName } = match.params;
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modalBots, setModalBots] = useState(false);
  const [email, setEmail] = useInput();
  const [name, setName] = useInput();
  const [botEmail, setBotEmail] = useInput();
  const [botPassword, setBotPassword] = useInput('1August@');
  const [botSecret, setBotSecret] = useInput();
  const InvalidDataMessage = useSelector(selectCreateCompanyError);
  const [popup, setPopup] = useState(false);
  const [isNameEmpty, toggleIsNameEmpty] = useToggle();
  const [isEmailInvalid, toggleIsEmailInvalid] = useToggle();
  const CompanyInfo = useSelector(selectCompanyInfo);
  // const refreshOTPIn = useSelector(selectRefreshOTPIn);
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyInfo(Number(companyId)));
  }, []);

  useEffect(() => {
    if (InvalidDataMessage) setPopup(true);
  }, [InvalidDataMessage]);

  useEffect(() => {
    let timer: any;

    if (popup) {
      timer = setTimeout(() => {
        setPopup(false);
        dispatch(clearCreateCompanyError());
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [popup]);

  const handleOpenAddManagerModal = () => {
    setModal(true);
  };

  const handleOpenBotsModal = () => {
    setModalBots(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleCloseModalBots = () => {
    setModalBots(false);
  };

  const modalRef = useOnClickOutside(() => {
    setModal(false);
  });

  const modalRefBots = useOnClickOutside(() => {
    setModalBots(false);
  });

  const handleCreateManager = () => {
    if (!name) toggleIsNameEmpty(true);
    if (!email) toggleIsEmailInvalid(true);

    if (!name
        || isEmailInvalid) return;

    if (user && CompanyInfo) {
      dispatch(createAdmin(CompanyInfo.project.id, email, name));
      setModal(false);
    }
  };

  return (
    <>
      <>
        <div className={classes.container}>
          <div className={classes.error}>

            {
                          popup ? <InvalidDataPopup text={InvalidDataMessage} /> : null
                        }
          </div>
          <div className={classes.wrapper}>
            <div className={classes.content}>
              <Header user={user} />
              <div className={classes.content__wrapper}>
                <div>
                  <div className={classes.companyName}>
                    {companyName}
                  </div>
                </div>
                <div className={classes.managers}>
                  <div className={classes.managers__title}>
                    Administrators
                  </div>
                  <div className={classes.button}>
                    <Button
                      onClick={handleOpenAddManagerModal}
                      height="32px"
                      fontSize={12}
                      fontWeight={600}
                      flexDirection="row-reverse"
                    >
                      ADD ADMINISTRATOR
                      <span className={classes.plus}>+</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <div className={classes.xeroMain}>
                    {
                                  CompanyInfo
                                  && CompanyInfo.users
                                  && CompanyInfo.users.length === 0 || null
                                    ? (
                                      <div className={classes.noManager}>
                                        <div className={classes.noManagerWrapper}>
                                          <div className={classes.noManager__text}>
                                            You don’t have administrator
                                          </div>
                                          <div className={classes.button}>
                                            <div
                                              onClick={handleOpenAddManagerModal}
                                              className={classes.addManager}
                                            >
                                              ADD ADMINISTRATOR
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    )
                                    : CompanyInfo && CompanyInfo.users
                                      && CompanyInfo.users.map((admins: User) => (
                                        <Managers key={admins.id} admins={admins} />
                                      ))
                                }
                  </div>

                  {!CompanyInfo?.users
                    ? Array(1)
                      .fill(0)
                      .map((_, index) => (
                        <div className={classes.loaderWrapper} key={index}>
                          <LoadComponents />
                        </div>
                      )) : null}
                  <div className={classes.managers}>
                    <div className={classes.xero__title}>
                      Dictionary
                    </div>
                  </div>
                  {!CompanyInfo?.project.pathToDictionary
                    ? (
                      <div className={classes.noManager}>
                        <div className={classes.noManagerWrapper}>
                          <div className={classes.noManager__text}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            you haven't uploaded the csv file yet
                          </div>
                          <div className={classes.button}>
                            <div
                              className={classes.addManager}
                            >
                              ADD CSV
                            </div>
                          </div>

                        </div>
                      </div>
                    ) : <h1>csv file here</h1>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {modal ? (
          <div
            className={classes.container__modal}
          >
            <div ref={modalRef}>
              <div className={classes.XeroWrapper}>
                <div
                  className={classes.close}
                  onClick={handleCloseModal}
                >
                  <CloseIcon color="#21272e" />
                </div>

                <div className={classes.XeroContent}>
                  <h1 className={classes.Title}>
                    Add new administrator
                  </h1>
                  <input
                    type="text"
                    className={classes.Input}
                    placeholder="Full name"
                    required
                    onChange={setName}
                  />
                  <input
                    type="email"
                    className={classes.Input}
                    placeholder="Email"
                    required
                    onChange={setEmail}
                  />
                  <div className={classes.Button}>
                    <Button
                      disabledOnly={!name || !email}
                      onClick={handleCreateManager}
                      height="40px"
                      fontSize={15}
                      fontWeight={600}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    </>
  );
};
const useStyles = makeStyles({
  noManager: {
    border: '1px solid #E0E1E2',
    cursor: 'pointer',
    height: '54px',
    display: 'flex',
    background: '#FBFBFB',
    marginTop: '8px',
    alignItems: 'center',
    borderRadius: '2px',
    justifyContent: 'center',
    textDecoration: 'none',
    width: '596px',
  },
  error: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    height: '30px',
    top: 0,
    width: '100%',
  },
  button: {
  },
  companyName: {
    fontWeight: 500,
    lineHeight: 0.83,
    letterSpacing: ' 0.2px',
    color: '#333',
    fontSize: '24px',
  },
  companyEmail: {
    fontWeight: 500,
    lineHeight: 0.83,
    letterSpacing: ' 0.2px',
    color: '#333',
    fontSize: '14px',
    paddingTop: '8px',
  },
  noCompany: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#97989a',
    marginTop: '12px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  TitleGroup: {
    color: '#21272E',
    fontSize: '24px',
    paddingTop: '40px',
    textAlign: 'center',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '46px',
  },
  companyWrapper: {
    maxHeight: '281px',
    overflow: 'auto',
  },
  closeIcon: {
    cursor: 'pointer',
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
  noManager__text: {
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.2px',
    textAlign: 'center',
    color: '#7d7f83',
    paddingTop: '11px',
  },
  noManagerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconWrapper: {
    padding: '5px',
    cursor: 'pointer',
    backgroundColor: '#fbfbfb',
    borderRadius: '2px',
    border: 'solid 1px #dedfe1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '12px',
  },
  noXero: {
    border: '1px solid #E0E1E2',
    cursor: 'pointer',
    height: '56px',
    display: 'flex',
    background: '#FBFBFB',
    marginTop: '8px',
    alignItems: 'center',
    borderRadius: '2px',
    justifyContent: 'center',
    textDecoration: 'none',
    width: '100%',
  },
  noXero__text: {
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.2px',
    textAlign: 'center',
    color: '#7d7f83',
    paddingTop: '11px',
  },
  noXeroWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loaderWrapper: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#FBFBFB',
    border: '1px solid #E0E1E2',
    borderRadius: '2px',
    marginTop: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
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
  wrapper: {
    width: '648px',
    minHeight: '100vh',
  },
  content: {
    backgroundColor: '#fff',
    marginBottom: '50px',
  },
  content__wrapper: {
    padding: '38px 24px 24px 24px',
    borderRadius: '2px',
    border: 'solid 1px #e0e1e2',
    position: 'relative',
  },
  managers: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: '24px',
  },
  managers__title: {
    fontSize: '20px',
    lineHeight: '27px',
    letterSpacing: '0.2px',
    color: '#21272E',
    width: '100%',
  },
  addManager: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.2px',
    color: '#1890ff',
    paddingTop: '8px',
    paddingBottom: '11px',
    textDecoration: 'none',
  },
  plus: {
    fontSize: '24px',
    marginRight: '8px',
    fontWeight: 'lighter',
  },

  xero__title: {
    fontSize: '20px',
    lineHeight: '27px',
    letterSpacing: '0.2px',
    color: '#21272E',
    width: '100%',
  },
  XeroWrapper: {
    width: '648px',
    height: '430px',
    background: '#FFFFFF',
    borderRadius: '2px',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
  },
  XeroWrapperGroup: {
    width: '599px',
    height: '430px',
    background: '#FFFFFF',
    borderRadius: '2px',
    position: 'relative',
    justifyContent: 'center',
    padding: '24px',
  },
  XeroContent: {
    width: '344px',
    height: '176px',
    marginTop: '50px',
    textAlign: 'center',
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
  Button: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '8px',
  },
  close: {
    position: 'absolute',
    right: 22,
    top: 19,
    cursor: 'pointer',
  },
  xeroMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'self-end',
  },
});

export default MainPage;
