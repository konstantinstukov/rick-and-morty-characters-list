interface ProgressBarProps {
  percent: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => (
  <div className="grow h-0.5 bg-[rgba(159,159,159,0.5)] rounded-sm overflow-hidden">
    <div
      className="h-full bg-primary-green transition-[width] duration-300 rounded-sm"
      style={{ width: `${percent}%` }}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    ></div>
  </div>
);

ProgressBar.displayName = "ProgressBar";
