#!/bin/bash
input_file="$1"
output_file="./output.js"

if [ -f "$output_file" ]; then
  > "$output_file"
fi

echo "export const data = [" > "$output_file"

awk -F, 'NR>1 { print "  {\"role\": \"" $1 "\", \"userId\": \"" $2 "\", \"userName\": \"" $3 "\"}," }' "$input_file" | sed '$ s/,$//' >> "$output_file"

echo "]" >> "$output_file"