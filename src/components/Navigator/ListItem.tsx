import React, { useState, useEffect } from "react";
import SearchListItem from "../Actions/SearchListItem";

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
        cover?: any;
      };
    };
  };
  categoryFilter: string;
  linkOnClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default ({ post, categoryFilter, linkOnClick }: ListItemProps) => {
  const {
    excerpt,
    frontmatter: { category, title, subTitle, date, cover },
    fields: { slug }
  } = post.node;

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (categoryFilter === "all posts") {
      setHidden(false);
    } else if (category !== categoryFilter) {
      setHidden(true);
    } else if (category === categoryFilter) {
      setHidden(false);
    }
  }, [categoryFilter]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
