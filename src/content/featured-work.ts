import { msg } from '@lit/localize';

import { FEATURED_PROJECT } from './portfolio.generated';
import type { UnsplashImage } from './portfolio';

const CONSTRUCTION_IMAGES: UnsplashImage[] = [
  {
    alt: 'A teal excavator dumping soil into a yellow dump truck at a construction site',
    height: 1600,
    id: 'eKY6_9W_iqY',
    imageUrl: 'https://images.unsplash.com/photo-1575281923032-f40d94ef6160?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Troy Mortier',
    photographerProfileUrl: 'https://unsplash.com/@troyscanon?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/excavator-dumping-soil-into-dump-truck-eKY6_9W_iqY?utm_source=ziron_portfolio&utm_medium=referral',
    width: 2400,
  },
  {
    alt: 'Top view of four heavy machines in a quarry', height: 1600, id: '9jPJrfLTBi0',
    imageUrl: 'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8Mnx8Y29uc3RydWN0aW9uJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Shane McLendon', photographerProfileUrl: 'https://unsplash.com/@kctinman?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/top-view-photography-of-four-heavy-equipment-on-quarry-at-daytime-9jPJrfLTBi0?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'Excavators at a mining site', height: 1600, id: 'Mk2ls9UBO2E',
    imageUrl: 'https://images.unsplash.com/photo-1523848309072-c199db53f137?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8MXx8ZXhjYXZhdG9yJTIwcXVhcnJ5fGVufDF8MHx8fDE3ODc0NzY3Njd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Dominik Vanyi', photographerProfileUrl: 'https://unsplash.com/@dominik_photography?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/photography-of-excavators-at-mining-area-Mk2ls9UBO2E?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'A construction worker holding a power tool', height: 1600, id: 'VLPUm5wP5Z0',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwd29ya2VyJTIwaGVhdnklMjBtYWNoaW5lcnl8ZW58MXwwfHx8MTc4NzQ3Njc2N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Jeriden Villegas', photographerProfileUrl: 'https://unsplash.com/@jeriden94?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/man-in-orange-and-black-vest-wearing-white-helmet-holding-yellow-and-black-power-tool-VLPUm5wP5Z0?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'Several cranes above buildings', height: 1600, id: 'D46mXLsQRJw',
    imageUrl: 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8MXx8dG93ZXIlMjBjcmFuZSUyMGNvbnN0cnVjdGlvbnxlbnwxfDB8fHwxNzg3NDc2NzY3fDA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'EJ Yao', photographerProfileUrl: 'https://unsplash.com/@hojipago?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/several-cranes-above-the-buildings-D46mXLsQRJw?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'A yellow excavator digging dirt', height: 1600, id: 'ZgmGq_eFmUs',
    imageUrl: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8M3x8Y29uc3RydWN0aW9uJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Jamar Penny', photographerProfileUrl: 'https://unsplash.com/@pennypicsvideos?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/yellow-caterpillar-excavator-digging-up-dirt-ZgmGq_eFmUs?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'An orange excavator', height: 1600, id: 'k5l-zbRSPds',
    imageUrl: 'https://images.unsplash.com/photo-1495036019936-220b29b930ea?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Luke Besley', photographerProfileUrl: 'https://unsplash.com/@besluk?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/orange-excavator-k5l-zbRSPds?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'A yellow and black excavator on sand', height: 1600, id: 'bGMyTnSlYvE',
    imageUrl: 'https://images.unsplash.com/photo-1583024011792-b165975b52f5?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8Nnx8Y29uc3RydWN0aW9uJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'EESOFUFFZICH', photographerProfileUrl: 'https://unsplash.com/@eesofuffzich?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/yellow-and-black-excavator-on-brown-sand-during-daytime-bGMyTnSlYvE?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
];

const AGRICULTURE_IMAGES: UnsplashImage[] = [
  {
    alt: 'Two green combines in a large wheat field', height: 1600, id: 'fqoq39Jj5us',
    imageUrl: 'https://images.unsplash.com/photo-1635174815612-fd9636f70146?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8MXx8dHJhY3RvciUyMGhhcnZlc3RpbmclMjB3aGVhdHxlbnwxfDB8fHwxNzg3NDc2NzY3fDA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Darla Hueske', photographerProfileUrl: 'https://unsplash.com/@dhueske?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/two-green-combines-in-a-large-wheat-field-fqoq39Jj5us?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'An aerial view of a combine harvester loading corn into a tractor trailer', height: 1600, id: 'l_5MJnbrmrs',
    imageUrl: 'https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8MXx8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXJ5JTIwZHJvbmV8ZW58MXwwfHx8MTc4NzQ3Njc2N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'no one cares', photographerProfileUrl: 'https://unsplash.com/@no_one_cares?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/combine-harvester-loading-corn-trailer-l_5MJnbrmrs?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'A green and white tractor on a green field', height: 1600, id: 'yJDZTDeHeG8',
    imageUrl: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8Mnx8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Chris Ensminger', photographerProfileUrl: 'https://unsplash.com/@viramedio?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/green-and-white-tractor-on-green-grass-field-during-daytime-yJDZTDeHeG8?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'Green farm machinery on a field', height: 1600, id: 'ajZibDGpPew',
    imageUrl: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8M3x8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Jed Owen', photographerProfileUrl: 'https://unsplash.com/@jediahowen?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/green-farm-heavy-equipment-on-green-field-ajZibDGpPew?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'Green farming equipment on a brown field', height: 1600, id: 'CtRE4_4L7b8',
    imageUrl: 'https://images.unsplash.com/photo-1507662228758-08d030c4820b?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8NXx8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Scott Goodwill', photographerProfileUrl: 'https://unsplash.com/@scottagoodwill?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/green-farming-equipment-on-brown-field-CtRE4_4L7b8?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'A black harvesting machine', height: 1600, id: 'FJGZFxtQWko',
    imageUrl: 'https://images.unsplash.com/photo-1565647952915-9644fcd446a4?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8N3x8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Robert Wiedemann', photographerProfileUrl: 'https://unsplash.com/@antilumen?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/black-farming-harvesting-machine-FJGZFxtQWko?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'A combine harvesting grain in a field', height: 1600, id: 'y876c3rYoUg',
    imageUrl: 'https://images.unsplash.com/photo-1632723893457-47e3abc47526?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8OHx8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXJ5fGVufDF8MHx8fDE3ODc0NzY3ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Jakub Brabec', photographerProfileUrl: 'https://unsplash.com/@brabcak?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/a-combine-of-grain-being-harvested-in-a-field-y876c3rYoUg?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
  {
    alt: 'An aerial road through green forest', height: 1600, id: 'qzgN45hseN0',
    imageUrl: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixid=M3wxMDA0NDc4fDB8MXxzZWFyY2h8MXx8Zm9yZXN0JTIwYWVyaWFsJTIwZHJvbmV8ZW58MXwwfHx8MTc4NzQ3Njc2N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&q=86&w=2400',
    photographerName: 'Geranimo', photographerProfileUrl: 'https://unsplash.com/@geraninmo?utm_source=ziron_portfolio&utm_medium=referral',
    sourceUrl: 'https://unsplash.com/photos/aerial-shot-of-road-surrounded-by-green-trees-qzgN45hseN0?utm_source=ziron_portfolio&utm_medium=referral', width: 2400,
  },
];

export type FeaturedWorkSection = {
  anchor: string;
  galleryImages: UnsplashImage[];
  image: UnsplashImage | undefined;
  summary: string;
  title: string;
};

export function getFeaturedWorkSections(): FeaturedWorkSection[] {
  const images = FEATURED_PROJECT.images;

  return [
    {
      anchor: 'machinery-in-motion',
      galleryImages: images,
      image: images[0],
      summary: msg(
        'Machines do not pose. They work. We showed their strength where it is most real — in dust, snow, rain, and at full speed.',
        { id: 'project.summary' },
      ),
      title: msg('Machinery in motion', { id: 'home.workCardOne' }),
    },
    {
      anchor: 'process-made-visible',
      galleryImages: CONSTRUCTION_IMAGES,
      image: CONSTRUCTION_IMAGES[0],
      summary: msg(
        'We followed the work closely, turning the steps, details and decisions behind it into a clear story.',
        { id: 'project.processSummary' },
      ),
      title: msg('Process, made visible', { id: 'home.workCardTwo' }),
    },
    {
      anchor: 'scale-behind-the-work',
      galleryImages: AGRICULTURE_IMAGES,
      image: AGRICULTURE_IMAGES[0],
      summary: msg(
        'We put the size of the operation in frame, so the work feels as substantial as it is in real life.',
        { id: 'project.scaleSummary' },
      ),
      title: msg('Scale behind the work', { id: 'home.workCardThree' }),
    },
  ];
}
