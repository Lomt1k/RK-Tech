import styled from "styled-components";
import Container from "../Container/Container";

const FooterWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 20px;
 padding-bottom: 10px;
`;

const FooterCopy = styled.a`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
`;

const Footer = () => {
  return (
    <footer>
      <Container>
        <FooterWrapper>
          <FooterCopy href='https://github.com/Lomt1k' target='_blank'>
            © Владимир Яшин
          </FooterCopy>
        </FooterWrapper>
      </Container>
    </footer>
  )
}

export default Footer;