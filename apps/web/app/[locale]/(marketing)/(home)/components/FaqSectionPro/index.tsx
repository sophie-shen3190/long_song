// components/FaqSection.tsx
import { FC } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/components/accordion'
import { cn } from '@ui/lib'
import { getLocale, getTranslations } from 'next-intl/server'
import Link from 'next/link'

const FaqSectionPro: FC = async () => {
  const t = await getTranslations()
  const faqData = [
    {
      question: t('FaqSectionPro.faqData.a.question'),
      answer: t('FaqSectionPro.faqData.a.answer')
    },
    {
      question: t('FaqSectionPro.faqData.b.question'),
      answer: t('FaqSectionPro.faqData.b.answer')
    },
    {
      question: t('FaqSectionPro.faqData.c.question'),
      answer: t('FaqSectionPro.faqData.c.answer')
    },
    {
      question: t('FaqSectionPro.faqData.d.question'),
      answer: t('FaqSectionPro.faqData.d.answer')
    },
    {
      question: t('FaqSectionPro.faqData.e.question'),
      answer: t('FaqSectionPro.faqData.e.answer')
    },
    {
      question: t('FaqSectionPro.faqData.f.question'),
      answer: t('FaqSectionPro.faqData.f.answer')
    },
    {
      question: t('FaqSectionPro.faqData.g.question'),
      answer: t('FaqSectionPro.faqData.g.answer')
    }
  ]
  return (
    <section className='py-20 bg-gray-900/50'>
      <div className=' mx-auto'>
        {/* <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
          Frequently Asked Questions
        </h2> */}
        <section className={cn('bg-primary/5 py-16 lg:py-24')} id='faq'>
          <div className='container max-w-3xl'>
            <div className='mb-12 text-center'>
              <h2 className='mb-2 font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
                {t('faq.title')}
              </h2>
              <p className='text-lg opacity-50'>{t('faq.description')}</p>
            </div>
            <Accordion type='single' collapsible className='flex flex-col gap-3'>
              {faqData.map((item, i) => (
                <AccordionItem key={i} value={`faq-item-${i}`} className='rounded-xl border bg-card px-6 py-4'>
                  <AccordionTrigger className='py-2 text-lg'>{item.question}</AccordionTrigger>
                  <AccordionContent className=''>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className='text-center mt-12'>
            <Link href='/ai-music-generator' target='_blank'>
              <span className='inline-block h-12 px-8 text-lg rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity leading-[48px]'>
                Free makesong Online
              </span>
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}

export default FaqSectionPro
