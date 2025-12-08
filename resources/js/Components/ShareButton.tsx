import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaTelegram, FaEnvelope } from "react-icons/fa";

const ShareButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUrl = window.location.href;
  const textToShare = "Cek artikel yang bagus ini!";

  const encodedURL = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(textToShare);

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedURL}`,
    telegram: `https://t.me/share/url?url=${encodedURL}&text=${encodedText}`,
    email: `mailto:?subject=${encodedText}&body=${encodedURL}`,
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-10">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Bagikan Artikel Ini</h3>
      <div className="flex gap-4 flex-wrap">
        {/* Default Buttons with Icons */}
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaFacebook className="text-lg" />
          Facebook
        </a>
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
        >
          <FaTwitter className="text-lg" />
          Twitter
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
        >
          <FaLinkedin className="text-lg" />
          LinkedIn
        </a>
        <a
          href={socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <FaWhatsapp className="text-lg" />
          WhatsApp
        </a>

        {/* More Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          More
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Bagikan ke Lebih Banyak Platform</h3>
            <div className="flex flex-col gap-4">
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaTelegram className="text-lg" />
                Telegram
              </a>
              <a
                href={socialLinks.email}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              >
                <FaEnvelope className="text-lg" />
                Email
              </a>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
