import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TocIcon from "@material-ui/icons/Toc";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import TocLists from "./TocLists";
import { ReduxState } from "../../state/store";
import { PostTemplateProps } from "../../templates/PostTemplate";

export default () => {
  const {
    mdx: {
      tableOfContents,
      frontmatter: { title }
    }
  } = useSelector<ReduxState, PostTemplateProps>(state => state.currentPost);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<"paper" | "body" | undefined>("paper");

  const handleClickOpen = (scrollType: "paper" | "body" | undefined) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement }: any = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <IconButton
        aria-label="Search"
        onClick={handleClickOpen("paper")}
        data-shape="closed"
        title="Search"
        className="iconButton"
      >
        <TocIcon />
      </IconButton>
      <StyledDialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <TocLists toc={tableOfContents} linkOnClick={handleClose} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paperFullWidth {
    background-color: ${props => props.theme.search.colors.background};
  }
`;
