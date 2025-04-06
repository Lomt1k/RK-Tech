import Container from "../Container/Container";
import IconLogo from "../../assets/logo.svg?react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 padding-top: 10px;
 gap: 10px;
`;

const HeaderTitle = styled.span`
 color: var(--color-white);
 user-select: none;
`;

const Header = () => {
 return (
   <header>
     <Container>
       <HeaderWrapper>
         <IconLogo width={168} height={24} aria-hidden={true} />
         <HeaderTitle>Тестовое задание</HeaderTitle>
       </HeaderWrapper>
     </Container>
   </header>
 );
}

export default Header;
