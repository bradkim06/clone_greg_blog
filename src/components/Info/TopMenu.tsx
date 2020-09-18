import React, { useEffect } from "react";
import { Link } from "gatsby";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled, { css } from "styled-components";
import { PagesProps } from "../Query/LayoutQuery";

type TopMenuProps = {
  pages: PagesProps;
  homeLinkOnClick: Function;
  pageLinkOnClick: Function;
};

export default ({ pages, homeLinkOnClick, pageLinkOnClick }: TopMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef: any = React.useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose() {
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
    <TopMenuWrapper>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        aria-label="fontOpen"
        className="fontOpen"
      >
        <MoreVertIcon />
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
                  <MenuItem
                    onClick={e => {
                      homeLinkOnClick(e);
                      handleClose();
                    }}
                  >
                    Home
                  </MenuItem>
                  {pages.edges.map(page => {
                    const { fields, frontmatter } = page.node;
                    return (
                      <Link
                        key={fields.slug}
                        to={fields.slug}
                        style={{ display: "block" }}
                      >
                        <MenuItem
                          onClick={e => {
                            pageLinkOnClick(e);
                            handleClose();
                          }}
                        >
                          {frontmatter.title}
                        </MenuItem>
                      </Link>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </TopMenuWrapper>
  );
};

const TopMenuWrapper = styled.div`
  float: right;
  margin: 5px 10px 0 0;

  ${props => {
    const { main, bars } = props.theme;
    return css`
      a {
        color: ${main.colors.title};
      }

      li {
        color: ${main.colors.title};
      }

      .MuiIconButton-root {
        color: ${bars.colors.icon};
      }
    `;
  }}
`;
