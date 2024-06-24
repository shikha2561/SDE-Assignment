import { data } from './data';
import React from 'react';

// Define the type for the props
interface AgricultureTableProps {
  type: string;
}

// Define the structure of productionData
interface ProductionData {
  [key: string]: {
    maxCrop: string;
    minCrop: string;
  };
}

// Define the structure of cropData
interface CropData {
  [key: string]: {
    yieldSum: number;
    areaSum: number;
    count: number;
  };
}

// Define the component with the correct prop type
const AgricultureTable: React.FC<AgricultureTableProps> = ({ type }) => {
  const renderProductionTable = () => {
    const productionData: ProductionData = {};

    data.forEach((entry) => {
      const year = entry['Year'].split(',')[1].trim();
      if (!productionData[year]) {
        productionData[year] = { maxCrop: '', minCrop: '' };
      }

      if (!productionData[year].maxCrop || entry['Crop Production (UOM:t(Tonnes))'] > productionData[year].maxCrop) {
        productionData[year].maxCrop = entry['Crop Name'];
      }

      if (!productionData[year].minCrop || entry['Crop Production (UOM:t(Tonnes))'] < productionData[year].minCrop) {
        productionData[year].minCrop = entry['Crop Name'];
      }
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Max Crop</th>
            <th>Min Crop</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(productionData).map((year) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{productionData[year].maxCrop}</td>
              <td>{productionData[year].minCrop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderYieldTable = () => {
    const cropData: CropData = {};

    data.forEach((entry) => {
      if (!entry['Crop Production (UOM:t(Tonnes))']) return;

      const cropName = entry['Crop Name'];
      if (!cropData[cropName]) {
        cropData[cropName] = { yieldSum: 0, areaSum: 0, count: 0 };
      }

      cropData[cropName].yieldSum += parseFloat(entry['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] as string);
      cropData[cropName].areaSum += parseFloat(entry['Area Under Cultivation (UOM:Ha(Hectares))'] as string);
      cropData[cropName].count++;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield (Kg/Ha)</th>
            <th>Average Area (Ha)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cropData).map((crop) => (
            <tr key={crop}>
              <td>{crop}</td>
              <td>{(cropData[crop].yieldSum / cropData[crop].count).toFixed(3)}</td>
              <td>{(cropData[crop].areaSum / cropData[crop].count).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {type === 'production' ? renderProductionTable() : renderYieldTable()}
    </div>
  );
};

// Export the component as a named export
export { AgricultureTable };
