import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import { panel, wm } from "resource:///org/gnome/shell/ui/main.js";

export default class PanelWorkspaceScroll extends Extension {
  enable() {
    this.scrollEventId = panel.connect("scroll-event", (_actor, event) =>
      wm.handleWorkspaceScroll(event),
    );
  }

  disable() {
    if (this.scrollEventId != null) {
      panel.disconnect(this.scrollEventId);
      this.scrollEventId = null;
    }
  }
}
