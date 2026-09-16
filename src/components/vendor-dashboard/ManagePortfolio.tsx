import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Images, Pencil, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import {
  useGetVendorProfileByIdQuery,
  useUpdatePortfolioMutation,
} from '../../features/vendor/vendorApi';

type Preview = { file: File; url: string };

export default function ManagePortfolio() {
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const { data, isLoading, isError, refetch } = useGetVendorProfileByIdQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const images: string[] = data?.data?.vendor?.portfolioImages ?? [];
  const [editing, setEditing] = useState(false);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const previewUrls = useRef(new Set<string>());
  const [enlarged, setEnlarged] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const pending = useRef(false);

  useEffect(() => {
    const urls = previewUrls.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const closeEditor = () => {
    if (pending.current) return;
    previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrls.current.clear();
    setPreviews([]);
    setEnlarged(null);
    setEditing(false);
  };

  const addImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (pending.current) return;
    if (previews.length + files.length > 10) {
      toast.error('You can upload a maximum of 10 portfolio images.');
      return;
    }
    if (
      files.some((file) => !['image/jpeg', 'image/png'].includes(file.type))
    ) {
      toast.error('Please select JPG or PNG images.');
      return;
    }
    const addedPreviews = files.map((file) => {
      const url = URL.createObjectURL(file);
      previewUrls.current.add(url);
      return { file, url };
    });
    setPreviews((previous) => [...previous, ...addedPreviews]);
  };

  const save = async () => {
    if (pending.current || !previews.length || previews.length > 10) return;
    pending.current = true;
    setSaving(true);
    try {
      const formData = new FormData();
      previews.forEach(({ file }) => formData.append('files', file));
      await updatePortfolio(formData).unwrap();
      toast.success('Portfolio updated successfully.');
      pending.current = false;
      closeEditor();
      void refetch();
    } catch (error) {
      const message = (error as { data?: { message?: string } })?.data?.message;
      toast.error(
        message || 'Unable to update your portfolio. Please try again.',
      );
    } finally {
      pending.current = false;
      setSaving(false);
    }
  };

  return (
    <div className='p-6'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h2 className='text-lg font-semibold text-gray-950 dark:text-white'>
            Manage Portfolio
          </h2>
          <p className='mt-1 text-sm text-gray-500'>
            Showcase your work. Click an image to see it larger.
          </p>
        </div>
        <button
          type='button'
          onClick={() => setEditing(true)}
          className='inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700'
        >
          <Pencil className='h-4 w-4' /> Edit Portfolio
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p role='alert' className='text-sm text-red-600'>
          Unable to load your portfolio.{' '}
          <button type='button' onClick={() => refetch()} className='underline'>
            Retry
          </button>
        </p>
      ) : images.length ? (
        <div className='grid grid-cols-2 gap-3 lg:grid-cols-3'>
          {images.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type='button'
              onClick={() => setEnlarged(url)}
              aria-label={`Enlarge portfolio image ${index + 1}`}
              className='overflow-hidden rounded-xl border border-gray-200 focus-visible:ring-2 focus-visible:ring-purple-500'
            >
              <img
                src={url}
                alt={`Portfolio image ${index + 1}`}
                className='aspect-square w-full object-cover transition hover:scale-105'
              />
            </button>
          ))}
        </div>
      ) : (
        <div className='rounded-xl border border-dashed border-gray-200 py-12 text-center text-gray-500'>
          <Images className='mx-auto mb-3 h-9 w-9' />
          <p>No portfolio images yet.</p>
          <p className='mt-1 text-sm'>
            Choose Edit Portfolio to add your work.
          </p>
        </div>
      )}

      <Modal
        open={editing || !!enlarged}
        onClose={() => (enlarged ? setEnlarged(null) : closeEditor())}
        title={enlarged ? 'Image Preview' : 'Edit Portfolio'}
        size='lg'
      >
        {enlarged ? (
          <div className='space-y-4'>
            <img
              src={enlarged}
              alt='Enlarged portfolio preview'
              className='mx-auto max-h-[65vh] max-w-full rounded-lg object-contain'
            />
            <button
              type='button'
              onClick={() => setEnlarged(null)}
              className='text-sm font-medium text-purple-600'
            >
              {editing ? 'Back to editing' : 'Close preview'}
            </button>
          </div>
        ) : (
          <div className='space-y-5'>
            <p className='text-sm text-gray-500'>
              Choose up to 10 JPG or PNG images. Saving replaces your entire
              existing portfolio with these images. Click any preview to enlarge
              it.
            </p>
            <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              {previews.length} of 10 images selected
            </p>
            <label className='flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-purple-200 p-6 text-purple-600 focus-within:ring-2 focus-within:ring-purple-500'>
              <ImagePlus className='h-7 w-7' />
              <span className='text-sm font-medium'>Add Images</span>
              <input
                type='file'
                multiple
                accept='image/jpeg,image/png'
                aria-label='Add portfolio images'
                onChange={addImages}
                disabled={saving}
                className='sr-only'
              />
            </label>
            {!!previews.length && (
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
                {previews.map(({ file, url }, index) => (
                  <div key={url} className='relative'>
                    <button
                      type='button'
                      onClick={() => setEnlarged(url)}
                      aria-label={`Enlarge ${file.name}`}
                      className='w-full overflow-hidden rounded-xl border border-gray-200 focus-visible:ring-2 focus-visible:ring-purple-500'
                    >
                      <img
                        src={url}
                        alt={file.name}
                        className='aspect-square w-full object-cover'
                      />
                    </button>
                    <button
                      type='button'
                      disabled={saving}
                      aria-label={`Remove ${file.name}`}
                      onClick={() => {
                        URL.revokeObjectURL(url);
                        previewUrls.current.delete(url);
                        setPreviews((previous) =>
                          previous.filter(
                            (_, itemIndex) => itemIndex !== index,
                          ),
                        );
                      }}
                      className='absolute right-2 top-2 rounded-full bg-white p-1 text-gray-700 shadow disabled:opacity-50'
                    >
                      <X className='h-4 w-4' />
                    </button>
                    <p className='mt-1 truncate text-xs text-gray-500'>
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className='flex gap-3'>
              <button
                type='button'
                onClick={closeEditor}
                disabled={saving}
                className='w-full rounded-lg border border-gray-200 py-2 text-sm disabled:opacity-50'
              >
                Cancel
              </button>
              <Button
                type='button'
                onClick={save}
                disabled={saving || !previews.length || previews.length > 10}
              >
                {saving ? 'Saving...' : 'Save Portfolio'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
