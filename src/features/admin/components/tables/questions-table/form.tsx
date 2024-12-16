'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  type Language,
  type Question,
  type QuestionOptionalField,
  type QuestionType,
} from '@/types/main';

import {
  characters,
  defaultQuestionsRecord,
  locales,
  questionTypes,
} from '@/constants';

import { questionSchema } from './schema';

const defaultValues: Record<QuestionType, boolean> = {
  fill: false,
  listen: false,
  select: false,
  which: false,
  write: false,
};

const optionalFields: Record<
  QuestionOptionalField,
  Record<QuestionType, boolean>
> = {
  audio: { ...defaultValues, write: true, listen: true },
  character: { ...defaultValues, write: true, fill: true, select: true },
  sentence: { ...defaultValues, write: true, fill: true, select: true },
};

export const QuestionForm = ({
  buttonText,
  defaultOrder = -1,
  disabled = false,
  onSubmit,
  question,
}: {
  buttonText: string;
  defaultOrder?: number;
  disabled?: boolean;
  onSubmit: (question: Question) => void;
  question?: Partial<Question>;
}) => {
  const params = useParams<{ language: Language }>();

  const acceptedLanguage = locales.filter(
    (locale) => locale !== params.language
  );

  const defaultType = question?.type ?? 'which';
  const defaultQuestions = defaultQuestionsRecord[params.language];
  const defaultTitle = question?.title ?? defaultQuestions[defaultType] ?? '';

  const defaultAudio = question?.audio ?? '';
  const defaultCharacter = question?.character ?? '';
  const defaultSentence = question?.sentence ?? '';

  const form = useForm<Question>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      id: question?.id ?? -1,
      lessonId: question?.lessonId ?? -1,

      answer: question?.answer ?? '',
      audio: defaultAudio,
      character: defaultCharacter,
      hard: question?.hard ?? false,
      language: question?.language ?? '',
      order: question?.order ?? defaultOrder,
      sentence: defaultSentence,
      title: defaultTitle,
      type: defaultType,
    },
  });

  const type = form.watch('type');

  return (
    <Form {...form}>
      <form
        className='flex flex-col grow gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='order'
          render={({ field: { onChange, ...otherProps } }) => (
            <FormItem>
              <FormLabel htmlFor='order'>Order</FormLabel>
              <FormControl>
                <Input
                  min={1}
                  id='order'
                  type='number'
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === '') return onChange(1);
                    const order = parseInt(value);
                    onChange(order);
                  }}
                  {...otherProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='language'>Language</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select translation language' />
                  </SelectTrigger>

                  <SelectContent>
                    {acceptedLanguage.map((language) => (
                      <SelectItem
                        className='cursor-pointer'
                        key={language}
                        value={language}
                      >
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='type'>Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: QuestionType) => {
                    form.setValue('title', defaultQuestions[value] ?? '');
                    form.setValue('audio', defaultAudio);
                    form.setValue('character', defaultCharacter);
                    form.setValue('sentence', defaultSentence);
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Type' />
                  </SelectTrigger>

                  <SelectContent>
                    {questionTypes.map((questionType) => (
                      <SelectItem
                        className='cursor-pointer'
                        key={questionType}
                        value={questionType}
                      >
                        {questionType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='title'
          render={({ field: { value, ...otherProps } }) => (
            <FormItem>
              <FormLabel htmlFor='value'>Title</FormLabel>
              <FormControl>
                <Input id='value' {...otherProps} value={value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {optionalFields['sentence'][type] && (
          <FormField
            control={form.control}
            name='sentence'
            render={({ field: { value, ...otherProps } }) => (
              <FormItem>
                <FormLabel htmlFor='sentence'>Sentence (Optional)</FormLabel>
                <FormControl>
                  <Input
                    id='sentence'
                    {...otherProps}
                    value={value ?? ''}
                    placeholder='aditional sentece'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='answer'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='answer'>Answer</FormLabel>
              <FormControl>
                <Input id='answer' {...field} placeholder='peaches' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {optionalFields['audio'][type] && (
          <FormField
            control={form.control}
            name='audio'
            render={({ field: { value, ...otherProps } }) => (
              <FormItem>
                <FormLabel htmlFor='audio'>
                  Path or url to audio file (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    id='audio'
                    {...otherProps}
                    value={value ?? ''}
                    placeholder='/path/audio.mp3'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {optionalFields['character'][type] && (
          <FormField
            control={form.control}
            name='character'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='type'>Character (Optional)</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={(character) => {
                      field.onChange(character === 'none' ? null : character);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select character' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value='none' key='none'>
                        none
                      </SelectItem>
                      {characters.map((character) => (
                        <SelectItem
                          className='cursor-pointer'
                          key={character}
                          value={character}
                        >
                          <div className='flex items-center gap-1'>
                            <span>{character}</span>
                            <Image
                              className='h-[25px] w-[15px]'
                              src={character}
                              height={25}
                              width={15}
                              alt='character'
                            />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='hard'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center justify-between gap-2 py-1'>
                  <Label className='cursor-pointer' htmlFor='hard'>
                    Hard question
                  </Label>
                  <Switch
                    id='hard'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-2'>
          <Button className='w-full' type='submit' disabled={disabled}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
