import { getCourses } from '@/db/api';
import { AuthScreen } from '@/features/auth';
import { Separator } from '@/components/ui/separator';

import {
  Advantages,
  BoostLearning,
  EffectiveCourse,
  EnglishTest,
  ForSchool,
  Hero,
  Languages,
  LearnAnywhere,
  TopRate,
} from './home/sections';

import { Header, Footer } from './home/ui';

export default async function HomePage() {
  const courses = await getCourses();
  const languages = courses.map((course) => course.language);

  return (
    <>
      <AuthScreen />
      <Header />
      <Hero className='h-[calc(100vh-60px)]' />
      <Languages languages={languages} />
      <div className='max-w-screen-wrapper mx-auto'>
        <TopRate />
        <Separator />
        <Advantages />
        <Separator />
        <BoostLearning />
        <Separator />
        <LearnAnywhere />
        <Separator />
        <ForSchool />
        <Separator />
        <EnglishTest />
        <Separator />
        <EffectiveCourse />
      </div>
      <Footer />
    </>
  );
}
