import withAuth from '../../components/withAuth';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Dashboard content goes here */}
    </div>
  );
};

export default withAuth(Dashboard);
