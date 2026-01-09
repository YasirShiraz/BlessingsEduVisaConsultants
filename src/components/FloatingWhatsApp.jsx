import whatsappLogo from '../assets/whatsapp.png';

const FloatingWhatsApp = () => {
    return (
        <a
            href="https://wa.me/923247569469"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
        >
            <img src={whatsappLogo} alt="WhatsApp" className="w-[60px] h-[60px] object-contain" />
        </a>
    );
};

export default FloatingWhatsApp;
