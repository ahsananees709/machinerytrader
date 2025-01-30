'use client'
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationPin } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
      <footer className="bg-secondary text-white py-12 px-8 flex flex-col gap-4">
     {/* <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 p-4">

  <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
    <FontAwesomeIcon
      icon={faEnvelope} // Mail Icon
      className="w-6 h-6 md:w-8 md:h-8 bg-white p-2 md:p-2 rounded-2xl text-gray-600 hover:text-gray-600 transition duration-300"
    />
    <div>
      <p className="text-xs md:text-sm font-semibold">Mail Us</p>
      <p className="text-xs md:text-sm">info@gmail.com</p>
    </div>
  </div>

 
  <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
    <FontAwesomeIcon
      icon={faPhone} 
      className="w-6 h-6 md:w-8 md:h-8 bg-white p-2 md:p-2 rounded-2xl text-gray-600 hover:text-gray-600 transition duration-300"
    />
    <div>
      <p className="text-xs md:text-sm font-semibold">Call Us</p>
      <p className="text-xs md:text-sm">+123-456-7890</p>
    </div>
  </div>

 
  <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
    <FontAwesomeIcon
      icon={faLocationPin}
      className="w-6 h-6 md:w-8 md:h-8 bg-white p-2 md:p-2 rounded-2xl text-gray-600 hover:text-gray-600 transition duration-300"
    />
    <div>
      <p className="text-xs md:text-sm font-semibold">Our Location</p>
      <p className="text-xs md:text-sm">123 Main Street, City</p>
    </div>
  </div>
</div>


    
          <div className="border-t-2 w-2/3 border-white hidden md:block mx-auto"></div>
 */}


      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Left Side: Company Information */}
        <div className="flex flex-col space-y-4">
          <div className="text-2xl font-bold mb-0">
            <Link href="/home">
              <img src="/logo-2.png" alt="Logo" className="cursor-pointer w-24" />
            </Link>
          </div>
          <p className="text-sm mb-2">49 Welbeck Street</p>
          <p className="text-sm mb-2">London W1G 9XN</p>
          <p className="text-sm">© 2024 Lonic. All rights reserved.</p>
        </div>

        {/* Vertical Divider */}
        <div className="border-l-2 ml-auto mr-auto h-full border-white hidden md:block mx-4"></div>

        {/* Middle: Site Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-0 text-white">SITE</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/home" className="hover:underline hover:text-primary">Home</a></li>
            <li><a href="/wishlist" className="hover:underline hover:text-primary">WishList</a></li>
            <li><a href="/contact" className="hover:underline hover:text-primary">Contact Us</a></li>
          </ul>
        </div>

        {/* Vertical Divider */}
        {/* <div className="border-l-2 h-full border-primary hidden md:block mx-4"></div> */}

        {/* Right Side: Legal Links and Contact */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-0 text-white">LEGAL</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy-policy.html" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
              {/* Vertical Divider */}
              {/* <div className="border-l-2 h-full border-primary hidden md:block mx-4"></div> */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-0 text-white">CONTACT</h3>
          <p className="text-sm mb-2">+44 77 0661 1054</p>
          <p className="text-sm mb-2">Sam@lonic.uk</p>
          <div className="flex items-center space-x-4">
            {/* Instagram */}
            <a href="https://www.instagram.com/lonicldn?igsh=bTVkdmMxbDV3cmts" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faInstagram}
                className="w-5 h-5 text-primary hover:text-gray-600 transition duration-300"
              />
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/lonic/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="w-5 h-5 text-primary hover:text-gray-600 transition duration-300"
              />
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@lonicldn?_t=8s61XKL0iBs&_r=1" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faTiktok}
                className="w-5 h-5 text-primary hover:text-gray-600 transition duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// export const Footer = () => {
//   return (
//     <>
//       <div className="bg-[#AD0000] pt-[91px]" data-testid="footer">
//         <div className="max-w-screen-xl w-full lg:px-10 px-5 mx-auto">
//           <div className="flex lg:gap-[70px] gap-[40px] lg:justify-end justify-start flex-wrap mb-[38px]">
//             <div className="flex items-center gap-2">
//               <div className="bg-[#FFFFFF] w-[90px] h-[90px] rounded-full shrink-0 flex justify-center items-center">
//                 <Image
//                   src="/mail.svg"
//                   alt="Vercel Logo"
//                   width={34}
//                   height={26}
//                 />
//               </div>
//               <div>
//                 <h2 className="text-[#FFFFFF] text-[26px] leading-8 font-bold">
//                   Mail Us
//                 </h2>
//                 <p className="text-[23px] leading-[26px] text-[#ffffff]">
//                   Info@Example.com
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="bg-[#FFFFFF] w-[90px] h-[90px] rounded-full shrink-0 flex justify-center items-center">
//                 <Image
//                   src="../phone.svg"
//                   alt="Vercel Logo"
//                   width={34}
//                   height={26}
//                 />
//               </div>
//               <div>
//                 <h2 className="text-[#FFFFFF] text-[26px] leading-8 font-bold">
//                   Call Us
//                 </h2>
//                 <p className="text-[23px] leading-[26px] text-[#ffffff]">
//                   +01 569 896 654
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="bg-[#FFFFFF] w-[90px] h-[90px] rounded-full shrink-0 flex justify-center items-center">
//                 <Image
//                   src="../location.svg"
//                   alt="Vercel Logo"
//                   width={34}
//                   height={26}
//                 />
//               </div>
//               <div>
//                 <h2 className="text-[#FFFFFF] text-[26px] leading-8 font-bold">
//                   Location
//                 </h2>
//                 <p className="text-[23px] leading-[26px] text-[#ffffff]">
//                   Amsterdam, 109-74
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="border-y border-y-[#fff] pt-[3.375rem] pb-[90px] flex md:flex-row flex-col">
//             <div className="md:max-w-[583px] w-full md:border-r border-r-[#fff] pr-[87px] border-b md:border-b-0 pb-10 mb-10 border-b-[#fff]">
//               <p className="text-[#fff] text-[23px] leading-8 mb-[79px]">
//                 Denouncing pleasure and praising pain was born and I will givg
//                 you a coghmplete acchount of the system, and expound the actual
//               </p>
//               <div className="flex gap-[19px] flex-wrap">
//                 <div className="bg-[#FFFFFF] w-[79px] h-[79px] rounded-full shrink-0 flex justify-center items-center">
//                   <Image
//                     src="../mail.svg"
//                     alt="Vercel Logo"
//                     width={34}
//                     height={26}
//                   />
//                 </div>
//                 <div className="bg-[#FFFFFF] w-[79px] h-[79px] rounded-full shrink-0 flex justify-center items-center">
//                   <Image
//                     src="../mail.svg"
//                     alt="Vercel Logo"
//                     width={34}
//                     height={26}
//                   />
//                 </div>
//                 <div className="bg-[#FFFFFF] w-[79px] h-[79px] rounded-full shrink-0 flex justify-center items-center">
//                   <Image
//                     src="../mail.svg"
//                     alt="Vercel Logo"
//                     width={34}
//                     height={26}
//                   />
//                 </div>
//                 <div className="bg-[#FFFFFF] w-[79px] h-[79px] rounded-full shrink-0 flex justify-center items-center">
//                   <Image
//                     src="../mail.svg"
//                     alt="Vercel Logo"
//                     width={34}
//                     height={26}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="md:max-w-[583px] w-full md:border-r border-r-[#fff] lg:pl-[87px] md:pl-10 pr-4 gap-5 flex justify-between flex-wrap">
//               <div>
//                 <h2 className="text-[#fff] text-[26px] leading-8 font-bold mb-1">
//                   Explore
//                 </h2>
//                 <div className="flex flex-col">
//                   <Link href="#" className="text-[#fff] text-[23px] leading-8">
//                     About Us
//                   </Link>
//                   <Link href="#" className="text-[#fff] text-[23px] leading-8">
//                     Gallery
//                   </Link>
//                 </div>
//               </div>
//               <div>
//                 <h2 className="text-[#fff] text-[26px] leading-8 font-bold mb-1">
//                   Quick Links
//                 </h2>
//                 <div className="flex flex-col">
//                   <Link href="#" className="text-[#fff] text-[23px] leading-8">
//                     Service
//                   </Link>
//                   <Link href="#" className="text-[#fff] text-[23px] leading-8">
//                     Blog
//                   </Link>
//                   <Link href="#" className="text-[#fff] text-[23px] leading-8">
//                     Contact Us
//                   </Link>
//                   <Link href="#" className="text-[#fff] text-[23px] leading-8">
//                     Service Request
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Footer;
