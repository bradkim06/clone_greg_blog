import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Fuse from "fuse.js";
import SearchListItem from "./SearchListItem";
import styled from "styled-components";

type allMdxProps = {
  allMdx: {
    edges: Array<{
      node: {
        fields: {
          slug: string;
        };
        frontmatter: {
          title: string;
          subTitle?: string;
          category?: string;
        };
      };
    }>;
  };
};

const SearchDialog = () => {
  const data: allMdxProps = useSearchData();
  const fuse = new Fuse(data.allMdx.edges, options);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<"paper" | "body" | undefined>("paper");
  const [query, updateQuery] = useState("");

  const handleClickOpen = (scrollType: "paper" | "body" | undefined) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
    updateQuery("");
  }

  function onSearch(event: any) {
    updateQuery(event.currentTarget.value);
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

  const results = fuse.search(query);

  return (
    <div>
      <IconButton
        aria-label="Search"
        onClick={handleClickOpen("paper")}
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
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Search by fuse.js</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
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
              autoFocus={true}
              helperText="fuzzy searching"
              value={query}
              onChange={onSearch}
              autoComplete="off"
            />
            {results &&
              results.map((post: any) => (
                <SearchListItem
                  title={post.item.node.frontmatter.title}
                  subTitle={post.item.node.frontmatter.subTitle}
                  slug={post.item.node.fields.slug}
                  linkOnClick={handleClose}
                />
              ))}
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
    "node.frontmatter.title",
    "node.frontmatter.subTitle",
    "node.frontmatter.category"
  ]
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paperFullWidth {
    background-color: ${props => props.theme.search.colors.background};
  }
`;

const useSearchData = () => {
  let searchData = useStaticQuery(
    graphql`
      query SearchData {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                subTitle
                category
              }
            }
          }
        }
      }
    `
  );
  return searchData;
};

export default SearchDialog;