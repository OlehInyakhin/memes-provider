'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { useMemeStore, Meme } from '@/config/store';
import { EditMemeModal } from '@/components/edit-meme-modal';
import { Link } from '@heroui/link';

type MemeListProps = {
  meme?: Meme;
};

export const MemeList = (props: MemeListProps) => {
  const { meme } = props;
  const { memes, deleteMeme } = useMemeStore();
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // If no specific meme is provided, display all memes from the store
  const memesToDisplay = meme ? [meme] : memes;

  const handleEdit = (meme: Meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      deleteMeme(id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeme(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-xl font-bold">Memes Collection</h2>
        <Button color="primary" onPress={() => setIsModalOpen(true)}>
          Add New Meme
        </Button>
      </div>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memesToDisplay.map((meme) => (
          <Card key={meme.id} className="max-w-sm">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <Link className="text-xl font-bold" href={`/memes/${meme.id}`}>
                  {meme.name}
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-small text-default-500 mb-2">
                Added on {formatDate(meme.createdAt)}
              </p>
              <Image alt={meme.name} className="w-full h-auto object-cover" src={meme.imageUrl} />
              <div className="flex justify-between mt-2 gap-3">
                <div className="flex flex-wrap gap-1 ">
                  {meme.tags.map((tag) => (
                    <Chip key={tag} size="sm" variant="flat">
                      {tag}
                    </Chip>
                  ))}
                </div>
                <div className="text-small text-nowrap text-right">{`❤️ ${meme?.likes}`}</div>
              </div>
              <p className="text-small mt-2">{meme.description}</p>
            </CardBody>
            <CardFooter className="flex flex-col items-start gap-2">
              <div className="flex justify-between w-full mt-2">
                <Button size="sm" variant="bordered" onPress={() => handleEdit(meme)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  color="danger"
                  onPress={() => handleDelete(meme.id)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <EditMemeModal isOpen={isModalOpen} onClose={closeModal} meme={selectedMeme} />
    </>
  );
};
