import { title, subtitle } from '@/components/primitives';
import { MemeTable } from '@/components/meme-table';

export default function MemesPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Memes Table</h1>
        <p className={subtitle({ class: 'mt-4' })}>Browse and manage your collection of memes</p>
      </div>

      <div className="w-full max-w-7xl mt-8">
        <MemeTable />
      </div>
    </section>
  );
}
