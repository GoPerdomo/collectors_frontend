import React from 'react';
import styled from 'styled-components';

import StandardButton from '../StandardButton';

import bp from '../../../helpers/breakpoints';

// ========== Styled Components ==========
const StyledStandardButton = styled(StandardButton) `
  & button {
    @media (max-width: ${bp.breakOne}) {
      line-height: 17px !important;
    }
    @media (max-width: ${bp.breakEight}) {
      line-height: 36px !important;
    }
 }
`

// ========= Material-UI Styles =========
const styles = {
  labelStyle: {
    display: "flex",
    padding: "2px 8px",
    color: "#6D8EAD",
  },
  backgroundColor: "#ffffff",
};

// ============== Component ==============
export default ({ handleClick }) => (
  <StyledStandardButton
    label="Edit Collection"
    labelStyle={styles.labelStyle}
    backgroundColor={styles.backgroundColor}
    handleClick={handleClick}
  />
);
