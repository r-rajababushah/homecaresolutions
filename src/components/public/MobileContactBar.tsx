import { MessageCircle, Phone } from "lucide-react";

export default function MobileContactBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden">
            <a
                href="tel:YOUR_NUMBER"
                className="flex flex-1 items-center justify-center gap-2 bg-[#0861D5] py-4 text-sm font-semibold text-white"
            >
                <Phone size={18} />
                Call Now
            </a>

            <a
                href="https://wa.me/YOUR_NUMBER"
                className="flex flex-1 items-center justify-center gap-2 bg-[#10B981] py-4 text-sm font-semibold text-white"
            >
                <MessageCircle size={18} />
                WhatsApp
            </a>
        </div>
    );
}