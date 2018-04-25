import React from 'react';

import TextField from 'material-ui/TextField';

// ========== Styles ==========
const inputStyle = {
  padding: "0 .5em",
  boxSizing: 'border-box',
};

const borderStyle = {
  borderColor: "#FF6517",
};

// ========== Component ==========
export default ({ id, hintText, value, onChange, errorText }) => (
  <TextField
    id={id}
    hintText={hintText || "Password"}
    type="password"
    required
    fullWidth
    hintStyle={inputStyle}
    inputStyle={inputStyle}
    underlineFocusStyle={borderStyle}
    value={value}
    onChange={onChange}
    errorText={errorText}
  />
);
