#!/bin/bash
input_file="./event.csv"
output_file="./output.js"
event_title=$1
event_subTitle=$2

if [ -f "$output_file" ]; then
  > "$output_file"
fi

echo "export const guests = [" > "$output_file"

awk -F, 'NR>1 && $6 != "参加キャンセル" { print "  {\"role\": \"" $1 "\", \"userId\": \"" $2 "\", \"userName\": \"" $3 "\"}," }' "$input_file" | sed '$ s/,$//' >> "$output_file"

echo "]" >> "$output_file"

echo "export const eventMeta = { title: \"$event_title\", subTitle: \"$event_subTitle\" }" >> "$output_file"