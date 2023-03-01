Security
1. untuk keamanan password, password diamankan (hashed) dengan menggunakan php password_hash() function 
2. checks if the username is already taken before inserting it into the database.
3. This code uses prepared statements to protect against SQL injection, filters the input to protect against cross-site scripting (XSS), 



Fungsi Aplikasi
-Fitur Admin
1. Mempermudah dalam pencatatan data untuk dokumen yang sudah terambil yang berisi tanggal pengambilan, nomor perkara, nama penggugat, nama terguga, No akta cerai, kartu identitas (sim,ktp), nomor identitas dan Alamat
2. Terdapat fitur search dalam menu List Data untuk mempermudah mencari data dengan menggunakan Nomor Perkara
3. Submit status digunakan admin apabila akta cerai sudah siap diambil dan penggugat dapat melakukan cek dengan mengunjungi alamat web tanpa login didepan dengan menggunakan nomor perkara 
4. Terdapat fitur 'Delete' Untuk kesalahan dalam memasukan data dalam List Data ataupun Daftar Status 
5. Terdapat menu register untuk admin baru jika di inginkan
6. Semua data tersimpan dalam database website

-Fitur pengunjung
1. pengunjung dapat mengetahui status akta cerai sudah siap untuk diambil apa masih dalam proses