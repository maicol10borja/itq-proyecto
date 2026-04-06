import os

search_dir = "c:/Users/Usuario/OneDrive/Desktop/Gestion/itq-frontend/src"

replacements = {
    # Backgrounds and borders
    "#f5f0e8": "#0a0a0a",   # Main app background -> very dark grey
    "#0d0d0d": "#111111",   # Sidebar/dark mode -> slightly brighter dark grey
    "#c0392b": "#ffffff",   # Primary red -> White (high contrast ultra modern)
    "#d4c5a9": "#262626",   # Borders cream -> Dark grey border
    "#faf7f2": "#141414",   # Input background -> dark grey
    
    # Texts
    "#8fa3b1": "#a1a1aa",   # Muted grey text -> lighter grey
    "color:'black'": "color:'#e5e5e5'",
    "color:'#0d0d0d'": "color:'#e5e5e5'",
    "color: '#0d0d0d'": "color:'#e5e5e5'",
    "color:'white'": "color:'#ffffff'", 
    "color: 'white'": "color:'#ffffff'", 
    
    # Box Backgrounds originally white
    "background:'white'": "background:'#0a0a0a'",
    "background: 'white'": "background:'#0a0a0a'",
    
    # Status Colors (Dark mode compatible)
    "#fee2e2": "#3f1b1b",   # Error BG
    "#991b1b": "#fca5a5",   # Error Text
    "#d1fae5": "#0e2e1e",   # Success BG
    "#065f46": "#6ee7b7",   # Success Text
    "#fef3c7": "#332712",   # Warning BG
    "#92400e": "#fcd34d",   # Warning Text
    "#dbeafe": "#172b4d",   # Info BG
    "#1e40af": "#93c5fd",   # Info Text
    
    # Accents
    "#b8860b": "#a1a1aa",   # Gold -> grey
    "#f0c040": "#ffffff",   # Gold bright -> white
}

for root, _, files in os.walk(search_dir):
    for filename in files:
        if filename.endswith(".jsx") or filename.endswith(".css"):
            filepath = os.path.join(root, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                
            orig_content = content
            for old, new in replacements.items():
                content = content.replace(old, new)
                
            if "index.css" in filename:
                content = content.replace("background: #0a0a0a; color: #0d0d0d;", "background: #000000; color: #e5e5e5;")
                content = content.replace("background: #f5f0e8", "background: #000")
                content = content.replace("background: #0a0a0a;", "background: #000000;")
                content = content.replace("color: #0d0d0d;", "color: #e5e5e5;")
                
            if orig_content != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                    
print("Theme updated successfully!")
