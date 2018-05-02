import React from 'react';
import styled from 'styled-components';

// ========== Styled Components ==========
const SearchItem = styled.img`
  height: 160px;
  max-width: 235px;
  object-fit: cover;
  object-position: center;
`

// ============== Component ==============
export default ({ photo, name }) => (
  <SearchItem src={photo} alt={`Preview of ${name}`}  />
);