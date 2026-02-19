import os
import json
import re

base_dir = r"v:\shiliaiwei.github.io"
js_file_path = os.path.join(base_dir, "js", "main.js")

music_data = []

# Map directory names to logical categories
# Gym -> gym
# Cognitive -> relax (based on provided file content analysis)
# Stalk -> stalk
categories = {
    "Gym": "gym",
    "Cognitive": "relax",
    "Stalk": "stalk"
}

dirs_to_process = ["Gym", "Cognitive", "Stalk"]

print("Scanning directories...")
for dir_name in dirs_to_process:
    full_dir_path = os.path.join(base_dir, "src", "x0", dir_name)
    cat_label = categories.get(dir_name, "unknown")
    
    if not os.path.exists(full_dir_path):
        print(f"Directory not found: {full_dir_path}")
        continue
        
    files = os.listdir(full_dir_path)
    files.sort()
    
    for f in files:
        if f.lower().endswith(('.mp3', '.m4a', '.flac', '.wav')):
            # src/x0/Gym/filename
            # Force forward slashes for JS
            src_path = f"src/x0/{dir_name}/{f}"
            
            # Extract title from filename (e.g. 001_ -> x001)
            parts = f.split('_')
            if len(parts) > 1 and parts[0].isdigit():
                title = "x" + parts[0]
            else:
                title = f
            
            entry = {
                "artist": "Unknown",
                "title": title,
                "cat": cat_label,
                "src": src_path
            }
            music_data.append(entry)

print(f"Found {len(music_data)} tracks.")

# Generate the JS string for the array
# json.dumps gives "key": "value", but we want consistent formatting.
# The keys in the original file were quoted, so standard JSON is fine.
# Indentation matching the file would be nice (4 spaces).
new_data_str = json.dumps(music_data, indent=4)

# Read the JS file
with open(js_file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match: const musicData = [ ... ];
# We use re.DOTALL to match across newlines
# Look for 'const musicData = [' followed by content until '];'
# Be careful not to be too greedy if there are other arrays, 
# but 'const musicData' is unique.
pattern = r"(const\s+musicData\s*=\s*\[)(.*?)(\];)"

match = re.search(pattern, content, re.DOTALL)
if match:
    print("Found musicData array. Replacing...")
    start_marker = match.group(1)
    end_marker = match.group(3)
    
    # Construct new content
    # Preserve the markers, replace the middle
    # Add a newline after the start bracket for formatting
    new_content_str = start_marker + "\n" + new_data_str + "\n    " + end_marker
    
    # Replace in the original content
    updated_content = content[:match.start()] + new_content_str + content[match.end():]
    
    with open(js_file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print("Successfully updated js/main.js")
else:
    print("Could not find 'const musicData = [...]' in js/main.js")
