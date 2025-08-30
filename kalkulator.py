# kalkulator.py

def tambah(a, b):
    return a + b

def kurang(a, b):
    return a - b

def kali(a, b):
    return a * b

def bagi(a, b):
    if b != 0:
        return a / b
    else:
        return "Error: Tidak bisa dibagi 0"

print("=== Kalkulator Sederhana ===")
print("Pilih operasi:")
print("1. Tambah")
print("2. Kurang")
print("3. Kali")
print("4. Bagi")

pilihan = input("Masukkan pilihan (1/2/3/4): ")

angka1 = float(input("Masukkan angka pertama: "))
angka2 = float(input("Masukkan angka kedua: "))

if pilihan == "1":
    print("Hasil:", tambah(angka1, angka2))
elif pilihan == "2":
    print("Hasil:", kurang(angka1, angka2))
elif pilihan == "3":
    print("Hasil:", kali(angka1, angka2))
elif pilihan == "4":
    print("Hasil:", bagi(angka1, angka2))
else:
    print("Pilihan tidak valid!")
