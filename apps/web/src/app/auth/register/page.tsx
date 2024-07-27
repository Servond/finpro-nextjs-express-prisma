import OrganizerRegisterForm from '@/components/auth/OrganizerRegisterForm';
import ParticipantRegisterForm from '@/components/auth/ParticipantRegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const RegisterPage = async () => {
  return (
    <div className="grid md:grid-cols-2 w-full min-h-screen">
      <div className="hidden md:block relative">
        <Image
          src="/login_bg.jpg"
          alt="Register Image"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center px-4 py-12 md:px-6">
        <Tabs defaultValue="participant">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="participant">Participant</TabsTrigger>
            <TabsTrigger value="organizer">Organizer</TabsTrigger>
          </TabsList>
          <TabsContent value="participant">
            <ParticipantRegisterForm />
          </TabsContent>
          <TabsContent value="organizer">
            <OrganizerRegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RegisterPage;
