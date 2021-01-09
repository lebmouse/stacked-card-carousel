import React from "react";
import "./styles.css";
import styled from "styled-components";
import List from "./List";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, #9c1aff 0%, rgb(119, 0, 255) 100%);
`;

export default function App() {
  return (
    <Container>
      <List />
    </Container>
  );
}
