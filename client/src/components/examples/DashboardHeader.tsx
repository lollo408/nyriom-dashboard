import DashboardHeader from '../DashboardHeader';

export default function DashboardHeaderExample() {
  return (
    <div className="w-full">
      <DashboardHeader onOpenContext={() => console.log('Open context drawer')} />
    </div>
  );
}
