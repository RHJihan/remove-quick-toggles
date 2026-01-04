# Remove Quick Toggles - GNOME Shell Extension

A minimal GNOME Shell extension that removes specific toggles from the Quick Settings menu.

## What it does

This extension hides the following items from your GNOME Quick Settings panel:
- Dark Style toggle
- Power Mode toggle
- Airplane Mode toggle

## Compatibility

- GNOME Shell 48

## Installation

### Manual Installation

1. Clone or download this repository:
```bash
git clone https://github.com/RHJihan/remove-quick-toggles.git
cd remove-quick-toggles
```

2. Copy the extension to your local extensions directory:
```bash
mkdir -p ~/.local/share/gnome-shell/extensions/remove-quick-toggles@rhjihan.github.io
cp -r * ~/.local/share/gnome-shell/extensions/remove-quick-toggles@rhjihan.github.io/
```

3. Restart GNOME Shell:
   - **Wayland**: Log out and log back in
   - **X11**: Press `Alt+F2`, type `r`, and press Enter

4. Enable the extension:
```bash
gnome-extensions enable remove-quick-toggles@rhjihan.github.io
```

Alternatively, use the GNOME Extensions app to enable it.

## Usage

Once enabled, the specified Quick Settings toggles will be automatically hidden. They will reappear when you disable the extension.

## Customization

To hide different Quick Settings items, edit the conditions in the enable() method in `extension.js`:

```javascript
if (itemName.includes('darkmode') || 
    itemName.includes('powerprofile') || 
    itemName.includes('rfkill')) {
    // Add more conditions here
    // Example: itemName.includes('nightlight')
}
```

## Uninstallation

1. Disable the extension:
```bash
gnome-extensions disable remove-quick-toggles@rhjihan.github.io
```

2. Remove the extension directory:
```bash
rm -rf ~/.local/share/gnome-shell/extensions/remove-quick-toggles@rhjihan.github.io
```

## Troubleshooting

If the extension doesn't work:

1. Check GNOME Shell logs:
```bash
journalctl -f -o cat /usr/bin/gnome-shell
```

2. Verify the extension is enabled:
```bash
gnome-extensions list
gnome-extensions info remove-quick-toggles@rhjihan.github.io
```

3. Make sure you've restarted GNOME Shell after installation

## License

GNU General Public License v3.0

