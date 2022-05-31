import React, {
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import CloseIcon from '@/Components/common/icons/CloseIcon';
import useInput from '@/Components/hooks/useInput';
import useToggle from '@/Components/hooks/useToggle';
import Button from '@/Components/common/Button';
import Header from '@/Components/Header';
import { makeStyles } from '@material-ui/styles';
import useOnClickOutside from '@/Components/hooks/useOnClickOutside';
import {
  clearCompanyInfo,
  clearCreateCompanyError,
  createAdmin,
  deleteCSVAction,
  downloadCSVAction,
  getCompanyInfo,
  getCSV,
  postCSVFile, setIsLoading,
} from '@/store/actions/company';
import {
  selectCompanyInfo,
  selectCreateCompanyError,
  selectCSVInfo,
  selectIsCloseModal,
  selectIsLoading,
  selectIsSuccess,
  selectIsSuccessCSV,
} from '@/store/selectors/company';
import { selectUserInfo } from '@/store/selectors/user';
import { User } from '@/api/main-protected';
import Managers from '@/Components/Managers';
import InvalidDataPopup from '@/Components/InvalidDataPopup';
import Loader from '@/Components/Loader';
import AndroidIcon from '@/Components/common/icons/AndroidIcon';
import IOSIcon from '@/Components/common/icons/IOSIcon';
import WindowsIcon from '@/Components/common/icons/WindowsIcon';
import CloudIcon from '@/Components/common/icons/CloudIcon';
import Circle from '@/Components/common/icons/Circle';
import CheckCircle from '@/Components/common/icons/CheckCircle';
import TrashIcon from '@/Components/common/icons/TrashIcon';
import UploadIcon from '@/Components/common/icons/UploadIcon';
import PopConfirm from '@/Components/PopConfirm';
import LoaderDots from '@/Components/LoaderDots';
import Popup from '@/Components/Popup';
import { clearIsEmailInvalid, isInvalidDataClear } from '@/store/actions/login';
import axios from 'axios';
import TokensLocalStorage from '@/local-storage/TokensLocalStorage';
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';
import LoadingCsv from '@/Components/LoadingCsv';
import user from '@/store/reducers/user';

interface Props extends RouteComponentProps<{
  companyId:string
  companyName: string
}> {}

const ProjectPage:React.FC<Props> = ({ match }) => {
  const { companyId, companyName } = match.params;
  const classes = useStyles();

  const [modal, setModal] = useState(false);
  const [modalCSV, setModalCSV] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [fileArr, setFileArr] = useState<any>(null);
  const [invalidEmailText, setInvalidEmailText] = useState<string>('Email is invalid');
  const [popup, setPopup] = useState(false);
  const [uploadCsv, setEditCSV] = useState<boolean>(false);
  const [deleteCsv, setDeleteCSV] = useState<boolean>(false);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [downloadCsv, setDownloadCsv] = useState<boolean>(false);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [isLoadingCsv, setIsLoadingCsv] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isChangeSuccess, toggleIsChangeSuccess] = useToggle();
  const [isChangeSuccessCSV, toggleIsChangeSuccessCSV] = useToggle();

  const [email, setEmail] = useInput();
  const [name, setName] = useInput();

  const InvalidDataMessage = useSelector(selectCreateCompanyError);
  const csvInfo = useSelector(selectCSVInfo);
  const isLoading = useSelector(selectIsLoading);

  const [isNameEmpty, toggleIsNameEmpty] = useToggle();
  const [isEmailInvalid, toggleIsEmailInvalid] = useToggle();

  const CompanyInfo = useSelector(selectCompanyInfo);
  const user = useSelector(selectUserInfo);
  const isSuccess = useSelector(selectIsSuccess);
  const isSuccessCSV = useSelector(selectIsSuccessCSV);
  const isCloseModal = useSelector(selectIsCloseModal);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoadingCsv(false);
    dispatch(setIsLoading(false));
    setProgress(0);
    dispatch(getCompanyInfo(Number(companyId)));
    dispatch(getCSV(Number(companyId)));
    return () => { dispatch(clearCompanyInfo()); };
  }, []);

  useEffect(() => {
    let timer: any;

    if (popup) {
      timer = setTimeout(() => {
        setPopup(false);
        dispatch(clearIsEmailInvalid());
        dispatch(isInvalidDataClear());
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [popup]);

  function validateEmail(email:string) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(() => {
    if (InvalidDataMessage) setPopup(true);
  }, [InvalidDataMessage]);

  useEffect(() => {
    toggleIsChangeSuccess(isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    setModal(false);
    setModalCSV(false);
  }, [isCloseModal]);

  useEffect(() => {
    toggleIsChangeSuccessCSV(isSuccessCSV);
  }, [isSuccessCSV]);
  useEffect(() => {
    if (progress === 100) {
      setIsLoadingCsv(false);
      setProgress(0);
    }
  }, [progress]);

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

  const handleOpenCSVModal = () => {
    setProgress(0);
    setModalCSV(true);
  };
  const handleOpenAddManagerModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleCloseCSVModal = () => {
    setModalCSV(false);
  };

  const modalRef = useOnClickOutside(() => {
    setModal(false);
  });

  const modalRefCSV = useOnClickOutside(() => {
    setModalCSV(false);
  });

  const handleSubmitCSV = (file:any) => {
    setIsLoadingCsv(true);
    setFileArr(null);
    const reader = new FileReader();
    const fileR = file[0];

    reader.onloadend = () => {
      setFile(fileR);
    };
    reader.readAsDataURL(fileR);
    const formData = new FormData();
    formData.append('files', fileR);
    const storage = TokensLocalStorage.getInstance();
    setFileLoading(true);

    axios.post(`${process.env.BASE_URL}/project/${companyId}/upload-csv`, formData, {
      headers: {
        authorization: `Bearer ${storage.getAccessToken()}`,
      },
      onUploadProgress: (ProgressEvent) => {
        setProgress(ProgressEvent.loaded / ProgressEvent.total * 100);
      },
    });
  };
  useEffect(() => {
    if (progress === 100) {
      dispatch(getCSV(Number(companyId)));
      dispatch(getCompanyInfo(Number(companyId)));
      setTimeout(() => {
        setModalCSV(false);
        setFileLoading(false);
      }, 2000);
    }
  }, [progress, fileLoading]);

  const handleCSVChange = (e:any) => {
    const file = e.target.files[0];
    setIsLoadingCsv(true);
    setFileArr(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file);
    };
    const storage = TokensLocalStorage.getInstance();
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('files', file);
    setFileLoading(true);
    axios.post(`${process.env.BASE_URL}/project/${companyId}/upload-csv`, formData, {
      headers: {
        authorization: `Bearer ${storage.getAccessToken()}`,
      },
      onUploadProgress: (ProgressEvent) => {
        setProgress(ProgressEvent.loaded / ProgressEvent.total * 100);
      },
    });
  };

  const handleCreateManager = () => {
    if (!name) toggleIsNameEmpty(true);
    if (!email) toggleIsEmailInvalid(true);

    if (!name
        || isEmailInvalid) return;

    if (user && CompanyInfo) {
      if (validateEmail(email)) {
        dispatch(createAdmin(CompanyInfo.project.id,
          email,
          name,
          uploadCsv,
          downloadCsv,
          deleteCsv));
        setTimeout(() => {
          setDeleteCSV(false);
          setEditCSV(false);
          setDownloadCsv(false);
        }, 5000);
      } else {
        setPopup(true);
        setInvalidEmailText('Incorrect email');
      }
    }
  };
  const handleDeletePopup = () => {
    setDeletePopup(true);
  };
  const closeConfirm = () => {
    setDeletePopup(false);
  };
  const confirmDelete = () => {
    dispatch(deleteCSVAction(Number(companyId)));
    setDeletePopup(false);
  };

  const handleDownloadCSV = (path:any) => {
    const pathToCsv = path.split('storage')[1];
    window.open(`${process.env.BASE_URL}/${pathToCsv}`, '_blank')!.focus();
  };
  return (
    <>
      { !CompanyInfo || !user ? <Loader /> : (
        <>
          <div className={classes.container}>
            <div className={classes.error}>

              {
                  popup ? <InvalidDataPopup text={InvalidDataMessage || invalidEmailText} /> : null
                }
            </div>
            <div className={classes.wrapper}>
              <div className={classes.content}>
                <Header user={user} />
                <div className={classes.content__wrapper}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className={classes.companyName}>
                        {companyName}
                      </div>
                    </div>
                    {
                      user.role === 'customer' ? (
                        <div className={classes.button}>
                          <Button
                            onClick={handleOpenAddManagerModal}
                            height="32px"
                            fontSize={12}
                            fontWeight={600}
                            flexDirection="row-reverse"
                          >
                            ADD MEMBER
                            <span className={classes.plus}>+</span>
                          </Button>
                        </div>
                      ) : null
                    }
                  </div>
                  <div className={classes.managers}>
                    <div className={classes.xero__title}>
                      Dictionary
                    </div>
                  </div>
                  {
                    !csvInfo ? (
                      <div className={classes.drop}>
                        <div className={classes.noManagerWrapper}>
                          {
                            !fileArr && CompanyInfo.users.map((userC) => ((user.email === userC.email && userC.uploadCsv)) && (
                              <FilesDragAndDrop
                                onUpload={(file:any) => handleSubmitCSV(file)}
                                count={1}
                                formats={['csv']}
                                containerStyles={{
                                  position: 'relative',
                                  width: '596px',
                                  height: '162px',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  border: '1px dashed',
                                }}
                                hoverMessageStyles={{ fontSize: '16px' }}
                                successTime={0}
                                openDialogOnClick
                                hoverText="Drop your file here"
                              >
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '162px',
                                  flexDirection: 'column',
                                }}
                                >
                                  {!fileArr && !isLoadingCsv && 'Upload or drop csv here'}
                                  {
                            isLoadingCsv && progress !== 100 && <LoadingCsv progress={progress} />
                                }
                                </div>
                              </FilesDragAndDrop>
                            ))
                          }
                          {
                          !fileArr && CompanyInfo.users.map((userC) => {
                            if (user.email === userC.email && !userC.uploadCsv) {
                              return (<h1>CSV file not uploaded yet</h1>);
                            }
                          })
                          }
                        </div>
                      </div>
                    ) : (
                      <div className={classes.CSVWrapper}>
                        <div className={classes.csv_wrapper}>
                          <div className={classes.csv_text}>
                            name:
                            {' '}
                            {
                              CompanyInfo.project.pathToCsv
                                ? CompanyInfo.project.pathToCsv && CompanyInfo.project.pathToCsv
                                  .split('/')[3] : null
                            }
                          </div>
                          <div
                            className={classes.csv_text}
                            style={{ paddingTop: '11px' }}
                          >
                            date:
                            {' '}
                            {
                               CompanyInfo.project.pathToDictionary
                                 ? new Date(Number(CompanyInfo.project.pathToDictionary
                                   .split('/')[2])).toLocaleDateString('en-US') : null
                             }
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {
                            CompanyInfo.users.map((userC) => {
                              if (userC.email === user.email && userC.uploadCsv) {
                                return (
                                  <>
                                    <label htmlFor="upload-csv" className={classes.label} style={{ cursor: 'pointer' }}>
                                      {isLoadingCsv ? (
                                        <div className={classes.loader}>
                                          <div />
                                        </div>
                                      )
                                        : <UploadIcon />}
                                    </label>
                                    <input
                                      className={classes.InputCSV}
                                      type="file"
                                      onChange={(e) => handleCSVChange(e)}
                                      accept=".csv"
                                      id="upload-csv"
                                    />
                                  </>
                                );
                              }
                            })
                          }
                          {
                              CompanyInfo.users.map((userC) => user.email === userC.email && userC.deleteCsv && (
                              <>
                                <div style={{ padding: '15px 15px', borderLeft: '1px solid #E0E1E2' }} onClick={handleDeletePopup}>

                                  {isLoading ? (
                                    <div className={classes.loader}>
                                      <div />
                                    </div>
                                  )
                                    : <TrashIcon />}
                                </div>

                              </>
                              ))
                            }
                          <PopConfirm
                            position="bottom"
                            text="Are you sure delete this CSV?"
                            closeConfirm={closeConfirm}
                            confirm={deletePopup}
                            confirmDelete={confirmDelete}
                            hide={closeConfirm}
                          />
                          {
                            CompanyInfo.users.map((userC, index) => (user.email === userC.email && userC.downloadCsv ? (
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '11px',
                                textAlign: 'center',
                                padding: '5px',
                                borderLeft: '1px solid #E0E1E2',
                              }}
                              >
                                <div style={{ padding: '5px' }}>
                                  Download for:
                                </div>
                                <div className={classes.Icons}>
                                  <div className={classes.iconWrapp}>
                                    <AndroidIcon />
                                  </div>
                                  <div
                                    className={classes.iconWrapp}
                                    onClick={() => handleDownloadCSV(CompanyInfo.project.pathToCsv)}
                                  >
                                    <IOSIcon />
                                  </div>
                                  <div className={classes.iconWrapp}>
                                    <WindowsIcon />
                                  </div>
                                  <div className={classes.iconWrapp}>
                                    <CloudIcon />
                                  </div>
                                </div>
                              </div>
                            ) : null))
                          }
                        </div>

                      </div>
                    )
                  }
                  <div className={classes.managers}>
                    <div className={classes.managers__title}>
                      Users
                    </div>

                  </div>

                  <div>
                    <div className={classes.xeroMain}>
                      {
                      CompanyInfo.users.map((userC: User) => {
                        if (CompanyInfo.users.length === 1 && userC.role === 'customer') {
                          return (
                            <div className={classes.noManager}>
                              <div className={classes.noManagerWrapper}>
                                <div className={classes.noManager__text}>
                                  You don’t have users
                                </div>
                                <div className={classes.button}>
                                  <div
                                    className={classes.addManager}
                                    onClick={handleOpenAddManagerModal}
                                  >
                                    ADD USER
                                  </div>
                                </div>

                              </div>
                            </div>
                          );
                        }
                      })
                        }
                      {
                        CompanyInfo.users.length > 1 && CompanyInfo.users.map((userC) => {
                          if (userC.role === 'customer') {
                            return;
                          }
                          return (
                            <Managers key={userC.id} admins={userC} companyId={companyId} />

                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Popup
            isActive={isChangeSuccess}
            text="User has been created"
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
          <Popup
            isActive={isChangeSuccessCSV}
            text="CSV was upload"
            style={{
              maxWidth: '520px',
              width: 'calc(100% - 32px)',
              position: 'fixed',
            }}
            bottom={86}
            padding={16}
            autoClose={2000}
            hide={toggleIsChangeSuccessCSV}
          />
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
                      Add new user
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
                    <div style={{ display: 'flex', paddingTop: '30px' }}>Permissions:</div>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }} onClick={() => setEditCSV(!uploadCsv)}>
                      {
                        uploadCsv ? <CheckCircle /> : <Circle />
                      }
                      <span style={{ paddingLeft: '5px' }}>
                        Upload csv
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }} onClick={() => setDownloadCsv(!downloadCsv)}>
                      {
                        downloadCsv ? <CheckCircle /> : <Circle />
                      }
                      <span style={{ paddingLeft: '5px' }}>
                        Download csv
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }} onClick={() => setDeleteCSV(!deleteCsv)}>
                      {
                        deleteCsv ? <CheckCircle /> : <Circle />
                      }
                      <span style={{ paddingLeft: '5px' }}>
                        Delete csv
                      </span>
                    </div>
                    <div className={classes.Button}>
                      <Button
                        disabledOnly={!name || !email}
                        onClick={handleCreateManager}
                        height="40px"
                        fontSize={15}
                        fontWeight={600}
                      >
                        {isLoading ? <LoaderDots /> : 'Next'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {modalCSV ? (
            <div
              className={classes.container__modal}
            >
              <div ref={modalRefCSV}>
                <div className={classes.CSV_modal_wrapper}>
                  <div
                    className={classes.close}
                    onClick={handleCloseCSVModal}
                  >
                    <CloseIcon color="#21272e" />
                  </div>

                  <div className={classes.XeroContent}>
                    <h1 className={classes.Title}>
                      Upload your file here
                    </h1>
                    <form onSubmit={(e) => handleSubmitCSV(e)}>

                      <div className={classes.labelWrapp}>
                        <label htmlFor="upload-csv" className={classes.label}>Browse...</label>
                        <div style={{ fontSize: '12px' }}>{file ? file.name : 'file name'}</div>
                        <input
                          className={classes.InputCSV}
                          type="file"
                          onChange={(e) => handleCSVChange(e)}
                          accept=".csv"
                          id="upload-csv"
                        />
                      </div>
                      <div style={{ position: 'relative', paddingTop: '50px' }}>
                        <div style={{ fontSize: '12px' }}>{`${Math.floor(progress)}%`}</div>
                        <div style={{
                          width: `${progress}%`,
                          position: 'absolute',
                          top: '67px',
                          height: '7px',
                          backgroundColor: 'rgb(24, 144, 255)',
                        }}
                        />
                        <div style={{
                          width: '100%',
                          height: '7px',
                          backgroundColor: '#ccc',
                          marginTop: '5px',
                        }}
                        />
                      </div>
                      <div className={classes.ButtonCSV}>
                        <Button
                          disabledOnly={!file}
                          type="submit"
                          onClick={(e:any) => handleSubmitCSV(e)}
                          height="40px"
                          fontSize={15}
                          fontWeight={600}
                        >
                          {fileLoading ? <LoaderDots /> : 'Upload file'}
                        </Button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>

      )}
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
  drop: {
    border: '1px solid #E0E1E2',
    cursor: 'pointer',
    height: '162px',
    display: 'flex',
    background: '#FBFBFB',
    marginTop: '8px',
    alignItems: 'center',
    borderRadius: '2px',
    justifyContent: 'center',
    textDecoration: 'none',
    width: '596px',
  },
  fileUpload: {

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
  Icons: {
    display: 'flex',
  },
  iconWrapp: {
    padding: '2px',
  },
  CSVWrapper: {
    border: '1px solid #E0E1E2',
    cursor: 'pointer',
    height: '54px',
    display: 'flex',
    background: '#FBFBFB',
    marginTop: '8px',
    alignItems: 'center',
    borderRadius: '2px',
    justifyContent: 'space-between',
    textDecoration: 'none',
    width: '596px',
  },
  Developer: {
    padding: '10px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  DeveloperActive: {
    border: '1px solid #ccc',
    padding: '10px',
    background: 'rgb(24, 144, 255)',
    color: 'white',
  },
  Editor: {
    padding: '10px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  EditorActive: {
    border: '1px solid #ccc',
    padding: '10px',
    background: 'rgb(24, 144, 255)',
    color: 'white',
  },
  Radio: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  imgPreview: {
    textAlign: 'center',
    height: '130px',
    width: '100%',
    border: '1px solid #E4E5E6',
    borderRadius: '2px',
    marginTop: '15px',
  },
  InputCSV: {
    opacity: 0,
    width: '344px',
    border: '1px solid #E0E1E2',
    boxSizing: 'border-box',
    borderRadius: '2px',
    padding: '16px',
    outline: 'none',
    marginBottom: '16px',
    display: 'none',
  },
  label: {
    boxSizing: 'border-box',
    borderRadius: '2px',
    padding: '13px',
    outline: 'none',
    textAlign: 'center',
    fontSize: '12px',
    borderLeft: '1px solid #E0E1E2',
  },
  labelWrapp: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E0E1E2',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
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
  csv_text: {
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.2px',
    textAlign: 'center',
    color: '#7d7f83',
  },
  noManagerWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    height: '54px',
    justifyContent: 'space-around',
  },
  csv_wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'self-start',
    flexDirection: 'column',
    padding: '8px',
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
    height: '550px',
    background: '#FFFFFF',
    borderRadius: '2px',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
  },
  CSV_modal_wrapper: {
    width: '648px',
    height: '400px',
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
  ButtonCSV: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  Button: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '38px',
  },
  close: {
    position: 'absolute',
    right: 22,
    top: 19,
    cursor: 'pointer',
  },
  xeroMain: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'self-end',
  },
});

export default ProjectPage;
