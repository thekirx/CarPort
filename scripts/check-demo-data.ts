import { SAMPLE_DATA } from "../src/lib/demo";
import { wheels } from "../src/data/wheels";
import { vehicles } from "../src/data/vehicles";

const hasSamples = wheels.some((wheel) => wheel.sample || wheel.variants.some((item) => item.sample)) || vehicles.some((vehicle) => vehicle.sample);

if (hasSamples && !SAMPLE_DATA) {
  throw new Error("Sample records are present while demo mode is disabled.");
}

console.log(`Demo guard passed: ${wheels.length} sample wheels and ${vehicles.length} sample vehicles are labelled.`);
