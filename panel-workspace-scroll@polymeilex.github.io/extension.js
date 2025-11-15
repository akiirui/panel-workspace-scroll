import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Clutter from 'gi://Clutter';

export default class PanelWorkspaceScrollExtension {
    enable() {
        this.scrollEventId = Main.panel.connect('scroll-event', (_actor, event) => Main.wm.handleWorkspaceScroll(event));
        this.clickEventId = Main.panel.connect('button-press-event', (_actor, event) => {
            // Middle mouse button: 2, Left: 1, Right: 3
            if (event.get_button() === 2) {
                Main.overview.toggle();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });
    }

    disable() {
        if (this.scrollEventId != null) {
            Main.panel.disconnect(this.scrollEventId);
            this.scrollEventId = null;
        }
        if (this.clickEventId != null) {
            Main.panel.disconnect(this.clickEventId);
            this.clickEventId = null;
        }
    }
}
