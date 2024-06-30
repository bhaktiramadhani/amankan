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
      image: {
        uri: `https://picsum.photos/800/600?random=${randomNumber}`,
      },
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

export const data = generateDummyData(100);

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Selamat Pagi";
  } else if (currentHour < 15) {
    return "Selamat Siang";
  } else if (currentHour < 18) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
};

export const BACKEND_URL =
  "https://7bf0-2001-448a-6020-d50e-649e-842a-71d0-12a7.ngrok-free.app";
