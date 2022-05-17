import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useInput from '@/Components/hooks/useInput';
import InvalidDataPopup from '@/Components/InvalidDataPopup';
import styled from 'styled-components';
import Button from '@/Components/common/Button';
import { clearIsEmailInvalid, isInvalidDataClear, login } from '@/store/actions/login';
import { selectInvalidDataMessage, selectIsInvalidData, selectIsLoggedIn } from '@/store/selectors/login';

const LoginPage = () => {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const dispatch = useDispatch();
  const history = useHistory();
  const [popup, setPopup] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isInvalidData = useSelector(selectIsInvalidData);
  const InvalidDataMessage = useSelector(selectInvalidDataMessage);

  useEffect(() => {
    if (isLoggedIn) history.push('/');
  }, [isLoggedIn]);

  useEffect(() => {
    if (isInvalidData) setPopup(true);
  }, [isInvalidData]);

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
  const handleSubmit = () => {
    dispatch(login(email, password));
  };

  return (
    <Root>
      <Popup>
        {
          popup ? <InvalidDataPopup text={InvalidDataMessage} /> : null
        }
      </Popup>
      <div>
        <LoginWrapper>
          <LoginContent>
            <Title>Log in</Title>
            <Input
              type="text"
              placeholder="Email"
              required
              onChange={setEmail}
              autoComplete="on"
            />
            <Input2
              type="password"
              placeholder="Password"
              required
              onChange={setPassword}
              autoComplete="on"
            />
            <Warning>
              By clicking “login” you will receive a link for your
              mail.
              {' '}
              <br />
              {' '}
              Check all your holders.
            </Warning>
            <ButtonWrapper>
              <Button
                onClick={handleSubmit}
                disabledOnly={!email || !password}
                height={40}
                fontSize={15}
                fontWeight={600}
              >
                Next
              </Button>
            </ButtonWrapper>
          </LoginContent>
        </LoginWrapper>
      </div>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 67px;
  flex-direction: column;
  position: relative;
`;

const LoginWrapper = styled.div`
  background: #fff;
  border-right: 10px;
  padding: 100px 100px 250px 100px;
  display: flex;
  justify-content: center;
`;

const LoginContent = styled.div`
  width: 344px;
  height: 176px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #21272e;
`;

const Popup = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  height: 30px;
  top: 0;
`;

const Input = styled.input`
  width: 344px;
  height: 50px;
  border: 1px solid #E0E1E2;
  box-sizing: border-box;
  border-radius: 2px;
  margin-top: 46px;
  padding: 16px;
  outline: none;
  &::placeholder{
    font-size: 14px;
    color: #b4babe;
  }
`;
const Input2 = styled.input`
  width: 344px;
  height: 50px;
  border: 1px solid #E0E1E2;
  box-sizing: border-box;
  border-radius: 2px;
  margin-top: 16px;
  padding: 16px;
  outline: none;
  &::placeholder{
    font-size: 14px;
    color: #b4babe;
  }
`;

const Warning = styled.p`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: #737B7D ;
  padding-top: 15px;
  text-align: left;
  margin-bottom: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default LoginPage;
