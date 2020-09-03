import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const propTypes = {
  increaseFont: PropTypes.func.isRequired,
};

function FontSetter({ categories, filterCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    const category = e.target.innerText.trim();
    filterCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FontSizeSetter>
      <List component="nav" aria-label="Device settings">
        <IconButton
          aria-label="Filter by category"
          aria-controls="lock-menu"
          aria-haspopup="true"
          onClick={handleClickListItem}
          title="Filter the list by category"
          className="categoryOpen"
        >
          <FilterListIcon />
        </IconButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          key="all"
          selected={0 === selectedIndex}
          onClick={(event) => handleMenuItemClick(event, 0)}
        >
          all posts
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem
            key={category}
            selected={index + 1 === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index + 1)}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>
    </FontSizeSetter>
  );
}

const FontSizeSetter = styled.nav`
  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
  }

  .fontOpen {
    color: ${(props) => props.theme.bars.colors.icon};
  }
`;

FontSetter.propTypes = propTypes;
export default FontSetter;
