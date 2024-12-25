import { redirect } from '@i18n/routing'
import { PostContent } from '@marketing/blog/components/PostContent'
import { getActivePathFromUrlParam, getLocalizedDocumentWithFallback } from '@shared/lib/content'
import { allLegalPages } from 'content-collections'
import { getLocale } from 'next-intl/server'

type Params = {
  path: string
  locale: string
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params

  const { path } = params

  const locale = await getLocale()
  const activePath = getActivePathFromUrlParam(path)
  const page = getLocalizedDocumentWithFallback(allLegalPages, activePath, locale)

  return {
    title: page?.title,
    openGraph: {
      title: page?.title
    }
  }
}

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const params = await props.params

  const { path } = params

  const locale = await getLocale()
  const activePath = getActivePathFromUrlParam(path)
  const page = getLocalizedDocumentWithFallback(allLegalPages, activePath, locale)

  if (!page) {
    redirect({ href: '/', locale })
  }

  const { title, body } = page

  const Privacy_Policy = `MakeSong Privacy Policy
Last Updated: December 16, 2024
Welcome to MakeSong ("we," "our," or "the Company"). This Privacy Policy is designed to inform you about how we collect, use, disclose, and protect your personal information.
1. Information Collection
We may collect the following types of information:
Account Information: When you register for an account, we may collect your name, email address, and password.
Usage Data: We collect information about how you use our services, including the music themes or elements you input and the generated songs.
Device Information: We may collect information about the device you use to access our services, such as IP address, browser type, and operating system.

2. Information Use
We use the collected information to:
Provide, maintain, and improve our music generation services
Process and complete transactions
Send technical notices, updates, security alerts, and support messages
Respond to your comments, questions, and requests

3. Information Sharing
We do not sell your personal information. We may share your information in the following circumstances:
When required by law
To protect our rights, property, or safety
With our service providers who help us operate our business and services

4. Cookies and Tracking Technologies
We use cookies and similar tracking technologies to track activity on our service and store certain information. Cookies are small files that may include an anonymous unique identifier.
You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our service may not function properly.

5. Data Security
We implement appropriate technical and organizational security measures to protect your personal information, including:
Encryption of data in transit using SSL/TLS protocols
Regular security assessments and updates
Access controls and authentication measures
Secure data storage practices
While we strive to protect your personal information, please note that no method of internet transmission or electronic storage is 100% secure.

6. International Data Transfers
Your information may be transferred to — and maintained on — computers located outside your state, province, country, or other governmental jurisdiction where data protection laws may differ.
If you are located outside the United Kingdom and choose to provide information to us, please note that we transfer the data to the United Kingdom and process it there.

7. Your Rights
You have the right to:
Access the personal information we hold about you
Request correction of any inaccurate information
Request deletion of your personal information
Object to the processing of your personal information
Request restriction of processing your personal information
Request transfer of your personal information
Withdraw consent where we rely on consent to process your data

8. Children's Privacy
Our services are not directed to children under 13. If you believe we may have collected information from a child under 13, please contact us.

9. Changes
We may update this Privacy Policy from time to time. We will post the updated version on our website, and the date of the latest update will be noted at the top of the policy.

10. Contact Us
If you have any questions about this Privacy Policy, please contact us at:
CODEONE LTD
71-75 Shelton Street,
Covent Garden,
London, WC2H 9JQ,
United Kingdom
Website: www.makesong.com
Email: support@makesong.com`

  const Terms_and_conditions = `Terms and Conditions
1. Acceptance of Terms
By accessing or using the MakeSong Service (the "Service"), provided by CODEONE LTD ("we," "our," or "the Company"), you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our Service.

2. Service Description
MakeSong provides an AI-powered music and song generation service. Users can input music themes, lyrics, or related musical elements, and our service will generate a song based on those inputs.
2.1 Technical Implementation
Our service utilizes advanced AI models and cloud-based processing technologies to generate music. Key technical elements include:
Parallel processing technology for audio segment generation
Audio consistency technology for connecting multiple audio segments
Cloud GPU computing and processing power
2.2 Technical Limitations
Users understand and agree that:
The AI models used have inherent limitations, including constraints on audio duration
The quality of generated songs may vary based on technical conditions
The service may be temporarily unavailable due to maintenance or updates
2.3 Service Quality and Improvement
We are committed to continuously improving the Service, including:
Optimizing music generation quality
Enhancing processing speed
Improving the overall user experience
2.4 Technical Disclaimer
MakeSong does not guarantee that the generated music will fully meet user expectations. We are not liable for service interruptions, audio quality issues, or other technical limitations.
2.5 Usage Limitations
Users understand and agree to the following usage limitations:
Maximum number of song generations per day or month based on subscription tier
Maximum length of generated songs
Restrictions on commercial usage of generated content
Fair usage policies to prevent abuse of the system

3. User Accounts
3.1 You may need to create an account to use certain features of our Service. You are responsible for maintaining the security of your account.
3.2 You agree to provide accurate, complete, and up-to-date registration information.

4. User Conduct
4.1 You agree not to use our Service for any illegal, unauthorized, or unlawful purpose.
4.2 You must not upload any content that infringes upon others' intellectual property rights, is illegal, or is offensive.

5. Intellectual Property
5.1 The MakeSong Service and all related content (excluding user-uploaded content) are the property of CODEONE LTD.
5.2 For any content you upload, you retain all rights but grant us a non-exclusive, worldwide, royalty-free license to use, copy, and process that content to provide the Service.
5.3 AI-Generated Content Rights:
Users receive a license to use AI-generated songs for personal or commercial use based on their subscription tier.
We retain the right to use anonymized generated content for service improvement purposes.
Users are responsible for ensuring their use of generated content complies with applicable laws.

6. Fees and Payment
6.1 Service Fees: We may charge fees for certain features of the Service. All applicable fees will be clearly communicated before you use the relevant service.
6.2 Payment Methods:
One-time Payment: Some services may offer one-time payment options, allowing you to pay for single-use fees without a subscription.
Subscription: We may also offer subscription services, allowing continuous use of our services for a period of time.
6.3 One-time Payments:
For one-time payments, you will pay the specified fee before using the service.
One-time payments typically cover single song generation or use within a specified timeframe.
The scope and validity period of services will be clearly stated at the time of purchase.
6.4 Subscriptions:
By subscribing to our service, you authorize us to charge recurring subscription fees until you cancel your subscription.
6.5 Payment Processing:
You agree to pay all fees associated with your account. Payments will be processed through our designated payment methods.
6.6 Refund Policy:
Refunds may be provided in specific situations according to our refund policy. One-time payments typically do not offer refunds unless the service was not provided or there were significant issues.
6.7 Price Changes:
We reserve the right to change our prices at any time. You will be notified of price changes before they take effect. Price changes will not affect services already purchased under one-time payment options.

7. Disclaimer
7.1 The Service is provided "as is" without any express or implied warranties.
7.2 We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free.

8. Limitation of Liability
To the fullest extent permitted by law, CODEONE LTD shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of the Service.

9. Modification of Service
We reserve the right to modify or terminate the Service at any time, without notice.

10. Changes to Terms
We may update these Terms and Conditions from time to time. Updated terms will be posted on the website, and your continued use of the Service indicates your agreement to the new terms.

11. Termination
We reserve the right to terminate or suspend your access to the Service for any reason or no reason, without notice.

12. Governing Law
These Terms and Conditions are governed by the laws of the United Kingdom, without regard to its conflict of law principles.

13. Contact Us
If you have any questions about these Terms and Conditions, please contact us:
CODEONE LTD
71-75 Shelton Street
Covent Garden, London
WC2H 9JQ
Website: www.makesong.com
Email: support@makesong.com`

  return (
    <div className='container max-w-6xl pt-32 pb-24'>
      <div className='mx-auto mb-12 max-w-2xl'>
        <h1 className='text-center font-bold text-4xl'>{title}</h1>
      </div>

      {Privacy_Policy}

      {/* <PostContent content={Privacy_Policy} /> */}
    </div>
  )
}
