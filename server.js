const http = require('http');

// UYARI: EC2'de bu portta (3000) izin vermen GEREKİR. 
// Eğer sadece Port 80 kullanacaksan, değeri 80 yap.
const PORT = 80;

// Ağır Hesaplama Fonksiyonu (Task 2'de CPU yükü oluşturmak için)
function generateLoad() {
    let result = 0;
    // 50 milyon kez döngü, CPU'yu meşgul eder
    for (let i = 0; i < 50000000; i++) {
        result += Math.sqrt(i) * Math.sin(i);
    }
    return result;
}

// HTTP Sunucusunu Oluştur
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/load') {
        // Yük Testi Yolu: CPU'yu meşgul eder
        console.log('--- YÜK İSTEĞİ BAŞLADI (CPU YÜKÜ OLUŞTURULUYOR) ---');
        generateLoad(); 
        console.log('--- YÜK İSTEĞİ BİTTİ ---');

        res.statusCode = 200;
        res.end(`
            <html>
                <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f8d7da; color: #721c24;">
                    <h2>CPU Load Test Tamamlandi!</h2>
                    <p>Sunucu gecici olarak mesgul edildi.</p>
                </body>
            </html>
        `);
    } else {
        // Normal Çalışma Yolu: Basit ve Özgün Çıktı
        const serverId = process.env.HOSTNAME || 'Bilinmiyor (Local)';
        
        res.statusCode = 200;
        res.end(`
            <html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px; background-color: #e2e8f0;">
                    <h2>Assignment3;</h2>
                    <p style="font-size: 18px;">Servis Calisiyor.</p>
                    <p style="color: #4a5568;">Yanit Alinan Sunucu:</p>
                    <h3 style="color: #38a169;">${serverId}</h3>
                    <p style="font-size: 14px; color: #718096;">Load Balancer testi icin sayfayi /load adresine gidin. </p>
                </body>
            </html>
        `);
    }
});

// Sunucuyu Başlat
server.listen(PORT, () => {
    console.log(`Ürün Servisi http://localhost:${PORT} adresinde çalışıyor.`);
});
