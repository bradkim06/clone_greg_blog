import React, { useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import styled from "styled-components";

interface FontSetterProps {
  increaseFont: (val: number) => void;
}

function FontSetter({ increaseFont }: FontSetterProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef: any = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSetting = (event: React.MouseEvent<HTMLElement>) => {
    const val = (event.target as any).innerText.replace("%", "");
    const factor = +val / 100;
    increaseFont(factor);

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <FontSizeSetter>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        aria-label="fontOpen"
        className="fontOpen"
      >
        <FormatSizeIcon />
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
                  <MenuItem onClick={handleSetting}>150%</MenuItem>
                  <MenuItem onClick={handleSetting}>125%</MenuItem>
                  <MenuItem onClick={handleSetting}>100%</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </FontSizeSetter>
  );
}

const FontSizeSetter = styled.nav`
  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
  }
  .fontOpen {
    color: ${props => props.theme.bars.colors.icon};
  }
`;

export default FontSetter;