import { Helmet } from 'react-helmet-async'

export const TermsPage = () => (
  <div className="bg-white py-14">
    <Helmet>
      <title>Terms & Conditions | MGM A/C Appliances</title>
    </Helmet>
    <div className="container prose max-w-4xl">
      <h1>Terms & Conditions</h1>
      <p>MGM A/C Appliances provides services per signed proposals. Online bookings are scheduling requests until confirmed by dispatch.</p>
      <p>All warranties are void if third parties modify installed equipment. Financing offers subject to credit approval.</p>
      <p>Use of this site constitutes agreement to these terms and the privacy policy.</p>
    </div>
  </div>
)
