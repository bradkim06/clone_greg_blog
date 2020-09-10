import React, { useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import FormatSizeIcon from "@material-ui/icons/FormatSize";

type FontSetterProps = {
  increaseFont: (val: number) => void;
};

const FontSetter = ({ increaseFont }: FontSetterProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef: any = React.useRef(null);

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
    const val = (event.target as any).innerText.replace("%", "");
    const factor = +val / 100;
    increaseFont(factor);

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default FontSetter;
