import React, { useState } from "react";
import { TopAppBarSection } from "../../components/ui/TopAppBarSection/TopAppBarSection";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../infrastructure/firebase/firebaseClient";

export const DeleteAccountPage = (): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    if (status !== "submitting") {
      setIsModalOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setEmail("");
    setUsername("");
    setReason("");
    setConfirmed(false);
    setStatus("idle");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !confirmed) {
      setErrorMsg("Please fill the mandatory fields and confirm.");
      return;
    }

    try {
      setStatus("submitting");
      await addDoc(collection(db, "user_account_delete_requests"), {
        email: email.trim(),
        username: username.trim(),
        reason: reason.trim(),
        confirmed,
        submittedAt: new Date().toISOString(),
      });
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while submitting.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center relative">
      <div className="w-full bg-white shadow-sm sticky top-0 z-40">
        <TopAppBarSection />
      </div>

      <div className="max-w-4xl w-full px-4 md:px-8 py-8 md:py-12 text-gray-800">
        <div className="bg-white p-6 md:p-10 lg:p-12 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-gray-900 [&_h2]:border-b [&_h2]:border-gray-100 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-gray-900 [&_p]:leading-relaxed [&_p]:text-gray-600 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-gray-600 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-gray-600 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2 [&_a]:text-blue-600 [&_a]:font-medium [&_a]:transition-colors [&_a]:hover:text-blue-800 [&_a]:hover:underline">
          
          <div className="mb-8 border-b border-gray-100 pb-8 text-center sm:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">Account & Data Deletion</h1>
            <div className="flex flex-col sm:flex-row sm:gap-4 justify-center sm:justify-start text-sm text-gray-600 font-medium">
              <div className="bg-gray-100 px-4 py-2 rounded-full w-fit mx-auto sm:mx-0">
                Last Updated: November 10, 2025
              </div>
            </div>
          </div>

          <p>
            At Nisr Market, we believe you have the right to control your personal data. This page explains exactly how to delete your account and data, what gets deleted, what is retained, and why.
          </p>
          <p>
            This page complies with <strong>Google Play's User Data Deletion Policy</strong>, which requires apps that allow account creation to provide users with a clear and accessible way to request deletion of their account and associated data.
          </p>

          <h2>Your Two Deletion Options</h2>
          <p>Google Play policy requires us to support both <strong>in-app deletion</strong> and <strong>web-based deletion</strong>. Both options are fully available to you.</p>

          <h3>Option 1: Delete Inside the App (Recommended - Fastest Method)</h3>
          <p>This method processes your deletion request immediately.</p>
          <p><strong>Steps:</strong></p>
          <ul>
            <li>Open Nisr Market</li>
            <li>Tap your Profile tab (bottom navigation)</li>
            <li>Tap Settings (top right corner)</li>
            <li>Tap Personal Info</li>
            <li>Scroll to the bottom</li>
            <li>Tap "Delete and log out your account"</li>
            <li>Re-enter your password to confirm your identity</li>
            <li>Tap "Ok" for confirmation</li>
          </ul>
          <p className="mt-4"><strong>What happens next:</strong></p>
          <ul>
            <li>You will be logged out immediately</li>
            <li>Your account will be fully deleted within <strong>30 days</strong></li>
          </ul>

          <h3>Option 2: Delete via Our Website (Available Without the App)</h3>
          <p>If you cannot access the app, you can request deletion directly from this page.</p>
          <p><strong>Steps:</strong></p>
          <ol>
            <li>Fill out the deletion request form below</li>
            <li>We will send a verification email to confirm your identity</li>
            <li>Reply to the verification email to confirm your request</li>
            <li>We will process your deletion within 30 days</li>
          </ol>

          <div className="my-8 flex justify-center">
            <button 
              onClick={handleOpenModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              REQUEST ACCOUNT DELETION
            </button>
          </div>

          <p className="text-sm italic">
            (If you cannot use the form, email us directly at <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a> using the instructions in Option 3 below)
          </p>

          <h3>Option 3: Delete via Email Request (Alternative Method)</h3>
          <p><strong>Steps:</strong></p>
          <ul>
            <li>Send an email to <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a></li>
            <li>Use the subject line: "Account Deletion Request"</li>
            <li>Send from the email address registered to your account</li>
            <li>Include your registered phone number for verification (if you signed up with phone number instead of email)</li>
          </ul>
          <p className="mt-4"><strong>We will:</strong></p>
          <ul>
            <li>Acknowledge your request within <strong>3 business days</strong></li>
            <li>Verify your identity before processing</li>
            <li>Complete the deletion within <strong>30 days</strong> of verification</li>
          </ul>

          <h2>What Data Gets Deleted</h2>
          <p>When your account deletion is processed, the following data is <strong>permanently and irreversibly deleted</strong> from our systems:</p>

          <h3>Data Deleted Completely</h3>
          <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
            <table className="min-w-full text-left bg-white border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-700">Data Category</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Specific Data Deleted</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Timeframe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Account Information</td>
                  <td className="px-4 py-3 border-l border-gray-200">Full name, email address, phone number, password hash</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Profile Information</td>
                  <td className="px-4 py-3 border-l border-gray-200">Profile picture, gender, location, bio</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Shop Information</td>
                  <td className="px-4 py-3 border-l border-gray-200">Shop name, shop picture, shop location, shop description</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Posted Listings</td>
                  <td className="px-4 py-3 border-l border-gray-200">All ads and listings you created, including photos</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Messages</td>
                  <td className="px-4 py-3 border-l border-gray-200">All chat messages sent and received</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Search History</td>
                  <td className="px-4 py-3 border-l border-gray-200">All in-app search queries</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Cart and Saved Items</td>
                  <td className="px-4 py-3 border-l border-gray-200">Cart list, saved/favorited listings</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Notification Data</td>
                  <td className="px-4 py-3 border-l border-gray-200">Push notification tokens and preferences</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Usage Data</td>
                  <td className="px-4 py-3 border-l border-gray-200">App usage history linked to your account</td>
                  <td className="px-4 py-3 border-l border-gray-200">Within 30 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Data We Retain After Deletion</h2>
          <p>In limited circumstances, we are required or permitted to retain a small amount of data after your account is deleted. This is strictly for <strong>legal compliance, platform security, and fraud prevention</strong> purposes only.</p>

          <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
            <table className="min-w-full text-left bg-white border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-700">Data Retained</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Form It Is Stored In</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Retention Period</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Email address</td>
                  <td className="px-4 py-3 border-l border-gray-200"><strong>Hashed only</strong> (non-readable, one-way encrypted)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Up to 2 years</td>
                  <td className="px-4 py-3 border-l border-gray-200">Fraud prevention, preventing banned users from re-registering</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Phone number</td>
                  <td className="px-4 py-3 border-l border-gray-200"><strong>Hashed only</strong> (non-readable, one-way encrypted)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Up to 2 years</td>
                  <td className="px-4 py-3 border-l border-gray-200">Fraud prevention, preventing banned users from re-registering</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Account block record</td>
                  <td className="px-4 py-3 border-l border-gray-200">Record that an account existed and was blocked (no personal details)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Up to 2 years</td>
                  <td className="px-4 py-3 border-l border-gray-200">Platform safety and integrity</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Transaction records</td>
                  <td className="px-4 py-3 border-l border-gray-200">Anonymized records if applicable</td>
                  <td className="px-4 py-3 border-l border-gray-200">As required by Ethiopian law</td>
                  <td className="px-4 py-3 border-l border-gray-200">Legal compliance</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Legal hold data</td>
                  <td className="px-4 py-3 border-l border-gray-200">Any data subject to a court order or legal request</td>
                  <td className="px-4 py-3 border-l border-gray-200">Duration of legal obligation</td>
                  <td className="px-4 py-3 border-l border-gray-200">Legal compliance</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4"><strong>Important clarifications about retained data:</strong></p>
          <ul>
            <li>The hashed versions of your email and phone number <strong>cannot be reversed</strong> to identify you</li>
            <li>This retained data is <strong>never used for marketing</strong> or any purpose other than those listed above</li>
            <li>This retained data is <strong>never sold</strong> to third parties</li>
            <li>After the retention period ends, this data is also permanently deleted</li>
          </ul>

          <h2>Partial Data Deletion</h2>
          <p>If you do not want to delete your entire account but want to remove specific data, you have the following options:</p>

          <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
            <table className="min-w-full text-left bg-white border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-700">What You Want to Remove</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">How to Do It</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Individual listings or ads</td>
                  <td className="px-4 py-3 border-l border-gray-200">Delete them directly from within the app</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Profile picture</td>
                  <td className="px-4 py-3 border-l border-gray-200">Remove it from Profile → Settings → Personal Info</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Shop information</td>
                  <td className="px-4 py-3 border-l border-gray-200">Remove it from your Shop settings</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Optional profile details (location, gender)</td>
                  <td className="px-4 py-3 border-l border-gray-200">Edit or clear them in Profile → Settings → Personal Info</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Marketing email subscription</td>
                  <td className="px-4 py-3 border-l border-gray-200">Click "Unsubscribe" in any marketing email we sent you</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Push notifications</td>
                  <td className="px-4 py-3 border-l border-gray-200">Turn off in your device's notification settings or app settings</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>For any data you cannot remove yourself, contact us at <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a>.</p>

          <h2>Third-Party Data</h2>
          <p>Nisr Market uses third-party services to operate. When you delete your account, we delete your data from our systems. However, some third-party services may retain data independently according to their own policies:</p>

          <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
            <table className="min-w-full text-left bg-white border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-700">Service</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">What They May Retain</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-l border-gray-200">Their Deletion Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Google Firebase</td>
                  <td className="px-4 py-3 border-l border-gray-200">Authentication records</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy Policy</a></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Google Analytics</td>
                  <td className="px-4 py-3 border-l border-gray-200">Anonymized, aggregated analytics</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Algolia</td>
                  <td className="px-4 py-3 border-l border-gray-200">Search index data</td>
                  <td className="px-4 py-3 border-l border-gray-200"><a href="https://www.algolia.com/policies/privacy/" target="_blank" rel="noopener noreferrer">Algolia Privacy Policy</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>We recommend reviewing each provider's privacy policy if you have concerns about data they hold independently.</p>

          <h2>What Happens to Your Public Content</h2>
          <p>When your account is deleted:</p>
          <ul>
            <li><strong>Your listings</strong> will be removed from the Nisr Market platform within <strong>30 days</strong></li>
            <li><strong>Your messages</strong> will be deleted from our database within <strong>30 days</strong></li>
            <li><strong>Search engine caches</strong> (such as Google Search) may still show your listings temporarily. We cannot control third-party caches, but these will expire naturally over time.</li>
            <li><strong>Other users</strong> who saved or screenshotted your content before deletion are outside our control</li>
          </ul>

          <h2>Deletion Timeline Summary</h2>
          <ul className="!list-none !pl-0">
            <li><span className="font-semibold text-gray-900">Day 0</span> - You submit your deletion request</li>
            <li><span className="font-semibold text-gray-900">Day 1</span> - You receive confirmation email from us</li>
            <li><span className="font-semibold text-gray-900">Day 1-3</span> - We verify your identity (email method only)</li>
            <li><span className="font-semibold text-gray-900">Day 30</span> - All personal data permanently deleted from our systems</li>
            <li><span className="font-semibold text-gray-900">Day 30+</span> - Only hashed fraud-prevention data remain</li>
            <li><span className="font-semibold text-gray-900">Year 2</span> - All remaining hashed data permanently deleted</li>
          </ul>

          <h2>Reactivation Policy</h2>
          <p><strong>Account deletion is permanent and cannot be undone.</strong></p>
          <p>Once your deletion is confirmed:</p>
          <ul>
            <li>Your account <strong>cannot be recovered</strong></li>
            <li>Your listings <strong>cannot be restored</strong></li>
            <li>Your messages <strong>cannot be retrieved</strong></li>
            <li>If you wish to use Nisr Market again, you will need to create a <strong>new account</strong></li>
          </ul>
          <p>We recommend that you save any important information before requesting deletion.</p>

          <h2>Contact Us</h2>
          <p>For any questions about data deletion or your privacy rights:</p>
          <p><strong>Nisr Solutions</strong></p>
          <ul className="!list-none !pl-0 !gap-1">
            <li>📧 Email: <a href="mailto:nisrmarket@gmail.com">nisrmarket@gmail.com</a></li>
            <li>🌐 Website: <a href="http://nisrmarket.com" target="_blank" rel="noopener noreferrer">nisrmarket.com</a></li>
            <li>📍 Location: Addis Ababa, Ethiopia</li>
          </ul>
          <p><strong>Response time:</strong> We respond to all deletion and privacy requests within <strong>3 business days</strong>.</p>
          
          <p className="mt-8 italic text-gray-500 text-sm">This page is maintained in compliance with Google Play's User Data Policy and applicable privacy regulations.</p>
        </div>
      </div>

      {/* Modal / Dialog for Deletion Request */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden relative">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Account Deletion</h3>
              <p className="text-gray-600 mb-6 text-sm">Please fill out this form to request deletion of your account and associated data.</p>

              {status === "success" ? (
                <div className="bg-green-50 text-green-800 p-4 border border-green-200 rounded-lg">
                  <h4 className="font-bold mb-1">Request Submitted</h4>
                  <p className="text-sm">We have received your deletion request. You will receive a verification email shortly. Please reply to that email to confirm.</p>
                  <button 
                    onClick={handleCloseModal}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {errorMsg && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                      {errorMsg}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-medium text-gray-700 text-sm">The Account Email <span className="text-red-500">*</span></label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-medium text-gray-700 text-sm">Username/Display Name <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input 
                      id="username" 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your in-app name"
                      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="reason" className="font-medium text-gray-700 text-sm">Reason for Deletion <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <textarea 
                      id="reason" 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Why are you leaving?"
                      rows={3}
                      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 mt-2">
                    <input 
                      id="confirm" 
                      type="checkbox" 
                      required
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="confirm" className="text-sm text-gray-700 leading-relaxed cursor-pointer select-none">
                      I understand that this action is permanent and all my data will be erased. <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button 
                      type="button" 
                      onClick={handleCloseModal}
                      disabled={status === "submitting"}
                      className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={status === "submitting"}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-70"
                    >
                      {status === "submitting" ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};