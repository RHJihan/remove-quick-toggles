import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import GLib from 'gi://GLib';

export default class RemoveQuickTogglesExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._hiddenItems = [];
        this._timeoutId = null;
    }

    _hideTargetItems() {
        const quickSettings = Main.panel.statusArea.quickSettings;
        const menu = quickSettings.menu;
        
        // Clear previous references
        this._hiddenItems = [];
        
        // Iterate through menu items
        menu._grid.get_children().forEach(item => {
            const itemName = item.constructor.name.toLowerCase();
            
            if (itemName.includes('darkmode') || 
                itemName.includes('powerprofile') || 
                itemName.includes('rfkill')) {
                if (item.visible) {
                    item.hide();
                    this._hiddenItems.push(item);
                }
            }
        });
    }

    enable() {
        // Hide items initially
        this._hideTargetItems();
        
        // Poll for changes every 500ms
        this._timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
            this._hideTargetItems();
            return GLib.SOURCE_CONTINUE;
        });
    }

    disable() {
        // Remove the timeout
        if (this._timeoutId) {
            GLib.Source.remove(this._timeoutId);
            this._timeoutId = null;
        }
        
        // Restore visibility of hidden items
        this._hiddenItems.forEach(item => {
            try {
                item.show();
            } catch (e) {
                // Item might have been destroyed
            }
        });
        this._hiddenItems = [];
    }
}
