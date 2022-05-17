import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@/Components/common/icons/HomeIcon';
import { logout } from '@/store/actions/login';
import { User } from '@/api/main-protected';

// import { ServerStatus, User } from '../store/reducers/user';

interface Props {
  user: User | null ;
}

const Header: React.FC<Props> = ({ user }:any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  const handleGoToMain = () => {
    history.push('/');
  };

  return (
    <EmailWrapper>
      {user ? (
        <Email onClick={handleGoToMain}>
          <HomeIconStyles>
            <HomeIcon />
          </HomeIconStyles>
          {`${user.name} | ${user?.email}`}
        </Email>
      ) : <div />}
      <LogOut onClick={handleLogout}>
        Logout
      </LogOut>
    </EmailWrapper>
  );
};

const EmailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 48px 24px 4px 24px;
  background-color: #f0f1f2;
`;

const Email = styled.div`
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const HomeIconStyles = styled.div`
  margin-right: 4px;
  width: 32px;
  height: 32px;
  background-color:rgba(0, 0, 0, 0.05) ;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogOut = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  color: #1890ff;
  cursor: pointer;
`;

export default Header;
