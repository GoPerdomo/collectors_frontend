import React from 'react';
import styled from 'styled-components';


// ========== Styled Components ==========
const Logo = styled.img`
  height: 130px;
`

// ============== Component ==============
export default () => (
  <div>
    <Logo src="/img/logo-vertical-reverse.png" alt="Collectors Hut Logo" />
  </div>
);
