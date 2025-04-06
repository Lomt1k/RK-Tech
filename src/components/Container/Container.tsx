import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 80px;

  @media (max-width: 1439px) {
    padding: 0 40px;
  }

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

type ContainerProps = {
  children?: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}

export default Container;