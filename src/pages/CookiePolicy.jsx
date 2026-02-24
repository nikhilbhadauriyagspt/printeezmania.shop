import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';
import { Link } from 'react-router-dom';

export default function CookiePolicy() {
  return (
    <PolicyLayout
      title="Cookie Policy"
      subtitle="Learn about how we use cookies and similar technologies on our website."
      lastUpdated="February 11, 2026"
    >
      <p className="lead">
        This Cookie Policy explains how PrinteezMania LLC ("Company," "we," "us," or "our") uses cookies and similar technologies when you visit our website: <a href="https://printeezmania.shop/">https://printeezmania.shop/</a>
      </p>
      <p>
        This Cookie Policy should be read together with our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms-and-conditions">Terms and Conditions</Link>.
      </p>

      <h2>1. WHAT ARE COOKIES?</h2>
      <p>
        Cookies are small text files placed on your device (computer, smartphone, tablet) when you visit a website. Cookies help websites function properly, improve performance, remember preferences, and provide analytical information.
      </p>
      <p>Cookies may be:</p>
      <ul>
        <li><strong>Session Cookies</strong> – Deleted when you close your browser</li>
        <li><strong>Persistent Cookies</strong> – Remain stored until they expire or are deleted</li>
        <li><strong>First-Party Cookies</strong> – Set by our website</li>
        <li><strong>Third-Party Cookies</strong> – Set by external service providers</li>
      </ul>

      <h2>2. HOW WE USE COOKIES</h2>
      <p>We use cookies and similar tracking technologies to:</p>
      <ul>
        <li>Enable core website functionality</li>
        <li>Maintain secure user sessions</li>
        <li>Process orders and payments</li>
        <li>Remember shopping cart contents</li>
        <li>Improve website performance</li>
        <li>Analyze website traffic</li>
        <li>Prevent fraud and security threats</li>
        <li>Support marketing and advertising efforts</li>
      </ul>
      <p>Cookies help us provide a smooth and secure shopping experience when purchasing printers, consumables, and accessories.</p>

      <h2>3. TYPES OF COOKIES WE USE</h2>

      <h3>A. Essential Cookies (Strictly Necessary)</h3>
      <p>These cookies are required for the website to function properly. Without them, certain services may not be available.</p>
      <p>They help with:</p>
      <ul>
        <li>Secure login and account authentication</li>
        <li>Shopping cart functionality</li>
        <li>Checkout and payment processing</li>
        <li>Fraud prevention</li>
        <li>Website security</li>
      </ul>
      <p>These cookies cannot be disabled.</p>

      <h3>B. Performance & Analytics Cookies</h3>
      <p>These cookies help us understand how visitors interact with our website.</p>
      <p>We may use:</p>
      <ul>
        <li>Google Analytics</li>
        <li>Page view tracking</li>
        <li>Traffic source analysis</li>
        <li>Device and browser statistics</li>
      </ul>
      <p>These cookies allow us to:</p>
      <ul>
        <li>Improve website structure</li>
        <li>Identify technical issues</li>
        <li>Enhance user experience</li>
        <li>Optimize product listings</li>
      </ul>
      <p>You may opt out of Google Analytics tracking by visiting: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a></p>

      <h3>C. Functional Cookies</h3>
      <p>These cookies remember:</p>
      <ul>
        <li>Language preferences</li>
        <li>Region settings</li>
        <li>Previously viewed products</li>
        <li>Saved preferences</li>
      </ul>
      <p>They improve personalization and usability.</p>

      <h3>D. Advertising & Marketing Cookies</h3>
      <p>We may allow third-party service providers to place cookies for:</p>
      <ul>
        <li>Display advertising</li>
        <li>Retargeting campaigns</li>
        <li>Abandoned cart reminders</li>
        <li>Interest-based advertisements</li>
      </ul>
      <p>These cookies may track browsing behavior across different websites. You may opt out through:</p>
      <ul>
        <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">https://optout.networkadvertising.org/</a></li>
        <li><a href="https://www.networkadvertising.org/mobile-choice" target="_blank" rel="noopener noreferrer">https://www.networkadvertising.org/mobile-choice</a></li>
      </ul>

      <h2>4. THIRD-PARTY COOKIES</h2>
      <p>We may allow trusted third parties to place cookies, including:</p>
      <ul>
        <li>Google Analytics</li>
        <li>Payment processors (PayPal, Visa, MasterCard)</li>
        <li>Advertising networks</li>
        <li>Security providers</li>
      </ul>
      <p>These third parties have their own privacy policies governing their use of cookies.</p>

      <h2>5. HOW LONG DO COOKIES REMAIN?</h2>
      <p>Session cookies expire when you close your browser. Persistent cookies remain until their expiration date, or you manually delete them. Retention depends on the specific cookie type.</p>

      <h2>6. HOW TO CONTROL COOKIES</h2>
      <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
      <ul>
        <li>Delete cookies</li>
        <li>Block cookies</li>
        <li>Disable third-party cookies</li>
        <li>Receive alerts when cookies are set</li>
      </ul>
      <p>However, disabling cookies may prevent checkout functionality, affect account login, disable cart features, or limit personalization.</p>

      <h2>7. DO-NOT-TRACK (DNT)</h2>
      <p>Some browsers include a "Do Not Track" feature. Currently, there is no universal standard for responding to DNT signals. Therefore, we do not respond to DNT browser signals at this time.</p>

      <h2>8. SALE OR SHARING OF PERSONAL INFORMATION</h2>
      <p>We do not sell personal information. If cookies are considered “sharing” under certain US state privacy laws (such as targeted advertising), you may exercise your rights by:</p>
      <ul>
        <li>Emailing: <a href="mailto:info@printeezmania.shop">info@printeezmania.shop</a></li>
        <li>Visiting: <Link to="/contact">https://printeezmania.shop/contact</Link></li>
      </ul>

      <h2>9. CHILDREN’S PRIVACY</h2>
      <p>Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors.</p>

      <h2>10. UPDATES TO THIS COOKIE POLICY</h2>
      <p>We may update this Cookie Policy periodically to reflect changes in law, updates to tracking technologies, or business changes. The updated version will be indicated by a revised "Last Updated" date.</p>

      <hr />
      <h2>11. CONTACT INFORMATION</h2>
      <p>If you have any questions regarding this Cookie Policy, please contact:</p>
      <div className="bg-amber-50/30 p-8 rounded-3xl border border-amber-100 my-8 not-prose">
        <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-2">
          <p>PrinteezMania LLC</p>
          <p>Authorised HP Partner</p>
          <p>1327 Eraste Landry Rd</p>
          <p>Lafayette, LA 70506</p>
          <p>United States</p>
          <p className="pt-4 flex items-center gap-3 text-amber-600">info@printeezmania.shop</p>
        </address>
      </div>
    </PolicyLayout>
  );
}
