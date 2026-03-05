import { Helmet } from 'react-helmet-async'

export const PrivacyPage = () => (
  <div className="bg-white py-14">
    <Helmet>
      <title>Privacy Policy | MGM A/C Appliances</title>
    </Helmet>
    <div className="container prose max-w-4xl">
      <h1>Privacy Policy</h1>
      <p>We collect contact details to schedule HVAC appointments, provide quotes and send maintenance reminders.</p>
      <p>Data is stored in encrypted systems and never sold. Users may request deletion by emailing privacy@mgmacappliances.com.</p>
      <p>Cookies are used for analytics and personalization. Continuing to use the site implies consent.</p>
    </div>
  </div>
)
