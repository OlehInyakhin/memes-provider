'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Form } from '@heroui/form';

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
    likes: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    imageUrl: '',
    likes: '',
  });

  useEffect(() => {
    if (meme) {
      setFormData({
        name: meme.name,
        description: meme.description,
        imageUrl: meme.imageUrl,
        tags: meme.tags.join(', '),
        likes: meme.likes.toString(),
      });
    } else {
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        tags: '',
        likes: '',
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      description: '',
      imageUrl: '',
      likes: '',
    };

    // Validate name (required, 3-100 characters)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
      isValid = false;
    }

    // Validate description (required)
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    // Validate imageUrl (required and valid URL)
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
      isValid = false;
    } else {
      try {
        new URL(formData.imageUrl);
      } catch (error) {
        newErrors.imageUrl = 'Please enter a valid URL';
        isValid = false;
      }
    }

    // Validate likes (required if editing)
    if (meme && (!formData.likes || formData.likes.toString().trim() === '')) {
      newErrors.likes = 'Likes is required';
      isValid = false;
    }

    setErrors(newErrors);
    if (isValid) {
      handleSubmit();
    }
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
      likes: formData.likes ? parseInt(formData.likes, 10) : Math.floor(Math.random() * 100),
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
          <Form className="flex flex-col gap-4" onSubmit={validateForm}>
            <Input
              isRequired
              errorMessage={errors.name || 'Name is required'}
              isInvalid={!!errors.name}
              label="Name"
              name="name"
              placeholder="Enter meme name (3-100 characters)"
              value={formData.name}
              onChange={handleChange}
            />
            <Textarea
              isRequired
              errorMessage={errors.description}
              isInvalid={!!errors.description}
              label="Description"
              name="description"
              placeholder="Enter meme description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              isRequired
              errorMessage={errors.imageUrl}
              isInvalid={!!errors.imageUrl}
              label="Image URL"
              name="imageUrl"
              placeholder="Enter a valid image URL"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            <Input
              description="Example: funny, reaction, popular"
              label="Tags"
              name="tags"
              placeholder="Enter tags separated by commas"
              value={formData.tags}
              onChange={handleChange}
            />
            {meme && (
              <Input
                isRequired
                errorMessage={errors.likes}
                isInvalid={!!errors.likes}
                label="Likes"
                max={99}
                min={0}
                name="likes"
                placeholder="Enter number of likes"
                type="number"
                value={formData.likes}
                onChange={handleChange}
              />
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" type="button" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {meme ? 'Save Changes' : 'Add Meme'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
