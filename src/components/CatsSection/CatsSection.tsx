import styled from "styled-components";
import Container from "../Container/Container";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import { useState } from "react";

const CatsSectionWrapper = styled.div`
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--color-white);
`;

const CatsSection = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const toggleAutoRefresh = (state: boolean) => {
    // TODO
  }

  return (
    <section>
      <Container>
        <CatsSectionWrapper>
          <Checkbox label="Enabled" defaultChecked onStateChange={setIsEnabled} />
          <Checkbox label="Auto-refresh every 5 seconds" onStateChange={toggleAutoRefresh} />
          {isEnabled &&
            <>
              <Button>Get cat</Button>
            </>
          }
        </CatsSectionWrapper>
      </Container>
    </section>
  )
}

export default CatsSection;