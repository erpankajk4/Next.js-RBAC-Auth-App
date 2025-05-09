"use client";
import Menu from "../Menu";
import Wrapper from "@/ui/Wrappers";
import Logo from "../../Logo";
import { signOut, useSession } from "next-auth/react";
import MenuMobile from "../MenuMobile";
export default function Header({
  show,
  upperNavItems,
  activeItemId,
  handleNavItemClick,
    handleMobileMenu,
  isMobileMenuOpen,

}: any) {
  const { data: session } = useSession();
  return (
    <header
      className={`fixed top-0 z-50 w-full bg-transparent transition-transform duration-300 max-md:bg-[#159baf] ${show}`}
    >
      {/* Desktop Section */}
      {/* Upper Nav  */}
      <Wrapper as={"nav"} className="flex w-full items-center justify-between py-1.5 max-md:hidden">
        {/* Logo with Link */}
        <div className="p-3 bg-zinc-200 border border-zinc-300 rounded-xl">
        <Logo />
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <ul className="hidden items-center gap-x-5 font-medium text-white md:flex">
            <Menu
              navItemsArray={upperNavItems}
              activeItemId={activeItemId}
              onItemClick={handleNavItemClick}
            />
{session?.user && (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
  >
    Logout
  </button>
)}
          </ul>
        </div>
      </Wrapper>
      {/* -------------------------------------  */}
      {/* Mobile Section */}
      <Wrapper as={"nav"} className="flex w-full items-center justify-between gap-3 py-2 md:hidden">
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-x-4">
{session?.user && (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
  >
    Logout
  </button>
)}
                            {/* HamMenu Icon  */}
          <HamIcon isMobileMenuOpen={isMobileMenuOpen} handleMobileMenu={handleMobileMenu} />
        </div>
      </Wrapper>
            {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-20 w-full md:hidden">
          <MenuMobile
            navItemsArray={upperNavItems}
            setIsMobileMenuOpen={handleMobileMenu}
            activeItemId={activeItemId}
          />
        </div>
      )}
    </header>
  );
}

function HamIcon({ isMobileMenuOpen, handleMobileMenu }: any) {
  return (
    <button
      className={`navbar-toggle-btn ${isMobileMenuOpen ? "open" : ""}`}
      type="button"
      onClick={handleMobileMenu}
    >
      <span />
      <span />
      <span />
      <span />
    </button>
  );
}
