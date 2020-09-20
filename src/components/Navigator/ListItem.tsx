import React, { useState, useEffect, ReactElement } from 'react';
import { FluidObject } from 'gatsby-image';
import SearchListItem from '../Actions/SearchListItem';

interface ListItemProps {
  post: {
    node: {
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
  categoryFilter: string;
  linkOnClick: () => void;
}

const ListItem = ({
  post,
  categoryFilter,
  linkOnClick,
}: ListItemProps): ReactElement => {
  const {
    excerpt,
    frontmatter: { category, title, subTitle, date, cover },
    fields: { slug },
  } = post.node;

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (categoryFilter === 'all posts') {
      setHidden(false);
    } else if (category !== categoryFilter) {
      setHidden(true);
    } else if (category === categoryFilter) {
      setHidden(false);
    }
  }, [categoryFilter]);

  return (
    <>
      {hidden || (
        <SearchListItem
          title={title}
          subTitle={subTitle}
          excerpt={excerpt}
          date={date}
          slug={slug}
          cover={cover}
          linkOnClick={linkOnClick}
        />
      )}
    </>
  );
};

export default ListItem;
