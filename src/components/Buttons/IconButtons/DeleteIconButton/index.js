import React from 'react';
import styled from 'styled-components';

import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import bp from '../../../../helpers/breakpoints';


// ========== Styled Components ==========
const Wrapper = styled.div`
  @media (max-width: ${bp.breakFour}) {
    position: relative;
    right: 35px;
  }
  @media (max-width: ${bp.breakEight}) {
    position: static;
  }
`

// ========= Material-UI Styles =========
const baseStyle = {
  width: "36px",
  height: "36px",
  padding: "0",
};

const iconStyle = {
  borderRadius: "50px",
  width: "36px",
  height: "36px",
  padding: "0",
};

// ============== Component ==============
export default ({ handleClick }) => (
  <Wrapper>
    <IconButton
      onClick={handleClick}
      iconStyle={iconStyle}
      style={baseStyle}
    >
      <ActionDelete
        color="#FFFFFF"
        hoverColor="#EBEBEB"
        viewBox="1 1 22 22"
      />
    </IconButton>
  </Wrapper>
);
