import Link from 'next/link';
import React from 'react';

interface IProps {}

const FooterItemSection = ({ title, items }: { title: string; items: { text: string; href: string }[] }) => {
  return (
    <div className="w-3/12">
      <h2 className="text-lg text-gray-900 font-semibold">{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.text}>
            <Link href={item.href} className="text-green-dark-1 hover:text-green-light-1">
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Footer = ({}: IProps) => {
  const sections = [
    {
      title: 'Get in touch',
      items: [
        { text: 'About Us', href: '/about' },
        { text: 'Blog', href: '/blog' },
        { text: 'Privacy Policy', href: '/privacy-policy' },
        { text: 'Terms & Conditions', href: '/terms' },
        { text: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Connections',
      items: [
        { text: 'Facebook', href: 'https://www.facebook.com' },
        { text: 'Twitter', href: 'https://www.twitter.com' },
        { text: 'Instagram', href: 'https://www.instagram.com' },
        { text: 'LinkedIn', href: 'https://www.linkedin.com' },
        { text: 'YouTube', href: 'https://www.youtube.com' },
      ],
    },
    {
      title: 'Earnings',
      items: [
        { text: 'Become an Affiliate', href: '/affiliate' },
        { text: 'Advertise Your Product', href: '/advertise' },
        { text: 'Sell on Market', href: '/sell' },
      ],
    },
    {
      title: 'Account',
      items: [
        { text: 'Your account', href: '/account' },
        { text: 'Returns Centre', href: '/returns' },
        { text: '100% purchase protection', href: '/protection' },
        { text: 'Chat with us', href: '/chat' },
        { text: 'Help', href: '/help' },
      ],
    },
  ];

  return (
    <div className="w-full px-10 border-t border-green-light-2 py-3">
      <div className="w-full flex" id="main-footer">
        {sections.map((section) => (
          <FooterItemSection key={section.title} title={section.title} items={section.items} />
        ))}
      </div>
      <div className="w-full py-8">
        <span className="text-gray-600 text-sm">Copyright © {new Date().getFullYear()} Suraj Aswal</span>
      </div>
    </div>
  );
};
