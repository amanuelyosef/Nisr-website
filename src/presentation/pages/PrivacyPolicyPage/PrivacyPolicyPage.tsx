import { TopAppBarSection } from "../../components/ui/TopAppBarSection/TopAppBarSection";

export const PrivacyPolicyPage = (): React.ReactElement => {
  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      <div className="w-full bg-white shadow-sm sticky top-0 z-50">
        <TopAppBarSection />
      </div>

      <div className="max-w-4xl w-full px-4 md:px-8 py-8 md:py-12 text-gray-800">
        <div className="bg-white p-6 md:p-10 lg:p-12 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-gray-900 [&_h2]:border-b [&_h2]:border-gray-100 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-gray-900 [&_p]:leading-relaxed [&_p]:text-gray-600 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-gray-600 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_a]:text-blue-600 [&_a]:font-medium [&_a]:transition-colors [&_a]:hover:text-blue-800 [&_a]:hover:underline">
          
          <div className="mb-8 border-b border-gray-100 pb-8 text-center sm:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">Privacy Policy</h1>
            <div className="flex flex-col sm:flex-row sm:gap-4 justify-center sm:justify-start text-sm text-gray-600 font-medium">
              <div className="bg-gray-100 px-4 py-2 rounded-full mb-3 sm:mb-0 w-fit mx-auto sm:mx-0">
                Effective Date: November 10, 2025
              </div>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full w-fit mx-auto sm:mx-0">
                Last Updated: May 03, 2026
              </div>
            </div>
          </div>

          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy describes how <strong>Nisr Solutions</strong> ("we," "us," or "our") collects, uses, shares, and protects your personal information when you use the <strong>Nisr Market</strong> mobile application and website located at <a href="http://nisrmarket.com" target="_blank" rel="noopener noreferrer">nisrmarket.com</a> (collectively, the "Service").
          </p>
          <p>
            This policy is designed to comply with applicable privacy laws and the <strong>Google Play Developer Program Policies</strong>, including the <strong>Google Play Data Safety</strong> requirements.
          </p>
          <p>
            <strong>Please read this policy carefully before using the Service.</strong>
          </p>
          <p>
            By using Nisr Market, you confirm that you have read and understood this Privacy Policy. If you do not agree with this policy, you must stop using the Service immediately.
          </p>
          <p>
            If you are under 16 years of age, you must not use this Service without verified parental or guardian consent. We do not knowingly collect data from children under 16.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect information in the following ways:</p>

          <h3>2.1 Information You Provide Directly</h3>
          <p><strong>Required Account Information:</strong></p>
          <ul>
            <li>Your full name</li>
            <li>Your email address and/or phone number</li>
            <li>A password (stored in encrypted form, never in plain text)</li>
          </ul>
          <p>This information is required to access core features including posting listings, messaging other users, and viewing contact details.</p>

          <p className="mt-4"><strong>Optional Profile Information:</strong></p>
          <ul>
            <li>Profile picture</li>
            <li>Location (city or region level)</li>
            <li>Gender</li>
            <li>Shop name and shop picture</li>
            <li>Shop location</li>
          </ul>
          <p>This information is optional. Providing it is your choice. Some of this information may be visible to other users of the Service.</p>

          <p className="mt-4"><strong>Content You Post:</strong></p>
          <p>When you create a listing or advertisement, you may include personal information such as your phone number, location, or photos. You acknowledge that this content is <strong>publicly visible</strong> to other users of Nisr Market. You are responsible for carefully considering what personal information you choose to make public.</p>

          <p className="mt-4"><strong>Account Verification:</strong></p>
          <p>If your account is flagged or blocked, we may request that you submit a government-issued identification document to verify your identity. This document will be:</p>
          <ul>
            <li>Processed using automated AI tools and/or manual human review</li>
            <li>Used only for the purpose of identity verification</li>
            <li>Not stored longer than necessary for the verification process</li>
            <li>Deleted within <strong>30 days</strong> after verification is complete unless we are legally required to retain it</li>
          </ul>

          <p className="mt-4"><strong>Support Communications:</strong></p>
          <p>When you contact our support team, we collect the content of your messages and any additional information you choose to provide.</p>

          <h3>2.2 Information from Third-Party Services</h3>
          <p><strong>Google Sign-In:</strong></p>
          <p>If you choose to log in using Google, we receive the following from Google:</p>
          <ul>
            <li>Your full name</li>
            <li>Your email address</li>
            <li>Your Google account profile picture</li>
            <li>Your Google account ID</li>
          </ul>
          <p>We use this information only to create and manage your Nisr Market account. We do not use it for any other purpose without your consent. You may revoke our access to your Google account at any time through your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Account permissions</a>.</p>

          <p className="mt-4"><strong>Invitation System:</strong></p>
          <p>If another user invites you to Nisr Market, they may provide us with your phone number or email address. If you do not wish to receive invitations, you may contact us to request removal of your information.</p>

          <h3>2.3 Information We Collect Automatically</h3>
          <p><strong>Device and Technical Information:</strong></p>
          <p>When you use the Service, we automatically collect:</p>
          <ul>
            <li>IP address (used by our authentication provider, Firebase Authentication)</li>
            <li>Device type and operating system version</li>
            <li>App version</li>
            <li>Crash reports and performance data</li>
          </ul>
          <p>We do <strong>not</strong> automatically collect your precise GPS location. Location information is only collected if you choose to provide it in your profile.</p>

          <p className="mt-4"><strong>Usage Information:</strong></p>
          <p>We collect information about how you interact with the Service, including:</p>
          <ul>
            <li>Features and pages you access</li>
            <li>Search queries within the app</li>
            <li>Date and time of your sessions</li>
            <li>Listings you view or interact with</li>
          </ul>
          <p>This data is collected in aggregated or anonymized form where possible and is used to improve the Service.</p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for the following specific purposes:</p>
          <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
            <table className="min-w-full text-left bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-700">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">To create and manage your account</td>
                  <td className="px-4 py-3 border-l border-gray-200">Contract performance</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">To enable core features (posting, messaging, searching)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Contract performance</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">To verify your identity and secure your account</td>
                  <td className="px-4 py-3 border-l border-gray-200">Legitimate interest / Legal obligation</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">To personalize your experience and recommendations</td>
                  <td className="px-4 py-3 border-l border-gray-200">Legitimate interest / Consent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">To send service-related notifications (security alerts, policy updates)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Contract performance / Legal obligation</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">To send push notifications about messages and activity</td>
                  <td className="px-4 py-3 border-l border-gray-200">Consent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">To send marketing emails and promotional notifications</td>
                  <td className="px-4 py-3 border-l border-gray-200">Consent (opt-in only)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">To analyze how the Service is used and improve it</td>
                  <td className="px-4 py-3 border-l border-gray-200">Legitimate interest</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">To detect, prevent, and investigate fraud and abuse</td>
                  <td className="px-4 py-3 border-l border-gray-200">Legitimate interest / Legal obligation</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">To enforce our Terms of Service</td>
                  <td className="px-4 py-3 border-l border-gray-200">Legitimate interest</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">To comply with applicable laws and legal requests</td>
                  <td className="px-4 py-3 border-l border-gray-200">Legal obligation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>We will never use your personal data for a purpose that is incompatible with the purposes listed above without first obtaining your consent.</strong></p>

          <h2>4. How We Share Your Information</h2>
          <p>We do not sell your personal information to third parties.</p>
          <p>We share your information only in the following circumstances:</p>

          <h3>4.1 Service Providers</h3>
          <p>We use the following third-party service providers who process data on our behalf. Each provider is bound by data processing agreements and is only permitted to use your data for the services they provide to us:</p>
          
          <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
            <table className="min-w-full text-left bg-white border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-700">Provider</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Data Shared</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Privacy Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Google Firebase (Authentication)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Account login and identity verification</td>
                  <td className="px-4 py-3 border-l border-gray-200">Email, phone number, UID</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy</a></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Google Firebase (Firestore)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Database storage</td>
                  <td className="px-4 py-3 border-l border-gray-200">All user-generated content</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy</a></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Google Firebase (Cloud Messaging)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Push notifications</td>
                  <td className="px-4 py-3 border-l border-gray-200">Device token</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy</a></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Google Cloud Storage</td>
                  <td className="px-4 py-3 border-l border-gray-200">Storing uploaded images</td>
                  <td className="px-4 py-3 border-l border-gray-200">Profile pictures, listing images</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy</a></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Google Analytics for Firebase</td>
                  <td className="px-4 py-3 border-l border-gray-200">Usage analytics</td>
                  <td className="px-4 py-3 border-l border-gray-200">Anonymized usage data</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy</a></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Algolia</td>
                  <td className="px-4 py-3 border-l border-gray-200">In-app search functionality</td>
                  <td className="px-4 py-3 border-l border-gray-200">Listing titles and metadata</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://www.algolia.com/policies/privacy/" target="_blank" rel="noopener noreferrer">Algolia Privacy</a></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Google Vertex AI (Generative AI)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Content moderation</td>
                  <td className="px-4 py-3 border-l border-gray-200">User-generated content flagged for review</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>4.2 Public Information</h3>
          <p>Information you choose to make public, such as your listings, shop name, profile picture, and contact details, is visible to all users of Nisr Market and may be indexed by search engines.</p>

          <h3>4.3 Law Enforcement and Legal Requests</h3>
          <p>We may disclose your information to law enforcement agencies, courts, or government authorities when:</p>
          <ul>
            <li>We are legally required to do so</li>
            <li>We believe disclosure is necessary to prevent harm or illegal activity</li>
            <li>We are protecting the rights, safety, or property of Nisr Solutions or our users</li>
          </ul>
          <p>We will make reasonable efforts to notify you of such requests unless we are legally prohibited from doing so.</p>

          <h3>4.4 Business Transfers</h3>
          <p>If Nisr Solutions is involved in a merger, acquisition, asset sale, or bankruptcy, your personal information may be transferred as part of that transaction. We will notify you via email or a prominent notice on the Service before your information is transferred and becomes subject to a different privacy policy.</p>

          <h3>4.5 With Your Consent</h3>
          <p>We will share your information with any other third party only when we have your explicit consent to do so.</p>

          <h2>5. Data Safety (Google Play Requirements)</h2>
          <p>In accordance with Google Play's Data Safety requirements, here is a summary of our data practices:</p>
          
          <p className="mt-4"><strong>Data Collection:</strong></p>
          <ul>
            <li>We collect personal data as described in this policy</li>
            <li>Data collection is required for core app functionality</li>
          </ul>

          <p className="mt-4"><strong>Data Sharing:</strong></p>
          <ul>
            <li>We share data with service providers listed in Section 4.1</li>
            <li>We do not sell your data</li>
            <li>We do not share data for advertising purposes with third parties</li>
          </ul>

          <p className="mt-4"><strong>Security:</strong></p>
          <ul>
            <li>Data is encrypted in transit using TLS/HTTPS</li>
            <li>Passwords are never stored in plain text</li>
            <li>You can request deletion of your data at any time</li>
          </ul>

          <p className="mt-4"><strong>User Control:</strong></p>
          <ul>
            <li>You can delete your account and data through the app</li>
            <li>You can request a copy of your data</li>
            <li>You can opt out of marketing communications</li>
          </ul>

          <h2>6. Your Rights and Choices</h2>
          <p>You have the following rights regarding your personal data:</p>

          <h3>6.1 Access and Portability</h3>
          <p>You can request a copy of the personal data we hold about you by emailing us at <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a>.</p>

          <h3>6.2 Correction</h3>
          <p>You can update most of your personal information directly through the settings page in the Nisr Market app. For information you cannot update yourself, contact us.</p>

          <h3>6.3 Deletion</h3>
          <p>You have the right to request deletion of your personal data. You can do this by:</p>
          <ul>
            <li>Using the <strong>Delete Account</strong> feature within the app settings, <strong>or</strong></li>
            <li>Emailing us at <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a></li>
          </ul>
          
          <p className="mt-4"><strong>What happens when you delete your account:</strong></p>
          <ul>
            <li>Your profile, listings, and messages will be deleted within <strong>30 days</strong></li>
            <li>We will retain your email hash and phone number hash (not the actual values) and a record that your account existed, for fraud prevention purposes</li>
            <li>We will retain any data we are legally required to keep</li>
          </ul>

          <h3>6.4 Objection and Restriction</h3>
          <p>You can ask us to stop using or limit our use of your personal data, including:</p>
          <ul>
            <li>For direct marketing (we will stop immediately upon request)</li>
            <li>For automated decision-making (you can request human review)</li>
          </ul>

          <h3>6.5 Withdraw Consent</h3>
          <p>Where we process your data based on consent, you can withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing before the withdrawal.</p>

          <h3>6.6 Lodge a Complaint</h3>
          <p>You have the right to lodge a complaint with a relevant data protection authority. We encourage you to contact us first at <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a> so we can try to resolve your concern directly.</p>
          <p><strong>Response Time:</strong> We will respond to all data rights requests within <strong>30 days</strong>.</p>

          <h2>7. Communication Choices</h2>

          <h3>Push Notifications</h3>
          <p>We send push notifications for:</p>
          <ul>
            <li>New messages from other users</li>
            <li>Activity on your listings</li>
            <li>Security alerts</li>
            <li>Marketing promotions (only with your consent)</li>
          </ul>

          <h3>Marketing Emails</h3>
          <p>We will only send you marketing emails if you have explicitly opted in. You can opt out at any time by:</p>
          <ul>
            <li>Clicking the <strong>"Unsubscribe"</strong> link at the bottom of any marketing email</li>
            <li>Emailing us at <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a></li>
          </ul>
          <p><strong>We will not send you marketing communications without your prior consent.</strong></p>

          <h2>8. Data Security</h2>
          <p>We implement the following security measures to protect your personal data:</p>
          <ul>
            <li><strong>Encryption in Transit:</strong> All data transmitted between your device and our servers is encrypted using TLS (HTTPS)</li>
            <li><strong>Secure Authentication:</strong> We use Firebase Authentication, which handles credential security</li>
            <li><strong>Firestore Security Rules:</strong> Our database has strict access rules ensuring users can only access their own data</li>
            <li><strong>Access Controls:</strong> Access to user data is restricted to authorized team members only, on a need-to-know basis</li>
            <li><strong>No Plain Text Passwords:</strong> Passwords are never stored in readable form</li>
          </ul>
          <p>We work hard to protect you and Nisr Market from unauthorized access, alteration, or disclosure. <strong>Despite these measures, no system is completely secure.</strong> We encourage you to use a strong, unique password and to contact us immediately at <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a> if you suspect unauthorized access to your account.</p>

          <p className="mt-4"><strong>Data Breach Notification:</strong></p>
          <p>In the event of a data breach that poses a high risk to your rights and freedoms, we will:</p>
          <ul>
            <li>Notify the relevant supervisory authority within the legally required timeframe</li>
            <li>Notify affected users directly without undue delay</li>
          </ul>

          <h2>9. Data Retention</h2>
          <p>We retain your personal data only for as long as necessary:</p>
          
          <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
            <table className="min-w-full text-left bg-white border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-700">Data Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Retention Period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Account information</td>
                  <td className="px-4 py-3 border-l border-gray-200">Until account deletion + 30 days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Posted listings and content</td>
                  <td className="px-4 py-3 border-l border-gray-200">Until account deletion + 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Messages</td>
                  <td className="px-4 py-3 border-l border-gray-200">Until account deletion + 30 days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Identity verification documents</td>
                  <td className="px-4 py-3 border-l border-gray-200">30 days after verification completes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Email/phone hash (fraud prevention)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Up to 2 years after account deletion</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Legal compliance data</td>
                  <td className="px-4 py-3 border-l border-gray-200">As required by applicable law</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Support communications</td>
                  <td className="px-4 py-3 border-l border-gray-200">1 year after resolution</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>10. Children's Privacy</h2>
          <p>Nisr Market is <strong>not directed at children under the age of 16</strong>.</p>
          <p>We do not knowingly collect personal information from anyone under 16 years of age. If you are a parent or guardian and you believe your child under 16 has provided us with personal information, please contact us immediately at <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a>.</p>
          <p>Upon receiving such a notification, we will:</p>
          <ul>
            <li>Verify the claim</li>
            <li>Delete the child's personal information within <strong>14 days</strong></li>
            <li>Terminate the associated account</li>
          </ul>
          <p>If you are under 16, you must not use this Service without parent or guardian consent.</p>

          <h2>11. International Data Transfers</h2>
          <p>Nisr Solutions operates from Ethiopia. However, because we use international service providers (including Google Firebase and Algolia), your data may be transferred to and processed in countries outside of Ethiopia, including the United States and European Union member states.</p>
          <p>When transferring data internationally, we ensure that:</p>
          <ul>
            <li>Our service providers maintain adequate data protection standards</li>
            <li>Appropriate safeguards are in place in accordance with applicable law</li>
            <li>We rely on Standard Contractual Clauses or equivalent mechanisms where required</li>
          </ul>

          <h2>12. Legal Bases for Processing (For Users in Applicable Jurisdictions)</h2>
          <p>We process your personal data on the following legal grounds:</p>
          <ul>
            <li><strong>Consent</strong> - For marketing communications, optional features, and non-essential data processing</li>
            <li><strong>Contract Performance</strong> - To provide the Service you have signed up for</li>
            <li><strong>Legitimate Interests</strong> - For fraud prevention, security, analytics, and improving the Service</li>
            <li><strong>Legal Obligation</strong> - To comply with applicable laws, court orders, and law enforcement requests</li>
          </ul>

          <h2>13. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. When we make changes, we will:</p>
          <ul>
            <li>Update the <strong>"Last Updated"</strong> date at the top of this page</li>
            <li>Notify you through a <strong>prominent notice within the app</strong> for material changes</li>
            <li>Send you an <strong>email notification</strong> for significant changes that affect your rights</li>
          </ul>
          <p>Your continued use of the Service after changes are published constitutes your acceptance of the updated policy. If you do not agree with the changes, you must stop using the Service and delete your account.</p>

          <h2>14. Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
          <p><strong>Nisr Solutions</strong></p>
          <p>Email: <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a></p>
          <p>Website: <a href="http://nisrmarket.com" target="_blank" rel="noopener noreferrer">nisrmarket.com</a></p>
          <p>Address: Addis Ababa, Ethiopia</p>
          <p>We will respond to all inquiries within <strong>30 days</strong>.</p>
          <p className="mt-8 italic text-gray-500">This Privacy Policy was prepared to comply with Google Play Developer Program Policies, including Data Safety requirements, and applicable international privacy standards.</p>
        </div>
      </div>
    </div>
  );
};