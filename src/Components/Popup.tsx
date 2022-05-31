import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { HandleToggle } from '@/Components/hooks/useToggle';
import { useDispatch } from 'react-redux';
import { setIsSuccess } from '@/store/actions/company';

interface Props {
  text: string;
  isActive: boolean;
  style: any;
  autoClose?: number;
  padding?: number;
  bottom?: number;
  hide: HandleToggle;
}

const Popup: React.FC<Props> = ({
  isActive,
  text,
  style,
  autoClose = 1000,
  padding = 24,
  bottom,
  hide,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      hide(false);
      dispatch(setIsSuccess(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <CSSTransition
      in={isActive}
      timeout={autoClose}
      unmountOnExit
    >
      <CustomToast
        style={style}
        padding={padding}
        bottom={bottom}
      >
        <Text>{text}</Text>
      </CustomToast>
    </CSSTransition>
  );
};

const CustomToast = styled.div<{ padding: number; bottom: number | undefined }>`
  width: ${({ padding }) => `calc(100% - ${padding * 2}px)`};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: 552px;
  height: 48px;
  padding: 0 16px;
  box-shadow: 0 8px 19px -6px rgba(0, 41, 41, 0.6);
  border-radius: 2px;
  border: solid 1px #e0e1e2;
  background-color: #fbfbfb;
  display: flex;
  align-items: center;
  text-align: center;
  bottom: ${({ bottom }) => bottom && `${bottom}px`};

  &.enter {
    opacity: 0;
  }
  &.enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.exit {
    opacity: 1;
  }
  &.exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }

  @media screen and (min-width: 552px) {
    bottom: ${({ bottom }) => bottom && `${bottom}px`};
  }

`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
`;

export default Popup;
