import AddEventForm from '@/components/dashboard/events/AddEventForm';
import { getSession } from '@/utils/actions/authentication';

export default async function AddEventView() {
  const user = await getSession();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  return <AddEventForm user_id={user.user_id as number} />;
}
