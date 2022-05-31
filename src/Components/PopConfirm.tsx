import React, { FC } from 'react';
import useOnClickOutside from '@/Components/hooks/useOnClickOutside';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Project } from '@/api/main-protected';

export type Props = {
  position: string,
  text:string,
  closeConfirm: any;
  company?:Project;
  confirm:boolean;
  confirmDelete ?: () => void;
  hide: any;
};

const PopConfirm:FC<Props> = (props) => {
  const {
    closeConfirm, confirm, confirmDelete, text, position, hide,
  } = props;
  const classes = useStyles(props);
  const modalRef = useOnClickOutside(hide);
  return (
    <>
      {
                !confirm ? null : (
                  <div className={classes.root} ref={modalRef}>
                    <div className={position === 'bottom' ? classes.confirmDelete
                      : position === 'left' ? classes.confirmDeleteLeft
                        : position === 'company' ? classes.confirmDeleteCompany
                          : position === 'xero' ? classes.confirmDeleteXero
                            : position === 'admin' ? classes.admin
                              : classes.confirmDeleteCompany}
                    >
                      <div>
                        <div className={classes.confirmText}>
                          {text}
                        </div>
                        <div className={classes.confirmButtons}>
                          <button
                            className={classes.reject}
                            onClick={closeConfirm}
                            type="button"
                          >
                            No
                          </button>
                          <button type="button" className={classes.confirm} onClick={confirmDelete}>
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                )
            }
    </>
  );
};

export default PopConfirm;

const useStyles = makeStyles<Theme, Props>(({
  root: {
    position: 'relative',
  },
  confirmDelete: {
    width: '220px',
    height: '70px',
    background: '#FFFFFF',
    borderRadius: '2px',
    position: 'absolute',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    display: (props) => (props.confirm ? 'flex' : 'none'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    top: -130,
    right: -6,
    '&::before': {
      content: '""',
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '14px 14px 0 14px',
      borderColor: '#ffffff transparent transparent transparent',
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: '5px',
      position: 'absolute',
      top: 100,
      left: 206,
    },
  },
  confirmDeleteXero: {
    width: '220px',
    height: '70px',
    background: '#FFFFFF',
    borderRadius: '2px',
    position: 'absolute',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    display: (props) => (props.confirm ? 'flex' : 'none'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    top: -130,
    right: -60,
    '&::before': {
      content: '""',
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '14px 14px 0 14px',
      borderColor: '#ffffff transparent transparent transparent',
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: '5px',
      position: 'absolute',
      top: 100,
      left: 206,
    },
  },
  admin: {
    width: '210px',
    height: '74px',
    background: '#FFFFFF',
    borderRadius: '2px',
    padding: '16px',
    position: 'absolute',
    top: -65,
    left: 90,
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
      top: 50,
      left: -14,
    },
  },
  confirmDeleteCompany: {
    width: '220px',
    height: '70px',
    background: '#FFFFFF',
    borderRadius: '2px',
    position: 'absolute',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    top: -63,
    left: 85,
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
      top: 50,
      left: -14,
    },
  },
  confirmWrapper: {},
  confirmText: {
    fontSize: '14px',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.85)',
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
  confirmDeleteLeft: {
    width: '210px',
    height: '74px',
    background: '#FFFFFF',
    borderRadius: '2px',
    padding: '16px',
    position: 'absolute',
    top: -149,
    left: 90,
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
      top: 50,
      left: -14,
    },
  },
}));
