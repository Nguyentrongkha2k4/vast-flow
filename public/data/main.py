import csv

file1 = "cameras.csv"   # file gốc (cần lọc)
file2 = "selected_cameras_120.csv"   # file chứa danh sách camera_id cần giữ
output = "cameras_final.csv"

# Bước 1: đọc file2 -> lấy danh sách camera_id
with open(file2, "r", encoding="utf-8") as f2:
    reader2 = csv.DictReader(f2)
    valid_ids = {row["camera_id"] for row in reader2}

# Bước 2: đọc file1 và lọc
with open(file1, "r", encoding="utf-8") as f1, \
     open(output, "w", newline="", encoding="utf-8") as out:

    reader1 = csv.DictReader(f1)
    writer = csv.DictWriter(out, fieldnames=reader1.fieldnames)

    writer.writeheader()

    for row in reader1:
        if row["camera_id"] in valid_ids:
            writer.writerow(row)

print("Done! File output:", output)