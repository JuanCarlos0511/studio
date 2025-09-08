
"use client";

import Link from 'next/link';
import Image from 'next/image';
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
  FileText,
  Bookmark
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
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Logo = () => (
    <Link href="/" className="flex items-center gap-2" aria-label="Página de inicio de la Facultad de Ingeniería Tampico">
        <div className="relative h-12 w-48">
             <Image 
                src="/logo_fit.png" 
                alt="Logo Facultad de Ingeniería Tampico" 
                fill 
                className="object-contain"
                priority 
            />
        </div>
    </Link>
);


const NavLinks = ({ className, userType }: { className?: string, userType: 'student' | 'company' | null }) => {
  const baseLinks = [
    { href: '/', label: 'Empleos', icon: Briefcase },
  ];

  const studentLinks = [
    { href: '/applications', label: 'Mis Postulaciones', icon: FileText },
    { href: '/saved-jobs', label: 'Guardados', icon: Bookmark }
  ];

  const companyLinks = [
      { href: '/dashboard', label: 'Panel Empresa', icon: LayoutDashboard },
      { href: '/post-job', label: 'Publicar Vacante', icon: Users },
  ];

  const links = [
    ...baseLinks,
    ...(userType === 'student' ? studentLinks : []),
    ...(userType === 'company' ? companyLinks : []),
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

const UserMenu = ({ userType }: { userType: 'student' | 'company' }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear only app-specific data
    localStorage.removeItem('userType');
    localStorage.removeItem('tempStudentProfile');
    localStorage.removeItem('jobs');
    localStorage.removeItem('applications');
    localStorage.removeItem('savedJobs');
    
    toast({ title: "Sesión Cerrada", description: "Has cerrado sesión exitosamente." });
    
    // Use router to navigate to login page
    router.push('/login');
    // A small delay to allow toast to show before a potential full reload if needed elsewhere
    setTimeout(() => {
        // Soft navigation should be enough, but if state isn't refreshing, a full reload can be a fallback
        // window.location.reload(); 
    }, 100);
  };

  const userName = userType === 'student' ? 'Ana Pérez' : 'Reclutador';
  const userAvatar = userType === 'student' ? 'https://picsum.photos/seed/stu1/100/100' : 'https://picsum.photos/seed/comp1/100/100';
  const userFallback = userType === 'student' ? 'AP' : 'R';
  const profileLink = userType === 'student' ? '/profile' : '/dashboard';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userFallback}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{userName}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={profileLink}>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>{userType === 'student' ? 'Perfil' : 'Panel'}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
  const [loggedInUserType, setLoggedInUserType] = useState<'student' | 'company' | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage only on the client side
    const userType = localStorage.getItem('userType') as 'student' | 'company' | null;
    setLoggedInUserType(userType);
    
    // Close mobile sheet on navigation
    if(isOpen) {
        setIsOpen(false);
    }
  }, [pathname, isOpen]);

  if (isMobile === undefined) {
    return <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm h-16" />;
  }

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
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 p-4">
                <div className="flex justify-start mb-4">
                    <Logo />
                </div>
                <NavLinks className="flex-col !items-start gap-4" userType={loggedInUserType} />
                <div className="border-t pt-4 mt-auto">
                  {loggedInUserType ? <UserMenu userType={loggedInUserType} /> : <AuthButtons />}
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
          <NavLinks userType={loggedInUserType} />
        </div>
        <div>{loggedInUserType ? <UserMenu userType={loggedInUserType} /> : <AuthButtons />}</div>
      </div>
    </header>
  );
}

// Add this import at the top
import { toast } from '@/hooks/use-toast';
