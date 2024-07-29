import EventDetailView from '@/view/events/page';

type EventDetailParams = {
  id: number;
};

const EventDetailPage = async ({ params }: { params: EventDetailParams }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <EventDetailView event_id={params.id} />
    </div>
  );
};

export default EventDetailPage;
