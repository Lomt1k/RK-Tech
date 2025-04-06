import styled from "styled-components";
import Container from "../Container/Container";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Cat, fetchRandomCat } from "../../api/Cat";

const CatsSectionWrapper = styled.div`
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background-color: var(--color-white);
`;

const ErrorText = styled.span`
  color: var(--color-error);
  text-align: center;
`;

const CatsSection = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [cat, setCat] = useState<Cat>();
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const intervalId = useRef<number | null>(null);

  const fetchNextCat = useCallback(async () => {
    if (!isEnabled) return;

    try {
      const cat = await fetchRandomCat();
      setCat(cat);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Не удалось загрузить котика :(");
    }
  }, [isEnabled]);

  useEffect(() => {
    if (isAutoRefresh) {
      intervalId.current = setInterval(fetchNextCat, 5000);
    } else if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [isAutoRefresh]);

  return (
    <section>
      <Container>
        <CatsSectionWrapper>
          <Checkbox label="Enabled" defaultChecked onStateChange={setIsEnabled} />
          <Checkbox label="Auto-refresh every 5 seconds" onStateChange={setIsAutoRefresh} />
          {isEnabled && (
            <>
              <Button onClick={fetchNextCat}>Get cat</Button>
              {error && <ErrorText>{error}</ErrorText>}
              {cat && <img src={cat.url} alt="Random cat image" width='100%' />}
            </>
          )}
        </CatsSectionWrapper>
      </Container>
    </section>
  );
};

export default CatsSection;