import os
import json
import re

base_dir = r"v:\shiliaiwei.github.io"
js_file_path = os.path.join(base_dir, "js", "main.js")

music_data = []

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
            src_path = f"src/x0/{dir_name}/{f}"
            
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

new_data_str = json.dumps(music_data, indent=4)
# Strip outer brackets [ and ]
# new_data_str starts with [\n and ends with \n]
# We want to preserve the content inside.
# Find first [ and last ]
first_bracket = new_data_str.find('[')
last_bracket = new_data_str.rfind(']')
if first_bracket != -1 and last_bracket != -1:
    inner_content = new_data_str[first_bracket+1:last_bracket]
else:
    inner_content = ""

# Read the JS file
with open(js_file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The file now has `const musicData = [\n[\n...` because of my previous error.
# I need to match that excessively nested structure and fix it, OR just match the general structure again.
# The previous regex `(const\s+musicData\s*=\s*\[)(.*?)(\];)` should still match 
# because `.*?` is non-greedy but it will stop at the first `];`?
# Wait, if I have `[[ ... ]]`, the inner `]` might be matched? 
# json.dumps uses `]` for the array end. If I have nested array `[[...]]`, 
# the `];` in the file is AFTER the `]]`. 
# In JS: `const musicData = [[...]];`
# The `];` is still the anchor.
# However, `.*?` will match everything inside including the inner `]`.
# So the pattern `(const\s+musicData\s*=\s*\[)(.*?)(\];)` should match 
# `const musicData = [` as Group 1
# `[\n    {...}\n]` as Group 2
# `];` as Group 3.
# This seems correct.

pattern = r"(const\s+musicData\s*=\s*\[)(.*?)(\];)"

match = re.search(pattern, content, re.DOTALL)
if match:
    print("Found musicData array. Replacing with corrected content...")
    start_marker = match.group(1) # const musicData = [
    end_marker = match.group(3)   # ];
    
    # Construct new content
    # Start with `const musicData = [`
    # Then the inner content of the JSON (without outer brackets)
    # Then `];`
    
    # We strip the outer brackets from the JSON string, so we are left with just the objects.
    # The start_marker provides the opening `[`.
    # The end_marker provides the closing `];`.
    # But wait, end_marker is just `];`. We need the closing `]` of the array too.
    # My regex group 3 is just `];`.
    # So the structure is:
    # const musicData = [ <content> ];
    # <content> should be `    {...}, ...`
    # My `inner_content` has that.
    
    # Wait, `end_marker` is `];`. The regex `(\];)` matches proper `];` token.
    # But in the file, does `musicData` end with `];` immediately after the list?
    # Yes.
    # But does `json.dumps` output contain `]` at the end? Yes.
    # So if I use `inner_content` (which removed `[` and `]`), I miss the closing `]`.
    # I need to Provide the closing `]`.
    
    new_content_str = start_marker + inner_content + "\n" + "    ]" + "; " # Adding ] manually before ;
    # Actually, let's look at the regex again.
    # Group 3 is `];`.
    # I replaced `...` with `inner_content`. 
    # `const musicData = [` + `inner_content` + `];` -> `const musicData = [ ...items... ];`
    # `inner_content` does NOT have the closing `]`.
    # So I need to add `]` back.
    
    new_content_str = start_marker + inner_content + "\n    ]" + ";"
    
    updated_content = content[:match.start()] + new_content_str + content[match.end():]
    
    with open(js_file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print("Successfully corrected js/main.js")
else:
    print("Could not find 'const musicData = [...]' in js/main.js")
