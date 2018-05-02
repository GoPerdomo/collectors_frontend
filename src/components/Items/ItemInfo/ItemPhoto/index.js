import React from 'react';
import styled from 'styled-components';


// ========== Styled Components ==========
const ImageWrapper = styled.div`
  width: 48%;
  margin: 0 auto;

  & img {
    margin: auto;
  }
`

// ============== Component ==============
export default ({ photo, name }) => (
  <ImageWrapper className="item-photo">
    <img src={photo} alt={name} />
  </ImageWrapper>
);
