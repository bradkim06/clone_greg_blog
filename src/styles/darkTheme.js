import Color from 'color';
import darkColors from './darkColors';

export const darkTheme = {
  base: {
    colors: {
      background: darkColors.background,
      text: darkColors.bright,
      link: darkColors.accent,
      linkHover: Color(darkColors.accent).lighten(0.3).string(),
      accent: darkColors.accent,
      lines: darkColors.gray,
      brightText: Color(darkColors.dark).darken(1).string(),
      palette: darkColors.palette,
    },
    sizes: {
      linesMargin: '20px',
    },
    fonts: {
      unstyledFamily: 'Roboto',
      styledFamily: 'Lora',
      styledFonts: '400,600',
    },
  },
  info: {
    colors: {
      text: darkColors.superLightGray,
      background: darkColors.background,
      socialIcons: darkColors.lightGray,
      socialIconsHover: darkColors.accent,
      menuLink: darkColors.bright,
      menuLinkHover: darkColors.accent,
    },
    sizes: {
      width: 320,
      headerHeight: 170,
    },
    size: {
      width: '20rem',
      headerHeight: '10.625rem',
    },
    fonts: {
      boxTitleSize: 1.3,
      boxTitleSizeM: 1.5,
      boxTitleSizeL: 1.7,
    },
  },
  navigator: {
    colors: {
      background: darkColors.background,
      postsListItemLink: darkColors.superLightGray,
      postsListItemLinkHover: darkColors.accent,
      postsHeader: darkColors.bright,
    },
    sizes: {
      closedHeight: 80,
      postsListItemH1Font: 1.3,
      postsListItemH2Font: 1.1,
      fontIncraseForM: 1.15,
      fontIncraseForL: 1.3,
    },
    size: {
      closedHeight: '5rem',
    },
  },
  main: {
    colors: {
      background: darkColors.background,
      title: darkColors.superLightGray,
      subTitle: darkColors.bright,
      meta: darkColors.bright,
      content: darkColors.bright,
      footer: darkColors.bright,
      contentHeading: darkColors.superLightGray,
      blockquoteFrame: darkColors.accent,
      link: darkColors.accent,
      linkHover: darkColors.dark,
      fbCommentsColorscheme: 'dark',
    },
    sizes: {
      articleMinWidth: '100%',
      articleMaxWidth: '70rem',
    },
    fonts: {
      title: {
        size: 1.9,
        sizeM: 2.5,
        sizeL: 2.7,
        weight: 600,
        lineHeight: 1.1,
      },
      subTitle: {
        size: 1,
        sizeM: 1.3,
        sizeL: 1.45,
        weight: 300,
        lineHeight: 1.1,
      },
      meta: {
        size: 0.9,
        weight: 600,
      },
      content: {
        size: 1.0,
        sizeM: 1.1,
        sizeL: 1.2,
        lineHeight: 1.6,
      },
      contentHeading: {
        h2Size: 1.5,
        h3Size: 1.3,
        weight: 600,
        lineHeight: 1.3,
      },
      footer: {
        size: 1,
        lineHeight: 1.4,
      },
    },
  },
  footer: {
    colors: {
      text: Color(darkColors.gray).lighten(0.5).string(),
      link: darkColors.accent,
      linkHover: Color(darkColors.accent).lighten(0.2).string(),
    },
    fonts: {
      footnote: {
        size: 0.8,
        lineHeight: 1.4,
      },
    },
  },
  bars: {
    colors: {
      background: darkColors.background,
      icon: darkColors.bright,
      text: darkColors.bright,
    },
    sizes: {
      actionsBar: 60,
      infoBar: 60,
    },
    size: {
      actionsBar: '3.75rem',
      infoBar: '3.75rem',
    },
  },
  search: {
    colors: {
      background: darkColors.background,
      listBackground: Color(darkColors.background).lighten(0.5).string(),
      hoverBackground: Color(darkColors.background).lighten(1).string(),
      shadow: Color(darkColors.background).lighten(0.4).string(),
      shadowHover: Color(darkColors.background).lighten(4).string(),
    },
  },
  mediaQueryTresholds: {
    M: 600,
    L: 1024,
  },
  minWidth: {
    M: '(min-width: 37.5rem)',
    L: '(min-width: 64rem)',
  },
  maxWidth: {
    S: '(max-width: 18.75rem)',
    L: '(max-width: 63.938rem)',
  },
  palette: {
    primary: {
      main: darkColors.accent,
    },
    type: 'dark',
    action: {
      hover: 'rgba(0, 0, 0, 0.01)',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
  },
};

export default darkTheme;
