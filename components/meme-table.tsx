'use client';

import { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Tooltip } from '@heroui/tooltip';
import { useMemeStore, Meme } from '@/config/store';
import { EditMemeModal } from '@/components/edit-meme-modal';
import { Link } from '@heroui/link';

export const MemeTable = () => {
  const { memes, deleteMeme } = useMemeStore();
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Memes Collection</h2>
        <Button color="primary" onPress={() => setIsModalOpen(true)}>
          Add New Meme
        </Button>
      </div>

      <Table aria-label="Memes table" className="w-full">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>TAGS</TableColumn>
          <TableColumn>LIKES</TableColumn>
          <TableColumn>CREATED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id}>
              <TableCell>
                <Link className="text-md font-bold" href={`/memes/${meme.id}`}>
                  {meme.name}
                </Link>
              </TableCell>
              <TableCell>
                <div className="max-w-xs truncate">{meme.description}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {meme.tags.map((tag) => (
                    <Chip key={tag} size="sm" variant="flat">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell>{`❤️ ${meme?.likes}`}</TableCell>
              <TableCell>{formatDate(meme.createdAt)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Tooltip content="Edit meme">
                    <Button isIconOnly size="sm" variant="light" onPress={() => handleEdit(meme)}>
                      ✏️
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete meme">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => handleDelete(meme.id)}
                    >
                      🗑️
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditMemeModal isOpen={isModalOpen} onClose={closeModal} meme={selectedMeme} />
    </>
  );
};
