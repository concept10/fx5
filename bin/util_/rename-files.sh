# SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
# SPDX-License-Identifier: MIT

#!/bin/bash

# Script to rename files by replacing underscores with hyphens
# Usage: ./rename-files.sh [directory] [options]

set -e

# Default values
TARGET_DIR="."
RECURSIVE=false
FILE_TYPES=("*.cpp" "*.h" "*.hpp")
DRY_RUN=false
VERBOSE=false

# Function to display help
show_help() {
    echo "Usage: $0 [directory] [options]"
    echo "Options:"
    echo "  -r, --recursive     Search recursively through subdirectories"
    echo "  -t, --type TYPE     File types to rename (default: cpp, h, hpp)"
    echo "                      Use comma-separated list for multiple types"
    echo "  -d, --dry-run       Show what would be renamed without making changes"
    echo "  -v, --verbose       Display detailed information"
    echo "  -h, --help          Show this help message"
    echo
    echo "Example: $0 /path/to/dir -r -t cpp,md,txt -v"
}

# Parse command line arguments
while [ "$#" -gt 0 ]; do
    case "$1" in
        -h|--help)
            show_help
            exit 0
            ;;
        -r|--recursive)
            RECURSIVE=true
            shift
            ;;
        -t|--type)
            if [ -n "$2" ]; then
                IFS=',' read -ra FILE_TYPES <<< "$2"
                # Add * prefix to each type
                for i in "${!FILE_TYPES[@]}"; do
                    FILE_TYPES[$i]="*.${FILE_TYPES[$i]}"
                done
                shift 2
            else
                echo "Error: --type requires a file extension"
                show_help
                exit 1
            fi
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        *)
            if [ -d "$1" ]; then
                TARGET_DIR="$1"
                shift
            else
                echo "Error: '$1' is not a valid directory"
                show_help
                exit 1
            fi
            ;;
    esac
done

echo "==== File Renaming Utility ===="
echo "Target directory: $TARGET_DIR"
echo "Recursive: $RECURSIVE"
echo "File types: ${FILE_TYPES[*]}"
echo "Dry run: $DRY_RUN"
echo "============================"

# Function to rename files
rename_files() {
    local dir="$1"
    local find_args=()
    
    if [ "$VERBOSE" = true ]; then
        echo "Scanning directory: $dir"
    fi
    
    # Set up find command arguments
    if [ "$RECURSIVE" = true ]; then
        find_args+=("-type" "f")
    else
        find_args+=("-maxdepth" "1" "-type" "f")
    fi
    
    # Add file type patterns
    find_args+=("(")
    for i in "${!FILE_TYPES[@]}"; do
        if [ "$i" -gt 0 ]; then
            find_args+=("-o")
        fi
        find_args+=("-name" "${FILE_TYPES[$i]}")
    done
    find_args+=(")") 
    
    # Find files and process them
    while IFS= read -r file; do
        # Get directory and filename
        dir_name=$(dirname "$file")
        base_name=$(basename "$file")
        
        # Check if filename contains underscores
        if [[ "$base_name" == *_* ]]; then
            # Replace underscores with hyphens
            new_name="${base_name//_/-}"
            new_path="$dir_name/$new_name"
            
            if [ "$DRY_RUN" = true ]; then
                echo "Would rename: $file -> $new_path"
            else
                if [ "$VERBOSE" = true ]; then
                    echo "Renaming: $file -> $new_path"
                fi
                
                # Check if target file already exists
                if [ -e "$new_path" ]; then
                    echo "Warning: Cannot rename '$file', target '$new_path' already exists"
                else
                    mv "$file" "$new_path"
                    if [ "$?" -eq 0 ] && [ "$VERBOSE" = true ]; then
                        echo "Successfully renamed file"
                    fi
                fi
            fi
        elif [ "$VERBOSE" = true ]; then
            echo "Skipping: $file (no underscores in filename)"
        fi
    done < <(find "$dir" "${find_args[@]}")
}

# Execute the renaming function
rename_files "$TARGET_DIR"

echo "Done!"

# Exit with success
exit 0
