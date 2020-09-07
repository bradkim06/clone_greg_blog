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
import Link from "gatsby-link";
import styled from "styled-components";

interface allMdxProps {
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
}

function SearchDialog() {
  const data: allMdxProps = useSearchData();
  const fuse = new Fuse(data.allMdx.edges, options);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<"paper" | "body" | undefined>("paper");
  const [query, updateQuery] = useState("");

  const handleClickOpen = (scrollType: "paper" | "body" | undefined) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    updateQuery("");
  };

  const onSearch = (event: any) => {
    updateQuery(event.currentTarget.value);
  };

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
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
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
                <SearchResult
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
      </Dialog>
    </div>
  );
}

interface SearchResultProps {
  title: string;
  subTitle?: string;
  slug: string;
  linkOnClick: () => void;
}

const SearchResult = ({
  title,
  subTitle,
  slug,
  linkOnClick
}: SearchResultProps) => {
  const titleName = JSON.stringify(title, null, 4);
  const subTitleName = JSON.stringify(subTitle, null, 4);
  const path = JSON.stringify(slug, null, 4);

  const movePage = () => {
    linkOnClick();
  };

  return (
    <SearchWrapper>
      <li>
        <StyledLink onClick={movePage} to={path.replace(/\"/g, "")}>
          <h2>{titleName.replace(/\"/g, "")}</h2>
          <small>
            {subTitleName !== "null" && subTitleName.replace(/\"/g, "")}
          </small>
        </StyledLink>
      </li>
    </SearchWrapper>
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

const SearchWrapper = styled.ul`
  margin: 0;

  & h3 {
  }

  & small {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  color: ${props => props.theme.navigator.colors.postsListItemLink};

  @media (hover: hover) {
    &:hover {
      color: ${props => props.theme.navigator.colors.postsListItemLinkHover};
      background-color: ${props => props.theme.base.colors.lines};
      & .pointer {
        border-radius: 65% 75%;
      }
    }
  }
`;

export default SearchDialog;

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