import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TocIcon from '@material-ui/icons/Toc';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';
import loadable from '@loadable/component';
import TocLists from './TocLists';
import { ReduxState, CurrentPostProps } from '../../state/store';

const TocTitle = styled(DialogTitle)`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;

  ${props => {
    const { base } = props.theme;
    return css`
      color: ${base.colors.palette.second};
    `;
  }}
`;

const StyledDialog = styled(Dialog)`
  ${props => {
    const { search } = props.theme;
    return css`
      .MuiDialog-paperFullWidth {
        background-color: ${search.colors.background};
      }
    `;
  }}
`;

const Toc = () => {
  const data = useSelector<ReduxState, CurrentPostProps>(
    state => state.currentPost,
  );

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<'paper' | 'body' | undefined>('paper');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = (scrollType: 'paper' | 'body' | undefined) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }

  const descriptionElementRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <IconButton
        aria-label="Search"
        onClick={handleClickOpen('paper')}
        data-shape="closed"
        title="Search"
        className="iconButton"
      >
        <TocIcon />
      </IconButton>
      {data.mdx && (
        <StyledDialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullScreen={fullScreen}
          maxWidth="md"
        >
          <TocTitle id="scroll-dialog-title" disableTypography>
            {data.mdx.frontmatter.title}
          </TocTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <TocLists
                toc={data.mdx.tableOfContents}
                linkOnClick={handleClose}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </StyledDialog>
      )}
    </>
  );
};

export default loadable(async () => Toc);
