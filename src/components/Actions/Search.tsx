import React, { useState, useEffect, ReactElement } from 'react';
import { FluidObject } from 'gatsby-image';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fuse from 'fuse.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';
import SearchListItem from './SearchListItem';
import { GridWrapper } from '../Navigator/List';
import useSearchData from '../../hooks/SearchQuery';

const options = {
  // isCaseSensitive: false,
  // includeScore: true,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.5,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: [
    'node.frontmatter.title',
    'node.excerpt',
    'node.frontmatter.subTitle',
    'node.frontmatter.category',
  ],
};

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

type SearchResultType = {
  item: {
    node: {
      id: string;
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        subTitle?: string;
        date?: string;
        category?: string;
        cover?: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
    };
  };
};

const SearchDialog = (): ReactElement => {
  const data = useSearchData();
  const fuse = new Fuse(data.allMdx.edges, options);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<'paper' | 'body' | undefined>('paper');
  const [query, updateQuery] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (scrollType: 'paper' | 'body' | undefined) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
    updateQuery('');
  }

  function onSearch(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    updateQuery(event.currentTarget.value);
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

  const results = fuse.search(query);

  return (
    <div>
      <IconButton
        aria-label="Search"
        onClick={handleClickOpen('paper')}
        data-shape="closed"
        title="Search"
        className="iconButton"
      >
        <SearchIcon />
      </IconButton>
      <StyledDialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen={fullScreen}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Search by fuse.js</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              variant="outlined"
              fullWidth
              autoFocus
              helperText="fuzzy searching"
              value={query}
              onChange={onSearch}
              autoComplete="off"
            />
            <GridWrapper>
              {results &&
                results.map((post: SearchResultType) => (
                  <SearchListItem
                    key={post.item.node.id}
                    title={post.item.node.frontmatter.title}
                    subTitle={post.item.node.frontmatter.subTitle}
                    excerpt={post.item.node.excerpt}
                    date={post.item.node.frontmatter.date}
                    slug={post.item.node.fields.slug}
                    cover={post.item.node.frontmatter.cover}
                    linkOnClick={handleClose}
                  />
                ))}
            </GridWrapper>
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

export default SearchDialog;
