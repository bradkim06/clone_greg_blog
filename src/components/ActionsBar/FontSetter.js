import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const propTypes = {
  increaseFont: PropTypes.func.isRequired,
};

function FontSetter({ increaseFont }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    const val = e.target.innerText.replace("%", "");
    const factor = +val / 100;
    increaseFont(factor);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FontSizeSetter>
      <List component="nav" aria-label="Device settings">
        <IconButton
          aria-label="Increase font size"
          aria-controls="lock-menu"
          aria-haspopup="true"
          onClick={handleClickListItem}
          title="Change font size"
          className="fontOpen"
        >
          <FormatSizeIcon />
        </IconButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </FontSizeSetter>
  );
}

const options = ["150%", "125%", "100%"];

const FontSizeSetter = styled.nav`
  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
  }

  .fontOpen {
    color: ${(props) => props.theme.bars.colors.icon};
  }
`;

FontSetter.propTypes = propTypes;
export default FontSetter;
