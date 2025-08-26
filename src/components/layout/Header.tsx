"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Briefcase,
  Users,
  UserCircle,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
      <path
        d="M10 12V22H13.2V18.25L16 22H19L15.25 17L19 12H16L13.2 15.75V12H10Z"
        fill="white"
      />
      <path d="M22 12V22H25V12H22Z" fill="white" />
    </svg>
    <span className="text-xl font-bold font-headline text-primary">EnlazaME</span>
  </Link>
);

// Mock authentication state
const LoggedInUserType: 'student' | 'company' | null = 'student';

const NavLinks = ({ className }: { className?: string }) => {
  const links = [
    { href: '/', label: 'Empleos', icon: Briefcase },
    ...(LoggedInUserType === 'company'
      ? [{ href: '/dashboard', label: 'Panel', icon: LayoutDashboard }]
      : []),
    ...(LoggedInUserType === 'student'
      ? [{ href: '/applications', label: 'Postulaciones', icon: FileText }]
      : []),
    { href: '/post-job', label: 'Publicar Vacante', icon: Users },
  ];

  return (
    <nav className={cn('flex items-center gap-6 text-sm font-medium', className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-2 transition-colors hover:text-primary"
        >
          <link.icon className="h-4 w-4" />
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://picsum.photos/seed/stu1/100/100" alt="Ana Pérez" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <span className="hidden md:inline">Ana Pérez</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/profile">
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Cerrar Sesión</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const AuthButtons = () => (
  <div className="flex items-center gap-2">
    <Button variant="ghost" asChild>
      <Link href="/login">Iniciar Sesión</Link>
    </Button>
    <Button asChild>
      <Link href="/register">Registrarse</Link>
    </Button>
  </div>
);

export default function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Logo />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-4">
                <Logo />
                <NavLinks className="flex-col !items-start" />
                <div className="border-t pt-4">
                  {LoggedInUserType ? <UserMenu /> : <AuthButtons />}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <NavLinks />
        </div>
        <div>{LoggedInUserType ? <UserMenu /> : <AuthButtons />}</div>
      </div>
    </header>
  );
}
