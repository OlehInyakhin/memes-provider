import MemeDetails from '@/components/meme-details';

type MemeDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MemeDetailsPage({ params }: MemeDetailsPageProps) {
  const { id } = await params;

  return <MemeDetails id={id} />;
}
