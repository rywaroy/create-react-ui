export interface mockData {
  label: string;
  labelMin?: number;
  labelMax?: number;
  value: string | number;
  objectValue?: mockData[];
  arrayValue?: mockData[][];
}