import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';
import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      subtitle="Read our shipping and delivery options, timeframes, and policies."
      lastUpdated="February 11, 2026"
    >
      <p className="lead">
        This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: <Link to="/terms-and-conditions">https://printeezmania.shop/terms-and-conditions</Link>.
      </p>
      <p>
        Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.
      </p>

      <h2>WHAT ARE MY SHIPPING DELIVERY OPTIONS?</h2>
      <p>
        We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.
      </p>
      <div className="bg-amber-50/30 p-8 rounded-3xl border border-amber-100 mt-6 not-prose">
        <h4 className="text-lg font-bold text-[#4A3728] mb-2 capitalize ">Free Shipping</h4>
        <p className="text-slate-600 font-bold m-0 italic">We offer free Standard shipping on all orders.</p>
      </div>

      <h2>DO YOU DELIVER INTERNATIONALLY?</h2>
      <p>
        We do not offer international shipping.
      </p>

      <h2>WHAT HAPPENS IF MY ORDER IS DELAYED?</h2>
      <p>
        If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.
      </p>

      <h2>QUESTIONS ABOUT RETURNS?</h2>
      <p>
        If you have questions about returns, please review our Return Policy: <Link to="/return-policy">https://printeezmania.shop/return-policy</Link>.
      </p>

      <hr />
      <h2>HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h2>
      <p>If you have any further questions or comments, you may contact us by:</p>
      <div className="bg-amber-50/30 p-8 rounded-3xl border border-amber-100 my-8 not-prose">
        <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-3">
          <p className="flex items-center gap-3 text-amber-600 font-bold ">Email: info@printeezmania.shop</p>
          <p className="flex items-center gap-3">
            <span className="text-slate-400 font-bold capitalize text-[10px] tracking-widest">Online contact form:</span>
            <Link to="/contact" className="text-amber-600 font-bold ml-2 underline">Contact Us</Link>
          </p>
        </address>
      </div>
    </PolicyLayout>
  );
}
