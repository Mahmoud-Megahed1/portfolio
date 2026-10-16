import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  User,
  Briefcase,
  Code2,
  FolderGit2,
  Mail,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandMenu({ open: controlledOpen, onOpenChange }: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  const runCommand = (command: () => void) => {
    setIsOpen(false);
    command();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      description: text,
    });
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Type a command or search sections..." />
      <CommandList className="max-h-[320px] font-body">
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => scrollToSection("home"))}
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Home className="w-4 h-4 text-accent" />
            <span>Home</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => scrollToSection("about"))}
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <User className="w-4 h-4 text-accent" />
            <span>About Mahmoud</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => scrollToSection("experience"))}
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Briefcase className="w-4 h-4 text-accent" />
            <span>Experience & Training (DEPI / ITI)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => scrollToSection("portfolio"))}
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <FolderGit2 className="w-4 h-4 text-accent" />
            <span>Selected Projects</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => scrollToSection("contact"))}
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Mail className="w-4 h-4 text-accent" />
            <span>Contact</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Featured Projects">
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open("https://github.com/Mahmoud-Megahed1/Arcade-Electronics", "_blank")
              )
            }
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Code2 className="w-4 h-4 text-accent" />
            <span>Arcade Electronics (.NET 10 / Clean Architecture)</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open(
                  "https://github.com/Mahmoud-Megahed1/on-demand-delivery-platform",
                  "_blank"
                )
              )
            }
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Code2 className="w-4 h-4 text-accent" />
            <span>On-Demand Delivery Platform (Logistics)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Social & Profiles">
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open("https://github.com/Mahmoud-Megahed1", "_blank")
              )
            }
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Github className="w-4 h-4 text-accent" />
            <span>GitHub Profile (@Mahmoud-Megahed1)</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open("https://linkedin.com/in/mahmoud---megahed", "_blank")
              )
            }
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Linkedin className="w-4 h-4 text-accent" />
            <span>LinkedIn Profile</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open("https://khamsat.com/user/mahmoudmegahedd", "_blank")
              )
            }
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <ExternalLink className="w-4 h-4 text-accent" />
            <span>Khamsat Freelance Profile</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() =>
              runCommand(() => copyToClipboard("mahmoudmaghed30@gmail.com", "Email"))
            }
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Copy className="w-4 h-4 text-accent" />
            <span>Copy Email Address</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                toast.info("Competitive Programming", {
                  description: "ECPC Finalist | 500+ algorithmic problems solved on Codeforces.",
                })
              )
            }
            className="flex items-center gap-2 cursor-pointer py-2.5"
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>View ECPC / Competitive Programming Stats</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
