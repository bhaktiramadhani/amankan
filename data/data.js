const generateDummyData = (count) => {
    const dummyData = [];
    const statuses = ["Selesai", "Belum Selesai", "Gagal", "Tidak Valid"];
  
    for (let i = 1; i <= count; i++) {
      let title, imageKeyword;
  
      switch (i % 5) {
        case 0:
          title = "Kecelakaan Lalu Lintas";
          imageKeyword = "accident";
          break;
        case 1:
          title = "Kebakaran Rumah";
          imageKeyword = "fire";
          break;
        case 2:
          title = "Pohon Tumbang";
          imageKeyword = "treefall";
          break;
        case 3:
          title = "Jambret";
          imageKeyword = "robbery";
          break;
        case 4:
          title = "Penipuan";
          imageKeyword = "fraud";
          break;
        default:
          title = "Kejadian Lainnya";
          imageKeyword = "other";
      }
  
      const randomNumber = Math.floor(Math.random() * 1000);
      const randomDistance = (Math.random() * 10).toFixed(1);
      const randomTime = Math.floor(Math.random() * 24);
      const randomStatusIndex = Math.floor(Math.random() * statuses.length); // Pilih indeks acak dari array status
      const randomRole = Math.random() < 0.5 ? "Pelapor" : "Keamanan";
  
      dummyData.push({
        id: i,
        image: { uri: `https://source.unsplash.com/random/800x600?${imageKeyword}` },
        title: title,
        location: `Jl. Dummy ${i}`,
        distance: `${randomDistance} KM`,
        time: `${randomTime} jam yang lalu`,
        status: statuses[randomStatusIndex], // Ambil status dari array sesuai indeks acak
        role: randomRole,
        user: `User Dummy ${i}`,
      });
    }
  
    return dummyData;
  };
  
  const data = generateDummyData(100);
  export default data;
  