'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { useMemeStore, Meme } from '@/config/store';

type EditMemeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  meme: Meme | null;
};

export const EditMemeModal = (props: EditMemeModalProps) => {
  const { isOpen, onClose, meme } = props;
  const { addMeme, updateMeme } = useMemeStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    tags: '',
  });

  useEffect(() => {
    if (meme) {
      setFormData({
        name: meme.name,
        description: meme.description,
        imageUrl: meme.imageUrl,
        tags: meme.tags.join(', '),
      });
    } else {
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        tags: '',
      });
    }
  }, [meme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');

    const memeData = {
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl,
      likes: meme?.likes ?? Math.floor(Math.random() * 100),
      tags: tagsArray,
    };

    if (meme) {
      updateMeme(meme.id, memeData);
    } else {
      addMeme(memeData);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {meme ? 'Edit Meme' : 'Add New Meme'}
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter meme name"
              isRequired
            />
            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter meme description"
              isRequired
            />
            <Input
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              isRequired
            />
            <Input
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas"
              description="Example: funny, reaction, popular"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            {meme ? 'Save Changes' : 'Add Meme'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
