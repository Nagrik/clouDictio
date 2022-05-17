import React, { FC } from 'react';
import DeleteIcon from '@/Components/common/icons/DeleteIcon';
import styled from 'styled-components';

type Props = {
  text: string | null
};

const InvalidDataPopup:FC<Props> = ({ text }) => (
  <Wrapper>
    <div>
      <DeleteIcon />
    </div>
    <Text>
      {text}
    </Text>
  </Wrapper>
);

export default InvalidDataPopup;

const Wrapper = styled.div`
  height: 42px;
  border-radius: 2px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;

const Text = styled.div`
  margin-left: 5px;
`;
