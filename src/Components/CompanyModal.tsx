import React, { FC, useEffect, useState } from 'react';
import Button from '@/Components/common/Button';
import { makeStyles } from '@material-ui/styles';
import useInput from '@/Components/hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import useToggle from '@/Components/hooks/useToggle';
import CloseIcon from '@/Components/common/icons/CloseIcon';
import { createCompany } from '@/store/actions/company';
import { selectCreateCompanyError, selectIsLoading, selectIsSuccess } from '@/store/selectors/company';
import InvalidDataPopup from '@/Components/InvalidDataPopup';
import LoaderDots from '@/Components/LoaderDots';

export type Props = {
  closeModal: () => void;
  modalRef:any;
  modal: any
};

const CreateCompanyModal:FC<Props> = ({
  closeModal, modalRef, modal,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isNameEmpty, toggleIsNameEmpty] = useToggle();
  const [isWorkSpaceEmpty, toggleIsWorkspaceEmpty] = useToggle();
  const [isReconciliationEmpty, toggleIsReconciliationEmpty] = useToggle();
  const [isAPIKeyEmpty, toggleIsAPIKeyEmpty] = useToggle();
  const isLoading = useSelector(selectIsLoading);
  const [name, setName] = useInput();

  const handleCreateManager = () => {
    dispatch(createCompany(name));
    modal(false);
  };
  return (
    <>
      <div
        className={classes.container__modal}
      >
        <div ref={modalRef}>
          <div className={classes.XeroWrapper}>
            <div
              className={classes.close}
              onClick={closeModal}
            >
              <CloseIcon color="#21272e" />
            </div>

            <div className={classes.XeroContent}>
              <h1 className={classes.Title}>
                Add new project
              </h1>
              <input
                type="text"
                className={classes.Input}
                placeholder="Project name"
                required
                onChange={setName}
              />
              <div className={classes.Button}>
                <Button
                  disabledOnly={!name}
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
    </>
  );
};
const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
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
    height: '375px',
    background: '#FFFFFF',
    borderRadius: '2px',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
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
    width: '344px',
    height: '176px',
    marginTop: '50px',
    textAlign: 'center',
  },
  Title: {
    fontSize: '24px',
    lineHeight: '24px',
    color: '#494c61',
    textAlign: 'center',
    marginBottom: '48px',
    marginTop: '14px',
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
    marginTop: '10px',
    justifyContent: 'center',
  },
});
export default CreateCompanyModal;
