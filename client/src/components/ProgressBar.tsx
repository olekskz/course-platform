
interface ProgressBarProps {
    current: number; 
    total: number;   
  }
  
  export const ProgressBar = ({ current, total }: ProgressBarProps) => {
    const percentage = Math.round((current / total) * 100);
  
    return (
      <div className="w-full">
        <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
          <span>Progress</span>
          <span>{current} / {total} ({percentage}%)</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };
  