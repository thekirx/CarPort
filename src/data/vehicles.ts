import type { Vehicle } from "./types";

export const vehicles: Vehicle[] = [
  { slug: "mazda-3", make: "Mazda", model: "3", yearLabel: "2019–2025", pcd: "5x114.3", hubBore: 67.1, diameterWindow: [17, 19], widthWindow: [7, 8.5], offsetWindow: [35, 45], segment: "sedan", validated: true, sample: true },
  { slug: "honda-civic", make: "Honda", model: "Civic FC / FE", yearLabel: "2016–2025", pcd: "5x114.3", hubBore: 64.1, diameterWindow: [17, 19], widthWindow: [7, 9], offsetWindow: [35, 48], segment: "sedan", validated: true, sample: true },
  { slug: "toyota-corolla-altis", make: "Toyota", model: "Corolla Altis", yearLabel: "2019–2025", pcd: "5x100", hubBore: 54.1, diameterWindow: [16, 18], widthWindow: [6.5, 8], offsetWindow: [35, 45], segment: "sedan", validated: false, sample: true },
  { slug: "toyota-vios", make: "Toyota", model: "Vios", yearLabel: "2013–2025", pcd: "4x100", hubBore: 54.1, diameterWindow: [15, 17], widthWindow: [6, 7.5], offsetWindow: [35, 45], segment: "compact", validated: false, sample: true },
  { slug: "honda-city", make: "Honda", model: "City", yearLabel: "2014–2025", pcd: "4x100", hubBore: 54.1, diameterWindow: [15, 17], widthWindow: [6, 7.5], offsetWindow: [35, 45], segment: "compact", validated: false, sample: true },
  { slug: "mitsubishi-mirage-g4", make: "Mitsubishi", model: "Mirage G4", yearLabel: "2013–2025", pcd: "4x100", hubBore: 56.1, diameterWindow: [14, 16], widthWindow: [5.5, 7], offsetWindow: [35, 45], segment: "compact", validated: false, sample: true },
  { slug: "toyota-raize", make: "Toyota", model: "Raize", yearLabel: "2022–2025", pcd: "4x100", hubBore: 54.1, diameterWindow: [16, 18], widthWindow: [6, 7.5], offsetWindow: [35, 45], segment: "crossover", validated: false, sample: true },
  { slug: "suzuki-jimny", make: "Suzuki", model: "Jimny", yearLabel: "2019–2025", pcd: "5x139.7", hubBore: 108, diameterWindow: [15, 17], widthWindow: [5.5, 8], offsetWindow: [-5, 20], segment: "suv", validated: true, sample: true },
  { slug: "toyota-hilux", make: "Toyota", model: "Hilux", yearLabel: "2016–2025", pcd: "6x139.7", hubBore: 106.1, diameterWindow: [17, 20], widthWindow: [7.5, 9], offsetWindow: [0, 25], segment: "pickup", validated: false, sample: true },
  { slug: "ford-ranger", make: "Ford", model: "Ranger", yearLabel: "2012–2025", pcd: "6x139.7", hubBore: 93.1, diameterWindow: [17, 20], widthWindow: [7.5, 9], offsetWindow: [0, 25], segment: "pickup", validated: false, sample: true },
  { slug: "nissan-navara", make: "Nissan", model: "Navara", yearLabel: "2015–2025", pcd: "6x114.3", hubBore: 66.1, diameterWindow: [17, 20], widthWindow: [7.5, 9], offsetWindow: [15, 35], segment: "pickup", validated: false, sample: true },
  { slug: "toyota-fortuner", make: "Toyota", model: "Fortuner", yearLabel: "2016–2025", pcd: "6x139.7", hubBore: 106.1, diameterWindow: [17, 20], widthWindow: [7.5, 9], offsetWindow: [0, 25], segment: "suv", validated: false, sample: true },
  { slug: "mitsubishi-montero-sport", make: "Mitsubishi", model: "Montero Sport", yearLabel: "2016–2025", pcd: "6x139.7", hubBore: 67.1, diameterWindow: [17, 20], widthWindow: [7.5, 9], offsetWindow: [10, 30], segment: "suv", validated: false, sample: true },
  { slug: "ford-everest", make: "Ford", model: "Everest", yearLabel: "2015–2025", pcd: "6x139.7", hubBore: 93.1, diameterWindow: [17, 20], widthWindow: [7.5, 9], offsetWindow: [0, 25], segment: "suv", validated: false, sample: true },
  { slug: "toyota-innova", make: "Toyota", model: "Innova", yearLabel: "2016–2025", pcd: "6x139.7", hubBore: 106.1, diameterWindow: [17, 19], widthWindow: [7, 8.5], offsetWindow: [15, 35], segment: "suv", validated: false, sample: true }
];
