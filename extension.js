import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class RemoveQuickTogglesExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._hiddenIndicators = [];
    }

enable() {
    const quickSettings = Main.panel.statusArea.quickSettings;
    const menu = quickSettings.menu;
    
    // Store references to hidden items
    this._hiddenItems = [];
    
    // Iterate through menu items
    menu._grid.get_children().forEach(item => {
        const itemName = item.constructor.name.toLowerCase();
        
        if (itemName.includes('darkmode') || 
            itemName.includes('powerprofile') || 
            itemName.includes('rfkill')) {
            item.hide();
            this._hiddenItems.push(item);
        }
    });
}

disable() {
    this._hiddenItems.forEach(item => item.show());
    this._hiddenItems = [];
}
}

