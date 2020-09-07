import { forceCheck } from "react-lazyload";
import { navigate } from "@reach/router";

export function featureNavigator(e) {
  e && e.preventDefault();

  if (this.props.navigatorPosition === "is-aside") {
    if (this.props.isWideScreen) {
      this.props.setNavigatorPosition("moving-featured");

      setTimeout(() => {
        this.props.setNavigatorPosition("resizing-featured");
        setTimeout(() => {
          this.props.setNavigatorPosition("is-featured");
          this.props.setNavigatorShape("open");
        });
      }, 300);
    } else {
      setTimeout(() => {
        this.props.setNavigatorPosition("is-featured");
      }, 0);
    }

    // uncomment following lines if you want to count featuring Navigator as a visit
    // to index page ('/'), you have to also uncomment import { navigateTo }...
    setTimeout(() => {
      navigate("/");
    }, 500);
  }
}

export function moveNavigatorAside(e) {
  const target = e ? e.currentTarget : null;
  const dataShape = target ? target.getAttribute("data-shape") : null;
  const navigatorShape = dataShape ? dataShape : "open";

  if (this.props.navigatorPosition === "is-featured") {
    if (this.props.isWideScreen) {
      this.props.setNavigatorPosition("moving-aside");

      if (typeof window !== `undefined`) {
        if (window.location.pathname !== "/") {
          this.props.setNavigatorPosition("resizing-aside");
          this.props.setNavigatorShape(navigatorShape);
          setTimeout(() => {
            this.props.setNavigatorPosition("is-aside");
            setTimeout(forceCheck, 600);
          });
        }
      }
    } else {
      setTimeout(() => {
        this.props.setNavigatorPosition("is-aside");
      }, 100);
    }
  }
}