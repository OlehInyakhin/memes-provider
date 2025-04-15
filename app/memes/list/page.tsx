import { title, subtitle } from '@/components/primitives';
import { MemeList } from '@/components/meme-list';

export default function MemesListPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Memes List</h1>
        <p className={subtitle({ class: 'mt-4' })}>Browse your collection of memes in card view</p>
      </div>

      <div className="w-full">
        <MemeList />
      </div>
    </section>
  );
}
