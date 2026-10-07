import { AnimalProfile } from '../types/animal';
import { ADDITIONAL_PRESETS } from './additionalPresets';

export const POPULAR_ANIMALS: { name: string; enName: string; category: string; icon: string }[] = [
  { name: 'Sư tử châu Phi', enName: 'African Lion', category: 'Thú săn mồi', icon: '🦁' },
  { name: 'Hổ Bengal', enName: 'Bengal Tiger', category: 'Thú quý hiếm', icon: '🐅' },
  { name: 'Cá voi xanh', enName: 'Blue Whale', category: 'Sinh vật biển', icon: '🐋' },
  { name: 'Voọc chà vá chân nâu', enName: 'Red-shanked douc', category: 'Đặc hữu Việt Nam', icon: '🐒' },
  { name: 'Gấu trúc lớn', enName: 'Giant Panda', category: 'Động vật có vú', icon: '🐼' },
  { name: 'Kỳ giông Axolotl', enName: 'Axolotl', category: 'Lưỡng cư độc đáo', icon: '🦎' },
  { name: 'Sao La', enName: 'Saola', category: 'Kỳ lân châu Á - VN', icon: '🦌' },
  { name: 'Rồng Komodo', enName: 'Komodo Dragon', category: 'Bò sát khổng lồ', icon: '🦎' },
  { name: 'Chim cánh cụt hoàng đế', enName: 'Emperor Penguin', category: 'Chim Nam Cực', icon: '🐧' },
  { name: 'Bạch tuộc Dumbo', enName: 'Dumbo Octopus', category: 'Biển sâu bí ẩn', icon: '🐙' },
  { name: 'Đại bàng đầu trắng', enName: 'Bald Eagle', category: 'Chim săn mồi', icon: '🦅' },
  { name: 'Thú mỏ vịt', enName: 'Platypus', category: 'Thú đẻ trứng', icon: '🦆' },
];

export const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: '🌍' },
  { id: 'mammal', label: 'Động vật có vú', icon: '🐾' },
  { id: 'birds', label: 'Chim muông', icon: '🦅' },
  { id: 'marine', label: 'Sinh vật biển', icon: '🌊' },
  { id: 'reptiles', label: 'Bò sát & Lưỡng cư', icon: '🦎' },
  { id: 'vietnam', label: 'Đặc hữu Việt Nam', icon: '🇻🇳' },
  { id: 'endangered', label: 'Quý hiếm & Nguy cấp', icon: '🚨' },
];

export const PRESET_PROFILES: Record<string, AnimalProfile> = {
  'su-tu-chau-phi': {
    id: 'su-tu-chau-phi',
    commonNameVi: 'Sư tử châu Phi',
    commonNameEn: 'African Lion',
    scientificName: 'Panthera leo',
    otherNames: ['Chúa tể thảo nguyên', 'Sư tử đồng cỏ'],
    tagline: 'Chúa tể dũng mãnh của thảo nguyên châu Phi với tiếng gầm vang vọng xa 8km',
    summary: 'Sư tử châu Phi là loài thú ăn thịt lớn thứ hai trong họ Mèo sau hổ. Khác với hầu hết các loài mèo lớn sống đơn độc, sư tử sống theo đàn có cấu trúc xã hội chặt chẽ với những con cái đảm nhiệm phần lớn việc săn mồi.',
    conservationStatus: {
      code: 'VU',
      labelVi: 'Sắp nguy cấp',
      labelEn: 'Vulnerable',
      description: 'Quần thể sư tử hoang dã đã giảm hơn 43% trong 2 thập kỷ qua do mất môi trường sống, xung đột với con người và suy giảm con mồi.',
      color: 'text-amber-400',
      badgeBg: 'bg-amber-950/80 border-amber-500/60'
    },
    taxonomy: {
      kingdom: 'Animalia (Động vật)',
      phylum: 'Chordata (Dây sống)',
      class: 'Mammalia (Động vật có vú)',
      order: 'Carnivora (Bộ Ăn thịt)',
      family: 'Felidae (Họ Mèo)',
      genus: 'Panthera (Chi Báo)',
      species: 'Panthera leo'
    },
    metrics: {
      averageLength: 'Con đực: 1.8 - 2.1 m (thân) + 1m (đuôi)',
      averageWeight: 'Con đực: 150 - 250 kg; Con cái: 120 - 180 kg',
      lifespanInWild: '10 - 14 năm',
      lifespanInCaptivity: 'Lên tới 20 năm',
      topSpeed: '80 km/h (trong cự ly ngắn)',
      dietType: 'Động vật ăn thịt bắt buộc (Carnivore)',
      activeTime: 'Hoàng hôn, ban đêm và sáng sớm'
    },
    habitat: {
      biomes: ['Thảo nguyên xavan thảo mộc', 'Rừng thưa', 'Vùng bán sa mạc'],
      regions: ['Châu Phi hạ Sahara', 'Rừng Gir tại bang Gujarat, Ấn Độ (Sư tử châu Á)'],
      description: 'Ưa thích các đồng cỏ xavan rộng lớn có bóng mát cây keo và nguồn nước dồi dào, nơi tập trung nhiều loài thú móng guốc.'
    },
    physicalCharacteristics: {
      description: 'Thân hình săn chắc, cơ bắp cuồn cuộn với bộ lông màu vàng cát hoặc nâu vàng. Con đực trưởng thành sở hữu bờm dày sẫm màu chạy quanh cổ và ngực - bờm càng sẫm màu và dày biểu thị sức khỏe sinh sản sung mãn và mức testosterone cao.',
      keyFeatures: [
        'Bờm hùng vĩ ở con đực giúp bảo vệ cổ khi chiến đấu',
        'Bộ móng vuốt có thể thu vào dài tới 3.8 cm',
        'Hàm răng với lực cắn khủng khiếp đạt 650 PSI',
        'Đuôi có chỏm lông đen che giấu một gai xương nhỏ ở chóp'
      ],
      camouflageOrDefenses: 'Màu lông hòa trộn hoàn hảo vào cỏ khô của mùa khô châu Phi, giúp chúng phục kích con mồi từ cự ly gần.'
    },
    behaviorAndEcology: {
      socialStructure: 'Sống thành bầy (pride) gồm 2-4 con đực liên minh, khoảng 10-15 con cái có quan hệ huyết thống và các con non.',
      huntingOrForaging: 'Săn mồi theo nhóm mang tính chiến thuật cao; các con sư tử cái tản ra bao vây và lùa con mồi vào bẫy mai phục.',
      communication: 'Tiếng gầm có thể nghe thấy ở khoảng cách 8km để tuyên bố chủ quyền lãnh thổ; cọ má và liếm láp để tăng tình gắn kết.',
      specialAdaptations: 'Thị giác ban đêm nhạy bén gấp 6 lần mắt người nhờ lớp tế bào phản quang tapetum lucidum.'
    },
    diet: {
      category: 'Ăn thịt chuyên biệt',
      primaryFoods: ['Ngựa vằn', 'Linh dương đầu bò', 'Lợn lòi', 'Trâu rừng châu Phi'],
      description: 'Mỗi bữa ăn một con sư tử đực có thể tiêu thụ tới 40 kg thịt. Chúng có thể nhịn ăn nhiều ngày sau một bữa no.'
    },
    reproduction: {
      gestationPeriod: 'Khoảng 110 ngày',
      litterSize: '1 - 4 con non',
      parentalCare: 'Các con cái trong đàn thường đồng loạt sinh con và cho con của nhau bú chung (nuôi con tập thể).'
    },
    threatsAndConservation: {
      mainThreats: [
        'Mất sinh cảnh sống do đất nông nghiệp mở rộng',
        'Xung đột trả đũa từ các chủ trại chăn nuôi gia súc',
        'Nạn săn trộm lấy xương thay thế xương hổ trên thị trường chợ đen'
      ],
      conservationEfforts: [
        'Bảo vệ nghiêm ngặt tại các vườn quốc gia Serengeti, Maasai Mara, Kruger',
        'Dự án Lion Guardians hợp tác với bộ lạc Maasai'
      ],
      populationTrend: 'Suy giảm nghiêm trọng ngoài các khu bảo tồn'
    },
    funFacts: [
      'Sư tử cái thực hiện tới 85-90% các cuộc săn mồi cho cả bầy đàn.',
      'Sư tử dành tới 20 giờ mỗi ngày để ngủ và nghỉ ngơi nhằm tiết kiệm năng lượng.',
      'Tiếng gầm của sư tử là to nhất trong tất cả các loài mèo lớn, đạt cường độ 114 decibel.',
      'Sư tử con sinh ra có những đốm mờ trên lông giúp ngụy trang, những đốm này mờ dần khi lớn lên.'
    ],
    humanComparison: {
      weightVsHuman: 'Nặng gấp 3 đến 3.5 lần một người đàn ông trưởng thành (70kg).',
      speedVsHuman: 'Chạy 80 km/h, nhanh gấp đôi kỷ lục thế giới của Usain Bolt (44.7 km/h).',
      lifespanVsHuman: 'Tuổi thọ trung bình trong tự nhiên (12 năm) chỉ bằng khoảng 1/6 tuổi thọ con người.',
      sizeScaleText: 'Khi đứng bằng 4 chân, lưng sư tử cao ngang ngực một người lớn; khi đứng thẳng bằng hai chân sau có thể cao hơn 2.7 mét.'
    },
    quiz: [
      {
        question: 'Ai là người thực hiện phần lớn các cuộc đi săn trong bầy sư tử?',
        options: ['Sư tử đực đầu đàn', 'Sư tử cái', 'Sư tử mới lớn', 'Cả bầy chia đều'],
        correctIndex: 1,
        explanation: 'Sư tử cái nhỏ gọn, nhanh nhẹn hơn và đảm nhận 85-90% việc săn mồi cho bầy.'
      },
      {
        question: 'Tiếng gầm của sư tử có thể truyền xa trong bán kính bao nhiêu?',
        options: ['Khoảng 1 km', 'Khoảng 3 km', 'Khoảng 8 km', 'Khoảng 20 km'],
        correctIndex: 2,
        explanation: 'Tiếng gầm uy lực của sư tử có thể nghe thấy rõ ràng ở khoảng cách lên tới 8 km.'
      },
      {
        question: 'Sư tử dành trung bình bao nhiêu giờ mỗi ngày để nghỉ ngơi?',
        options: ['6 - 8 giờ', '12 - 14 giờ', '18 - 20 giờ', 'Dưới 5 giờ'],
        correctIndex: 2,
        explanation: 'Sư tử là một trong những loài ngủ nhiều nhất, dành 18-20 tiếng mỗi ngày để giữ sức.'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Sư tử châu Phi đực với bộ bờm ấn tượng trên thảo nguyên',
    imageSource: 'Wikimedia / Unsplash',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80', title: 'Sư tử đực oai vệ', source: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=1200&q=80', title: 'Sư tử cái và con non', source: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80', title: 'Khoảnh khắc gầm vang', source: 'Unsplash' }
    ]
  },

  'vooc-cha-va-chan-nau': {
    id: 'vooc-cha-va-chan-nau',
    commonNameVi: 'Voọc chà vá chân nâu',
    commonNameEn: 'Red-shanked douc',
    scientificName: 'Pygathrix nemaeus',
    otherNames: ['Nữ hoàng linh trưởng', 'Voọc ngũ sắc'],
    tagline: 'Loài linh trưởng rực rỡ nhất hành tinh - báu vật thiên nhiên hoang dã của Việt Nam',
    summary: 'Voọc chà vá chân nâu được các nhà sinh vật học quốc tế tôn vinh là "Nữ hoàng linh trưởng" nhờ bộ lông rực rỡ 5 màu độc nhất vô nhị. Loài đặc hữu này sinh sống chủ yếu tại dãy Trường Sơn và bán đảo Sơn Trà (Đà Nẵng), Việt Nam.',
    conservationStatus: {
      code: 'CR',
      labelVi: 'Cực kỳ nguy cấp',
      labelEn: 'Critically Endangered',
      description: 'Số lượng suy giảm nghiêm trọng do mất rừng nguyên sinh và săn bắt trái phép. Được xếp mức bảo vệ cao nhất trong Sách Đỏ IUCN và Việt Nam.',
      color: 'text-red-400',
      badgeBg: 'bg-red-950/80 border-red-500/60'
    },
    taxonomy: {
      kingdom: 'Animalia (Động vật)',
      phylum: 'Chordata (Dây sống)',
      class: 'Mammalia (Động vật có vú)',
      order: 'Primates (Bộ Linh trưởng)',
      family: 'Cercopithecidae (Họ Khỉ Cựu thế giới)',
      genus: 'Pygathrix (Chi Chà vá)',
      species: 'Pygathrix nemaeus'
    },
    metrics: {
      averageLength: 'Thân: 55 - 65 cm; Đuôi dài: 60 - 75 cm',
      averageWeight: '8 - 11 kg',
      lifespanInWild: 'Khoảng 15 - 20 năm',
      lifespanInCaptivity: 'Hiếm khi sống thọ trong điều kiện nuôi nhốt nhân tạo',
      topSpeed: 'Di chuyển thoăn thoắt trên ngọn cây, nhảy xa tới 6m',
      dietType: 'Động vật ăn lá chuyên biệt (Folivore)',
      activeTime: 'Ban ngày (Diurnal) từ sáng sớm tới chiều tà'
    },
    habitat: {
      biomes: ['Rừng mưa nhiệt đới thường xanh', 'Rừng nửa rụng lá trên núi đá vôi'],
      regions: ['Miền Trung Việt Nam (Bán đảo Sơn Trà, Quảng Nam, Quảng Bình)', 'Lào lân cận'],
      description: 'Sống hoàn toàn trên tầng tán rừng cao từ 15 đến 30 mét, hiếm khi xuống mặt đất.'
    },
    physicalCharacteristics: {
      description: 'Sở hữu bộ lông 5 sắc màu tuyệt mỹ: chân dưới màu nâu đỏ hạt dẻ, cẳng tay xám trắng, cổ họng và viền mặt màu cam rực rỡ, lưng màu xám tro và chiếc đuôi dài trắng muốt.',
      keyFeatures: [
        'Bộ lông ngũ sắc độc nhất vô nhị trong giới linh trưởng',
        'Đuôi dài hơn cả chiều dài cơ thể giúp giữ thăng bằng tuyệt hảo khi chuyền cành',
        'Mặt màu vàng nghệ với đôi mắt to tròn biểu cảm',
        'Dạ dày chia nhiều ngăn phức tạp để lên men tiêu hóa chất xơ của lá cây'
      ],
      camouflageOrDefenses: 'Khi có nguy hiểm, cả đàn ngồi bất động hoàn toàn trên tán lá rậm rạp khiến mắt thường khó phát hiện.'
    },
    behaviorAndEcology: {
      socialStructure: 'Sống theo đàn gia đình từ 4 đến 15 cá thể, do một con đực đầu đàn dẫn dắt bảo vệ.',
      huntingOrForaging: 'Chuyên ăn chồi non, lá non của hơn 50 loài cây rừng nhiệt đới. Không uống nước trực tiếp mà hấp thụ nước từ lá cây và sương sớm.',
      communication: 'Giao tiếp bằng tiếng kêu khe khẽ, tiếng hót líu ríu và các cử chỉ chạm tay, chải lông vuốt ve lẫn nhau.',
      specialAdaptations: 'Hệ vi sinh vật đường ruột phong phú để phân giải độc tố trong nhiều loại lá rừng nhiệt đới.'
    },
    diet: {
      category: 'Ăn thực vật / Chuyên ăn lá non',
      primaryFoods: ['Lá non cây đa, sấu', 'Chồi non', 'Quả hạch hoang dã', 'Hoa rừng'],
      description: 'Lá cây chiếm hơn 80% khẩu phần ăn. Chúng đặc biệt tránh ăn hoa quả ngọt vì đường fructose có thể gây trướng bụng chết do cấu tạo dạ dày.'
    },
    reproduction: {
      gestationPeriod: 'Khoảng 165 - 190 ngày',
      litterSize: '1 con non duy nhất',
      parentalCare: 'Voọc con khi sinh ra có khuôn mặt màu đen và lông vàng nhạt, luôn ôm chặt lấy bụng mẹ trong nhiều tháng.'
    },
    threatsAndConservation: {
      mainThreats: [
        'Mất và chia cắt sinh cảnh do xây dựng đường sá và khu nghỉ dưỡng',
        'Bẫy trộm thú rừng làm thuốc truyền thống hoặc nuôi nhốt làm cảnh trái phép'
      ],
      conservationEfforts: [
        'Khu bảo tồn thiên nhiên Sơn Trà, Vườn quốc gia Phong Nha - Kẻ Bàng',
        'Trung tâm Cứu hộ Linh trưởng Nguy cấp (EPRC) tại Cúc Phương'
      ],
      populationTrend: 'Đang chịu áp lực nghiêm trọng'
    },
    funFacts: [
      'Voọc chà vá chân nâu được chọn làm biểu tượng đa dạng sinh học của thành phố Đà Nẵng tại APEC 2017.',
      'Chúng hầu như không bao giờ uống nước ở suối hay sông; toàn bộ lượng nước cần thiết được hấp thụ qua lá non mọng sương.',
      'Nếu bạn cho chúng ăn chuối chín hoặc bánh mì, chúng có thể bị trướng bụng lên men và tử vong!',
      'Khi ngủ, các thành viên trong gia đình voọc thường ôm chặt lấy nhau trên cành cây cao để sưởi ấm.'
    ],
    humanComparison: {
      weightVsHuman: 'Chỉ nặng bằng 1/7 trọng lượng người lớn (khoảng 9kg).',
      speedVsHuman: 'Có thể bật nhảy giữa hai ngọn cây cách nhau 6 mét như bay lượn.',
      lifespanVsHuman: 'Khoảng 1/4 tuổi thọ con người.',
      sizeScaleText: 'Chiều cao đứng khoảng 60cm, nhỏ gọn hơn một đứa trẻ 5 tuổi.'
    },
    quiz: [
      {
        question: 'Tại sao voọc chà vá chân nâu không thể ăn trái cây ngọt chín?',
        options: ['Do chúng bị dị ứng', 'Do dạ dày lên men nhiều ngăn sẽ gây trướng bụng', 'Do răng chúng quá yếu', 'Do chúng không thích mùi thơm'],
        correctIndex: 1,
        explanation: 'Dạ dày nhiều ngăn của chúng tiến hóa để lên men lá cây; lượng đường cao sẽ gây sình bụng cấp tính nguy hiểm đến tính mạng.'
      },
      {
        question: 'Voọc chà vá chân nâu thường sinh sống ở tầng nào của rừng?',
        options: ['Dưới mặt đất', 'Trong các hang đá', 'Tầng tán ngọn cây cao 15-30m', 'Ven bờ sông suối'],
        correctIndex: 2,
        explanation: 'Chúng dành hầu như 100% thời gian cuộc đời ở trên những tán cây cao nhất của rừng mưa nhiệt đới.'
      },
      {
        question: 'Danh xưng nổi tiếng thế giới của loài linh trưởng này là gì?',
        options: ['Chúa tể rừng xanh', 'Nữ hoàng linh trưởng', 'Vua nhảy xa', 'Thiên thần bóng tối'],
        correctIndex: 1,
        explanation: 'Với bộ lông ngũ sắc lộng lẫy, các nhà động vật học quốc tế đã đặt tên cho chúng là "Nữ hoàng linh trưởng".'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Voọc chà vá chân nâu - Nữ hoàng linh trưởng tại Việt Nam',
    imageSource: 'Wikimedia Commons',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80', title: 'Voọc trên cành cao', source: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80', title: 'Thiên nhiên hoang dã', source: 'Unsplash' }
    ]
  },

  'ca-voi-xanh': {
    id: 'ca-voi-xanh',
    commonNameVi: 'Cá voi xanh',
    commonNameEn: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    otherNames: ['Cá voi khổng lồ', 'Kình ngư xanh'],
    tagline: 'Sinh vật lớn nhất từng tồn tại trong lịch sử sự sống trên Trái Đất',
    summary: 'Cá voi xanh là loài động vật lớn nhất từng được biết đến trong lịch sử Trái Đất, vượt qua cả những loài khủng long khổng lồ nhất thời tiền sử. Với chiều dài lên tới 30 mét và trọng lượng gần 200 tấn, trái tim của chúng to bằng một chiếc xe hơi.',
    conservationStatus: {
      code: 'EN',
      labelVi: 'Nguy cấp',
      labelEn: 'Endangered',
      description: 'Quần thể toàn cầu bị tàn sát nặng nề bởi ngành săn bắt cá voi công nghiệp trong thế kỷ 20, hiện đang phục hồi rất chậm chạp.',
      color: 'text-orange-400',
      badgeBg: 'bg-orange-950/80 border-orange-500/60'
    },
    taxonomy: {
      kingdom: 'Animalia (Động vật)',
      phylum: 'Chordata (Dây sống)',
      class: 'Mammalia (Động vật có vú)',
      order: 'Artiodactyla (Bộ Móng guốc chẵn / Phân bộ Cá voi Cetacea)',
      family: 'Balaenopteridae (Họ Cá voi lưng gù)',
      genus: 'Balaenoptera',
      species: 'Balaenoptera musculus'
    },
    metrics: {
      averageLength: '24 - 30 mét',
      averageWeight: '130 - 190 tấn (tương đương 30 con voi châu Phi gộp lại)',
      lifespanInWild: '80 - 90 năm (có cá thể sống tới 110 năm)',
      lifespanInCaptivity: 'Không thể nuôi nhốt',
      topSpeed: '30 - 50 km/h khi tăng tốc chạy trốn',
      dietType: 'Động vật ăn lọc (Filter feeder)',
      activeTime: 'Hoạt động liên tục cả ngày lẫn đêm'
    },
    habitat: {
      biomes: ['Đại dương mở', 'Vùng biển cận địa cực và nhiệt đới'],
      regions: ['Bắc Băng Dương, Nam Đại Dương, Thái Bình Dương, Đại Tây Dương'],
      description: 'Di cư hàng ngàn kilomet mỗi năm giữa vùng nước lạnh giàu thức ăn ở địa cực vào mùa hè và vùng nước ấm nhiệt đới để sinh sản vào mùa đông.'
    },
    physicalCharacteristics: {
      description: 'Thân hình thuôn dài thanh mảnh như một chiếc tàu ngầm hạt nhân, da màu xám xanh lốm đốm. Thay vì răng, hàm trên của chúng có khoảng 300-400 tấm sừng (baleen plates) dài 1m để lọc sinh vật phù du.',
      keyFeatures: [
        'Trái tim nặng tới 180 kg và đập với nhịp chỉ 2-8 nhịp/phút khi lặn sâu',
        'Lưỡi của một con cá voi xanh nặng bằng cả một con voi trưởng thành (khoảng 2.7 - 4 tấn)',
        'Cột nước phun ra từ lỗ thở có thể cao tới 9 - 12 mét',
        'Âm thanh phát ra đạt tới 188 decibel, truyền xa hàng trăm dặm dưới đáy biển'
      ],
      camouflageOrDefenses: 'Kích thước khổng lồ là tấm khiên phòng thủ tối thượng giúp chúng hầu như không có kẻ thù tự nhiên ngoài con người và đàn cá voi sát thủ đông đảo.'
    },
    behaviorAndEcology: {
      socialStructure: 'Thường bơi đơn độc hoặc theo từng cặp mẹ con.',
      huntingOrForaging: 'Hút một ngụm nước biển khổng lồ chứa đầy giáp xác nhỏ, sau đó dùng lưỡi ép nước qua các tấm sừng lọc để giữ lại thức ăn.',
      communication: 'Phát ra những xung hạ âm tần số cực thấp (10-40 Hz) có thể truyền xuyên đại dương qua hàng trăm kilomet.',
      specialAdaptations: 'Dung tích phổi đạt 5.000 lít cho phép lặn sâu tới 500 mét trong 20 phút mà không bị ngạt.'
    },
    diet: {
      category: 'Động vật ăn giáp xác phù du',
      primaryFoods: ['Nhuyễn thể (Euphausiids / Krill)', 'Giáp xác chân chèo nhỏ'],
      description: 'Mỗi ngày trong mùa kiếm ăn, một con cá voi xanh trưởng thành tiêu thụ tới 4 tấn (khoảng 40 triệu con) nhuyễn thể krill.'
    },
    reproduction: {
      gestationPeriod: '10 - 12 tháng',
      litterSize: '1 con non duy nhất',
      parentalCare: 'Cá voi con khi sinh ra đã dài 7-8m và nặng 2.5 tấn. Mỗi ngày con non bú mẹ tới 400 lít sữa và tăng cân gần 90kg mỗi 24 giờ!'
    },
    threatsAndConservation: {
      mainThreats: [
        'Va chạm với tàu container vận tải biển cỡ lớn',
        'Vướng vào lưới đánh cá công nghiệp',
        'Tiếng ồn từ tàu thủy làm nhiễu loạn liên lạc âm thanh',
        'Biến đổi khí hậu làm giảm số lượng loài nhuyễn thể ở Nam Cực'
      ],
      conservationEfforts: [
        'Lệnh cấm săn bắt cá voi thương mại của IWC năm 1966',
        'Thiết lập tuyến hàng hải tránh khu vực kiếm ăn của cá voi'
      ],
      populationTrend: 'Tăng chậm từ đáy vực tuyệt chủng'
    },
    funFacts: [
      'Cá voi xanh lớn hơn bất kỳ loài khủng long nào từng sống, bao gồm cả Argentinosaurus.',
      'Động mạch chủ của cá voi xanh rộng đến mức một đứa trẻ có thể bò vừa bên trong.',
      'Cá voi con tăng trung bình 3.8 kg mỗi GIỜ nhờ nguồn sữa mẹ giàu chất béo lên tới 50%.',
      'Âm thanh của cá voi xanh to hơn cả động cơ máy bay phản lực cất cánh (188 dB so với 140 dB).'
    ],
    humanComparison: {
      weightVsHuman: 'Nặng bằng khoảng 2.500 người trưởng thành gộp lại.',
      speedVsHuman: 'Bơi lướt sóng nhanh gấp 4 lần tốc độ bơi tối đa của kình ngư Michael Phelps.',
      lifespanVsHuman: 'Sống thọ tương đương hoặc dài hơn tuổi thọ trung bình của con người (80-110 năm).',
      sizeScaleText: 'Dài bằng một đoàn tàu hỏa 3 toa; một người đứng cạnh chỉ bé bằng một mẩu vây bơi của nó.'
    },
    quiz: [
      {
        question: 'Thức ăn chính của loài động vật lớn nhất Trái Đất là gì?',
        options: ['Cá mập khổng lồ', 'Hải cẩu và chim cánh cụt', 'Nhuyễn thể (loài giáp xác tí hon Krill)', 'Rong biển đại dương'],
        correctIndex: 2,
        explanation: 'Mặc dù cơ thể nặng 150-200 tấn, thức ăn của chúng hầu như chỉ là loài nhuyễn thể giáp xác dài chỉ vài centimet.'
      },
      {
        question: 'Trái tim của cá voi xanh có kích thước tương đương với vật gì?',
        options: ['Một quả dưa hấu', 'Một chiếc tủ lạnh', 'Một chiếc xe ô tô con', 'Một ngôi nhà 2 tầng'],
        correctIndex: 2,
        explanation: 'Trái tim cá voi xanh nặng khoảng 180-200 kg và có kích thước tương đương một chiếc xe hơi Volkswagen Beetle.'
      },
      {
        question: 'Cá voi con mới sinh tăng cân nhanh như thế nào mỗi ngày?',
        options: ['Khoảng 1 kg', 'Khoảng 10 kg', 'Khoảng 90 kg mỗi ngày', 'Khoảng 500 kg'],
        correctIndex: 2,
        explanation: 'Nhờ sữa mẹ siêu béo, cá voi con tăng trưởng tới ~90 kg mỗi 24 giờ (tương đương gần 4kg mỗi giờ)!'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Cá voi xanh khổng lồ lướt đi giữa đại dương bao la',
    imageSource: 'Wikimedia Commons',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80', title: 'Kình ngư giữa biển khơi', source: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80', title: 'Cột nước phun cao vút', source: 'Unsplash' }
    ]
  },
  ...ADDITIONAL_PRESETS
};
