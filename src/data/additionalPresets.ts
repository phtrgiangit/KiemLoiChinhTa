import { AnimalProfile } from '../types/animal';

export const ADDITIONAL_PRESETS: Record<string, AnimalProfile> = {
  'ho-bengal': {
    id: 'ho-bengal',
    commonNameVi: 'Hổ Bengal',
    commonNameEn: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    otherNames: ['Chúa sơn lâm', 'Cọp Bengal'],
    tagline: 'Loài mèo lớn oai phong nhất hành tinh với những sọc vằn độc nhất vô nhị',
    summary: 'Hổ Bengal là phân loài hổ phổ biến nhất hiện nay, sinh sống chủ yếu ở Ấn Độ, Bangladesh, Nepal và Bhutan. Chúng là động vật ăn thịt đầu bảng với sức mạnh phi thường, có khả năng bơi lội cự phách khác hẳn đa số các loài họ Mèo.',
    conservationStatus: {
      code: 'EN',
      labelVi: 'Nguy cấp',
      labelEn: 'Endangered',
      description: 'Hiện chỉ còn khoảng 2.500 - 3.000 cá thể ngoài tự nhiên do săn trộm và mất rừng.',
      color: 'text-orange-400',
      badgeBg: 'bg-orange-950/80 border-orange-500/60'
    },
    taxonomy: {
      kingdom: 'Animalia (Động vật)',
      phylum: 'Chordata (Dây sống)',
      class: 'Mammalia (Động vật có vú)',
      order: 'Carnivora (Bộ Ăn thịt)',
      family: 'Felidae (Họ Mèo)',
      genus: 'Panthera (Chi Báo)',
      species: 'Panthera tigris'
    },
    metrics: {
      averageLength: '2.7 - 3.1 m (bao gồm đuôi)',
      averageWeight: '180 - 260 kg (con đực)',
      lifespanInWild: '10 - 15 năm',
      lifespanInCaptivity: '18 - 20 năm',
      topSpeed: '65 km/h',
      dietType: 'Động vật ăn thịt bắt buộc',
      activeTime: 'Hoàng hôn và ban đêm'
    },
    habitat: {
      biomes: ['Rừng mưa nhiệt đới', 'Rừng ngập mặn Sundarbans', 'Đồng cỏ cao'],
      regions: ['Ấn Độ', 'Bangladesh', 'Nepal', 'Bhutan'],
      description: 'Ưa thích các cánh rừng rậm rạp gần nguồn nước dồi dào và nhiều con mồi móng guốc.'
    },
    physicalCharacteristics: {
      description: 'Lớp lông màu cam vàng rực rỡ với các sọc vằn đen đặc trưng. Mỗi con hổ có hoa văn sọc vằn hoàn toàn khác biệt như vân tay con người.',
      keyFeatures: [
        'Răng nanh dài tới 7.5 - 10 cm, dài nhất trong các loài họ Mèo',
        'Lực cắn đạt 1.050 PSI, gấp đôi sư tử',
        'Có thể nhảy xa tới 9-10 mét chỉ trong một bước bật',
        'Thích tắm mát và bơi lội qua những con sông rộng nhiều kilomet'
      ],
      camouflageOrDefenses: 'Sọc đen xen lẫn màu cam giúp hổ hòa lẫn vào cỏ cao và bóng râm rừng rậm.'
    },
    behaviorAndEcology: {
      socialStructure: 'Sống hoàn toàn đơn độc, con đực bảo vệ lãnh thổ rộng tới 100 km².',
      huntingOrForaging: 'Rình mồi trong yên lặng tuyệt đối và tấn công bất ngờ từ phía sau hoặc bên hông.',
      communication: 'Gầm vang xa 3km, đánh dấu bằng nước tiểu và cào móng lên thân cây.',
      specialAdaptations: 'Đệm chân mềm giúp bước đi không tạo ra bất kỳ tiếng động nào.'
    },
    diet: {
      category: 'Ăn thịt chuyên biệt',
      primaryFoods: ['Hươu nai', 'Lợn rừng', 'Bò tót hoang dã'],
      description: 'Có thể ăn tới 30-40 kg thịt trong một đêm sau đó nhịn ăn vài ngày.'
    },
    reproduction: {
      gestationPeriod: '105 ngày',
      litterSize: '2 - 4 con non',
      parentalCare: 'Hổ mẹ nuôi con một mình trong khoảng 2 năm cho đến khi con tự lập.'
    },
    threatsAndConservation: {
      mainThreats: ['Nạn săn trộm lấy da và xương', 'Mất môi trường sống tự nhiên'],
      conservationEfforts: ['Dự án Project Tiger ở Ấn Độ', 'Hệ thống vườn quốc gia Jim Corbett, Ranthambore'],
      populationTrend: 'Đang phục hồi nhẹ nhờ bảo tồn nghiêm ngặt'
    },
    funFacts: [
      'Không chỉ lông có sọc mà ngay cả lớp DA của hổ cũng có sọc vằn giống hệt.',
      'Hổ là một trong số rất ít loài họ Mèo cực kỳ thích bơi lội và tắm mát dưới nước.',
      'Nước tiểu của hổ có mùi thơm như bỏng ngô bơ (bắp rang bơ) để đánh dấu lãnh thổ!',
      'Tiếng gầm trầm tần số thấp của hổ có thể làm con mồi bị tê liệt phản xạ trong giây lát.'
    ],
    humanComparison: {
      weightVsHuman: 'Nặng gấp 3 đến 4 lần một người đàn ông trưởng thành.',
      speedVsHuman: 'Chạy 65 km/h, nhanh hơn người chạy nhanh nhất 20 km/h.',
      lifespanVsHuman: 'Khoảng 1/5 tuổi thọ con người.',
      sizeScaleText: 'Dài gần bằng một chiếc ô tô 4 chỗ loại nhỏ.'
    },
    quiz: [
      {
        question: 'Điểm đặc biệt nào của hổ khác với đa số loài họ Mèo?',
        options: ['Rất sợ nước', 'Cực kỳ thích tắm mát và bơi lội', 'Chỉ ăn hoa quả', 'Sống theo bầy đàn 50 con'],
        correctIndex: 1,
        explanation: 'Khác với mèo nhà hay sư tử, hổ yêu thích nước và có thể bơi qua những con sông rộng nhiều kilomet.'
      },
      {
        question: 'Nếu cạo sạch lông của hổ thì chuyện gì xảy ra?',
        options: ['Da sẽ trắng tinh', 'Da vẫn giữ nguyên các sọc đen như trên lông', 'Da có màu hồng', 'Da biến thành đốm'],
        correctIndex: 1,
        explanation: 'Hoa văn sọc vằn của hổ in sâu vào lớp biểu bì da, nên cạo sạch lông thì lớp da bên dưới vẫn có sọc vằn y hệt.'
      },
      {
        question: 'Răng nanh của hổ Bengal có thể dài tới bao nhiêu?',
        options: ['2 - 3 cm', '7.5 - 10 cm', '15 - 20 cm', 'Không có răng nanh'],
        correctIndex: 1,
        explanation: 'Răng nanh hổ Bengal dài tới 7.5 - 10 cm, dài nhất trong các loài mèo lớn trên Trái Đất.'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Hổ Bengal với sọc vằn tuyệt mỹ trong rừng rậm',
    imageSource: 'Unsplash Wildlife',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80', title: 'Hổ Bengal săn mồi', source: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80', title: 'Ánh mắt sắc bén', source: 'Unsplash' }
    ]
  },

  'gau-truc-lon': {
    id: 'gau-truc-lon',
    commonNameVi: 'Gấu trúc lớn',
    commonNameEn: 'Giant Panda',
    scientificName: 'Ailuropoda melanoleuca',
    otherNames: ['Gấu trúc Tứ Xuyên', 'Đại hùng miêu'],
    tagline: 'Biểu tượng bảo tồn thiên nhiên thế giới với tình yêu bất tận dành cho cây tre',
    summary: 'Gấu trúc lớn là loài động vật có vú bản địa của vùng núi miền Trung Trung Quốc. Mặc dù thuộc bộ Ăn thịt, hơn 99% khẩu phần ăn hàng ngày của gấu trúc lại là tre và trúc. Chúng là biểu tượng toàn cầu của Quỹ Quốc tế Bảo vệ Thiên nhiên (WWF).',
    conservationStatus: {
      code: 'VU',
      labelVi: 'Sắp nguy cấp',
      labelEn: 'Vulnerable',
      description: 'Số lượng hoang dã đã tăng lên khoảng 1.800 cá thể, được hạ bậc từ Nguy cấp (EN) xuống Sắp nguy cấp (VU) nhờ nỗ lực tái tạo rừng tre.',
      color: 'text-amber-400',
      badgeBg: 'bg-amber-950/80 border-amber-500/60'
    },
    taxonomy: {
      kingdom: 'Animalia (Động vật)',
      phylum: 'Chordata (Dây sống)',
      class: 'Mammalia (Động vật có vú)',
      order: 'Carnivora (Bộ Ăn thịt)',
      family: 'Ursidae (Họ Gấu)',
      genus: 'Ailuropoda',
      species: 'Ailuropoda melanoleuca'
    },
    metrics: {
      averageLength: '1.2 - 1.9 m',
      averageWeight: '75 - 125 kg',
      lifespanInWild: '15 - 20 năm',
      lifespanInCaptivity: 'Lên tới 30 - 35 năm',
      topSpeed: '32 km/h',
      dietType: 'Động vật ăn cỏ chuyên biệt (Folivore / Ăn tre)',
      activeTime: 'Hoạt động rải rác cả ngày lẫn đêm để ăn'
    },
    habitat: {
      biomes: ['Rừng tre nứa trên núi cao', 'Rừng hỗn giao ôn đới'],
      regions: ['Miền núi Tứ Xuyên, Thiểm Tây, Cam Túc (Trung Quốc)'],
      description: 'Sống ở độ cao từ 1.200 đến 3.500m nơi có mây mù bao phủ quanh năm và những rừng tre rậm rạp.'
    },
    physicalCharacteristics: {
      description: 'Bộ lông dày hai màu đen trắng tương phản rõ nét với các mảng đen quanh mắt, tai, vai và bốn chân giúp ngụy trang trong cả tuyết và bóng râm rậm rạp.',
      keyFeatures: [
        'Ngón tay cái giả (xương cổ tay biến đổi) giúp cầm nắm thân tre điệu nghệ',
        'Hàm răng bẹt lớn với cơ nhai cực khỏe để nghiền nát thân tre cứng',
        'Lớp niêm mạc thực quản và dạ dày dày giúp chống lại các dằm tre sắc nhọn',
        'Con sơ sinh cực nhỏ chỉ nặng khoảng 100g, bé bằng một thanh bơ'
      ],
      camouflageOrDefenses: 'Bộ lông đen trắng giúp hòa lẫn vào tuyết trắng và các vách đá bóng râm mùa đông.'
    },
    behaviorAndEcology: {
      socialStructure: 'Sống đơn độc, chỉ gặp nhau vào mùa giao phối ngắn ngủi mùa xuân.',
      huntingOrForaging: 'Dành 12 - 16 giờ mỗi ngày chỉ để ngồi ăn tre nhằm nạp đủ năng lượng.',
      communication: 'Giao tiếp qua tiếng kêu be be như cừu, tiếng sủa và để lại mùi hương trên cây.',
      specialAdaptations: 'Dù ruột của loài ăn thịt ngắn, vi khuẩn đường ruột độc đáo giúp chúng tiêu hóa chất xơ tre.'
    },
    diet: {
      category: 'Ăn thực vật (99% tre)',
      primaryFoods: ['Măng tre', 'Lá tre', 'Thân tre trúc'],
      description: 'Một con gấu trúc trưởng thành ăn từ 12 đến 38 kg tre mỗi ngày và đi vệ sinh tới 40 lần một ngày!'
    },
    reproduction: {
      gestationPeriod: '95 - 160 ngày',
      litterSize: '1 - 2 con (nhưng mẹ thường chỉ nuôi một con)',
      parentalCare: 'Gấu trúc con đỏ hỏn, không lông và mù mắt, phụ thuộc hoàn toàn vào mẹ trong nhiều tháng.'
    },
    threatsAndConservation: {
      mainThreats: ['Hiện tượng tre nở hoa đồng loạt rồi chết', 'Chia cắt rừng do đường sá'],
      conservationEfforts: ['Mạng lưới khu bảo tồn gấu trúc Tứ Xuyên', 'Trung tâm nhân giống Thành Đô'],
      populationTrend: 'Tăng trưởng ổn định'
    },
    funFacts: [
      'Gấu trúc sơ sinh chỉ nặng khoảng 1/900 trọng lượng của mẹ mình - tỷ lệ chênh lệch lớn nhất ở thú có vú!',
      'Gấu trúc có một "ngón tay cái giả" thứ sáu thực chất là xương cổ tay phát triển thêm để cầm cây tre.',
      'Mỗi ngày gấu trúc có thể thải ra tới hơn 20 kg phân tre sạch không mùi hôi.',
      'Gấu trúc có thể ngủ ở bất kỳ tư thế nào: nằm ngửa, treo mình trên cành cây hoặc cuộn tròn như quả bóng.'
    ],
    humanComparison: {
      weightVsHuman: 'Nặng khoảng 1.5 lần người trưởng thành (100kg so với 70kg).',
      speedVsHuman: 'Chạy chậm hơn người một chút trên địa hình bằng, nhưng leo dốc và trèo cây rất giỏi.',
      lifespanVsHuman: 'Khoảng 1/4 tuổi thọ con người.',
      sizeScaleText: 'Đứng bằng hai chân cao khoảng 1.5m, ngang vai người lớn.'
    },
    quiz: [
      {
        question: 'Gấu trúc dành bao nhiêu giờ mỗi ngày chỉ để ăn tre?',
        options: ['2 - 3 giờ', '5 - 6 giờ', '12 - 16 giờ', '24 giờ không ngủ'],
        correctIndex: 2,
        explanation: 'Do tre có rất ít dinh dưỡng, gấu trúc phải dành 12-16 tiếng mỗi ngày để ăn liên tục 15-30kg tre.'
      },
      {
        question: 'Gấu trúc con khi mới sinh nặng khoảng bao nhiêu?',
        options: ['Khoảng 100 gram', 'Khoảng 2 kg', 'Khoảng 5 kg', 'Khoảng 10 kg'],
        correctIndex: 0,
        explanation: 'Gấu trúc con sơ sinh bé xíu chỉ nặng khoảng 90-130 gram, nhỏ bằng 1/900 cân nặng của gấu mẹ.'
      },
      {
        question: 'Cấu tạo kỳ lạ nào giúp gấu trúc cầm nắm được cây tre?',
        options: ['Bộ móng vuốt dính liền', 'Một ngón cái giả tiến hóa từ xương cổ tay', 'Đôi tai linh hoạt', 'Cái đuôi dài'],
        correctIndex: 1,
        explanation: 'Gấu trúc có xương cổ tay biến đổi thành một "ngón cái giả" giúp chúng kẹp chặt và tước vỏ tre điêu luyện.'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Gấu trúc lớn thư thái thưởng thức những cành tre tươi',
    imageSource: 'Unsplash Wildlife',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?auto=format&fit=crop&w=1200&q=80', title: 'Gấu trúc ăn tre', source: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=1200&q=80', title: 'Thiên nhiên Tứ Xuyên', source: 'Unsplash' }
    ]
  },

  'ky-giong-axolotl': {
    id: 'ky-giong-axolotl',
    commonNameVi: 'Kỳ giông Axolotl',
    commonNameEn: 'Axolotl (Mexican Walking Fish)',
    scientificName: 'Ambystoma mexicanum',
    otherNames: ['Khủng long sáu sừng', 'Kỳ giông Mexico'],
    tagline: 'Sinh vật không bao giờ lớn với siêu năng lực tái sinh toàn bộ cơ quan nội tạng và não bộ',
    summary: 'Kỳ giông Axolotl là một loài kỳ giông nước ngọt độc đáo chỉ tìm thấy tự nhiên ở hồ Xochimilco gần Mexico City. Chúng nổi tiếng thế giới nhờ hiện tượng giữ lại hình thái ấu trùng suốt đời (neoteny) và khả năng tái sinh kỳ diệu.',
    conservationStatus: {
      code: 'CR',
      labelVi: 'Cực kỳ nguy cấp',
      labelEn: 'Critically Endangered',
      description: 'Số lượng ngoài tự nhiên gần như tuyệt chủng do ô nhiễm kênh đào Xochimilco và các loài cá ngoại lai xâm lấn.',
      color: 'text-red-400',
      badgeBg: 'bg-red-950/80 border-red-500/60'
    },
    taxonomy: {
      kingdom: 'Animalia (Động vật)',
      phylum: 'Chordata (Dây sống)',
      class: 'Amphibia (Lớp Lưỡng cư)',
      order: 'Urodela (Bộ Có đuôi)',
      family: 'Ambystomatidae',
      genus: 'Ambystoma',
      species: 'Ambystoma mexicanum'
    },
    metrics: {
      averageLength: '15 - 30 cm',
      averageWeight: '150 - 300 gram',
      lifespanInWild: '10 - 15 năm',
      lifespanInCaptivity: '12 - 15 năm',
      topSpeed: 'Bơi lội uyển chuyển dưới đáy nước',
      dietType: 'Động vật ăn thịt nhỏ (Carnivore)',
      activeTime: 'Ban đêm'
    },
    habitat: {
      biomes: ['Hồ nước ngọt vùng cao nguyên', 'Hệ thống kênh đào Xochimilco'],
      regions: ['Thung lũng Mexico City, Mexico'],
      description: 'Sống hoàn toàn dưới đáy hồ nước ngọt sâu có nhiều thực vật thủy sinh che chở.'
    },
    physicalCharacteristics: {
      description: 'Khuôn mặt luôn như đang mỉm cười với 6 nhánh mang ngoài màu hồng giống như những chiếc lông vũ vươn ra từ hai bên đầu.',
      keyFeatures: [
        '6 nhánh mang ngoài màu hồng rực rỡ để hô hấp dưới nước',
        'Hiện tượng Neoteny: giữ nguyên mang và vây bơi của ấu trùng ngay cả khi sinh sản',
        'Có thể tái sinh hoàn hảo chi, mắt, đuôi, tim và thậm chí một phần não bộ',
        'Khả năng chống ung thư cao gấp 1.000 lần so với các loài động vật có vú'
      ],
      camouflageOrDefenses: 'Trong tự nhiên chúng có màu nâu sẫm để ẩn mình trong bùn đáy hồ; màu hồng trắng là dạng đột biến nuôi cảnh.'
    },
    behaviorAndEcology: {
      socialStructure: 'Sống đơn độc, chỉ tương tác khi ghép đôi.',
      huntingOrForaging: 'Hút con mồi bằng cách tạo lực hút chân không nhanh chóng mở miệng.',
      communication: 'Dùng tín hiệu khứu giác và hóa học trong nước.',
      specialAdaptations: 'Tế bào gốc tại vị trí tổn thương tạo ra mầm tái sinh (blastema) mọc lại chi nguyên vẹn trong vài tuần.'
    },
    diet: {
      category: 'Ăn động vật nhỏ',
      primaryFoods: ['Trùn chỉ', 'Côn trùng nước', 'Cá nhỏ', 'Giáp xác nhỏ'],
      description: 'Đớp và nuốt chửng toàn bộ con mồi nhờ lực hút của xoang miệng.'
    },
    reproduction: {
      gestationPeriod: 'Trứng nở sau 10 - 14 ngày',
      litterSize: '100 - 1.000 quả trứng',
      parentalCare: 'Không có tập tính chăm sóc trứng hay con non.'
    },
    threatsAndConservation: {
      mainThreats: ['Ô nhiễm nguồn nước thải đô thị', 'Cá chép và cá rô phi du nhập ăn thịt ấu trùng'],
      conservationEfforts: ['Dự án phục hồi đảo nổi Chinampa ở Xochimilco', 'Nuôi cấy bảo tồn trong phòng thí nghiệm toàn cầu'],
      populationTrend: 'Bên bờ vực tuyệt chủng tự nhiên'
    },
    funFacts: [
      'Axolotl có thể mọc lại một cái chân bị đứt gãy tới cả chục lần mà không để lại bất kỳ vết sẹo nào!',
      'Chúng có thể tiếp nhận nội tạng cấy ghép từ con khác (kể cả mắt hay não) mà không bị hệ miễn dịch đào thải.',
      'Người Aztec cổ đại tôn sùng Axolotl như hiện thân của vị thần Xolotl biến hình để trốn tránh cái chết.',
      'Dù cực kỳ nguy cấp ngoài tự nhiên, Axolotl lại là thú cưng thủy sinh rất phổ biến và được nuôi hàng triệu con trong bể kính.'
    ],
    humanComparison: {
      weightVsHuman: 'Chỉ bằng 1/350 trọng lượng người lớn (chừng 200 gram).',
      speedVsHuman: 'Di chuyển chậm chạp lững lờ dưới đáy nước.',
      lifespanVsHuman: 'Khoảng 1/6 tuổi thọ con người.',
      sizeScaleText: 'Nằm gọn gàng trong lòng bàn tay một người lớn.'
    },
    quiz: [
      {
        question: 'Siêu năng lực kỳ diệu nhất của loài kỳ giông Axolotl là gì?',
        options: ['Bay lượn trên không', 'Tái sinh chi, tim và não bộ mà không để lại sẹo', 'Phun ra nọc độc chết người', 'Tạo ra dòng điện 500V'],
        correctIndex: 1,
        explanation: 'Axolotl là nhà vô địch tái sinh của thế giới động vật, có thể mọc lại hoàn hảo tứ chi, đuôi, tim và cả tế bào não.'
      },
      {
        question: '6 nhánh tua rua mọc hai bên đầu của Axolotl là bộ phận gì?',
        options: ['Đôi tai', 'Những chiếc sừng tự vệ', 'Các nhánh mang ngoài dùng để hô hấp', 'Râu cảm biến nhiệt'],
        correctIndex: 2,
        explanation: 'Đó là 6 nhánh mang ngoài có nhiều sợi tơ giàu mạch máu giúp chúng lọc oxy trực tiếp từ nước hồ.'
      },
      {
        question: 'Kỳ giông Axolotl có nguồn gốc tự nhiên duy nhất ở quốc gia nào?',
        options: ['Việt Nam', 'Mexico', 'Madagascar', 'Australia'],
        correctIndex: 1,
        explanation: 'Axolotl là loài đặc hữu duy nhất của hệ thống hồ Xochimilco tại Mexico City, Mexico.'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Kỳ giông Axolotl với nụ cười đặc trưng và bộ mang hồng',
    imageSource: 'Unsplash Wildlife',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', title: 'Kỳ giông Axolotl bơi lội', source: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80', title: 'Hồ nước Mexico', source: 'Unsplash' }
    ]
  },

  'sao-la': {
    id: 'sao-la',
    commonNameVi: 'Sao La',
    commonNameEn: 'Saola (Asian Unicorn)',
    scientificName: 'Pseudoryx nghetinhensis',
    otherNames: ['Kỳ lân châu Á', 'Bò sừng dài Vũ Quang'],
    tagline: 'Kỳ lân huyền bí của dãy Trường Sơn - một trong những phát hiện động vật học chấn động nhất thế kỷ 20',
    summary: 'Sao La là một trong những loài thú hiếm nhất thế giới, được các nhà khoa học Việt Nam và quốc tế phát hiện lần đầu tại Vườn quốc gia Vũ Quang (Hà Tĩnh) vào năm 1992. Được mệnh danh là "Kỳ lân châu Á", Sao La mang vẻ đẹp bí ẩn và thanh nhã.',
    conservationStatus: {
      code: 'CR',
      labelVi: 'Cực kỳ nguy cấp',
      labelEn: 'Critically Endangered',
      description: 'Ước tính ngoài tự nhiên chỉ còn dưới vài chục cá thể. Chưa từng có cá thể nào sống sót thành công trong điều kiện nuôi nhốt.',
      color: 'text-red-400',
      badgeBg: 'bg-red-950/80 border-red-500/60'
    },
    taxonomy: {
      kingdom: 'Animalia (Động vật)',
      phylum: 'Chordata (Dây sống)',
      class: 'Mammalia (Động vật có vú)',
      order: 'Artiodactyla (Bộ Móng guốc chẵn)',
      family: 'Bovidae (Họ Trâu bò)',
      genus: 'Pseudoryx',
      species: 'Pseudoryx nghetinhensis'
    },
    metrics: {
      averageLength: '1.3 - 1.5 m (cao vai 80 - 90 cm)',
      averageWeight: '80 - 100 kg',
      lifespanInWild: '8 - 12 năm',
      lifespanInCaptivity: 'Không thể nuôi nhốt nhân tạo',
      topSpeed: 'Di chuyển thoăn thoắt trên sườn dốc đá',
      dietType: 'Động vật ăn lá cây (Herbivore)',
      activeTime: 'Bình minh và hoàng hôn'
    },
    habitat: {
      biomes: ['Rừng mưa nhiệt đới thường xanh ẩm ướt', 'Rừng nguyên sinh rậm rạp trên dãy Trường Sơn'],
      regions: ['Dãy núi Trường Sơn (Việt Nam và Lào)'],
      description: 'Sống ven các dòng suối sâu trong rừng nguyên sinh rậm rạp có độ cao từ 400 đến 1.200m.'
    },
    physicalCharacteristics: {
      description: 'Thân hình thon thả phủ lớp lông màu nâu hạt dẻ mượt mà, trên mặt có các vệt trắng nổi bật như những nét vẽ trang điểm độc đáo.',
      keyFeatures: [
        'Cặp sừng thẳng dài 30 - 50 cm vuốt nhọn về phía sau ở cả con đực và con cái',
        'Tuyến mùi hương lớn dưới mắt có nắp che để đánh dấu lãnh thổ',
        'Các đốm và sọc trắng tinh tế trên mặt và mõm',
        'Đuôi ngắn có 3 khoang màu đen nâu trắng'
      ],
      camouflageOrDefenses: 'Cặp sừng nhọn hoắt dùng để tự vệ trước báo hoa mai và chó rừng.'
    },
    behaviorAndEcology: {
      socialStructure: 'Sống đơn độc hoặc theo từng cặp mẹ con trong rừng sâu.',
      huntingOrForaging: 'Chuyên ăn các loại lá cây ven suối như cây môn thục, cây dong rừng.',
      communication: 'Tiết dịch mùi hương nồng từ tuyến xoang mặt lên các tảng đá và thân cây.',
      specialAdaptations: 'Bộ móng guốc sắc bén giúp bám chắc trên các vách đá trơn trượt của rừng mưa nhiệt đới.'
    },
    diet: {
      category: 'Ăn thực vật',
      primaryFoods: ['Lá cây bụi ven suối', 'Chồi non môn thục', 'Cỏ rừng'],
      description: 'Chỉ chọn ăn những loại lá cây tươi mọng nước ven các khe suối trong vắt.'
    },
    reproduction: {
      gestationPeriod: 'Khoảng 8 tháng',
      litterSize: '1 con non duy nhất',
      parentalCare: 'Mẹ bảo bọc con non kỹ lưỡng trong những bụi rậm hoang sơ.'
    },
    threatsAndConservation: {
      mainThreats: ['Bẫy dây thép săn bắt thú rừng bất hợp pháp', 'Mất rừng nguyên sinh Trường Sơn'],
      conservationEfforts: ['Khu bảo tồn loài Sao La tại Thừa Thiên Huế và Quảng Nam', 'Chiến dịch tháo gỡ bẫy của WWF'],
      populationTrend: 'Cực kỳ nguy cấp, bí ẩn'
    },
    funFacts: [
      'Việc phát hiện Sao La năm 1992 được coi là phát hiện thú lớn chấn động nhất thế giới trong hơn 50 năm!',
      'Sao La được chọn làm linh vật chính thức của Đại hội Thể thao Đông Nam Á SEA Games 31 tổ chức tại Việt Nam.',
      'Loài này nhút nhát và bí ẩn đến mức trong hơn 30 năm qua, số lần con người chụp được ảnh chúng chỉ đếm trên đầu ngón tay.',
      'Tên gọi "Sao La" bắt nguồn từ tiếng của đồng bào dân tộc Thái ở Việt Nam, có nghĩa là "hai chiếc cọc suốt dệt vải".'
    ],
    humanComparison: {
      weightVsHuman: 'Nặng khoảng 80-100 kg, tương đương một vận động viên thể hình.',
      speedVsHuman: 'Chạy băng rừng và leo dốc đá trơn trượt nhanh hơn con người gấp nhiều lần.',
      lifespanVsHuman: 'Khoảng 1/7 tuổi thọ con người.',
      sizeScaleText: 'Chiều cao ngang eo người lớn, thân hình thanh thoát như linh dương.'
    },
    quiz: [
      {
        question: 'Sao La được phát hiện lần đầu tiên tại quốc gia nào vào năm 1992?',
        options: ['Ấn Độ', 'Việt Nam (Vườn quốc gia Vũ Quang)', 'Thái Lan', 'Indonesia'],
        correctIndex: 1,
        explanation: 'Sao La được phát hiện lần đầu năm 1992 tại Vườn quốc gia Vũ Quang (Hà Tĩnh, Việt Nam), là phát hiện động vật học chấn động thế giới.'
      },
      {
        question: 'Sao La từng được chọn làm linh vật cho sự kiện thể thao lớn nào tại Việt Nam?',
        options: ['Olympic Tokyo', 'SEA Games 31 (2022)', 'World Cup', 'Asian Games'],
        correctIndex: 1,
        explanation: 'Sao La vinh dự được chọn làm linh vật chính thức của SEA Games 31 tổ chức tại Việt Nam.'
      },
      {
        question: 'Tại sao Sao La còn được quốc tế mệnh danh là "Kỳ lân châu Á"?',
        options: ['Vì chúng chỉ có một sừng', 'Vì vẻ đẹp thanh thoát bí ẩn và cực kỳ hiếm thấy trong tự nhiên', 'Vì chúng biết bay', 'Vì chúng phát ra ánh sáng'],
        correctIndex: 1,
        explanation: 'Nhờ vẻ đẹp tao nhã, tính nhút nhát và sự hiếm hoi huyền thoại giữa đại ngàn Trường Sơn, chúng được tôn vinh là Kỳ lân châu Á.'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Sao La - Báu vật huyền bí của đại ngàn Trường Sơn Việt Nam',
    imageSource: 'WWF / Wikimedia Commons',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80', title: 'Kỳ lân châu Á bí ẩn', source: 'Wikimedia' },
      { url: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80', title: 'Rừng nguyên sinh Trường Sơn', source: 'Unsplash' }
    ]
  },

  'rong-komodo': {
    id: 'rong-komodo',
    commonNameVi: 'Rồng Komodo',
    commonNameEn: 'Komodo Dragon',
    scientificName: 'Varanus komodoensis',
    otherNames: ['Kỳ đà khổng lồ Komodo', 'Rồng đất Indonesia'],
    tagline: 'Loài thằn lằn lớn nhất còn sống sót trên Trái Đất mang nọc độc chết chóc',
    summary: 'Rồng Komodo là loài thằn lằn lớn nhất còn tồn tại trên Trái Đất, sinh sống trên các hòn đảo thuộc vườn quốc gia Komodo của Indonesia. Chúng có thể dài tới 3 mét, nặng hơn 70kg và sở hữu các tuyến nọc độc làm đông máu con mồi.',
    conservationStatus: {
      code: 'EN',
      labelVi: 'Nguy cấp',
      labelEn: 'Endangered',
      description: 'Số lượng hoang dã ước tính chỉ còn dưới 1.400 cá thể trưởng thành do biến đổi khí hậu làm dâng mực nước biển và thu hẹp đảo.',
      color: 'text-orange-400',
      badgeBg: 'bg-orange-950/80 border-orange-500/60'
    },
    taxonomy: {
      kingdom: 'Animalia (Động vật)',
      phylum: 'Chordata (Dây sống)',
      class: 'Reptilia (Lớp Bò sát)',
      order: 'Squamata (Bộ Có vảy)',
      family: 'Varanidae (Họ Kỳ đà)',
      genus: 'Varanus',
      species: 'Varanus komodoensis'
    },
    metrics: {
      averageLength: '2.3 - 3.0 m',
      averageWeight: '70 - 90 kg (có cá thể nặng trên 130 kg)',
      lifespanInWild: '30 năm',
      lifespanInCaptivity: 'Lên tới 50 năm',
      topSpeed: '20 km/h (trong cự ly ngắn)',
      dietType: 'Động vật ăn thịt săn mồi và ăn xác thối',
      activeTime: 'Ban ngày (Diurnal)'
    },
    habitat: {
      biomes: ['Rừng thưa xavan nhiệt đới', 'Bãi biển cát và đồi cỏ khô'],
      regions: ['Các đảo Komodo, Rinca, Flores, Gili Motang (Indonesia)'],
      description: 'Thích ứng với khí hậu khô cằn khắc nghiệt trên các đảo núi lửa đá vôi.'
    },
    physicalCharacteristics: {
      description: 'Thân hình đồ sộ, da sần sùi bọc vảy xương cứng như áo giáp (osteoderms), 4 chân ngắn lực lưỡng và chiếc đuôi dài cuồn cuộn cơ bắp.',
      keyFeatures: [
        'Chiếc lưỡi chẻ đôi màu vàng nhạt liên tục thè ra để nếm phân tử mùi trong không khí',
        'Tuyến nọc độc ở hàm dưới tiết ra chất chống đông máu và gây sốc tụt huyết áp',
        '60 chiếc răng cưa sắc nhọn dài 2.5 cm thường xuyên thay mới',
        'Có thể nuốt trọn những con mồi nặng bằng 80% trọng lượng cơ thể'
      ],
      camouflageOrDefenses: 'Lớp vảy màu xám đất giúp ngụy trang hoàn hảo trên sỏi đá đảo khô cằn.'
    },
    behaviorAndEcology: {
      socialStructure: 'Sống đơn độc, tụ tập đông khi có xác động vật lớn chết.',
      huntingOrForaging: 'Phục kích cắn một nhát làm con mồi trúng nọc độc rồi kiên nhẫn đi theo chờ con mồi kiệt sức ngã gục.',
      communication: 'Dùng lưỡi nếm mùi phát hiện xác mồi cách xa tới 9.5 km!',
      specialAdaptations: 'Khả năng sinh sản đơn tính (Parthenogenesis) - con cái có thể đẻ trứng nở thành con mà không cần con đực giao phối!'
    },
    diet: {
      category: 'Ăn thịt đầu bảng',
      primaryFoods: ['Nai đảo Rusa', 'Lợn rừng', 'Trâu nước', 'Xác thối'],
      description: 'Ăn ngấu nghiến toàn bộ con mồi bao gồm cả xương, da và móng guốc.'
    },
    reproduction: {
      gestationPeriod: 'Trứng ấp trong tổ đất khoảng 7 - 8 tháng',
      litterSize: '20 - 30 quả trứng',
      parentalCare: 'Rồng con khi nở phải lập tức trèo tót lên cây sống nhiều năm để tránh bị rồng lớn ăn thịt.'
    },
    threatsAndConservation: {
      mainThreats: ['Nước biển dâng do biến đổi khí hậu', 'Mất nguồn thức ăn do con người săn bắt nai'],
      conservationEfforts: ['Vườn quốc gia Komodo được UNESCO công nhận di sản thế giới'],
      populationTrend: 'Bị đe dọa nghiêm trọng'
    },
    funFacts: [
      'Rồng Komodo có thể ngửi thấy mùi xác động vật cách xa gần 10 km nhờ chiếc lưỡi chẻ đôi cảm nhận hạt hóa học.',
      'Rồng con dành phần lớn 3 năm đầu đời sống trên cây cao vì những con rồng trưởng thành sẵn sàng ăn thịt chính đồng loại non của mình!',
      'Rồng Komodo cái có thể sinh con trinh nữ (không cần thụ tinh bởi con đực) khi sống biệt lập một mình.',
      'Dạ dày của chúng co giãn cực đại, cho phép nuốt chửng cả một con dê nhỏ trong một lần nuốt.'
    ],
    humanComparison: {
      weightVsHuman: 'Nặng tương đương hoặc hơn một người trưởng thành (80-100kg).',
      speedVsHuman: 'Bứt tốc 20 km/h, đủ nhanh để đuổi kịp người chạy cự ly ngắn.',
      lifespanVsHuman: 'Khoảng 1/2 tuổi thọ con người (30-50 năm).',
      sizeScaleText: 'Dài gấp đôi chiều cao người lớn khi nằm duỗi thẳng (3 mét).'
    },
    quiz: [
      {
        question: 'Rồng Komodo dùng bộ phận nào để đánh hơi thấy con mồi từ xa 10 km?',
        options: ['Lỗ mũi cực lớn', 'Chiếc lưỡi chẻ đôi màu vàng liên tục thè ra', 'Đôi tai thính', 'Đôi mắt tinh tường'],
        correctIndex: 1,
        explanation: 'Rồng Komodo thè chiếc lưỡi chẻ đôi ra để gom các hạt mùi trong không khí đưa vào cơ quan Jacobson trên vòm họng.'
      },
      {
        question: 'Tại sao rồng Komodo con mới nở phải trèo ngay lên cây sống trong 2-3 năm đầu?',
        options: ['Để ăn quả chín', 'Để tránh bị rồng Komodo trưởng thành ăn thịt đồng loại', 'Để tập bay', 'Để sưởi nắng'],
        correctIndex: 1,
        explanation: 'Rồng trưởng thành rất phàm ăn và thường xuyên ăn thịt chính con non cùng loài; trèo lên cây là cách duy nhất để con non sống sót.'
      },
      {
        question: 'Rồng Komodo hiện nay chỉ sinh sống tự nhiên tại quốc gia nào?',
        options: ['Thái Lan', 'Indonesia', 'Australia', 'Brazil'],
        correctIndex: 1,
        explanation: 'Rồng Komodo là loài đặc hữu độc nhất chỉ sống trên một vài hòn đảo thuộc Vườn quốc gia Komodo ở Indonesia.'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Rồng Komodo khổng lồ trên đảo đá Indonesia',
    imageSource: 'Unsplash Wildlife',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80', title: 'Rồng Komodo tuần tra bờ biển', source: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1560275619-4ccb1e344f80?auto=format&fit=crop&w=1200&q=80', title: 'Thiên nhiên hoang dã Indonesia', source: 'Unsplash' }
    ]
  }
};
