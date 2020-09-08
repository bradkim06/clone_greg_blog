// This is a custom theme, for details go to http://forgatsby.greglobinski.com/customize-personal-blog-starter/

import { createMuiTheme } from "@material-ui/core/styles";
import Color from "color";

import darkColors from "./darkColors";

export const darkTheme = {
  base: {
    colors: {
      background: darkColors.background,
      text: darkColors.bright,
      link: darkColors.accent,
      linkHover: Color(darkColors.accent).lighten(0.1).string(),
      accent: darkColors.accent,
      lines: darkColors.gray
    },
    sizes: {
      linesMargin: "20px"
    },
    fonts: {
      unstyledFamily: `Arial`,
      styledFamily: "IBM Plex Serif",
      styledFonts: "300,400,600"
    }
  },
  info: {
    colors: {
      text: darkColors.bright,
      background: darkColors.background,
      socialIcons: darkColors.lightGray,
      socialIconsHover: darkColors.accent,
      menuLink: darkColors.bright,
      menuLinkHover: darkColors.accent
    },
    sizes: {
      width: 320,
      headerHeight: 170
    },
    fonts: {
      boxTitleSize: 1.3,
      boxTitleSizeM: 1.5,
      boxTitleSizeL: 1.7
    }
  },
  navigator: {
    colors: {
      background: darkColors.background,
      postsListItemLink: darkColors.bright,
      postsListItemLinkHover: darkColors.accent,
      postsHeader: darkColors.bright
    },
    sizes: {
      closedHeight: 80,
      postsListItemH1Font: 1.3,
      postsListItemH2Font: 1.1,
      fontIncraseForM: 1.15,
      fontIncraseForL: 1.3
    }
  },
  main: {
    colors: {
      background: darkColors.background,
      title: darkColors.bright,
      subTitle: darkColors.bright,
      meta: darkColors.bright,
      content: darkColors.bright,
      footer: darkColors.bright,
      contentHeading: darkColors.bright,
      blockquoteFrame: darkColors.accent,
      link: darkColors.accent,
      linkHover: darkColors.dark,
      fbCommentsColorscheme: "dark"
    },
    sizes: {
      articleMaxWidth: "70em"
    },
    fonts: {
      title: {
        size: 1.9,
        sizeM: 2.5,
        sizeL: 2.7,
        weight: 600,
        lineHeight: 1.1
      },
      subTitle: {
        size: 1.5,
        sizeM: 1.8,
        sizeL: 1.95,
        weight: 300,
        lineHeight: 1.1
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
        lineHeight: 1.3
      },
      footer: {
        size: 1,
        lineHeight: 1.4
      }
    }
  },
  footer: {
    colors: {
      text: Color(darkColors.gray).lighten(0.5).string(),
      link: darkColors.accent,
      linkHover: Color(darkColors.accent).lighten(0.2).string()
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
      background: darkColors.background,
      icon: darkColors.bright,
      text: darkColors.bright
    },
    sizes: {
      actionsBar: 60,
      infoBar: 60
    }
  },
  mediaQueryTresholds: {
    M: 600,
    L: 1024
  },
  palette: {
    primary: {
      main: darkColors.accent
    },
    type: "dark",
    action: {
      hover: "rgba(0, 0, 0, 0.01)"
    }
  },
  typography: {
    fontFamily: `Arial, sans-serif`,
    fontSize: 16
  }
};

export default darkTheme;
