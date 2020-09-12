import React, { useEffect, useRef, useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import styled from "styled-components";

type CategoryFilterProps = {
  categories: string[];
  filterCategory: (val: string) => void;
};

export default ({ categories, filterCategory }: CategoryFilterProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef: any = useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event: React.MouseEvent<Document>) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }

  function handleSetting(event: React.MouseEvent<HTMLElement>) {
    const category: string = (event.target as any).innerText.trim();
    filterCategory(category);

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <FilterWrapper>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        aria-label="categoryOpen"
        className="categoryOpen"
      >
        <FilterListIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem key="all" onClick={handleSetting}>
                    all posts
                  </MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} onClick={handleSetting}>
                      {category}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </FilterWrapper>
  );
};

const FilterWrapper = styled.nav`
  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
  }
  .categoryOpen {
    color: ${props => props.theme.bars.colors.icon};
  }
`;
