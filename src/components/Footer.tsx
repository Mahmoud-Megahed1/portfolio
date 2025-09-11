import { Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-foreground/70">
                © {currentYear} Mahmoud Mohamed Megahed. All rights reserved.
              </p>
            </div>

            {/* Back to top */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="hover-lift"
            >
              Back to top
              <ArrowUp className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;