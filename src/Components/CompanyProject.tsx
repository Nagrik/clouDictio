import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';

import { Project, User } from '@/api/main-protected';
import GlobeIcon from '@/Components/common/icons/GlobeIcon';
import ArrowRightIcon from './common/icons/ArrowRightIcon';

export interface ManagersTypes {
  project: Project
}

const Managers:FC<ManagersTypes> = ({ project }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.manager}>
        <div className={classes.manager__wrapper}>
          <div className={classes.avatar}>
            <span className={classes.avatar__letter}><GlobeIcon /></span>
          </div>
          <div className={classes.manager__info}>
            <div className={classes.manager__name}>
              {project.name}
            </div>
          </div>
        </div>
        <div className={classes.arrow}>
          <ArrowRightIcon color="#494c61" />
        </div>
      </div>
    </>
  );
};
const useStyles = makeStyles({
  root: {},

  emailWrapper: {
    display: 'flex',
    justifyContent: 'end',
    backgroundColor: '#f0f1f2',
  },
  email: {
    height: '32px',
  },

  manager: {
    width: '596px',
    height: '54px',
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
  manager__wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    background: '#F0F0F0',
    border: '1px solid #E0E1E2',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '8px',
  },
  avatar__letter: {
    fontSize: '14px',
    lineHeight: '19px',
    marginLeft: '1px',
    textAlign: 'center',
    color: '#333333',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  manager__info: {
    display: 'flex',
    flexDirection: 'column',
  },
  manager__name: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#333333',
  },
  manager__email: {
    fontWeight: 600,
    fontSize: '11px',
    lineHeight: '15px',
    letterSpacing: '0.2px',
    color: '#7B7C7E',
  },
  arrow: {
    padding: '16px',
  },
});

export default Managers;
