/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the type 'J' as a generic object or null
type J = { readonly [key: string]: unknown } | null;

// Function to map the input data based on a given structure
export function mapJsonData<T>(inputData: T, structure: J): J {
  if (!structure) return null;

  // Use Object.entries and reduce to iterate and map based on structure
  return Object.entries(structure).reduce((outputData: any, [key, value]) => {
    // If the structure value is a function, apply it to transform the data
    if (typeof value === 'function') {
      return { ...outputData, [key]: value(inputData) };
    } else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      // If it's an object (nested structure), recursively map it
      return { ...outputData, [key]: mapJsonData(inputData, value as J) };
    } else if (Array.isArray(value)) {
      // If it's an array, map over the array (handle nested arrays)
      return { ...outputData, [key]: value.map((item: Partial<J>) => mapJsonData(inputData, item as J)) };
    } else {
      // Direct mapping from inputData to outputData
      return { ...outputData, [key]: (inputData as any)[value as keyof T] };
    }
  }, {});
}
