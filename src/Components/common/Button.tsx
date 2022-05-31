import React, { FC } from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  height: string | number,
  onClick?: any
  fontSize: number,
  disabledOnly?: boolean,
  fontWeight: number,
  flexDirection?: string,
  color?: string,
  width?:string
}

const useStyles = makeStyles<Theme, Props>({
  root: {},
  button: {
    height: (props) => props.height,
    borderRadius: '2px',
    border: 'solid 1px #e0e1e2',
    backgroundColor: '#fbfbfb',
    fontSize: (props) => props.fontSize,
    fontWeight: (props) => props.fontWeight,
    color: (props) => props.color,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: (props) => (props.flexDirection ? 'row-reverse' : 'row'),
    padding: '0 12px',
    whiteSpace: 'pre',
    lineHeight: '15px',
  },
});

const Button:FC<Props> = (props) => {
  const {
    height, onClick, children, fontSize, fontWeight, flexDirection, disabledOnly, color,
  } = props;
  const stylesProps = {
    height, fontWeight, fontSize, flexDirection, disabledOnly, color,
  };
  const classes = useStyles(stylesProps as Props);
  // const isLoading = useSelector(selectIsLoading);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes.button}
      disabled={disabledOnly}
    >
      {children}
    </button>
  );
};

export default Button;
