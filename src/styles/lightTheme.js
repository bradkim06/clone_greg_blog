import Color from "color";
import lightColors from "./lightColors";

export const lightTheme = {
  base: {
    colors: {
      background: lightColors.background,
      text: lightColors.dark,
      link: lightColors.accent,
      linkHover: Color(lightColors.accent).darken(0.3).string(),
      accent: lightColors.accent,
      lines: lightColors.superLightGray,
      brightText: lightColors.bright,
      palette: lightColors.palette
    },
    sizes: {
      linesMargin: "20px"
    },
    fonts: {
      unstyledFamily: `Roboto`,
      styledFamily: "Open Sans",
      styledFonts: "400,600"
    }
  },
  info: {
    colors: {
      text: lightColors.dark,
      background: lightColors.background,
      socialIcons: lightColors.lightGray,
      socialIconsHover: lightColors.accent,
      menuLink: lightColors.dark,
      menuLinkHover: lightColors.accent
    },
    sizes: {
      width: 320,
      headerHeight: 170
    },
    size: {
      width: "20rem",
      headerHeight: "10.625rem"
    },
    fonts: {
      boxTitleSize: 1.3,
      boxTitleSizeM: 1.5,
      boxTitleSizeL: 1.7
    }
  },
  navigator: {
    colors: {
      background: lightColors.background,
      postsListItemLink: lightColors.dark,
      postsListItemLinkHover: lightColors.accent,
      postsHeader: lightColors.dark
    },
    sizes: {
      closedHeight: 80,
      postsListItemH1Font: 1.3,
      postsListItemH2Font: 1.1,
      fontIncraseForM: 1.15,
      fontIncraseForL: 1.3
    },
    size: {
      closedHeight: "5rem"
    }
  },
  main: {
    colors: {
      background: lightColors.background,
      title: lightColors.deepDark,
      subTitle: lightColors.dark,
      meta: lightColors.dark,
      content: lightColors.dark,
      footer: lightColors.gray,
      contentHeading: lightColors.deepDark,
      blockquoteFrame: lightColors.accent,
      link: lightColors.accent,
      linkHover: lightColors.dark,
      fbCommentslightColorscheme: "light"
    },
    sizes: {
      articleMaxWidth: "65rem"
    },
    fonts: {
      title: {
        size: 1.9,
        sizeM: 2.5,
        sizeL: 2.7,
        weight: 600,
        lineHeight: 1.5
      },
      subTitle: {
        size: 1.5,
        sizeM: 1.8,
        sizeL: 1.95,
        weight: 300,
        lineHeight: 1.5
      },
      meta: {
        size: 0.9,
        weight: 600
      },
      content: {
        size: 1.0,
        sizeM: 1.1,
        sizeL: 1.2,
        lineHeight: 1.6
      },
      contentHeading: {
        h2Size: 1.5,
        h3Size: 1.3,
        weight: 600,
        lineHeight: 1.5
      },
      footer: {
        size: 1,
        lineHeight: 1.4
      }
    }
  },
  footer: {
    colors: {
      text: Color(lightColors.gray).lighten(0.5).string(),
      link: lightColors.accent,
      linkHover: Color(lightColors.accent).lighten(0.2).string()
    },
    fonts: {
      footnote: {
        size: 0.8,
        lineHeight: 1.4
      }
    }
  },
  bars: {
    colors: {
      background: lightColors.background,
      icon: lightColors.gray,
      text: lightColors.gray
    },
    sizes: {
      actionsBar: 60,
      infoBar: 60
    },
    size: {
      actionsBar: "3.75rem",
      infoBar: "3.75rem"
    }
  },
  search: {
    colors: {
      background: lightColors.background,
      listBackground: Color(lightColors.background).darken(0.04).string(),
      hoverBackground: lightColors.background,
      shadow: Color(lightColors.background).darken(0.2).string(),
      shadowHover: Color(lightColors.background).darken(0.4).string()
    }
  },
  mediaQueryTresholds: {
    M: 600,
    L: 1024
  },
  minWidth: {
    M: "(min-width: 37.5rem)",
    L: "(min-width: 64rem)"
  },
  maxWidth: {
    S: "(max-width: 18.75rem)",
    L: "(max-width: 63.938rem)"
  },
  palette: {
    primary: {
      main: lightColors.accent
    },
    action: {
      hover: "rgba(0, 0, 0, 0.01)"
    }
  },
  typography: {
    fontFamily: `Roboto, sans-serif`,
    fontSize: 16
  }
};

export default lightTheme;
