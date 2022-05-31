import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useToggle from '@/Components/hooks/useToggle';
import search from '@/utils/search';
import { useHistory } from 'react-router-dom';
import useOnClickOutside from '@/Components/hooks/useOnClickOutside';
import Loader from '@/Components/Loader';
import { makeStyles } from '@material-ui/styles';
import Header from '@/Components/Header';
import Button from '@/Components/common/Button';
import SearchIcon from '@/Components/common/icons/Searchicon';
import CreateCompanyModal from '@/Components/CompanyModal';
import CloseIcon from '@/Components/common/icons/CloseIcon';
import { selectUserInfo } from '@/store/selectors/user';
import { clearCreateCompanyError, getAdminCompanies, setIsLoading } from '@/store/actions/company';
import { selectAllAdminCompanies, selectCreateCompanyError, selectIsSuccess } from '@/store/selectors/company';
import InvalidDataPopup from '@/Components/InvalidDataPopup';
import Company from '@/store/reducers/company';
import Companies from '@/Components/Companies';
import { Project } from '@/api/main-protected';
import Popup from '@/Components/Popup';
import { sort, SortOrder, SortType } from '@/utils/sortUtil';

const AdminPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useToggle(false);
  const [searchModal, setSearchModal] = useToggle(false);
  const user = useSelector(selectUserInfo);
  const allAdminCompanies = useSelector(selectAllAdminCompanies);
  const [inputValue, setInputValue] = useState('');
  const [popup, setPopup] = useState(false);
  const [isChangeSuccess, toggleIsChangeSuccess] = useToggle();
  // const InvalidDataMessage = useSelector(selectInvalidDataMessage);

  const createCompanyError = useSelector(selectCreateCompanyError);
  const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    dispatch(getAdminCompanies());
  }, []);

  useEffect(() => {
    if (createCompanyError) setPopup(true);
  }, [createCompanyError]);

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

  const searchItem = search(allAdminCompanies!, inputValue, ({ name }) => name);
  const handleOpenAddManagerModal = () => {
    setModal(true);
  };
  const modalRef = useOnClickOutside(() => {
    setModal(false);
  });
  const handleCloseModal = () => {
    setModal(false);
  };

  const openSearchModal = () => {
    setSearchModal(true);
  };

  const closeSearchModal = () => {
    setSearchModal(false);
  };

  const modalSearchRef = useOnClickOutside(() => {
    setSearchModal(false);
  });

  useEffect(() => {
    toggleIsChangeSuccess(isSuccess);
  }, [isSuccess]);

  const allProjectSorted = allAdminCompanies && [...allAdminCompanies].sort((a, b) => {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      {
        !allProjectSorted || !user ? <Loader /> : (
          <>
            <div className={classes.container}>
              <div className={classes.error}>

                {
                    popup ? <InvalidDataPopup text={createCompanyError} /> : null
                  }
              </div>
              <div className={classes.wrapper}>
                <div className={classes.content}>
                  <Header user={user} />
                  <div className={classes.content__wrapper}>
                    <div className={classes.managers}>
                      <div className={classes.leftWrapper}>
                        <div className={classes.managers__title}>
                          Projects
                        </div>

                      </div>
                      <div className={classes.companyWrapper}>
                        <div className={user.role === 'customer' ? classes.searchIcon : classes.searchIconSolo} onClick={openSearchModal}>
                          <SearchIcon width={20} height={20} />
                        </div>
                        {
                          user.role === 'customer' ? (
                            <Button
                              onClick={handleOpenAddManagerModal}
                              height="32px"
                              fontSize={12}
                              fontWeight={600}
                              flexDirection="row-reverse"
                              color="#494c61"
                            >
                              ADD PROJECT
                              <span className={classes.plus}>+</span>
                            </Button>
                          ) : null
                        }

                      </div>
                    </div>
                    {
                      allProjectSorted.map((company: Project) => (
                        <Companies key={company.id} company={company} />
                      ))
                      }
                  </div>
                </div>
              </div>
            </div>
            {modal ? (
              <CreateCompanyModal
                modalRef={modalRef}
                closeModal={handleCloseModal}
                      // user={user}
                modal={setModal}
              />
            ) : null}
            {searchModal ? (
              <div
                className={classes.container__modal}
              >
                <div ref={modalSearchRef}>
                  <div className={classes.XeroWrapper}>
                    <div
                      className={classes.close}
                      onClick={closeSearchModal}
                    >
                      <CloseIcon color="#21272e" />
                    </div>
                    <div className={classes.XeroContent}>
                      <h1 className={classes.Title}>
                        Search
                      </h1>
                      <div>
                        <div className={classes.search}>
                          <SearchIcon />
                          <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            type="text"
                            placeholder="Start typing the organization name..."
                          />
                        </div>
                      </div>
                      {searchItem.map((item, index) => (
                        <div key={index} className={classes.companyWrapper}>
                          <Companies key={index} company={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <Popup
              isActive={isChangeSuccess}
              text="Project has been created"
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
          </>

        )
      }
    </>
  );
};
const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '12px',
    userSelect: 'none',
  },
  leftWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonAll: {
    marginLeft: '8px',
  },
  closeIcon: {
    cursor: 'pointer',
  },
  companyWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    width: '30px',
    height: '30px',
    background: '#fbfbfb;',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px #e0e1e2',
    marginRight: '8px',
    cursor: 'pointer',
  },
  searchIconSolo: {
    width: '30px',
    height: '30px',
    background: '#fbfbfb;',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px #e0e1e2',
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
      width: '500px',
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
  wrapper: {
    width: '648px',
    minHeight: '100vh',
  },
  content: {
    backgroundColor: '#fff',
    marginBottom: '50px',
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
  XeroWrapper: {
    width: '648px',
    height: '618px',
    background: '#FFFFFF',
    borderRadius: '2px',
    display: 'flex',
    position: 'relative',
    overflow: 'overlay',
    justifyContent: 'center',
    paddingBottom: '100px',
  },
  close: {
    position: 'absolute',
    right: 22,
    top: 19,
    cursor: 'pointer',
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
    marginBottom: '8px',
  },
  managers__title: {
    fontSize: '20px',
    lineHeight: '27px',
    letterSpacing: '0.2px',
    color: '#21272E',
    fontWeight: 500,
  },
  plus: {
    fontSize: '24px',
    marginRight: '8px',
    fontWeight: 'lighter',
  },
  XeroContent: {
    width: '600px',
    height: '176px',
    marginTop: '50px',
    textAlign: 'center',
  },
  Title: {
    fontSize: '24px',
    lineHeight: '24px',
    color: '#494c61',
    textAlign: 'center',
    marginBottom: '24px',
    marginTop: '14px',
    fontWeight: 500,
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
    marginTop: '10px',
    justifyContent: 'center',
  },
});
export default AdminPage;
