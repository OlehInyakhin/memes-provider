'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';
import { useMemeStore, Meme } from '@/config/store';
import { EditMemeModal } from '@/components/edit-meme-modal';

type MemeDetailsProps = {
  id: string;
};

export default function MemeDetails(props: MemeDetailsProps) {
  const { id } = props;
  const router = useRouter();
  const { memes, deleteMeme } = useMemeStore();
  const [meme, setMeme] = useState<Meme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundMeme = memes.find((m) => m.id === id);
    if (foundMeme) {
      setMeme(foundMeme);
    } else {
      // If meme is not found, redirect to the memes list page
      router.push('/memes');
    }
  }, [id, memes, router]);

  const handleEdit = () => {
    if (meme) {
      setIsModalOpen(true);
    }
  };

  const handleDelete = () => {
    if (meme && window.confirm('Are you sure you want to delete this meme?')) {
      deleteMeme(meme.id);
      router.push('/memes');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!meme) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Button variant="light" onPress={() => router.back()}>
          ← Back
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader className="flex justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">{meme.name}</h1>
          <div className="text-lg ml-auto">{`❤️ ${meme.likes}`}</div>
        </CardHeader>

        <CardBody>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <p className="text-small text-default-500 mb-2">
                Added on {formatDate(meme.createdAt)}
              </p>
              <Image
                alt={meme.name}
                className="w-full h-auto object-cover rounded-lg"
                width={400}
                src={meme.imageUrl}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1">
                  {meme.tags.map((tag) => (
                    <Chip key={tag} size="sm" variant="flat">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-default-700">{meme.description}</p>
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex justify-end gap-2">
          <Button color="primary" variant="bordered" onPress={handleEdit}>
            Edit
          </Button>
          <Button color="danger" variant="bordered" onPress={handleDelete}>
            Delete
          </Button>
        </CardFooter>
      </Card>

      <EditMemeModal isOpen={isModalOpen} onClose={closeModal} meme={meme} />
    </div>
  );
}
