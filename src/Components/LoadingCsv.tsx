import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
// import { selectIsLoading, selectIsResolved, selectSuccessText } from '@/store/selectors/loader';

type Props = {
  progress: number
};

const Loader:FC<Props> = ({ progress }) => {
  const [isShow, setIsShow] = useState(false);
  const classes = useStyles();
  // const isLoading = useSelector(selectIsLoading);
  // const isResolved = useSelector(selectIsResolved);
  // const text = useSelector(selectSuccessText);
  //
  // useEffect(() => {
  //   if (isResolved) setIsShow(true);
  // }, [isResolved]);

  useEffect(() => {
    let timer: any;

    if (isShow) {
      timer = setTimeout(() => {
        setIsShow(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [isShow]);

  return (
    <div className={classes.root}>
      <div className={classes.loaderWrapper}>
        <div className={classes.loader}>
          <div />
        </div>
        <div className={classes.progress} />
      </div>
    </div>
  );
};
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  loaderWrapper: {
    width: '140px',
    height: '29px',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '13px',
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
  progress: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.85)',
    whiteSpace: 'nowrap',
  },
});
export default Loader;
